const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log(path.join(__dirname, "dist"));

module.exports = {
	entry: {
		welcome: './src/js/welcome.js', // 多个js打包文件入口
		hello: './src/js/hello.js', 
	},
	devtool: 'inline-source-map', //map source code line for debug
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8091
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),  //清空dist目录
		 //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
		new ExtractTextPlugin("css/[name].css"),
		new webpack.HotModuleReplacementPlugin(), // 热模块更新
		new webpack.DefinePlugin({ //进行变量替换
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML,一个实例生成一个页面
			filename: 'hello.html', //生成的html存放路径
			inject: 'body', //js插入的位置
			template: './src/view/hello.html', //处理html，必须配合html-loader一起使用
			chunks: ['runtime', 'hello'],//需要引入的chunk，不配置就会引入所有页面的资源
			hash: true
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'body',
			template: './src/view/welcome.html',
			chunks: ['runtime', 'welcome'],
			hash: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime' // 将公共模块提取，生成名为`runtime`的chunk
		})
	],
	output: {
		filename: 'js/[name].[hash].js', //输出bundle文件名，有多个，所以用变量
		chunkFilename: 'js/[name].[chunkhash].chunk.js', //输出chunk文件名，有多个，所以用变量
		path: path.resolve(__dirname, 'dist') //输出文件路径
		// publicPath: '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.css$/, //regular expression used to test the filename
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'url-loader?limit=8192&name=./img/[hash].[ext]'
				]
			},
			{ //把html转化成模块，就能处理多页面应用，设置后面的属性可以把图片一起打包
				test: /\.html$/,
				use: [
					'html-loader?attrs=img:src img:data-src"'
				]
			}
		]
	}
};
