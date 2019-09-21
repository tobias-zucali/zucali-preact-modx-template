/* eslint-disable import/no-mutable-exports, global-require */

let data
if (process.env.NODE_ENV === 'development') {
  data = require('../../../devData.json')
}

export default data
