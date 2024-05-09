<template>
	<view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="handleToHome">
				<view class="cuIcon-cu-image">
					<image :src="'/static/' + [path == 'index' ? 'index-active' : 'index'] + '.png'">
					</image>
				</view>
				<view :class="path == 'index' ? 'tabbar-text-active-color' : 'tabbar-text-color'"
					style="margin-top:2px">首页</view>
			</view>
			<view class="action add-action" @click="handleToPlay">
				<image :src="playerStore.currentTrackInfo.picUrl" mode="" class="music-img"
					:style="{ transform: 'rotate(' + rotate + 'deg)' }"></image>
			</view>
			<view class="action" @click="handleToMy">
				<view class="cuIcon-cu-image">
					<image :src="'/static/' + [path == 'my' ? 'my-active' : 'my'] + '.png'"></image>
				</view>
				<view :class="path == 'my' ? 'tabbar-text-active-color' : 'tabbar-text-color'"
					style="margin-top:2px">我的</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue"
	import { usePlayerStore } from "../../store/player";
	
	defineProps({
		path: {
			type: String,
			default: "index"
		}
	})
	const rotate = ref(0)
	const playerStore = usePlayerStore()
	const handleToHome = () => {
		uni.navigateTo({
			url: "/pages/index/index"
		})
	}
	const handleToPlay = () => {
		uni.navigateTo({
			url: "/pages/player/player",
			animationType: "slide-in-bottom",
			animationDuration: 3000
		})
	}
	const handleToMy = () => {
		uni.navigateTo({
			url: "/pages/my/my"
		})
	}
</script>

<style lang="scss">
	.music-img {
		position: absolute;
		width: 35px;
		z-index: 2;
		height: 35px;
		border-radius: 50%;
		line-height: 35px;
		font-size: 25px;
		top: -17px;
		left: 0;
		right: 0;
		margin: auto;
		padding: 0;
		transition: all 1s linear;
	}
</style>