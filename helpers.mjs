import http2 from 'http2'
import https from 'https'

export const request = async (url, options = {}, type = 'json') => {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(res.statusMessage))
      }
      const data = []
      res.on('data', chunk => data.push(chunk))
      res.on('end', () => {
        switch (type) {
          case 'text':
            resolve(Buffer.concat(data).toString())
            break
          default:
            resolve(JSON.parse(Buffer.concat(data)))
            break
        }
      })
    })
    req.end()
  })
}

export const request2 = async (host, options) => {
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
}
