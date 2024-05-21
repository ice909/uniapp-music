<template>
  <Transition name="fade">
    <view class="player-queue">
      <view class="mask" @click="closeList"></view>
      <view class="content">
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
        <scroll-view scroll-y class="queue-scroll">
          <!-- 分页，避免卡顿 -->
          <view
            hover-class="click-hover"
            hover-stay-time="50"
            class="song"
            v-for="(item, index) in playerStore.playlistModel.slice(
              (pageNumber - 1) * 30,
              pageNumber * 30
            )"
            :class="{
              active: playerStore.currentIndex === index + (pageNumber - 1) * 30,
            }"
            :key="index"
            @click="playerStore.playAtIndex(index + (pageNumber - 1) * 30)"
          >
            <image class="pic" lazy-load :src="item.picUrl"></image>
            <view class="info">
              <text class="name">{{ item.name }}</text>
              <text class="author">{{ item.artists }}</text>
            </view>
            <text class="album">{{ item.album }}</text>
            <text class="duration">{{ formatDuration(item.duration, true) }}</text>
          </view>
          <uni-pagination
            style="margin-top: 10px"
            v-model="pageNumber"
            :pageSize="30"
            :total="playerStore.playlist.length"
          />
        </scroll-view>
      </view>
    </view>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { usePlayerStore } from "@/store/player.js";
import { formatDuration } from "@/utils/format.js";
const emit = defineEmits(["closeList"]);
const playerStore = usePlayerStore();

const pageNumber = ref(1);

const closeList = () => {
  emit("closeList");
};
</script>

<style lang="scss" scoped>
.player-queue {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: transparent;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    z-index: 99;
    background: transparent;
    backdrop-filter: none;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 50%;
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

    .queue-scroll {
      box-sizing: border-box;
      height: 100%;
      padding: 5px;
      padding-bottom: 50px;

      .song {
        display: flex;
        height: 55px;
        padding: 5px;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.75em;

        .pic {
          width: 45px;
          height: 45px;
          border-radius: 0.75em;
        }

        .info {
          flex: 1;
          margin: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .name {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .author {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
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
          border: none;
        }
      }
    }
  }
}
.fade-enter-from {
  transform: translateY(50%);
}
.fade-enter-active {
  transition: all 0.4s;
}

.fade-enter-to {
  transform: translateY(0);
}
.fade-leave-from {
  transform: translateY(0);
}
.fade-leave-active {
  transition: all 0.4s;
}
.fade-leave-to {
  transform: translateY(50%);
}
</style>
