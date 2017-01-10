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
}

export default new PlayersService()
