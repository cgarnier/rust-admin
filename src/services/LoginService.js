/* global localStorage */
import RconService from './RconService'
import EventHub from './EventHub'
class LoginService {
  constructor () {
    this.loggedIn = false
  }
  login (addr, rconPwd) {
    return RconService.connect(addr, rconPwd)
      .then(() => {
        this.loggedIn = true
        localStorage.setItem('rcon_address', addr)
        localStorage.setItem('rcon_password', rconPwd)
      })
  }
  logout () {
    this.loggedIn = false
    localStorage.removeItem('rcon_address')
    localStorage.removeItem('rcon_password')
    EventHub.$emit('logout')
    RconService.disconnect()
  }
  restore () {
    let addr = localStorage.getItem('rcon_address')
    let pwd = localStorage.getItem('rcon_password')
    if (!addr || !pwd) {
      return Promise.reject()
    }
    return this.login(addr, pwd)
  }
}

export default new LoginService()
