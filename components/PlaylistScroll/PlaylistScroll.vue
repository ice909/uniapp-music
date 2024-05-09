<template>
	<view>
		<view class="title">{{title}}</view>
		<scroll-view scroll-x class="scroll-view">
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<img class="pic" :src="item.picUrl" />
					<text class="text">{{item.name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script setup>
	defineProps({
		title: {
			type: String
		},
		list: {
			type: Array
		}
	})
</script>

<style lang="scss">
	.title {
		margin: 5px;
		font-size: 20px;
		font-weight: 700;
	}
	.scroll-view {
		width: 100%;

		.list {
			display: flex;

			.item {
				margin-right: 10px;

				.pic {
					width: 90px;
					height: 90px;
					border-radius: 10px;
				}

				.text {
					font-size: 8px;
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
</style>