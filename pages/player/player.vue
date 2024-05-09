<template>
	<view class="player-page">
		<uni-nav-bar statusBar @clickLeft="back" :title="playerStore.currentTrackInfo.name" left-icon="left"
			:border="false"></uni-nav-bar>
		<view class="cover">
			<image class="pic" :src="playerStore.currentTrackInfo.picUrl"></image>
		</view>
		<!-- 底部控制栏 -->
		<view class="control">
			<view class="slider">
				<view class="position">{{ playerStore.positionStr }}</view>
				<slider class="player-slider" activeColor="rgb(248, 78, 81)" block-size="8"
					:value="playerStore.position" :max="playerStore.duration"></slider>
				<view class="duration">{{ playerStore.durationStr }}</view>
			</view>
			<view class="btns">
				<button class="btn">
					<image class="icon" src="/static/previous.png"></image>
				</button>
				<button class="btn play" @click="playOrPause">
					<image class="icon" :src="playerStore.playState ? '/static/pause.png' : '/static/play.png'"></image>
				</button>
				<button class="btn">
					<image class="icon" src="/static/next.png"></image>
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		usePlayerStore
	} from "@/store/player.js"

	const playerStore = usePlayerStore();

	const playOrPause = () => {
		playerStore.playOrPause()
	}

	const back = () => {
		uni.navigateBack({
			delta: 1
		})
	}
</script>

<style lang="scss">
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
					flex: 1
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

				.play {
					width: 80px;
					height: 80px;
				}

			}
		}
	}
</style>