import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { songUrl, songDetail } from '@/api/song.js';
import { formatDuration } from '@/utils/format.js';

export const usePlayerStore = defineStore('player', () => {
  const player = uni.createInnerAudioContext();
  const playlist = ref([]);
  const playlistId = ref(null);
  const playlistModel = ref([]);
  const currentIndex = ref(-1);
  const currentTrackInfo = ref({
    id: 0,
    name: '未知歌曲',
    picUrl: '/static/default.png',
    album: '未知专辑',
    artists: '未知歌手',
    duration: 0,
  });

  // 当前播放进度
  const position = ref(0);
  // 当前播放时长
  const duration = ref(0);
  const positionStr = ref('00:00');
  const durationStr = ref('00:00');

  // 播放状态
  const playState = ref(false);
  
  const timer = ref(null);
  const rotate = ref(0);

  const initPlayer = () => {
    player.onPlay(() => {
      playState.value = true;
      console.log('音乐开始播放了', 'playState: ' + playState.value);
	  clearInterval(timer.value)
	  timer.value = setInterval(() => {
		  rotate.value += 3
	  },200)
    });
    player.onPause(() => {
      playState.value = false;
      console.log('音乐暂停了', 'playState: ' + playState.value);
	  clearInterval(timer.value)
    });
    player.onStop(() => {
      playState.value = false;
      console.log('音乐停止播放了', 'playState: ' + playState.value);
	  clearInterval(timer.value)
	  rotate.value = 0
    });
    player.onEnded(() => {
	  player.stop()
      next();
    });
    player.onTimeUpdate(() => {
      position.value = player.currentTime;
      positionStr.value = formatDuration(position.value);
    });
    player.onCanplay(() => {
      // 小程序InnerAudioContext实例获取duration一直是0?
      // https://blog.csdn.net/a1441574/article/details/117929244
      let intervalID = setInterval(function () {
        if (player.duration !== 0) {
          duration.value = player.duration;
          // console.log(player.duration)
          durationStr.value = formatDuration(duration.value);
          clearInterval(intervalID);
        }
      });
    });
  };

  const play = () => {
    songUrl({
      id: playlist.value[currentIndex.value].id,
    }).then((res) => {
      if (res.data[0].url) {
        player.pause();
        player.src = res.data[0].url;
        player.play();
      }
    });
  };
  const pause = () => {
    player.pause();
  };
  const playOrPause = () => {
    if (playState.value) {
      player.pause();
    } else {
      player.play();
    }
  };

  const previous = () => {
    if (playlist.value.length === 0) return;
    // 暂时只支持列表循环
    currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length;
    play();
   }

  const next = () => {
    if (playlist.value.length === 0) return;
    // 暂时只支持列表循环
    currentIndex.value = (currentIndex.value + 1) % playlist.value.length;
    play();
  };
  const seek = (position) => {
    player.seek(position);
  };
  /*
   * 播放指定索引的歌曲
   * @param {Number} index 歌曲索引
   */
  const playAtIndex = (index) => {
    currentIndex.value = index;
    play();
  };
  const addSongToPlaylist = (item, isPlay = false) => {
    if (playlistId.value !== 'single') {
      clearPlaylist();
    }
    // 重复歌曲移动到最后，不重复添加
    let index = playlist.value.findIndex((v) => v.id === item.id);
    if (index !== -1) {
      playlist.value.splice(index, 1);
      playlistModel.value.splice(index, 1);
    }

    playlist.value.push({
      id: item.id,
    });
    playlistModel.value.push(item);
    playlistId.value = 'single';
    if (isPlay) {
      if (index !== -1) {
        // 刷新当前歌曲信息
        updateSongInfo();
      }
      playAtIndex(playlist.value.length - 1);
    }
  };
  /**
   * 添加播放列表歌曲到播放列表，并播放
   * @param id 歌单id
   * @param songs 歌曲信息
   * @param index 要播放的歌曲下标
   * @param loadAll 歌单歌曲是否全部加载
   * @returns
   */
  function addTracks(id, songs, index, loadAll = true) {
    if (playlistId.value === id && loadAll) {
      if (index === -1) {
        playAtIndex(0);
      } else {
        playAtIndex(index);
      }
      return;
    }
    // 执行到这里，说明是新的歌单
    clearPlaylist();
    playlistId.value = id;
    songs.forEach((v) => {
      playlist.value.push({ id: v.id });
      playlistModel.value.push(v);
    });
    if (index === -1) {
      playAtIndex(0);
    } else {
      playAtIndex(index);
    }
  }
  /*
   * 更新当前播放歌曲信息
   */
  const updateSongInfo = () => {
    currentTrackInfo.value = playlistModel.value[currentIndex.value];
  };
  // 监听currentIndex变化，更新歌曲信息
  watch(
    () => {
      return currentIndex.value;
    },
    async (newValue, oldValue) => {
      console.log('currentIndex changed:', 'new ', newValue, ' old ', oldValue);
      if (newValue === -1) return;
      updateSongInfo();
    },
    {
      deep: true,
    }
  );

  const clearPlaylist = () => {
    playlist.value = [];
    playlistModel.value = [];
    currentIndex.value = -1;
    playlistId.value = null;
  };
  return {
    player,
    playlist,
    playlistModel,
    currentTrackInfo,
    currentIndex,
    position,
    duration,
    positionStr,
    durationStr,
	rotate,
    playState,
    initPlayer,
    play,
    pause,
    playOrPause,
    previous,
    next,
    seek,
    addSongToPlaylist,
    addTracks,
    playAtIndex,
  };
});
