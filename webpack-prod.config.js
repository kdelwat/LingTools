const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: 'styles.css',
});

module.exports = {
	context: path.resolve(__dirname, 'src'),

	entry: './index.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},

	devtool: 'cheap-module-source-map',

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				loader: extractSass.extract({
					loader: 'css-loader!sass-loader',
					fallbackLoader: 'style-loader',
				}),
			},
		],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		extractSass,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
	],
};
