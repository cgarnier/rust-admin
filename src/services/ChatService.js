import RconService from './RconService'
import EventHub from './EventHub'

class ChatService {
  constructor () {
    EventHub.$on('rcon-message', this.handleMessage)
  }
  send (msg) {
    RconService.command(`say ${msg}`)
  }
  tail (lines) {
    lines = lines || 256
    return RconService.request(`chat.tail ${lines}`)
      .then(res => {
        return res.Message
      })
  }

  on (fn) {
    EventHub.$on('chat-message', fn)
  }
  off (fn) {
    EventHub.$off('chat-message', fn)
  }
  handleMessage (m) {
    if (m.Type !== 'Chat') {
      return
    }
    EventHub.$emit('chat-message', JSON.parse(m.Message))
  }
}

export default new ChatService()
