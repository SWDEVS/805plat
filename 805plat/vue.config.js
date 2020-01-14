const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme',
          './src/assets/styles/var'
        ]
      }
    }
  },
  publicPath: './',
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("assets", resolve("src/assets"))
    // .set("components", resolve("src/components"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public"));
  },
  devServer: {
    disableHostCheck: true,
    port: 8100,
    proxy: {
      '/': {
        'ws': false,
        'target': 'https://m.805.com/',
        "secure": false,
        'changeOrigin': true,
        'pathRewrite': {
          '^': '',
        },
      },
    },
  }
}
