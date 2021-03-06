const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname),
};

const proxyUrls = {
    API: 'http://localhost:80'
};

module.exports = {
    entry: {
        index: path.join(paths.SRC, 'index.jsx')
    },
    devServer: {
        contentBase: paths.SRC,
        proxy: [{
            context: [
                '/api/**'
            ],
            target: proxyUrls.API, 
            secure: false
        }],
        historyApiFallback: true  // https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            paths.SRC,
            path.resolve('./node_modules')
        ]
    },
    output: {
        path: paths.DIST,
        publicPath: '/', // https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: paths.SRC,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                include: path.join(paths.SRC),
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                include: path.join(paths.SRC),
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                 use: [
                  'file-loader'
                ]
            }
        ],
    },
     plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html'),
        })
    ],
    devtool: 'source-map'
};
