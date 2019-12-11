import CONFIGS from './configs.mjs'
import { request } from './helpers.mjs'

class CanvasService {
  constructor() {
  }

  async getCoursesFailing(name) {
    const user = await this.getUser(name)
    let failing = []
    if (user) {
      const courses = await this.getGrades(user.id, 86)
      for (const course of courses) {
        if (course.grade < 69) failing.push(course)
      }
    }
    return failing
  }

  // http2 not supported by Canvas API
  async getGrades(id, term) {
    try {
      const endpoint = `users/${id}/courses`
      const qs = '?include[]=total_scores&include[]=sections&per_page=100'
      const url = CONFIGS.canvas.baseUrl.concat(endpoint, qs)
      const options = { headers: { Authorization: CONFIGS.canvas.auth } }
      const data = await request(url, options)
      let courses = []
      for (const course of data) {
        if (course.enrollment_term_id === term) {
          courses.push({
            name: course.name,
            section: course.sections[0].name,
            grade: course.enrollments[0].computed_current_score
          })
        }
      }
      return courses
    } catch(e) {
      console.log(e)
      return null
    }
  }

  async getUser(name) {
    try {
      const endpoint = `accounts/1/users`
      const qs = `?search_term=${name}`
      const url = CONFIGS.canvas.baseUrl.concat(endpoint, qs)
      const options = { headers: { Authorization: CONFIGS.canvas.auth } }
      const data = await request(url, options)
      return data[0]
    } catch(e) {
      console.log(e)
      return null
    }
  }
}

export { CanvasService }
