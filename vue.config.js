module.exports = {
  devServer: {
    port: 82
  },
  productionSourceMap: false,
  pwa: {     //添加此段
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}
