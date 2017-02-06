const path = require('path');
const webpack = require('webpack');

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
		],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
	],
};
