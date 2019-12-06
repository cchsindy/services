import CONFIGS from 'data:application/json,"./configs.json"'
import { request } from './helpers.mjs'

class VNNService {
  constructor() {
  }

  async getRoster(url) {
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
      return null
    }
  }

  async runEligibilityCheck(canvas, spark) {
    for (const team of CONFIGS.vnn.teams) {
      const roster = await this.getRoster(CONFIGS.vnn.baseUrl + team.url)
      if (roster) {
        let ineligible = []
        for (const player of roster) {
          const failing = await canvas.getCoursesFailing(player)
          if (failing.length) {
            ineligible.push({ player, failing })
          }
        }
        let html = '<html><body><h1>' + team.name + ' Player Eligibility</h1>'
        for (const i of ineligible) {
          html += '<h2>' + i.player + ' is failing:</h2>'
          for (const f of i.failing) {
            html +=
              '<p>' + f.name + ' - ' + f.section + ' with a ' + f.grade + '%.</p>'
          }
        }
        if (ineligible.length === 0)
          html += '<p><i>All players are eligible!</i></p>'
        html += '</body></html>'
        const sent = await spark.send('CCHS Athletic Player Eligibility', html, team.emails)
        console.log(team.name, '=>', sent)
      }
    }
    console.log('Eligibility Check complete.')
  }
}

export { VNNService }
