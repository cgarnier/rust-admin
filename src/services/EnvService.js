import http from './Http'
class EnvService {
  constructor () {
    this.cache = null
    this.promise = null
  }
  get () {
    if (this.cache) {
      return Promise.resolve(this.cache)
    }
    if (this.promise) {
      return this.promise
    }
    this.promise = http('/static/env.json')
      .then(res => res.entity)
      .then(res => {
        this.cache = res
        return this.cache
      })
    return this.promise
  }
}

export default new EnvService()
