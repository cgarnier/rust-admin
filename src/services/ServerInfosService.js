import EventHub from './EventHub'
import RconService from './RconService'
/**
 * Server info service.
 * Provide server info and throw an event regulary with the infos
 * @event serverinfo Server info data
 */

const EVENT_NAME = 'server-info'
const INTERVAL = 500
class ServerInfosService {
  constructor () {
    setInterval(() => {
      this.infos()
        .then((res) => {
          EventHub.$emit(EVENT_NAME, res)
        })
    }, INTERVAL)
  }

  /**
   * Get the server info
   * @returns {Promise.<TResult>}
   */
  infos () {
    return RconService.request('serverinfo')
      .then((res) => {
        return res.Message
      })
  }
  /**
   * Helper to register an event listener
   * @param fn
   */
  on (fn) {
    EventHub.$on(EVENT_NAME, fn)
  }

  /**
   * Helper to unregister an event listener
   * @param fn
   */
  off (fn) {
    EventHub.$off(EVENT_NAME, fn)
  }
}

export default new ServerInfosService()
