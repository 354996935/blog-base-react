/*
 * @Author: zhengyf
 * @Date: 2018-04-07 12:43:20
 * @Last Modified by: zhengyf
 * @Last Modified time: 2018-04-07 14:15:24
 * @Description: 公共头部组件
 */

import React from 'react'
import './header.scss'

export default class Header extends React.Component {
    render() {
        return (
            <div className="page-header">
                <div className="content-inner">
                    <a href="/" className="logo">Logo</a>
                    <ul className="header-tabs">
                        <li className="header-tab">tab1</li>
                        <li className="header-tab">tab2</li>
                        <li className="header-tab">tab3</li>
                    </ul>
                    <div className="right-block">
                        <div className="no-login">
                            <a href="javascript:;">登录</a>
                            <a href="javascript:;">注册</a>
                        </div>
                        <div className="yes-login"></div>
                    </div>
                </div>
            </div>
        )
    }
}
