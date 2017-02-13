/* global Image */
class ImagePreloader {
  load (img) {
    if (Array.isArray(img)) {
      return Promise.all(img.map(this._load))
    }
    console.log('Preloading ' + img)
    return this._load(img)
  }
  _load (img) {
    console.log('Preloading ' + img)
    return new Promise((resolve, reject) => {
      let image = new Image()

      let cb = () => {
        console.log('Preloading cb ' + img)
        resolve(img)
      }
      image.onload = cb
      image.onerror = cb
      image.onabort = cb
      image.src = img
      console.log('Preloading src ' + img)
    })
  }
}

export default new ImagePreloader()
