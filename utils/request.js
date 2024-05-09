const baseUrl = "http://47.237.19.173:4000"
const request = (options = {}) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url: baseUrl + options.url ,
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

export default request;