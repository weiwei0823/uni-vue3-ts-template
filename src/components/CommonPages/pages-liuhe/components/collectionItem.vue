<template>
	<!--  v-if="dataType != 4 || (dataType == 4 && item.collectStatus == 1)" -->

	<!-- <view class="collectionItem"> -->
	<!-- v-for="item in data" -->
	<view class="item" @click="detail(item)">
		<image class="tuijian" src="@/static/imgs-liuhe/index_02/categorys/item/tuijian.png" v-if="item.izHot">
		</image>
		<view class="logo">
			<image mode="widthFix" class="img" :src="item.logo"></image>
		</view>
		<view class="name">{{ item.name }}</view>
		<view class="star" v-if="item.type === 2 || showStar" @click.stop="collect(item)">
			<uni-icons type="star-filled" size="15" :color="item.collectStatus === 1 ? themeColor.themeAuxiliaryColorDot : '#fff'"></uni-icons>
		</view>
	</view>
	<!-- </view> -->

</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		props: {
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			item: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		mounted() {
		},

	}
</script>

<style>
	.collectionItem {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding: 0 20rpx;
	}
</style>
