import { request } from './helpers.mjs'

class SpacesService {
  constructor() {
  }

  async getFileList(dir) {
    try {
      const url = 'https://covenant.nyc3.digitaloceanspaces.com/'
      const data = await request(url, {}, 'text')
      const files = Array.from(data.matchAll(RegExp(dir.concat('/[^<]*\.jpg'), 'g')), m => m[0])
      return files
    } catch(e) {
      console.log(e)
      return null
    }
  }
}

export { SpacesService }
