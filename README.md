## React-Component-zad

自用组件库(练习用)

### 项目启动

安装依赖：

```
npm install
```

或

```
yarn install
```

开发模式运行：

```
npm start
```

> 注：windows环境下需安装cross-env,并修改package.json

```
npm install cross-env --save-dev
```

```
"start": "cross-env NODE_ENV=development webpack-dev-server --hot --inline --progress --colors --history-api-fallback",
"build": "cross-env NODE_ENV=production webpack --progress --profile --colors"
```

之后在浏览器输入 localhost:9999

打包：

```
npm run build
```
