module.exports = {
  configureWebpack: {
    output: {
      library: 'singleSpaVue',
      libraryTarget: 'umd',
    },
    devServer: {
      headers:{
        'Access-Control-Allow-Origin':'*',
      },
      port: 10000,
    },
  },
};
