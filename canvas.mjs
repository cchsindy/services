import CONFIGS from './configs.json'
import https from 'https'
import { StringDecoder } from 'string_decoder'

class CanvasService {
  constructor() {
    this.data = []
  }

  getGrades() {
    https.get(CONFIGS.canvas.baseUrl + 'users/2359/courses', { headers: { Authorization: CONFIGS.canvas.auth } }, (res) => {
      // console.log('statusCode:', res.statusCode)
      // console.log('headers:', res.headers)
      res.on('data', (d) => {
        const decoder = new StringDecoder('utf8')
        const dataString = decoder.write(d)
        this.data = JSON.parse(dataString)
        console.log(this.data[0].name)
      })
    }).on('error', (e) => {
      console.error(e)
    })
  }

  test() {
    console.log('your base url is', CONFIGS.canvas.baseUrl)
  }
}

export { CanvasService }
