import memoize from 'lodash/memoize'


export default memoize(({
  id,
  structureOnly,
  limit = 99999,
} = {}) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open(
    'GET',
    `http://api.zucali.com/resources${id > -1 ? `/${id}` : ''}?limit=${limit}${structureOnly ? '&structure_only' : ''}`,
    true
  )
  xhr.responseType = 'json'

  xhr.onload = () => {
    const { status } = xhr

    if (status === 200) {
      resolve(xhr.response)
    } else {
      reject(
        Error(`getResources failed with status ${status}`)
      )
    }
  }

  xhr.send()
}))
