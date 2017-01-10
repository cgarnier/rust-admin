import RconService from './RconService'
import EventHub from './EventHub'

/**
 * Chart Service
 * @event chat-message
 */
class ChatService {
  constructor () {
    EventHub.$on('rcon-message', this.handleMessage)
  }

  /**
   * Send a message on the chat
   * @param msg
   */
  send (msg) {
    RconService.command(`say ${msg}`)
  }

  /**
   * Get the given last lines of the chat
   * @param lines
   * @returns {Promise.<TResult>}
   */
  tail (lines) {
    lines = lines || 256
    return RconService.request(`chat.tail ${lines}`)
      .then(res => {
        return res.Message
      })
  }

  /**
   * Helper to handle chat message event
   * @param fn
   */
  on (fn) {
    EventHub.$on('chat-message', fn)
  }

  /**
   * Helper to remove handler
   * @param fn
   */
  off (fn) {
    EventHub.$off('chat-message', fn)
  }

  /**
   * Handle for RconConsole chat-event
   * @param m
   */
  handleMessage (m) {
    if (m.Type !== 'Chat') {
      return
    }
    EventHub.$emit('chat-message', JSON.parse(m.Message))
  }
}

export default new ChatService()
