/*
 * @Author: zhengyf
 * @Date: 2018-04-07 12:41:21
 * @Last Modified by: zhengyf
 * @Last Modified time: 2018-04-07 20:29:29
 */

'use strict'

const glob = require('glob')
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const srcDir = path.resolve(__dirname, '../src')

let Entries = getEntries('/**/*.js') // 入口文件集合
let htmlFiles = getEntries('/views/**/*.js') // 需要使用模板的文件
let HTMLPlugins = getHTMLPlugins() // 通过 html-webpack-plugin 生成的 HTML 集合
let CSSPlugins = getCSSPlugins() // 通过extract-text-webpack-plugin 为每个页面生成对应的 css文件

const config = {
    entry: Entries,
    output: {
        filename: '[name].[hash].js', // name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
        path: path.join(__dirname, '../dist'), // 打包好之后的输出路径
        publicPath: '' // 静态资源文件引用时的路径（加在引用静态资源前面的） /public
    },
    // 配置loader
    module: {
        rules: [
            {
                test: /\.jsx$/, // 使用loader的目标文件。这里是.jsx
                loader: 'babel-loader'
            },
            {
                test: /\.js$/, // 使用loader的目标文件。这里是.js
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true
                        }
                    }
                ],
                exclude: [
                    path.join(__dirname, '../node_modules') // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: {
                                    path: 'postcss.config.js' // 这个得在项目根目录创建此文件
                                }
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: HTMLPlugins.concat(CSSPlugins),
    devtool: 'cheap-module-eval-source-map', // eval-source-map
    resolve: {
        alias: {
            '@': path.resolve('src') // 这里没有用 ../src
        }
    }
}

/**
 * @description 获取入口文件
 * @param {string} targetFilePath 目标文件的路径
 * @returns {object} map
 */
function getEntries(targetFilePath) {
    let entryFiles = glob.sync(srcDir + targetFilePath)
    let map = {}

    for (let i = 0; i < entryFiles.length; i++) {

        const SRC_LENGTH_ADD_ONE = 4
        let filePath = entryFiles[i]
        let firstIndex = filePath.indexOf('src') + SRC_LENGTH_ADD_ONE
        let lastIndex = filePath.lastIndexOf('.')
        let filename = filePath.slice(firstIndex, lastIndex)
        map[filename] = filePath
    }

    return map
}

/**
 * @description 以index.html为模板，把entry注入到模板文件，生成一个新的页面
 * @returns {Array} htmls
 */
function getHTMLPlugins() {
    let htmls = []

    for (let fileName in htmlFiles) {

        if (htmlFiles.hasOwnProperty(fileName)) {

            let filename = fileName.substring(fileName.lastIndexOf('\/') + 1)
            let page = new HTMLPlugin({
                template: path.join(__dirname, '../src/index.html'),
                filename: filename + '.html',
                title: `this is ${filename}.html`,
                chunks: [fileName]
            })

            htmls.push(page)
        }
    }

    return htmls
}

/**
 * @description 为每个页面生成对应的css文件
 * @returns {array} pageExtractCssArray
 */
function getCSSPlugins() {
    let pageExtractCssArray = []

    for (let fileName in htmlFiles) {

        if (htmlFiles.hasOwnProperty(fileName)) {
            pageExtractCssArray.push(new ExtractTextPlugin('[name].[hash].css'))
        }
    }

    return pageExtractCssArray
}

module.exports = config
