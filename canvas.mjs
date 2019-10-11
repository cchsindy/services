import CONFIGS from './configs.json'
import { request, request2 } from './helpers.mjs'

class CanvasService {
  constructor() {
  }

  async getGrades(userId) {
    try {
      const endpoint = `users/${userId}/courses`
      const qs = '?include[]=total_scores&include[]=sections&per_page=100'
      const url = CONFIGS.canvas.baseUrl.concat(endpoint, qs)
      const options = { headers: { Authorization: CONFIGS.canvas.auth } }
      const data = await request(url, options)
      return data
    } catch(e) {
      console.log(e)
    }
  }

  async getGrades2(userId) {
    try {
      const host = 'https://covenantchristian.instructure.com'
      const options = {
        ':path': `/api/v1/users/${userId}/courses`,
        headers: { Authorization: CONFIGS.canvas.auth }
      }
      const data = await request2(host, options)
      console.log(data)
    } catch(e) {
      console.error(e)
    }
  }
}

export { CanvasService }
