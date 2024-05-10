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
            <image
              class="author-pic"
              :src="playlistInfo.creator.avatarUrl"
            ></image>
            <text class="author-name">{{ playlistInfo.creator.nickname }}</text>
            <text class="create-date"
              >创建于{{ formatDate(playlistInfo.createTime) }}</text
            >
          </view>

          <view class="buttons">
            <button size="mini" type="primary" @click="playAll">
              播放全部
            </button>
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
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { songDetail } from '@/api/song.js';
import { playlistDetail } from '@/api/playlist.js';
import { formatDate } from '@/utils/format.js';
import { usePlayerStore } from '@/store/player.js';

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
  const _songs = await songDetail({ ids: ids.join(',') });
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
      artists: item.ar.map((artist) => artist.name).join('/'),
      duration: item.dt,
    });
  });
  return _songs;
};

// 播放全部
const playAll = () => {
  playerStore.addTracks(playlistInfo.value.id, getSongs(), 0, true);
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
</style>
