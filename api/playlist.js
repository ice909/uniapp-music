import { request,get } from '@/utils/request.js';
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

/*
 *获取用户歌单(需要登录)
 * @param uid 用户id
 */
export const getUserPlaylist = (uid) => { 
	return get('/user/playlist', { uid }, false, false)
}