<template>
	<view>
		<view class="title">{{title}}</view>
		<scroll-view scroll-x class="scroll-view">
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index" @click="playSong(item)">
					<img class="pic" :src="item.picUrl" />
					<view class="info">
						<text class="name">{{item.name}}</text>
						<view class="artist">
							<view v-for="(art, i) in item.song.artists" :key="i">
								<text>{{ art.name }}</text>
								<text v-if="i !== item.song.artists.length - 1"> / </text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { usePlayerStore } from '../../store/player';
	defineProps({
		title: {
			type: String
		},
		list: {
			type: Array
		}
	})
	const playerStore = usePlayerStore()
	const playSong = (item) => {
		playerStore.addSongToPlaylist(item,true)
	}
</script>

<style lang="scss">
	.title {
		margin: 10px;
		font-size: 20px;
		font-weight: 700;
	}

	.scroll-view {
		width: 100%;

		.list {
			display: grid;
			grid-template-columns: repeat(3, 70%);
			gap: 10px 10px;

			.item {
				display: flex;
				background-color: #f7f7f7;
				padding: 5px;
				border-radius: 5px;
				box-shadow: $uni-shadow-sm;

				.pic {
					width: 50px;
					height: 50px;
					border-radius: 10px;
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 5px;

					.artist {
						display: flex;
						flex-direction: row;
					}
				}
			}
		}
	}
</style>