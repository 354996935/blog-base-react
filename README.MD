### 克隆项目
    ` git remote add origin https://github.com /354996935/blog-base-react.git`

### 版本说明
    node: `v8.10.0`
    yarn: `v1.5.1`

### 安装依赖
    `yarn`

### 本地开发
    `yarn start`
    浏览器打开localhost:1551

### build 生成dist文件夹
    开发环境: `yarn build:dev`
    生产环境: `yarn build:prod`

### 注意事项
#### node-sass 安装失败
    1、若提示缺少python2环境 安装python27，添加进系统环境变量。
    2、SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ yarn add node-sass 多试几次（在 git base 运行）
