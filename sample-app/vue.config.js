module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/styles/main.scss";'
      }
    }
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js',
      swDest: 'service-worker.js',
    },
  },
};
