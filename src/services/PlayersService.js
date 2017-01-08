import RconService from './RconService'

class PlayersService {
  list () {
    return RconService.request('playerlist')
      .then((res) => {
        return res.Message
      })
  }
}

export default new PlayersService()
