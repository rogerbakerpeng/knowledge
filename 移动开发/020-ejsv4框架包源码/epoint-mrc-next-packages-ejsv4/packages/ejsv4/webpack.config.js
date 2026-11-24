const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const packagePath = path.resolve(process.cwd(), 'package.json');
const EJS_VERSION = require(packagePath).version;

const commonConfig = {
    target: ['web', 'es5'],
    mode: 'production',
    entry: {
        'npm/dist/hybridJs': './npm/index.ts', // ejs 所有内容
        'npm/h5/h5': './npm/build/h5.ts', // h5内容
        'npm/dd/dd': './npm/build/dd.ts', // dd内容
        'npm/ejs/ejs': './npm/build/ejs.ts', // ejs 内容
        'npm/dd_h5/dd_h5': './npm/build/dd_h5.ts', // dd_h5内容
        'npm/ejs_dd_h5/ejs_dd_h5': './npm/build/ejs_dd_h5.ts', // ejs_dd_h5内容
        'npm/ejs_h5/ejs_h5': './npm/build/ejs_h5.ts', // ejs_h5内容
        'npm/xm/xm': './npm/build/xm.ts', // ejs_h5内容
        'npm/xm_h5/xm_h5': './npm/build/xm_h5.ts', // xm_h5内容
        'npm/ejs_xm_h5/ejs_xm_h5': './npm/build/ejs_xm_h5.ts', // ejs_h5内容
        'npm/uni/uni': './npm/build/uni.ts', // uni内容
        'npm/ejs_uni/ejs_uni': './npm/build/ejs_uni.ts', // uni内容
        'npm/h5_uni/h5_uni': './npm/build/h5_uni.ts', // uni内容
        'npm/native/native': './npm/build/native.ts',
        'npm/native_uni/native_uni': './npm/build/native_uni.ts',
        'npm/native_h5/native_h5': './npm/build/native_h5.ts',
        'npm/dd_uni/dd_uni': './npm/build/dd_uni.ts',
        'npm/weex/weex': './npm/build/weex.ts', // weex内容
        'npm/native_weex_uni/native_weex_uni': './npm/build/native_weex_uni.ts', // weex内容
        'npm/native_dd_uni/native_dd_uni': './npm/build/native_dd_uni.ts'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.m?[j|t]sx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                include: /\.(es|min)\.js$/,
                extractComments: false
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            EJS_VERSION: JSON.stringify(EJS_VERSION)
        })
    ]
};

module.exports = [
    {
        ...commonConfig,
        output: {
            path: path.resolve(__dirname), // 解析路径为 ./dist
            filename: '[name].min.js',
            // 输出库不通过default访问
            libraryExport: 'default',
            library: 'ejs',
            libraryTarget: 'umd',
            // 支付宝小程序不支持globalThis
            globalObject: 'this'
        },
        externals: {
            vue: {
                commonjs: 'vue',
                commonjs2: 'vue',
                amd: 'vue',
                root: 'Vue'
            },
            vant: {
                commonjs: 'vant',
                commonjs2: 'vant',
                amd: 'vant',
                root: 'vant'
            },
            axios: {
                commonjs: 'axios',
                commonjs2: 'axios',
                amd: 'axios',
                root: 'axios'
            }
        }
    },
    {
        ...commonConfig,
        output: {
            path: path.resolve(__dirname), // 解析路径为 ./dist
            filename: '[name].es.js',
            // 输出库不通过default访问
            // libraryExport: 'default',
            // library: 'ejs',
            libraryTarget: 'module',
            // 支付宝小程序不支持globalThis
            globalObject: 'this'
        },
        experiments: {
            outputModule: true
        }
    }
];
