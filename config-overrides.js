const path = require('path')

module.exports = function override(config, env) {
  config.resolve = {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
    }
  }
  return config;
}