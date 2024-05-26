<template>
  <view class="mytabbar">
    <view class="item" @click="handleToHome">
      <image
        class="pic"
        :src="
          '/static/' + [path == 'index' ? 'index-active' : 'index'] + '.png'
        "
      ></image>
      <text :class="path == 'index' ? 'title-active' : 'title'">首页</text>
    </view>

    <view class="item add" @click="handleToPlay">
      <view class="content">
        <image
          class="pic"
          :src="playerStore.currentTrackInfo.picUrl"
          mode=""
		  :style="{ transform: 'rotate(' + playerStore.rotate + 'deg)' }"
        ></image>
      </view>
    </view>
    <view class="item" @click="handleToMy">
      <image
        class="pic"
        :src="'/static/' + [path == 'my' ? 'my-active' : 'my'] + '.png'"
      ></image>
      <text :class="path == 'my' ? 'title-active' : 'title'">我的</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { usePlayerStore } from '../../store/player';

defineProps({
  path: {
    type: String,
    default: 'index',
  },
});
const playerStore = usePlayerStore();
const handleToHome = () => {
  uni.redirectTo({
    url: '/pages/index/index',
  });
};
const handleToPlay = () => {
  uni.navigateTo({
    url: '/pages/player/player',
    animationType: 'slide-in-bottom',
    animationDuration: 500,
  });
};
const handleToMy = () => {
  uni.redirectTo({
    url: '/pages/my/my',
  });
};
</script>

<style lang="scss">
.mytabbar {
  display: flex;
  position: fixed;
  min-height: 100upx;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  height: calc(100upx + env(safe-area-inset-bottom) / 2);
  padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  background-color: #fff;
  box-shadow: 0 -1upx 6upx rgba(0, 0, 0, 0.1);
  z-index: 1024;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    .title {
      font-size: 24upx;
      color: #666;
    }
    .title-active {
      font-size: 24upx;
      color: #3cc51f;
    }

    &.add {
      position: relative;
      z-index: 2;
      padding-top: 50upx;
      .content {
        position: absolute;
        width: 100upx;
        height: 100upx;
        padding: 10upx;
        background-color: #fff;
        box-shadow: 0 -3upx 8upx rgba(0, 0, 0, 0.08);
        border-radius: 50%;
        top: -30upx;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 1s linear;

        .pic {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }

    .pic {
      width: 50upx;
      height: 50upx;
      display: inline-block;
    }
  }
}
</style>
