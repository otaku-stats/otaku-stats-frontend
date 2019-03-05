const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname),
}

const proxyUrls = {
    API: 'http://localhost:80'
}

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
        }]
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
                test: /\.(png|svg)$/,
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
            }
        ],
    },
     plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html'),
        })
    ],
}
