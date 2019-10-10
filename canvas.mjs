import CONFIGS from './configs.json'
import https from 'https'

class CanvasService {
  constructor() {
    
  }

  getGrades() {
    https.get(CONFIGS.canvas.baseUrl + 'users/2359/courses', { headers: { Authorization: CONFIGS.canvas.auth } }, (res) => {
      console.log('statusCode:', res.statusCode)
      console.log('headers:', res.headers)

      res.on('data', (d) => {
        process.stdout.write(d)
      })

    }).on('error', (e) => {
      console.error(e)
    })

    // const options = {
    //   hostname: CONFIGS.canvas.baseUrl,
    //   port: 443,
    //   path: 'users/2359/courses',
    //   method: 'GET',
    //   headers: {
    //     'Authorization': CONFIGS.canvas.auth
    //   }
    // }
    // const req = https.request(options, (res) => {
    //   console.log(`STATUS: ${res.statusCode}`)
    //   console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    //   res.setEncoding('utf8')
    //   res.on('data', (chunk) => {
    //     console.log(`BODY: ${chunk}`)
    //   })
    //   res.on('end', () => {
    //     console.log('No more data in response.')
    //   })
    // })
    // req.on('error', (e) => {
    //   console.error(`problem with request: ${e.message}`)
    // })
    // req.end()
  }

  test() {
    console.log('your base url is', CONFIGS.canvas.baseUrl)
  }
}

export { CanvasService }
