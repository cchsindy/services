import CONFIGS from 'data:application/json,"./configs.json"'
import SparkPost from 'sparkpost'

class SparkpostService {
  constructor() {
    this.sparky = new SparkPost(CONFIGS.sparkpost.apiKey)
  }

  async send(subject, html, recipients, reply_to = 'noreply@covenant.education') {
    try {
      await this.sparky.transmissions
        .send({
          options: {
            sandbox: false
          },
          content: {
            from: 'noreply@covenant.education',
            subject,
            html,
            reply_to
          },
          recipients
        })
      return 'Email sent.'
    } catch (e) {
      console.log(e)
      return 'Email not sent.'
    }
  }
}

export { SparkpostService }
