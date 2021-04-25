const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ffa500',
              '@link-color': '#ffa500',
              '@text-color': '#ffa500',
              '@text-color-secondary': '#ffa500',
              '@primary-1': '#ffa500',
              '@primary-2': '#ffa500',
              '@primary-7': '#ffa500',
              '@primary-8': '#ffa500',
              '@primary-5': '#ffa500',
              '@link-hover-color': '#ffa500',
              '@link-active-color': '#ffa500',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
