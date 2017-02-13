class Utils {
  /**
   * Format seconds to human readable duration
   * @param input seconds
   * @returns {string} Formated duration
   */
  formatDuration (input) {
    let hours = Math.floor(input / 3600)
    let minutes = Math.floor((input - (hours * 3600)) / 60)
    let seconds = input - (hours * 3600) - (minutes * 60)

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
