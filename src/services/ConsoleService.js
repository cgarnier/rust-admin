import RconService from './RconService'

class ConsoleService {
  /**
   * Get the console lines
   * @param lines
   * @returns {Promise.<TResult>}
   */
  tail (lines) {
    lines = lines || 256
    return RconService.request(`console.tail ${lines}`)
      .then((res) => {
        return res.Message
      })
  }

  /**
   * Helper to handle incoming message
   * @param fn
   */
  on (fn) {
    RconService.on(fn)
  }

  /**
   * Helper to unregister the event handler
   * @param fn
   */
  off (fn) {
    RconService.removeListener('generic-message', fn)
  }

  send (cmd) {
    return RconService.command(cmd)
  }
}

export default new ConsoleService()
