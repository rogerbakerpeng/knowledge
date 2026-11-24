const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const babel = require('@rollup/plugin-babel').babel;
const typescript = require('rollup-plugin-typescript2');
const pkg = require('../package.json');
const walkByRollup = require('./rollupbuild').walk;

const banner = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * (c) 2017-<%= date %> <%= pkg.author %>',
    ' * Released under the <%= pkg.license %> License.',
    ' * <%= pkg.homepage %>',
    ' */',
    ''
]
    .join('\n')
    .replace(/<%=\s([^%]+)\s%>/g, ($0, $1) => ($1 === 'date' ? new Date().getFullYear() : pkg[$1.split('.')[1]] || ''));

const RELEASE_ROOT_PATH = 'dist';
const SOURCE_ROOT_PATH = 'src';
// const EXAMPLE_PATH = 'showcase/js/ejs/v4/';
const isSourceMap = false;

const globals = {
    vue: 'Vue',
    vant: 'vant'
};
const babelOption = {
    babelrc: false,
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['last 2 versions', 'ie >= 9']
                },
                modules: false
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: ['transform-vue-jsx'],
    exclude: 'node_modules/**',
    extensions: ['.js', '.ts', '.tsx'],
    babelHelpers: 'bundled'
};
const rollupConfig = {
    plugins: [
        typescript({
            sourceMap: false
        }),
        babel(babelOption)
    ],
    format: 'umd',
    name: 'ejs',
    banner,
    external: ['vue', 'vant'],
    globals,
    sourcemap: isSourceMap
};

function resolvePath(p) {
    return path.resolve(__dirname, '../', p);
}
if (!fs.existsSync(resolvePath(RELEASE_ROOT_PATH))) {
    fs.mkdirSync(resolvePath(RELEASE_ROOT_PATH));
}

gulp.task('build_main', async (cb) => {
    await walkByRollup([
        {
            ...rollupConfig,
            input: resolvePath(`${SOURCE_ROOT_PATH}/index.ts`),
            output: {
                file: resolvePath(`${RELEASE_ROOT_PATH}/ejs.js`)
            }
        }
    ]);
    cb();
});

gulp.task('build_api', async (cb) => {
    await walkByRollup([
        {
            ...rollupConfig,
            input: resolvePath(`${SOURCE_ROOT_PATH}/api/allnative.ts`),
            output: {
                file: resolvePath(`${RELEASE_ROOT_PATH}/ejs.native.js`)
            }
        },
        {
            ...rollupConfig,
            input: resolvePath(`${SOURCE_ROOT_PATH}/api/allh5.ts`),
            output: {
                file: resolvePath(`${RELEASE_ROOT_PATH}/ejs.h5.js`)
            }
        },
        {
            ...rollupConfig,
            input: resolvePath(`${SOURCE_ROOT_PATH}/api/alldd.ts`),
            output: {
                file: resolvePath(`${RELEASE_ROOT_PATH}/ejs.dd.js`)
            }
        },
        {
            ...rollupConfig,
            input: resolvePath(`${SOURCE_ROOT_PATH}/api/allf9.ts`),
            output: {
                file: resolvePath(`${RELEASE_ROOT_PATH}/ejs.f9.js`)
            }
        },
        {
            ...rollupConfig,
            input: resolvePath(`${SOURCE_ROOT_PATH}/api/allf9dd.ts`),
            output: {
                file: resolvePath(`${RELEASE_ROOT_PATH}/ejs.f9dd.js`)
            }
        },
        {
            ...rollupConfig,
            input: resolvePath(`${SOURCE_ROOT_PATH}/api/allxm.ts`),
            output: {
                file: resolvePath(`${RELEASE_ROOT_PATH}/ejs.xm.js`)
            }
        }
    ]);
    cb();
});

gulp.task('version', (cb) => {
    // 生成version.ts文件，自动修改version
    fs.writeFile('../src/version.ts', 'export const ejsVersion = "' + pkg.version + '";', function (err) {
        err && console.log(err);
        cb();
    });
});

gulp.task('revert_version', (cb) => {
    // 生成version.ts文件，自动修改version
    fs.writeFile('../src/version.ts', 'export const ejsVersion = EJS_VERSION;', function (err) {
        err && console.log(err);
        cb();
    });
});

gulp.task(
    'build',
    gulp.series('version', 'build_main', 'build_api', 'revert_version', (done) => {
        done();
    })
);

// 将压缩后的移动到example中
// gulp.task('example', (cb) => {
//     gulp.src([
//         resolvePath(`${RELEASE_ROOT_PATH}/**/*.js`),
//         '!PATH'.replace('PATH', resolvePath(`${RELEASE_ROOT_PATH}/**/*.min.js`))
//     ])
//         .pipe(gulp.dest(resolvePath(EXAMPLE_PATH)));
//     cb();
// });

gulp.task(
    'default',
    gulp.series('build', (callback) => {
        callback();
    })
);
