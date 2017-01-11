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
        let player = res.find(p => p.UserId === id)
        if (!player) {
          throw new Error('Player is not connected')
        }
        return player
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
