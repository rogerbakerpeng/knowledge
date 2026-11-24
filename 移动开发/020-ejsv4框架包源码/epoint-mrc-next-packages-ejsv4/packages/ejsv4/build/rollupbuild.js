/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js');
const zlib = require('zlib');
const rollup = require('rollup');

function getSize(code) {
    return `${(code.length / 1024).toFixed(2)}kb`;
}

function blue(str) {
    return `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`;
}

function logError(e) {
    console.log(e);
}

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report(extra) {
            console.log(`${blue(path.relative(process.cwd(), dest))} ${getSize(code)}${extra || ''}`);
            resolve();
        }

        fs.writeFile(dest, code, (err) => {
            if (err) {
                return reject(err);
            }
            if (zip) {
                zlib.gzip(code, (err2, zipped) => {
                    if (err2) {
                        return reject(err2);
                    }
                    report(` (gzipped: ${getSize(zipped)})`);

                    return resolve();
                });
            } else {
                report();
            }

            return resolve();
        });
    });
}

function writeBundle(bundle, config) {
    const dest = config.output.file;
    const isProd = /min\.js$/.test(dest);
    let outputOptions = {
        file: config.output.file,
        format: config.format,
        name: config.name,
        banner: config.banner,
        sourcemap: config.sourcemap,
        globals: config.globals
    };

    return bundle.generate(outputOptions).then((res) => {
        if (isProd) {
            // banner必须手动添加
            const minified = (config.banner ? config.banner : '') + uglify.minify(res.code, {
                output: {
                    ascii_only: true
                },
                compress: {
                    pure_funcs: ['makeMap']
                }
            }).code;

            return write(dest, minified, true);
        }

        return write(dest, res.output[0].code);
    }).catch(logError);
}

function build(config) {
    let inputOptions = {
        input: config.input,
        plugins: config.plugins,
        external: config.external
        // output: config.output
    };

    return rollup.rollup(inputOptions)
        .then((bundle) => {
            // uglify在write中自动进行
            return writeBundle(bundle, config);
        });
}

function walk(options) {
    let built = 0;
    const total = options.length;
    const next = () => {
        return build(options[built]).then(() => {
            built += 1;
            if (built < total) {
                return next();
            }

            return Promise.resolve();
        }).catch(logError);
    };

    return next();
}

module.exports.writeBundle = writeBundle;
module.exports.build = build;
module.exports.walk = walk;