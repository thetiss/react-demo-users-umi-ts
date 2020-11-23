export default {
    '/save': {
        target: "https://ghibliapi.herokuapp.com/",
        changeOrigin: true, // 开启跨域代理
        pathRewrite: { "^/save" : "" }
      },
    '/use': {
        target: "http://public-api-v1.aspirantzhang.com/",
        changeOrigin: true, // 开启跨域代理
        pathRewrite: { "^/use" : "" }
      },    
};