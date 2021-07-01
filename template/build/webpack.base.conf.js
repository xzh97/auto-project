
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

const baseConfig = {
    mode: 'development',
    entry: '../src/main.js',
    modules:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|woff|png|jpg|jpeg|gif)$/,
                use: 'url-loader',
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: '../public/index.html',
        }),
        new ProgressBarWebpackPlugin(),
    ],
    resolve:{
        alias: {
            '@': path.resolve(__dirname,'../src'),
        },
        extensions:['js', 'json', 'vue'],
        // modules: [path.resolve(__dirname, '../src/'), 'node_modules'],

    },
    optimization:{
        minimize: false,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    devServer:{
        open: false,
        port: 5000,
        hot: true,
        https: true,
        contentBase: path.join(__dirname, "public"), 
        publicPath: '/'
    },
}

module.exports = baseConfig