# react antd 后台管理系统

## 创建项目

1. 安装 create-react-app
   `npm install -g create-react-app`

2. 创建项目
   `create-react-app react-admin`

3. 导出配置（方便后续自定义配置）
   `npm run eject`

## 安装项目依赖

- 安装依赖
  `npm install react-router-dom antd --save`

- 安装 babel-plugin-import 以便实现按需加载
  `npm install babel-plugin-import --save-dev`

## 按需加载配置修改

修改 babel-loader 中 plugins 配置，如：
**注意： plugins中import项的顺序需在其他plugins之前**

```javascript
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve(
      'babel-preset-react-app/webpack-overrides'
    ),
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css' // `style: true` 会加载 less 文件
        }
      ],
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-svgo,+ref![path]'
            }
          }
        }
      ]
    ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction
  }
}
```
