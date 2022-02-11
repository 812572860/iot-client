module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false
  },
  css: {
    extract: process.env.NODE_ENV === 'production' || false, // 是否压缩
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/style/_variables.scss";@import "@/assets/style/_mixins.scss";` // 配置vue中可使用的全局样式变量
      }
    }
  },
  devServer: {
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://192.168.33.54',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
}
