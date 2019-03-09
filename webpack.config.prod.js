const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackOutputDirectory = 'prod-dist';

module.exports = merge(commonConfig, {
    output: {
        path: path.join(__dirname, webpackOutputDirectory),
        publicPath: '/',
        filename: '[name]_bundle.[chunkHash].js'
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'resources',
                to: 'resources'
            }// during the production build we need to copy the resources directory to the resources directory in /prod-dist
        ])
    ]
});
