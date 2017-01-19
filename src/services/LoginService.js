/* global localStorage */
import RconService from './RconService'
import EventHub from './EventHub'

/**
 * Login service
 * @event login
 * @event logout
 */
class LoginService {
  constructor () {
    this.loggedIn = false
  }

  /**
   * Login to the rcon server
   * @event login
   * @param addr rcon address
   * @param rconPwd rcon password
   * @returns {Promise.<TResult>}
   */
  login (addr, rconPwd) {
    return RconService.connect(addr, rconPwd)
      .then(() => {
        this.loggedIn = true
        EventHub.$emit('login', addr)
        localStorage.setItem('rcon_address', addr)
        localStorage.setItem('rcon_password', rconPwd)
      })
  }

  /**
   * Logout from the rcon server
   * @event logout
   */
  logout () {
    this.loggedIn = false
    localStorage.removeItem('rcon_address')
    localStorage.removeItem('rcon_password')
    EventHub.$emit('logout')
    RconService.disconnect()
  }

  /**
   * Restore the previous session
   * @returns {*}
   */
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
