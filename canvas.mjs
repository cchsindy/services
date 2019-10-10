import CONFIGS from './configs.json'
import https from 'https'

class CanvasService {
  constructor() {
    this.data = []
  }

  getGrades(userId) {
    const endpoint = `users/${userId}/courses`
    const qs = '?include[]=total_scores&include[]=sections&per_page=100'
    https.get(CONFIGS.canvas.baseUrl.concat(endpoint, qs),
      { headers: { Authorization: CONFIGS.canvas.auth } },
      (res) => {
      let chunks = []
      res.on('data', (d) => {
        chunks.push(d)
      })
      res.on('end', () => {
        this.data = JSON.parse(Buffer.concat(chunks))
        console.log(this.data[0])
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
