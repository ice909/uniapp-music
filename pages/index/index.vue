<template>
	<view>
		<uni-nav-bar statusBar :border="false" shadow>
			<view class="search-container">
				<uni-search-bar class="search-input"  cancelButton="none" placeholder="搜索歌曲" @confirm="search"></uni-search-bar>
			</view>
		</uni-nav-bar>
		<view class="content">
			<swiper v-if="loading" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in banners.banners" :key="index">
					<image class="banner-img" style="width: 100%;height: 100%;" :src="item.imageUrl"></image>
				</swiper-item>
			</swiper>
			<view v-else class="banner-skeleton">

			</view>

			<PlaylistScroll v-if="loading" title="推荐歌单" :list="personalizeds.result"></PlaylistScroll>
			<view v-else class="playlist-skeleton">
				<view class="title">
			
				</view>
				<scroll-view scroll-x class="scroll-view">
					<view class="list">
						<view class="item" v-for="i in 4">
							<view class="pic"></view>
							<view class="text"></view>
						</view>
					</view>
			
				</scroll-view>
			</view>
			<SongScroll v-if="loading" title="推荐新歌" :list="personalizedNewSongs.result"></SongScroll>
			<view v-else class="song-skeleton">
				<view class="title"></view>
				<scroll-view scroll-x class="scroll-view">
					<view class="list">
						<view class="item" v-for="i in 9">
							<view class="pic" ></view>
							<view class="info">
								<view class="name"></view>
								<view class="artist">
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<MyTabbar path="index"></MyTabbar>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		banner
	} from "@/api/banner.js"
	import {
		personalized
	} from "@/api/playlist.js"
	import {
		personalizedNewsong
	} from "@/api/song.js"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	const banners = ref([])
	const personalizeds = ref()
	const personalizedNewSongs = ref()
	const loading = ref(false)
	onLoad(async () => {
		banners.value = await banner({
			type: 0
		})
		personalizeds.value = await personalized({
			limit: 8,
			offset: 0
		})
		personalizedNewSongs.value = await personalizedNewsong({
			limit: 9
		})
		loading.value = true
		console.log(banners.value)
		console.log(personalizeds.value)
		console.log(personalizedNewSongs.value)
	})
	
	const search = (e) => {
		console.log(e.value)
		uni.navigateTo({
			url: `/pages/search/search?keyword=${e.value}`
		})
	}
</script>

<style lang="scss">
	.search-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.search-input {
		width: 400rpx;
	}
	.left-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.content {
		height: 100%;
		padding: 10px;
		padding-bottom: 100px;

		.banner-img {
			border-radius: 10px;
		}

		.banner-skeleton {
			width: 100%;
			height: 150px;
			background: #eee;
			/*从多少度开始，到25%是#eee,37%是#fff*/
			background-image: linear-gradient(90deg, #eee 25%, #fff 37%, #eee 63%);
			list-style: none;
			background-size: 400% 100%;
			background-position: 100% 50%;
			animation: loading 0.8s infinite;
			border-radius: 10px;
			}

			

	}
	
	.playlist-skeleton {
		.title {
			margin: 10px;
			margin-left: 0px;
			font-size: 20px;
			font-weight: 700;
			background-color: #f3f3f3;
			width: 80%;
			/* Customize width as needed */
			height: 30px;
			/* Customize height as needed */
			border-radius: 5px;
			/* Customize border radius as needed */
			animation: loading 1s infinite alternate;
		}
	
		.scroll-view {
			width: 100%;
	
			.list {
				display: flex;
				justify-content: space-between;
	
				.item {
					padding: 5px;
					margin-right: 10px;
					border-radius: 10px;
					background-color: #f3f3f3;
					width: 90px;
					/* Customize width as needed */
					height: 120px;
					/* Customize height as needed */
					animation: loading 1s infinite alternate;
	
					.pic {
						width: 90px;
						height: 90px;
						border-radius: 10px;
					}
	
					.text {
						font-size: 12px;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						word-break: break-all;
						user-select: none;
					}
				}
			}
	
		}
	}
	.song-skeleton {
		.title {
			margin: 10px;
			margin-left: 0;
			font-size: 20px;
			font-weight: 700;
			background-color: #f3f3f3;
			width: 80%; /* Customize width as needed */
			height: 30px; /* Customize height as needed */
			border-radius: 5px; /* Customize border radius as needed */
			animation: loading 1s infinite alternate;
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
					box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1); /* Customize box shadow as needed */
					background-color: #f3f3f3;
					animation: loading 1s infinite alternate;
	
					.pic {
						width: 50px;
						height: 50px;
						border-radius: 10px;
						background-color: #cccccc; /* Placeholder color for image */
					}
	
					.info {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						margin-left: 5px;
	
						.name {
							background-color: #cccccc; /* Placeholder color for text */
							width: 70%; /* Customize width as needed */
						 height: 20px; /* Customize height as needed */
						}
	
						.artist {
							display: flex;
							flex-direction: row;
	
							.text {
								background-color: #cccccc; /* Placeholder color for text */
							}
						}
					}
				}
			}
		}
	}
	
	@keyframes loading {
		0% {
			opacity: 0.5;
		}
	
		100% {
			opacity: 1;
		}
	}
</style>