import RconService from './RconService'
import Config from '../config'

let extract = d => d.Message.split('"')[1]
class MapService {
  getMapInfo () {
    return Promise.all([
      RconService.request('server.worldsize'),
      RconService.request('server.seed')
    ])
      .then(res => {
        return res.map(extract)
      })
      .then(res => {
        console.log('extracted', res)
        let size = res[0]
        let seed = res[1]
        return {
          uri: Config.crawler + '/map/' + size + '/' + seed + '/map.png',
          size: size,
          seed: seed
        }
      })
  }
}

export default new MapService()
