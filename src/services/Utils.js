class Utils {
  formatDuration (input) {
    var hours = Math.floor(input / 3600)
    var minutes = Math.floor((input - (hours * 3600)) / 60)
    var seconds = input - (hours * 3600) - (minutes * 60)

    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return hours + ':' + minutes + ':' + seconds
  }
}

export default new Utils()
