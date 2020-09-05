import AWS from 'aws-sdk'
import configs from './configs.mjs'

class SpacesService {
  constructor() {
    this.endpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')
    this.s3 = new AWS.S3({
      endpoint: this.endpoint,
      accessKeyId: configs.aws.key,
      secretAccessKey: configs.aws.secret,
    })
  }

  async getFileList(dir) {
    try {
      const files = []
      const data = await this.s3
        .listObjectsV2({
          Bucket: 'covenant',
          Prefix: dir,
        })
        .promise()
      if (data.Contents) {
        data.Contents.forEach((item) => {
          files.push(item.Key)
        })
      }
      return files
    } catch (e) {
      console.log(e)
      return null
    }
  }
}

export { SpacesService }
