import CopyWebpackPlugin from 'copy-webpack-plugin'
const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default function (config) {
  // copy all static assets files to server root dir...
  config.plugins.push( new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: `*.*` }]) );
  // app cache configs...
  const precacheConfig = {
    staticFileGlobs: [
      '/',
      'build/*',
    ],
    runtimeCaching: [{
      urlPattern: /\//,
      handler: 'networkFirst'
    },{
      urlPattern: /\//,
      handler: 'networkOnly'
    }],
    stripPrefix: 'build/',
    navigateFallback: 'index.html',
    filename: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
  };

  return preactCliSwPrecachePlugin(config, precacheConfig);
}
