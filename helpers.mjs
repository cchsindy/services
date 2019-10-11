import http2 from 'http2'
import https from 'https'

export const request = async (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(res.statusMessage))
      }
      const data = []
      res.on('data', chunk => data.push(chunk))
      res.on('end', () => resolve(JSON.parse(Buffer.concat(data))))
    })
    req.end()
  })
}

export const request2 = async (host, options) => {
  // return new Promise((resolve, reject) => {
    try {
      const client = http2.connect(host)
      const req = client.request(options)
      req.on('response', headers => {
        console.log(headers[':status'])
        console.log(headers['date'])
      })
      req.on('end', () => client.destroy())
      req.on('error', err => {
        console.error(err)
        throw new Error(err)
      })
      req.end()
    } catch(e) {
      console.error(e)
    }
  // })
}
