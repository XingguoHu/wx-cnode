const url = 'https://cnodejs.org/api/v1/'

const $http =  {
  get(path, query = {}){
    let str = (Object.keys(query).map((key) =>{
      return (`${key}=${query[key]}`)
    })).join('&')
    return new Promise((resolve, reject) =>{
      console.log(str ? `${url + path}?${str}` : `${url + path}`)
      wx.request({
        url: str ? `${url + path}?${str}` : `${url + path}`,
        method: 'GET',
        dataType: 'json',
        responseType: 'json',
        success(res) {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}


export default function() {
  Object.defineProperty(wx, '$http', {
    get() {
      return $http
    }
  })
}







