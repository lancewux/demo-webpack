const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

console.log(path.join(__dirname, "dist"));

module.exports = {
	entry: {
		welcome: './src/welcome/welcome.js', // src file
		hello: './src/hello/hello.js', 
	},
	devtool: 'inline-source-map', //map source code line for debug
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8091
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),  //清空dist目录
		new HtmlWebpackPlugin({
			filename: 'hello.html',
			inject: false,
			template: 'src/hello/hello.html' //处理html，必须配合html-loader一起使用
		}),
		new HtmlWebpackPlugin({
			filename: 'welcome.html',
			inject: false,
			template: 'src/welcome/welcome.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		})
	],
	output: {
		filename: '[name].bundle.js', // output filename
		// chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist') //output filepath, __dirname is a global variable of nodejs
	},
	module: {
		rules: [
			{
				test: /\.css$/, //regular expression used to test the filename
				use: [
				'style-loader',
				'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{ //把html转化成模块，就能处理多页面应用了
				test: /\.html$/,
				use: [
					'html-loader'
				]
			},
			{
				test: /\.xml$/,
				use: [
					'xml-loader'
				]
			}
		]
	}
};
