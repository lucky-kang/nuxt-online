# frisson_web_server_render

### 安装项目依赖
```
npm install
```

### 本地开发调试
```
npm run dev //默认test环境运行
npm run dev:test //test环境运行
npm run dev:staging //staging 环境运行
npm run dev:prod //正式环境

```

### 构建运行
+ 构建
```
npm run build //默认正式环境编译
npm run build:test //test环境编译
npm run build:staging //staging环境编译
npm run build:prod //正式环境编译
```

+ 运行
```
npm run start //默认正式服务
npm run start:prod //运行正式服务
npm run start:test //运行test服务
npm run start:staging //运行staging服务
```

### 服务器部署
> 部署之前需要先执行<span style="color:red">[构建运行](#构建运行)</span>中的`构建`
- 单进程运行（测试环境常用）
```
pm2 start npm --name project -- run start 
```
> `project`是进程的名字，可自定义

- 集群模式运行
```
pm2 start ecosystem.config.js --env test
pm2 start ecosystem.config.js --env staging
pm2 start ecosystem.config.js --env production
```
> `staging`是需要运行的环境