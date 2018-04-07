/*
 * @Author: zhengyf
 * @Date: 2018-04-07 12:42:02
 * @Last Modified by: zhengyf
 * @Last Modified time: 2018-04-07 12:42:02
 */

'use strict'

const path = require('path')
const webpackMerge = require('webpack-merge')
const base = require('./webpack.config.base')

let DEV_CONFIG = {
	devServer: {
		host: 'localhost',  // 我们可以允许我们用任意方式进行访问（127.0.0.1，localhost, 本机ip）
		port: '1551',
		contentBase: path.join(__dirname, 'dist'),
		inline: true, //设置为true，当源文件改变时会自动刷新页面
		overlay: {  // 错误提醒弹窗小遮层
			errors: true //只显示error
		},
		// 和output配置对应起来
		publicPath: '',  // 访问所有静态路径都要前面加/public才能访问生成的静态文件
		historyApiFallback: {
			index: '/index.html', // 所有404的请求全部访问该配置下的url,
			// rewrites: [
			// 	// shows views/landing.html as the landing page
			// 	{ from: '', to: '/index.html' },
			// 	// shows views/subpage.html for all routes starting with /subpage
			// 	{ from: /^\/subpage/, to: '/views/subpage.html' },
			// 	// shows views/404.html on all other pages
			// 	{ from: /./, to: '/404.html' },
			// ],
		},


		progress: true, // 显示进度条
		compress: false, // 开启gzip压缩

		// 代理设置
		// proxy: {
		// 	'/api': {
		// 	  target: 'https://other-server.example.com',
		// 	  secure: false,
		// bypass: function(req, res, proxyOptions) {
		// 	if (req.headers.accept.indexOf('html') !== -1) {
		// 	  console.log('Skipping proxy for browser request.');
		// 	  return '/index.html';
		//   },
		// pathRewrite: {'^/api' : ''}
		// 	}
		//   }

		// Multiple entry
		// proxy: [
		// 	{
		// 	  context: ['/api-v1/**', '/api-v2/**'],
		// 	  target: 'https://other-server.example.com',
		// 	  secure: false
		// 	}
		//   ]
	}

}

module.exports = webpackMerge(base, DEV_CONFIG)
