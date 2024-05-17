<template>
  <view v-if="playlistInfo">
    <uni-nav-bar
      statusBar
      @clickLeft="back"
      :title="playlistInfo.name"
      left-icon="left"
      :border="false"
    ></uni-nav-bar>
    <view class="content">
      <view class="header">
        <!-- 歌单封面 -->
        <image class="pic" :src="playlistInfo.coverImgUrl"></image>
        <!-- 歌单信息 -->
        <view class="playlist-info">
          <view class="description">
            {{ playlistInfo.description }}
          </view>

          <view class="creator">
            <image class="author-pic" :src="playlistInfo.creator.avatarUrl"></image>
            <text class="author-name">{{ playlistInfo.creator.nickname }}</text>
            <text class="create-date"
              >创建于{{ formatDate(playlistInfo.createTime) }}</text
            >
          </view>

          <view class="buttons">
            <button size="mini" type="primary" @click="playAll">播放全部</button>
          </view>
        </view>
      </view>
      <SongList
        style="margin-top: 5px"
        :songs="songs"
        :playlist-id="playlistInfo.id"
        :pageNumber="pageNumber"
        :loadSize="loadSize"
      />
      <uni-pagination
        style="margin-top: 10px"
        v-model="pageNumber"
        :pageSize="loadSize"
        :total="count"
      />
    </view>
    <!-- 播放控制栏 -->
    <view v-if="playerStore.playlist.length" class="player-bar" @click="toPlayer">
      <image :src="playerStore.currentTrackInfo.picUrl" class="pic"></image>
      <view class="info">
        <text>{{ playerStore.currentTrackInfo.name }}</text>
        <text>{{ playerStore.currentTrackInfo.artists }}</text>
      </view>
      <view class="controls">
        <button class="btn" @click.stop="playerStore.previous()">
          <image class="icon" src="/static/previous-black.png"></image>
        </button>
        <button class="btn play" @click.stop="playerStore.playOrPause()">
          <image
            class="icon"
            :src="
              playerStore.playState ? '/static/pause-black.png' : '/static/play-black.png'
            "
          ></image>
        </button>
        <button class="btn" @click.stop="playerStore.next()">
          <image class="icon" src="/static/next-black.png"></image>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { songDetail } from "@/api/song.js";
import { playlistDetail } from "@/api/playlist.js";
import { formatDate } from "@/utils/format.js";
import { usePlayerStore } from "@/store/player.js";

const playerStore = usePlayerStore();
const playlistInfo = ref();
const count = ref(0);
const songs = ref([]);
const pageNumber = ref(1);
const loadSize = ref(50);

onLoad(async (opt) => {
  const res = await playlistDetail({ id: opt.id });
  playlistInfo.value = res.playlist;
  console.log(playlistInfo.value);
  count.value = res.playlist.trackCount;
  let ids = [];
  if (playlistInfo.value === undefined) {
    return;
  }
  playlistInfo.value.trackIds.forEach((item) => {
    ids.push(item.id);
  });
  const _songs = await songDetail({ ids: ids.join(",") });
  songs.value = _songs.songs;
});

const back = () => {
  uni.navigateBack({
    delta: 1,
  });
};

const getSongs = () => {
  let _songs = [];
  songs.value.forEach((item) => {
    _songs.push({
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      album: item.al.name,
      artists: item.ar.map((artist) => artist.name).join("/"),
      duration: item.dt,
    });
  });
  return _songs;
};

// 播放全部
const playAll = () => {
  playerStore.addTracks(playlistInfo.value.id, getSongs(), 0, true);
};

const toPlayer = () => {
  uni.navigateTo({
    url: "/pages/player/player",
    animationType: "slide-in-bottom",
    animationDuration: 500,
  });
};
</script>

<style lang="scss">
.content {
  height: 100%;
  padding: 10px;
  padding-bottom: 60px;

  .header {
    display: flex;

    .pic {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }

    .playlist-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20px;

      .creator {
        margin-top: 5px;
        display: flex;
        align-items: center;

        .author-pic {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }

        .author-name,
        .create-date {
          margin-left: 5px;
          font-size: 12px;
          color: #2d2c2c;
        }
      }

      .description {
        margin-top: 10px;
        font-size: 12px;
        color: #2d2c2c;
        /* 超出三行后显示省略号 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }

      .buttons {
        margin-top: 10px;
      }
    }
  }
}
.player-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;

  .pic {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  .info {
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
    color: #2d2c2c;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .controls {
    display: flex;
    align-items: center;

    .btn {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #f5f5f5;
      margin-left: 10px;
      .icon {
        width: 50px;
        height: 27px;
      }
    }
  }
}
</style>
