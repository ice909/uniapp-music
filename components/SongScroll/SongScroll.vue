<template>
	<view>
		<view class="title">{{title}}</view>
		<scroll-view scroll-x class="scroll-view">
			<view class="list">
				<view hover-class="click-hover" hover-stay-time="50" class="item" v-for="(item, index) in list" :key="index" @click="playSong(item)">
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
		playerStore.addSongToPlaylist({
			id: item.id,
			name: item.name,
			picUrl: item.picUrl,
			album: item.song.album.name,
			artists: item.song.artists[0].name,
			duration: item.song.duration
		},true)
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
						width: 100%;
						flex-direction: row;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>