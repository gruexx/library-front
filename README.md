# LIBRARY FRONT

## nginx.conf 生产环境
```editorconfig
#user  nobody;
worker_processes                1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;
events {
worker_connections           1024;
}

http {
include                      mime.types;
default_type                 application/octet-stream;

    #log_format                  main '$remote_addr - $remote_user [$time_local] "$request" '
    #                            '$status $body_bytes_sent "$http_referer" '
    #                            '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log                  logs/access.log main;
    sendfile                     on;
    #tcp_nopush                  on;

    #keepalive_timeout           0;
    keepalive_timeout            65;

    #gzip                        on;

    server {
        listen                   81; # 前端端口
        server_name              127.0.0.1; # 前端地址

        #charset                 koi8-r;

        #access_log              logs/host.access.log main;
        location / {
            root                 C:/Users/11198/OneDrive/WorkSpace/library-front/dist; # dist路径
            index                index.html; # index名字
        }

        location ^~ /api/ {
            proxy_pass           http://127.0.0.1:8080/; # 后端地址
        }
    }
}
```

## vue.config.js 测试环境
```javascript
module.exports = {
  devServer: {
    port: "81", // 前端端口
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080/", // 后端地址
        ws: false,
        changeOrigin: true, // 是否允许跨域
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).