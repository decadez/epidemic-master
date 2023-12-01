module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
    hot: false,
    devServer: {
      host: '127.0.0.1',
      port: 8080
    }
  }
}
