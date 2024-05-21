import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userDetail, loginStatus,userAccount } from '@/api/user';
import { getUserPlaylist } from '@/api/playlist.js';

export const useUserStore = defineStore('user', () => {
	const isLogin = ref(false);
	const id = ref(0);
	const nickname = ref('未登录');
	const avatar = ref('/static/avatar.png');
	const follows = ref(0);
	const followeds = ref(0);
	const level = ref(0);
	const userPlayList = ref();
	const userCreatePlayList = ref();
	const userLikePlayList = ref({});

	const checkLoginStatus = async () => {
		const { data } = await loginStatus();
		console.log(data)
		if (data.profile) {
			await getUserInfo();
		} else {
			console.log("还未登录")
			isLogin.value = false;
			id.value = 0;
			nickname.value = '未登录';
			avatar.value = '/static/avatar.png';
			follows.value = 0;
			followeds.value = 0;
			level.value = 0;
		}
	}

	const getUserInfo = async () => { 
		const { profile, code } = await userAccount();
		if (code === 200) {
			isLogin.value = true;
			id.value = profile.userId;
			avatar.value = profile.avatarUrl;
			nickname.value = profile.nickname;
			// 获取用户详情
			const res = await userDetail(id.value);
			follows.value = res.profile.follows;
			followeds.value = res.profile.followeds;
			level.value = res.level;
			// 获取用户歌单
			const resp = await getUserPlaylist(id.value);
			console.log(resp)
			// 获取用户喜欢的歌单
			userLikePlayList.value = resp.playlist[0]
			// 除去用户喜欢的歌单
			// 获取用户创建的歌单
			userCreatePlayList.value = resp.playlist.slice(1).filter(item => item.userId === id.value)
			// 其余的都是用户收藏的歌单
			userPlayList.value = resp.playlist.slice(1).filter(item => item.userId !== id.value)
		} else {
			console.log("获取用户信息失败")
		}
	}

	return {
		isLogin,
		id,
		avatar,
		nickname,
		follows,
		followeds,
		level,
		userPlayList,
		userCreatePlayList,
		userLikePlayList,
		getUserInfo,
		checkLoginStatus
  };
});
