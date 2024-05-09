import request from "@/utils/request.js"
export const personalizedNewsong = (options) => {
	return request({
		url: "/personalized/newsong",
		method: "GET",
		data: options
	})
}