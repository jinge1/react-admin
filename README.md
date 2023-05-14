# react antd 后台管理系统

## 创建项目

1. 安装 create-react-app
   `npm install -g create-react-app`

2. 创建项目
   `create-react-app react-admin`

3. 导出配置（方便后续自定义配置，or react-app-rewired）
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

## 配置postcss

修改webpack.config.js文件中的postcss-loader项，如：

```javascript
{
// Options for PostCSS as we reference these options twice
// Adds vendor prefixing based on your specified browser support in
// package.json
loader: require.resolve('postcss-loader'),
options: {
  // Necessary for external CSS imports to work
  // https://github.com/facebook/create-react-app/issues/2677
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({ // 修改项
      stage: 3,
      features: {
        'nesting-rules': true
      }
    }),
    // Adds PostCSS Normalize as the reset css with default options,
    // so that it honors browserslist config in package.json
    // which in turn let's users customize the target behavior as per their needs.
    postcssNormalize()
  ],
  sourceMap: isEnvProduction && shouldUseSourceMap
}
```

## css modules配置

修改webpack.config.js文件中的cssModuleRegex项(增加modules: true)，如：

```javascript
{
  test: cssModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction && shouldUseSourceMap,
    modules: true,
    localIdentName: '[name]-[local]-[hash:base64:8]',
    getLocalIdent: getCSSModuleLocalIdent
  })
}

```



<!-- config-overrides.js -->
<!-- https://www.npmjs.com/package/react-app-rewire-postcss -->

vue 装饰器模式报错 eslint配置

<!-- https://blog.csdn.net/xiaotiantian1993s/article/details/85698364 -->
