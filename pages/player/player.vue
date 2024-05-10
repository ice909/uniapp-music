<template>
  <page-meta
    :page-style="'overflow:' + (popupShow ? 'hidden' : 'visible')"
  ></page-meta>
  <view class="player-page">
    <uni-nav-bar
      statusBar
      @clickLeft="back"
      :title="playerStore.currentTrackInfo.name"
      left-icon="left"
      :border="false"
    ></uni-nav-bar>
    <view class="cover">
      <image class="pic" :src="playerStore.currentTrackInfo.picUrl"></image>
    </view>
    <!-- 底部控制栏 -->
    <view class="control">
      <view class="slider">
        <view class="position">{{ playerStore.positionStr }}</view>
        <slider
          class="player-slider"
          activeColor="rgb(248, 78, 81)"
          block-size="8"
          :value="playerStore.position"
          :max="playerStore.duration"
          @change="seek"
        ></slider>
        <view class="duration">{{ playerStore.durationStr }}</view>
      </view>
      <view class="btns">
        <button class="btn"></button>
        <button class="btn">
          <image class="icon" src="/static/previous.png"></image>
        </button>
        <button class="btn play" @click="playOrPause">
          <image
            class="icon"
            :src="
              playerStore.playState ? '/static/pause.png' : '/static/play.png'
            "
          ></image>
        </button>
        <button class="btn" @click="next">
          <image class="icon" src="/static/next.png"></image>
        </button>
        <button @click="showList" class="btn list">
          <image class="icon" src="/static/list.png"></image>
        </button>
      </view>
    </view>
    <uni-popup ref="popup" @change="change">
      <view class="popup-content">
        <view class="header">
          <text class="title">播放列表</text>
          <text class="count">共有{{ playerStore.playlist.length }}首歌曲</text>
          <uni-icons
            class="close-btn"
            type="down"
            size="25"
            @click="closeList"
          ></uni-icons>
        </view>
        <scroll-view class="popup-scroll">
          <view
            hover-class="click-hover"
            hover-stay-time="50"
            class="song"
            v-for="(item, index) in playerStore.playlistModel"
            :key="index"
          >
            <image class="pic" :src="item.picUrl"></image>
            <view class="info">
              <text class="name">{{ item.name }}</text>
              <text class="author">{{ item.artists }}</text>
            </view>
            <text class="album">{{ item.album }}</text>
            <text class="duration">{{
              formatDuration(item.duration, true)
            }}</text>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { usePlayerStore } from '@/store/player.js';
import { formatDuration } from '@/utils/format.js';

const playerStore = usePlayerStore();
const popup = ref(null);
const popupShow = ref(false);

const playOrPause = () => {
  playerStore.playOrPause();
};

const next = () => {
  playerStore.next();
};

const back = () => {
  uni.navigateBack({
    delta: 1,
  });
};
const showList = () => {
  popup.value.open('bottom');
};
const closeList = () => {
  popup.value.close();
};
const change = (e) => {
  popupShow.value = e.show;
};
const seek = (e) => {
  playerStore.seek(e.detail.value);
};
</script>

<style lang="scss" scoped>
.player-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  padding-bottom: 100px;

  .cover {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .pic {
      width: 230px;
      height: 230px;
      border-radius: 50%;
    }
  }

  .control {
    height: 10%;

    .slider {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;

      .player-slider {
        flex: 1;
      }
    }

    .btns {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn {
        width: 60px;
        height: 60px;
        background: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        .icon {
          width: 35px;
          height: 35px;
        }

        &::after {
          border: none;
        }
      }

      .list {
        .icon {
          width: 30px;
          height: 30px;
        }
      }

      .play {
        width: 80px;
        height: 80px;
      }
    }
  }

  .popup-content {
    height: 500px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: saturate(180%) blur(20px);

    .header {
      display: flex;
      align-items: center;
      padding: 5px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);

      .title {
        font-size: 18px;
        font-weight: 700;
      }

      .count {
        flex: 1;
        margin-left: 20px;
        font-size: 13px;
      }

      .close-btn {
        margin-right: 5px;
      }
    }

    .popup-scroll {
      height: 100%;
      padding: 5px;

      .song {
        display: flex;
        height: 55px;
        padding: 5px;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);

        .pic {
          width: 45px;
          height: 45px;
          border-radius: 10px;
        }

        .info {
          flex: 1;
          margin: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .album {
          flex: 1;
          margin: 5px;
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .duration {
          margin: 5px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
