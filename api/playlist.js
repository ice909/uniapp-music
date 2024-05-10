import request from "@/utils/request.js"
export const personalized = (options) => {
	return request({
		url: "/personalized",
		method: "GET",
		data: options
	})
}
export const playlistDetail = (options) => {
	return request({
		url: "/playlist/detail",
		method: "GET",
		data: options
	})
}