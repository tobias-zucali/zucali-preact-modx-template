/* eslint-disable no-param-reassign */

export default function webpack(config, env, helpers, options) {
  /** you can change the config here * */

  // throw JSON.stringify(
  //   helpers.getPluginsByName(config, 'HtmlWebpackPlugin'),
  //   null,
  //   2
  // )
  if (env.isProd) {
    config.output.publicPath = '/assets/templates/zucali-preact-modx-template_build/'
  }
}
