import request from "@/utils/request.js"
export const personalizedNewsong = (options) => {
	return request({
		url: "/personalized/newsong",
		method: "GET",
		data: options
	})
}

export const songUrl = (id) => {
	return request({
		url: "/song/url",
		method: "GET",
		data: id
	})
}

export const songDetail = (ids) => {
	return request({
		url: "/song/detail",
		method: "GET",
		data: ids
	})
}