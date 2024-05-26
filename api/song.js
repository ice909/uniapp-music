import { request, get } from '@/utils/request.js';
export const personalizedNewsong = (options) => {
	return request({
		url: "/personalized/newsong",
		method: "GET",
		data: options
	})
}

export const songUrl = (id) => {
	return get("/song/url", id , true, true)
}

export const songDetail = (ids) => {
	return request({
		url: "/song/detail",
		method: "GET",
		data: ids
	})
}