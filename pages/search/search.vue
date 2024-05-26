<template>
	<view class="search-container">
		<SongList style="margin-top: 5px" :songs="searchResult" :playlist-id="324214124124124" :isPaging="false"
			:loadAll="loadAll" />
		<button type="primary" :loading="loading" @click="loadMore">加载更多</button>
		<!-- 播放控制栏 -->
		<view v-if="playerStore.playlist.length" class="player-bar" @click="toPlayer">
			<image :src="playerStore.currentTrackInfo.picUrl" class="pic"></image>
			<view class="info">
				<text>{{ playerStore.currentTrackInfo.name }}</text>
				<text>{{ playerStore.currentTrackInfo.artists }}</text>
			</view>
			<view class="controls">
				<button class="btn" @click.stop="playerStore.previous()">
					<image class="icon" src="/static/previous-black.png"></image>
				</button>
				<button class="btn play" @click.stop="playerStore.playOrPause()">
					<image class="icon" :src="
		      playerStore.playState ? '/static/pause-black.png' : '/static/play-black.png'
		    "></image>
				</button>
				<button class="btn" @click.stop="playerStore.next()">
					<image class="icon" src="/static/next-black.png"></image>
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getSearchResult
	} from "@/api/search.js"
	import {
		ref
	} from "vue"
	import { usePlayerStore } from "@/store/player.js"
	
	const playerStore = usePlayerStore();

	const keyword = ref()
	const searchResult = ref([]);
	const loadSize = ref(50);
	const count = ref(0);
	const loadAll = ref(false)
	const loading = ref(false)

	onLoad(async (opts) => {
		keyword.value = opts.keyword
		const {
			result
		} = await getSearchResult({
			keywords: keyword.value,
			limit: loadSize.value,
			offset: 0,
			type: 1,
		})
		searchResult.value = result.songs
		count.value = result.songCount
		if (searchResult.value.length >= count.value) {
			loadAll.value = true;
		}
	})

	const loadMore = async () => {
		loading.value = true
		const {
			result
		} = await getSearchResult({
			keywords: keyword.value,
			limit: loadSize.value,
			offset: searchResult.value.length,
			type: 1,
		});
		searchResult.value = searchResult.value.concat(result.songs);
		if (searchResult.value.length >= count.value) {
			loadAll.value = false;
		}
		loading.value = false
	};
	
	const toPlayer = () => {
		uni.navigateTo({
			url: "/pages/player/player",
			animationType: "slide-in-bottom",
			animationDuration: 500,
		});
	};
</script>

<style lang="scss" scoped>
	.search-container {
		box-sizing: border-box;
		padding: 5px;
		padding-bottom: 70px;
		.player-bar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 60px;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			z-index: 100;
		
			.pic {
				width: 40px;
				height: 40px;
				border-radius: 5px;
			}
		
			.info {
				flex: 1;
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 14px;
				color: #2d2c2c;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		
			.controls {
				display: flex;
				align-items: center;
		
				.btn {
					width: 50px;
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					background-color: #f5f5f5;
					margin-left: 10px;
		
					.icon {
						width: 50px;
						height: 27px;
					}
				}
			}
		}
	}
</style>