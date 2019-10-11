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
