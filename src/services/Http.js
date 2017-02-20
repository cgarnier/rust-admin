import Rest from 'rest'
import mime from 'rest/interceptor/mime'
import errorCode from 'rest/interceptor/errorCode'

/**
 * A http client
 * @type {*|Client|Node}
 */
const client = Rest
  .wrap(mime, {mime: 'application/json'})
  .wrap(errorCode)

export default client
