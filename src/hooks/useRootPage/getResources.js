import config from '../../config'


// Requesting resources via XMLHttpRequest is only used for "npm run serve".
export default function getResources() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(
      'GET',
      `${config.host.BASE}/resources.json`,
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
  })
}
