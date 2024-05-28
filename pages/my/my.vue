<template>
  <view class="my-page">
    <uni-card is-shadow @click="toLogin">
      <view class="user-card">
        <image class="avatar" :src="user.avatar"></image>
        <view v-if="user.isLogin" class="info">
          <text>{{ user.nickname }}</text>
          <text>{{ user.follows }}关注 {{ user.followeds }}粉丝 Lv.{{ user.level }}</text>
        </view>
        <text v-else class="info">未登录</text>
      </view>
    </uni-card>
    <uni-card v-if="user.isLogin" padding="0px" is-shadow>
      <uni-list>
        <uni-list-item
          title="我喜欢的音乐"
          :note="user.userLikePlayList.trackCount + '首'"
          link="navigateTo"
          :to="`/pages/playlist/playlist?id=${user.userLikePlayList.id}`"
        >
          <template v-slot:header>
            <image
              style="width: 50px; height: 50px; border-radius: 10px; margin-right: 10px"
              :src="user.userLikePlayList.coverImgUrl"
              mode="widthFix"
            ></image>
          </template>
        </uni-list-item>
      </uni-list>
    </uni-card>
    <uni-card v-if="user.isLogin" padding="0px" title="创建的歌单" is-shadow>
      <uni-list>
        <uni-list-item
          v-for="item in user.userCreatePlayList"
          :key="item.id"
          :title="item.name"
          :note="item.trackCount + '首'"
          link="navigateTo"
          :to="`/pages/playlist/playlist?id=${item.id}`"
        >
          <template v-slot:header>
            <image
              style="width: 50px; height: 50px; border-radius: 10px; margin-right: 10px"
              :src="item.coverImgUrl"
              mode="widthFix"
            ></image>
          </template>
        </uni-list-item>
      </uni-list>
    </uni-card>
    <uni-card v-if="user.isLogin" padding="0px" title="收藏的歌单" is-shadow>
      <uni-list>
        <uni-list-item
          v-for="item in user.userPlayList"
          :key="item.id"
          :title="item.name"
          :note="item.trackCount + '首'"
          link="navigateTo"
          :to="`/pages/playlist/playlist?id=${item.id}`"
        >
          <template v-slot:header>
            <image
              style="width: 50px; height: 50px; border-radius: 10px; margin-right: 10px"
              :src="item.coverImgUrl"
              mode="widthFix"
            ></image>
          </template>
        </uni-list-item>
      </uni-list>
    </uni-card>
	<uni-card v-if="user.isLogin" padding="0px" is-shadow>
	  <uni-list>
	    <uni-list-item
		clickable
		link
	      title="退出登录"
	      @click="logout"
	    >
	    </uni-list-item>
	  </uni-list>
	</uni-card>
	<uni-popup ref="logoutDialog" type="dialog">
					<uni-popup-dialog type="warn" cancelText="取消" confirmText="退出登录" title="退出登录" content="是否要退出登录" @confirm="logoutConfirm"
						@close="logoutClose"></uni-popup-dialog>
				</uni-popup>
    <MyTabbar path="my"></MyTabbar>
  </view>
</template>

<script setup>
import { useUserStore } from "@/store/user.js";
import { ref } from "vue"

const user = useUserStore();
const logoutDialog = ref(null);

const toLogin = () => {
  if (!user.isLogin) {
    uni.navigateTo({
      url: "/pages/login/login",
    });
  }
};

const logoutConfirm = () => {
	console.log("确认退出登录")
	user.logout()
	uni.redirectTo({
		url: "/pages/index/index"
	})
}

const logoutClose = () => {
	console.log("取消退出登录")
}

const logout = () => {
	logoutDialog.value.open()
}
</script>

<style lang="scss">
.my-page {
  padding-bottom: 110px;
}
.user-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }

  .info {
    display: flex;
    flex-direction: column;
    margin-top: 10rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 700;
    color: #000;
  }
}

.like-card {
  display: flex;
  align-items: center;

  .pic {
    width: 100rpx;
    height: 100rpx;
    border-radius: 10rpx;
  }

  .info {
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    margin-top: 10rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #000;

    .sub {
      font-size: 24rpx;
      color: #666;
      font-weight: 500;
    }
  }
}
</style>
