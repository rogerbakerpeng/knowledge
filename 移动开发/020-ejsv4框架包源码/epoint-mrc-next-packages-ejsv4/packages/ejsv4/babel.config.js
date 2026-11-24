module.exports = (api) => {
    const isTest = api.env('test');
    // You can use isTest to determine what presets and plugins to use.

    if (isTest) {
        return {
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
                "@babel/preset-typescript"
            ],
            plugins: [
                // '@babel/plugin-syntax-dynamic-import',
                // 'transform-vue-jsx'
            ]
        };
    } else {
        return {
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
                "@babel/preset-typescript"
            ],
            plugins: [
                'transform-vue-jsx'
            ]
        };
    }
};
