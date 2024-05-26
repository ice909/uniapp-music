<template>
  <page-meta
    :page-style="'overflow:' + (playlistQueueShow ? 'hidden' : 'visible')"
  ></page-meta>
  <view class="player-page">
    <uni-nav-bar
      statusBar
      @clickLeft="back"
      :title="playerStore.currentTrackInfo.name"
      left-icon="left"
      :border="false"
      background-color="rbga(0, 0, 0, 0)"
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
        <button class="btn" @click="playerStore.previous()">
          <image class="icon" src="/static/previous.png"></image>
        </button>
        <button class="btn play" @click="playerStore.playOrPause()">
          <image
            class="icon"
            :src="playerStore.playState ? '/static/pause.png' : '/static/play.png'"
          ></image>
        </button>
        <button class="btn" @click="playerStore.next()">
          <image class="icon" src="/static/next.png"></image>
        </button>
        <button @click="showList" class="btn list">
          <image class="icon" src="/static/list.png"></image>
        </button>
      </view>
    </view>

    <PlayerQueue v-show="playlistQueueShow" @closeList="closeList"></PlayerQueue>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePlayerStore } from "@/store/player.js";

const playerStore = usePlayerStore();
const playlistQueueShow = ref(false);

const back = () => {
  uni.navigateBack({
    delta: 1,
  });
};
const showList = () => {
  playlistQueueShow.value = true;
};
const closeList = () => {
  playlistQueueShow.value = false;
};
const seek = (e) => {
  playerStore.seek(e.detail.value);
};
</script>

<style lang="scss" scoped>
.player-page {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  overflow: hidden;
  background: rgba($color: #000000, $alpha: 0.15);
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

        &.active {
          background-color: #e2d4f9;
        }
      }
    }
  }
}
</style>
