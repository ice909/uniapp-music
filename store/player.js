import {
	ref,
	watch
} from "vue"
import {
	defineStore
} from "pinia"
import {
	songUrl,
	songDetail
} from "@/api/song.js"
import {
	formatDuration
} from "@/utils/format.js"

export const usePlayerStore = defineStore('player', () => {
	const player = uni.createInnerAudioContext();
	const playlist = ref([])
	const playlistId = ref(null)
	const playlistModel = ref([])
	const currentIndex = ref(-1)
	const currentTrackInfo = ref({
		id: 0,
		name: '未知歌曲',
		picUrl: '/static/default.png',
		album: '未知专辑',
		artists: '未知歌手',
		duration: 0
	});

	// 当前播放进度
	const position = ref(0);
	// 当前播放时长
	const duration = ref(0);
	const positionStr = ref('00:00');
	const durationStr = ref('00:00');

	// 播放状态
	const playState = ref(false);

	const initPlayer = () => {
		player.onPlay(() => {
			playState.value = true
			console.log("音乐开始播放了", "playState: " + playState.value)
		})
		player.onPause(() => {
			playState.value = false
			console.log("音乐暂停了", "playState: " + playState.value)
		})
		player.onStop(() => {
			playState.value = false
			console.log("音乐停止播放了", "playState: " + playState.value)
		})
		player.onTimeUpdate(() => {
			position.value = player.currentTime
			positionStr.value = formatDuration(position.value)
		})
		player.onCanplay(() => {
			// 小程序InnerAudioContext实例获取duration一直是0?
			// https://blog.csdn.net/a1441574/article/details/117929244
			let intervalID = setInterval(function() {
				if (player.duration !== 0) {
					duration.value = player.duration
					console.log(player.duration)
					durationStr.value = formatDuration(duration.value)
					clearInterval(intervalID);
				}
			})
		})
	}

	const play = () => {
		console.log(playlist.value)
		songUrl({
			id: playlist.value[currentIndex.value].id
		}).then(res => {
			if (res.data[0].url) {
				player.pause()
				player.src = res.data[0].url
				player.play()
			}
		})
	}
	const pause = () => {
		player.pause()
	}
	const playOrPause = () => {
		if (playState.value) {
			player.pause();
		} else {
			player.play();
		}
	}
	const playAtIndex = (index) => {
		currentIndex.value = index
		play()
	}
	const addSongToPlaylist = (item, isPlay = false) => {
		console.log(item)
		playlist.value.push({
			id: item.id
		})
		playlistModel.value.push(item)
		playlistId.value = "single"
		if (isPlay) {
			playAtIndex(playlist.value.length - 1)
		}
	}
	const updateSongInfo = () => {
		currentTrackInfo.value = playlistModel.value[currentIndex.value]
	}
	// 监听currentIndex变化，更新歌曲信息
	watch(() => {
		return currentIndex.value
	}, async (newValue, oldValue) => {
		console.log('currentIndex changed:', "new ", newValue, " old ", oldValue)
		if (newValue === -1) return;
		updateSongInfo();
	}, {
		deep: true
	})
	return {
		player,
		currentTrackInfo,
		position,
		duration,
		positionStr,
		durationStr,
		playState,
		initPlayer,
		play,
		pause,
		playOrPause,
		addSongToPlaylist,
	};
});