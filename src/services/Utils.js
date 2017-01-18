import moment from 'moment'
class Utils {
  formatDuration (input) {
    let now = new Date()
    let date = new Date(now.getTime() - (input * 1000))
    let diff = moment(moment(now).diff(date))
    let days = diff.dayOfYear() - 1
    let time = diff.format('HH:mm:ss')
    return `${days > 0 ? days + ' day' + (days > 1 ? 's' : '') : ''} ${time}`
  }
}

export default new Utils()
