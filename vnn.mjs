import { request } from './helpers.mjs'

class VNNService {
  constructor() {
  }

  async getRoster(url = 'https://covenantathletics.org/teams/2722799/girls/basketball/varsity/roster') {
    try {
      const html = await request(url, {}, 'text')
      const matches = html.matchAll(RegExp('data-student=\\".+\\"', 'g'))
      let players = []
      for (const match of matches) {
        players.push(html.substring(match.index + 14, match.index + match[0].length - 1))
      }
      return players
    } catch(e) {
      console.log(e)
    }
  }
}

export { VNNService }
