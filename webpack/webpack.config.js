/*
 * @Author: zhengyf
 * @Date: 2018-04-07 12:41:46
 * @Last Modified by: zhengyf
 * @Last Modified time: 2018-04-07 12:41:46
 */

'use strict'

const devModule = require('./webpack.config.dev')
const prodModule = require('./webpack.config.prod')
const NODE_ENV = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig, "") // 获取环境命令，并去除首尾空格
let finalyModule = {}

switch (NODE_ENV) {
	case 'development':
		finalyModule = devModule
		break
	case 'production':
		finalyModule = prodModule
		break
	default:
		break
}

module.exports = finalyModule
