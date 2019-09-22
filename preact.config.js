/* eslint-disable no-param-reassign */
import devData from './devData.json'

export default function webpack(config, env, helpers, options) {
  if (process.env.NODE_ENV === 'production') {
    config.output.publicPath = '/assets/templates/zucali-preact-modx-template_build/'
  } else {
    const htmlWebpackPlugin = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0]
    htmlWebpackPlugin.plugin.options.devData = JSON.stringify(devData, null, 2)
  }
}
