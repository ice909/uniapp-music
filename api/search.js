import { get } from '@/utils/request.js';

/*
	keywords: string;
	  limit?: number;
	  offset?: number;
	  type?: number;
*/
export const getSearchResult = (params) => {
	return get("/cloudsearch",params, false,true)
}

// 热搜列表(简略)
export const getHotSearchList = () => {
	return get("/search/hot",{},false,true);
}