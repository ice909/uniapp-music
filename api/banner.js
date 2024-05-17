import { request } from '@/utils/request.js';
export const banner = (options) => {
	return request({
		url: "/banner",
		method: "GET",
		data: options
	})
}