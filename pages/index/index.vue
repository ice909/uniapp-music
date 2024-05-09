<template>
	<view>
		<view class="content">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in banners.banners" :key="index">
					<image class="banner-img" style="width: 100%;height: 100%;" :src="item.imageUrl"></image>
				</swiper-item>
			</swiper>

			<PlaylistScroll v-if="personalizeds" title="推荐歌单" :list="personalizeds.result"></PlaylistScroll>
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
		onLoad
	} from "@dcloudio/uni-app"
	const banners = ref([])
	const personalizeds = ref()
	onLoad(async () => {
		banners.value = await banner({
			type: 0
		})
		personalizeds.value = await personalized({
			limit: 8,
			offset: 0
		})
		console.log(banners.value)
		console.log(personalizeds.value)
	})
</script>

<style lang="scss">
	.content {
		padding: 10px;
		padding-bottom: 60px;

		.banner-img {
			border-radius: 10px;
		}


	}
</style>