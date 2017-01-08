/* global WebSocket */
class RconService {
  constructor () {
    this.callbacks = {}
    this.lastIndex = 1001
  }

  disconect () {
    this.socket.close()
  }
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
        if (this.onMessage != null) {
          this.onMessage(data)
        }
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
  onClose () {
    console.log('ws connection closed')
  }

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

  //
  // Make a request, call this function when it returns
  //
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

  //
  // Returns true if websocket is connected
  //
  isConnected () {
    if (this.socket == null) return false
    return this.socket.readyState === 1
  }

  getPlayers () {
    return this.request('playerlist')
  }
}

export default new RconService()
