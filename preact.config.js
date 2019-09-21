/* eslint-disable no-param-reassign */
import devData from './devData.json'

export default function webpack(config, env, helpers, options) {
  const htmlWebpackPlugin = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0]

  if (env.isProd) {
    config.output.publicPath = '/assets/templates/zucali-preact-modx-template_build/'
    htmlWebpackPlugin.plugin.options.devData = '[[getResourcesJson]]'
  } else {
    htmlWebpackPlugin.plugin.options.devData = JSON.stringify(devData, null, 2)
  }
}
