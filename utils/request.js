const baseUrl = "http://47.237.19.173:4000"

let cookie = ''

export const request = (options = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			method: options.method,
			data: options.data,
			success: (response) => {
				return resolve(response.data)
			},
			fail: (fail) => {
				return reject(fail)
			}
		})
	})
}
// 新的封装，之后会移除上面的request
export const get = (
  url,
  params,
  requireCookie = false,
  noCache = false
) => {
	if (!cookie) cookie = uni.getStorageSync('cookie')
	
	url = baseUrl + url

  return new Promise(resolve => {
    const data = params
    if (noCache) data.timestamp = new Date().getTime()
    if (requireCookie && cookie) data.cookie = encodeURIComponent(cookie)

    const uniReq = uni.request({
      url,
      data,
      method: 'GET',
      // withCredentials: true,
      sslVerify: true,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    uniReq
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        resolve(err)
      })
  })
}
