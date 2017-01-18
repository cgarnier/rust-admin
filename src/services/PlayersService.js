import RconService from './RconService'

/**
 * Players service
 */
class PlayersService {
  /**
   * List the connected players
   * @returns {Promise.<TResult>}
   */
  list () {
    return RconService.request('playerlist')
      .then((res) => {
        return res.Message
      })
  }

  listWithPosition () {
    return Promise.all([
      this.list(),
      this.inGame()
    ])
  }

  /**
   * Get a player form its SteamId
   * @param id SteamID
   */
  get (id) {
    return this.list()
      .then(res => {
        console.log('res ', res)
        let player = res.find(p => p.SteamID === id)
        if (!player) {
          throw new Error('Player is not connected')
        }
        return player
      })
  }

  /**
   * Kick a player
   * @param id SteamID
   * @param reason a reason
   * @returns {Promise.<TResult>}
   */
  kick (id, reason) {
    reason = reason || ''
    return RconService.request(`global.kick "${id}" "${reason}"`)
      .then(res => {
        return res.Message
      })
  }

  /**
   * Ban a player
   * @param id SteamID
   * @param reason a reason
   * @returns {Promise.<TResult>}
   */
  ban (id, reason) {
    reason = reason || ''
    return RconService.request(`global.kick "${id}" "${reason}"`)
      .then(res => {
        return res.Message
      })
  }

  inGame () {
    return RconService.request('players')
      .then(res => {
        return res.Message
          .split('\n')
          .slice(1)
      })
      .then(res => {
        return res
      })
  }
}

export default new PlayersService()
