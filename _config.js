
const config = [
    {
        name:'src',
        isFile: false,
        children: [
            {
                name:'assets',
                isFile: false,
                children: [
                ]
            },
            {
                name:'components',
                isFile: false,
                children: [
                ]
            },
            {
                name:'pages',
                isFile: false,
                children: [
                ]
            },
            {
                name:'utils',
                isFile: false,
                children: [
                ]
            },
            {
                name:'styles',
                isFile: false,
                children: [
                ]
            },
            {
                name:'stores',
                isFile: false,
                children: [
                    'stores.js',
                    'getter.js',
                    'actions.js',
                    'mutations.js',
                ]
            },
            {
                name:'routes',
                isFile: false,
                children: [
                ]
            },
            'main.js',
            'App.vue',
        ]

    },
    {
        name: 'public',
        isFile: false,
        children:[
            {
                name:'static',
                isFile: false,
                children: [
                ]
            },
            'index.html'
        ]
    },
    {
        name: 'build',
        isFile: false,
        children:[
            'webpack.base.conf.js',
            'webpack.dev.conf.js',
            'webpack.prod.conf.js',
        ]
    },
    {
        name: 'config',
        isFile: false,
        children:[
            'index.js',
        ]
    },
    '.babelrc',
    '.gitignore',
    'package.json',
]

module.exports = config;