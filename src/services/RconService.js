/* global WebSocket */
import EventHub from './EventHub'
/**
 * RconService
 */
class RconService {
  constructor () {
    this.callbacks = {}
    this.lastIndex = 1001
  }

  /**
   * Disconnect websocket
   */
  disconnect () {
    this.socket.close()
  }

  /**
   * Connect to the rcon websocket
   * @param addr rcon address
   * @param pass rcon password
   * @returns {Promise}
   */
  connect (addr, pass) {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket('ws://' + addr + '/' + pass)
      this.address = addr

      this.socket.onmessage = (e) => {
        let data = JSON.parse(e.data)

        //
        // This is a targetted message, it has an identifier
        // So feed it back to the right callback.
        //
        if (data.Identifier > 1000) {
          let cb = this.callbacks[ data.Identifier ]
          if (cb != null) {
            cb(data)
          }
          this.callbacks[ data.Identifier ] = null

          return
        }

        //
        // Generic console message, let onMessage catch it
        //
        this.handleGeneric(data)
      }

      this.socket.onopen = () => {
        console.log('ws', this.socket)
        resolve()
      }
      this.socket.onclose = this.onClose
      this.socket.onerror = (err) => {
        reject(err)
      }
    })
  }

  /**
   * Handle socket close event
   */
  onClose () {
    console.log('ws connection closed')
  }

  /**
   * Send a command to the socket
   * @param msg
   * @param identifier
   */
  command (msg, identifier) {
    if (!identifier) {
      identifier = -1
    }

    if (!this.socket) {
      return
    }

    if (!this.isConnected) {
      return
    }

    let packet = {
      Identifier: identifier,
      Message: msg,
      Name: 'WebRcon'
    }

    this.socket.send(JSON.stringify(packet))
  }

  /**
   * Send an rcon request that expect a response
   * @param msg
   * @returns {Promise}
   */
  request (msg) {
    return new Promise((resolve, reject) => {
      this.lastIndex++
      this.callbacks[ this.lastIndex ] = (data) => {
        if (data.Message) {
          data.Message = JSON.parse(data.Message)
        }
        resolve(data)
      }
      this.command(msg, this.lastIndex)
    })
  }

  /**
   * Check if socket is ready
   * @returns {boolean}
   */
  isConnected () {
    // TODO make a waiter with a promise
    if (this.socket == null) return false
    return this.socket.readyState === 1
  }

  /**
   * Old get player method
   * @deprecated Use {PlayerService} instead
   * @returns {*}
   */
  getPlayers () {
    return this.request('playerlist')
  }

  /**
   * Handle generic message
   * @param data
   */
  handleGeneric (data) {
    EventHub.$emit('rcon-message', data)
  }

  /**
   * Helper to register a rcon message handler
   * @param fn callback function
   */
  on (fn) {
    EventHub.$on('rcon-message', fn)
  }

  /**
   * Helper to unregister a rcon message event handler
   * @param fn
   */
  off (fn) {
    EventHub.$off('rcon-message', fn)
  }
}

export default new RconService()
