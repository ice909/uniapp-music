<script setup>
import { formatDuration } from '@/utils/format.js';
import { usePlayerStore } from '@/store/player.js';

const props = defineProps({
  songs: {
    type: Array,
    required: true,
  },
  playlistId: {
    type: Number,
    default: -1,
  },
  // 是否分页显示
  isPaging: {
    type: Boolean,
    default: true,
  },
  pageNumber: {
    type: Number,
    default: 1,
  },
  loadSize: {
    type: Number,
    default: 50,
  },
  // 是否以加载全部歌曲
  loadAll: {
    type: Boolean,
    default: true,
  },
});

const playerStore = usePlayerStore();

// 双击歌曲
const songItemClicked = (index) => {
  playerStore.addTracks(props.playlistId, getSongs(), index, props.loadAll);
};

const getSongs = () => {
  let songs = [];
  props.songs.forEach((item) => {
    songs.push({
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      album: item.al.name,
      artists: item.ar.map((artist) => artist.name).join('/'),
      duration: item.dt,
    });
  });
  return songs;
};
</script>

<template>
  <view v-if="songs.length" class="song-list">
    <view
      v-for="(song, index) in songs.slice(
        isPaging ? (pageNumber - 1) * loadSize : 0,
        isPaging ? (pageNumber - 1) * loadSize + loadSize : songs.length
      )"
      :key="index"
      :class="
        playerStore.currentTrackInfo.id === song.id
          ? 'song-list-item active'
          : 'song-list-item'
      "
      @click.native="
        songItemClicked(isPaging ? (pageNumber - 1) * loadSize + index : index)
      "
    >
      <image class="song-pic" :src="song.al.picUrl" loading="lazy"></image>
      <!-- 歌曲名称和作者 -->
      <view class="song-info">
        <view class="song-name">
          <text>{{ song.name }}</text>
        </view>
        <view
          class="song-artists"
          v-for="(item, index) in song.ar"
          :key="index"
        >
          <text>{{ item.name }}</text>
          <text v-if="index !== song.ar.length - 1"> / </text>
        </view>
      </view>
      <!-- 专辑名 -->
      <view class="song-album">
        <text>{{ song.al.name }}</text>
      </view>
      <!-- 歌曲时长 -->
      <view class="song-duration">
        <text>{{ formatDuration(song.dt, true) }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.song-list {
  .song-list-item {
    display: flex;
    align-items: center;
    padding: 10px 10px;
    cursor: pointer;
    border-radius: 0.75em;
    user-select: none;

    .song-pic {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }

    .song-info {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .song-name {
        font-size: 16px;
        color: #000;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .song-artist {
        font-size: 14px;
        color: #666;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
      }
    }

    .song-album {
      flex: 1;
      font-size: 14px;
      color: #666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .song-duration {
      margin-right: 10px;
      font-size: 14px;
      color: #666;
    }

    &.active {
      background-color: #e2d4f9;
    }
  }
}
.loading {
  text-align: center;
  padding: 30px 50px;
}
</style>
