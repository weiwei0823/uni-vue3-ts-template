<template>
	<view class="mint-tab-container-item" :class="['theme-' + themeColor.name]">
		<Header :title="title" @back="backSearch" :useCustomBack="true" />
		<view class="search">
			<view class="selects">
				<uni-data-select class="item" ref="selectRef" :clear="false" v-model="prams.color"
					:localdata="colorRangeList" coustIcon @change="search">
					<template #itemImg="item">
						<view class="item-img">
							<image class="img" v-if="item.value === prams.color"
								src="@/static/imgs-liuhe/activity/item-selected.png">
							</image>
						</view>
					</template>
				</uni-data-select>
			</view>
			<u-search class="input" :placeholder="'请输入搜索内容'" v-model="prams.keyword" :show-action="false"
				@custom="search" @search="search"></u-search>
			<view class="btn" @click="search">搜索</view>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" show-scrollbar="true"
			:scroll-into-view="toView" scroll-with-animation="true" @scroll="scroll">
			<!--列表-->
			<view class="search-list">
				<view class="van-index-bar" v-if="list.length > 0">
					<view class="van-index-bar__sidebar">
						<span v-for="(item, index) in list" :key="index" @click="maodian(index)"
							:class="selectId == index ? 'van-index-bar__index van-index-bar__index--active' : 'van-index-bar__index'">
							{{ item.key }}
						</span>
					</view>
					<view v-for="(item, index) in list" :key="index" :id="'keys' + index">
						<view>
							<view class="van-index-anchor">
								<span class="search-list-title"><b>{{ item.key }}</b></span>
							</view>
						</view>
						<view class="van-cell" v-for="(val, key) in item.list" :key="key"
							@click="detail(val.pictureId)">
							<view class="van-cell__value van-cell__value--alone">
								<view>
									{{ val.pictureName }}
									<span class="number">{{ val.number }}</span>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="loading" v-else-if="loading">
					<ltLoading />
				</view>
				<empty v-else :style="{height:`calc(${uWindowHeight}px - 340rpx)`}"></empty>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import {
		search
	} from '@/utils/picture/index.js'
	import empty from '@/components/common/empty/empty'
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import ltLoading from "@/components/common/loading/LuntanLoading.vue";

	export default {
		name: "index",
		props: {
			option: {
				type: Object,
				default: {}
			}
		},
		components: {
			AlertInjectLayer,
			empty,
			Header,
			ltLoading
		},
		data() {
			let date = new Date();
			return {
				title: '六合图库',
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					this.$config.defaultValues.DEFAULT_SELECT_LOTTERY_TYPE, true),
				isShow: false,
				show: 0,
				scrollTop: 0,
				colorText: '彩色',
				toView: 'keysA',
				selectId: 0,
				prams: {
					color: 1,
					year: date.getFullYear(), //默认年份
					lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_LOTTERYTYPE, this.$config.defaultValues.DEFAULT_SELECT_LOTTERY_TYPE, true),
					keyword: ''
				},
				colorRangeList: [{
						value: 1,
						text: '彩色'
					},
					{
						value: 0,
						text: '黑白'
					},
				],
				list: []
			}
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)

			const {
				option
			} = this
			if (option.year) {
				this.prams.year = option.year
			}
			if (option.color) {
				this.prams.color = option.color
				if (this.prams.color == 0) {
					this.colorText = '黑白'
				}
			}
			const textTitle = "六合图库";
			this.title = this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + textTitle;
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.search()
		},
		methods: {
			backSearch: function() {
				this.$emit("back");
			},
			//返回
			back: function() {
				backPage()
			},
			show_: function() {
				this.isShow = !this.isShow
			},
			//滚动条监听
			scroll: function(e) {
				const query = uni.createSelectorQuery().in(this);
				for (let i = 0; i < this.list.length; i++) {
					query.select('#keys' + i).boundingClientRect(data => {
						if (data.top <= 0 + 94) {
							this.selectId = i
						}
					}).exec();
				}
			},
			//锚点跳转
			maodian: function(key) {
				this.toView = "keys" + key
				this.selectId = key
			},
			detail: function(id) {
				uni.navigateTo({
					url: "/pages/luntan/liuhePicture/detail?id=" + id // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			search: function() {
				this.loading = true;
				this.$nextTick(() => {
					let prams = this.prams
					prams.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_LOTTERYTYPE)
					search(prams).then(res => {
						this.list = res.result
						this.loading = false;
					}).catch(err => {
						console.log(err)
						this.loading = false;
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		display: flex;
		align-items: center;
		margin: 0 20rpx;
		height: 76rpx;
		border-radius: 16rpx;
		background: var(--theme-auxiliary-color-default);
		padding-right: 20rpx;

		.selects {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: sticky;
			top: -1px;
			z-index: 11;
			gap: 20rpx;

			::v-deep .uni-stat__select {
				background: unset !important;
			}

			.item-img {
				width: 36rpx;
				height: 36rpx;
				display: flex;
				align-items: center;
				margin-right: 10rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.item {
				width: 144rpx;
				background: #fff;
				border-radius: 16rpx;
				flex-shrink: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				::v-deep .uni-select {
					border: none;
					padding: 0 20rpx;
					font-size: 26rpx;

					.select-svg {
						transform: rotate(180deg);
					}

					.select-svg-show {
						transform: rotate(0deg);
					}

					.uni-select--mask {
						background: rgba(0, 0, 0, 0.06);
					}

					.uni-select__selector {
						z-index: 999;
						transform: translate(100rpx, -80rpx);
						border-radius: 24rpx;
					}

					.uni-select__selector-item {
						border-bottom: 1px solid var(--theme-auxiliary-color-default);
						align-items: center;
						white-space: nowrap;

						&:last-child {
							border: none;
						}
					}

					.uni-popper__arrow {
						display: none;
					}

					.uni-select__input-text {
						color: #404040;
					}
				}
			}

			::v-deep .uni-searchbar {
				padding: 0;

				.uni-searchbar__box {
					padding: 0 20rpx;
					flex-direction: row-reverse;

					.uni-searchbar__box-icon-search {
						padding: 0;
					}
				}

				.uni-input-input {
					color: #A1A1A1;

				}

				.uni-input-placeholder {
					color: #A1A1A1 !important;
				}
			}

			.yeji {
				padding: 0 20rpx;
				box-sizing: border-box;
				color: #A1A1A1;
				font-size: 26rpx;
			}
		}

		.input {
			flex: 1;
			font-size: 26rpx;

			::v-deep .u-content {
				padding: 0 !important;

				.u-icon-wrap {
					width: 0;
					overflow: hidden;
				}
			}
		}

		.btn {
			font-size: 30rpx;
			color: var(--theme-color);
		}
	}
</style>
<style scoped>
	.mint-tab-container-item {
		background: #fff;
	}

	.header-box {
		height: 92rpx;
	}

	.search-hd {
		height: 76rpx;
	}

	.scroll-Y {
		height: calc(var(--vh) - 88rpx - 220rpx);
		min-height: 800rpx;
	}

	.search-hd .van-search {
		background: #eee !important;
		padding: 7px 12px;
		width: 100%;
		z-index: 12;
		top: 45px;
		max-width: 480px;
	}

	.van-search,
	.van-search__content {
		display: flex;
	}

	.van-search {
		-webkit-box-align: center;
		align-items: center;
		box-sizing: border-box;
	}

	.search-hd .van-search .van-search__content {
		background-color: #fff;
	}

	.van-search__content {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		padding-left: 12px;
		background-color: #f7f8fa;
		border-radius: 2px;
	}

	.van-search__content--round {
		border-radius: 999px;
	}

	.van-search,
	.van-search__content {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}

	.search-hd .van-search .van-cell {
		padding: 6rpx 16rpx 6rpx 0;
	}

	.van-search .van-cell {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		padding: 5px 8px 5px 0;
		background-color: transparent;
	}

	.van-cell {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 0 56rpx 0 28rpx;
		overflow: hidden;
		color: #404040;
		font-size: 28rpx;
		background-color: #fff;
		height: 44rpx;
	}

	.van-cell+.van-cell {
		margin-top: 10rpx;
	}

	.van-cell:last-child {
		padding-bottom: 20rpx;
		height: fit-content;
	}

	.van-cell:last-child::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: calc(100% - 56rpx);
		height: 1px;
		background: var(--theme-auxiliary-color-default);
	}

	.van-field__left-icon {
		margin-right: 4px;
	}

	.search-hd .left-icon {
		font-size: 12Px;
		color: var(--theme-color);
		position: relative;
	}

	.tooltip {
		visibility: visible;
		position: absolute;
		will-change: transform;
		top: 10 rpx;
		left: 0px;
		transform: translate3d(50rpx, 70rpx, 0px);
	}

	.tooltip[aria-hidden=false] {
		visibility: visible;
		opacity: 1;
		transition: opacity .15s;
	}

	.tooltip[x-placement^=bottom] {
		margin-top: 10rpx;
	}

	.tooltip {
		z-index: 10000;
	}

	.wrapper {
		margin: 0 auto;
		width: 100%;
		background-color: #666;
		display: grid;
		place-items: center;
	}

	.tooltip.popover .popover-inner {
		background: #fff;
		color: #000;
		padding: 0;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 20rpx rgb(0 0 0 / 10%);
	}

	.down-ul {
		padding: 10rpx;
	}

	.down-ul li {
		line-height: 70rpx;
		padding: 0 40rpx;
		color: #555;
		font-size: 28rpx;
	}

	.resize-observer[data-v-8859cc6c] {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		border: none;
		background-color: transparent;
		pointer-events: none;
		display: block;
		overflow: hidden;
		opacity: 0;
	}

	.resize-observer[data-v-8859cc6c] object {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
		pointer-events: none;
		z-index: -1;
	}

	.tooltip.popover .popover-arrow {
		border-color: #fff;
	}

	.tooltip[x-placement^=bottom] .tooltip-arrow {
		border-width: 0 10rpx 10rpx 10rpx;
		border-left-color: transparent !important;
		border-right-color: transparent !important;
		border-top-color: transparent !important;
		top: -10rpx;
		left: calc(50% - 10rpx);
		margin-top: 0;
		margin-bottom: 0;
	}

	.tooltip .tooltip-arrow {
		width: 0;
		height: 0;
		border-style: solid;
		position: absolute;
		margin: 10rpx;
		border-color: #000;
		z-index: 1;
	}

	.van-field__value {
		overflow: visible;
	}

	.van-cell__value--alone {
		color: #323233;
		text-align: left;
	}

	.van-cell__value {
		position: relative;
		overflow: hidden;
		color: #969799;
		text-align: right;
		vertical-align: middle;
		word-wrap: break-word;
	}

	.van-cell__title,
	.van-cell__value {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
	}

	.van-field__body {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.search-hd .van-search .van-field__control {
		font-size: 28rpx;
	}

	.van-cell__value .van-field__body input {
		height: 24Px;
	}

	.van-field__control[type=search] {
		-webkit-appearance: none;
	}

	[type=search] {
		-webkit-appearance: textfield;
		outline-offset: -4rpx;
	}

	.van-field__control {
		display: block;
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		margin: 0;
		padding: 0;
		color: #323233;
		line-height: inherit;
		text-align: left;
		background-color: transparent;
		border: 0;
		resize: none;
	}

	button,
	input {
		overflow: visible;
	}

	button,
	input,
	optgroup,
	select,
	textarea {
		font-size: 100%;
		line-height: 1.15;
		margin: 0;
	}

	button,
	input,
	select,
	textarea {
		outline: none;
	}

	.van-search__action {
		padding: 0 8px;
		color: #323233;
		font-size: 14px;
		line-height: 34px;
		cursor: pointer;
		-webkit-user-select: none;
		user-select: none;
	}

	.search-hd .search-btn {
		color: var(--theme-color);
		font-size: 30rpx;
	}

	@media screen and (min-width: 768px) {
		.van-index-bar__sidebar {
			right: auto !important;
			left: 50vw;
		}
	}

	.van-index-bar__sidebar {
		position: fixed;
		top: 50%;
		right: 0;
		z-index: 2;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		text-align: center;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		cursor: pointer;
		-webkit-user-select: none;
		user-select: none;
	}

	.van-index-bar__index {
		padding: 0 8px 0 16px;
		font-weight: 500;
		font-size: 24rpx;
		line-height: 38rpx;
		color: #404040;
	}

	.van-index-bar__index--active {
		color: var(--theme-color);
	}

	.van-index-anchor {
		z-index: 1;
		padding: 20rpx 28rpx;
		color: var(--theme-color);
		font-size: 34rpx;
		font-style: normal;
		font-weight: 600;
	}

	.search-list {
		.loading {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 113rpx;
		}
	}

	.search-list .search-list-title {
		color: var(--theme-color);
		font-size: 34rpx;
	}

	.van-cell__value--alone {
		color: #323233;
		text-align: left;
	}

	.search-list .number {
		position: absolute;
		right: 0;
		top: 0;
		color: #404040;
		padding: 0 10rpx;
		background: var(--theme-auxiliary-color-default);
		border-radius: 8rpx;
		font-size: 28rpx;
		min-width: 68rpx;
		height: 44rpx;
		display: grid;
		place-content: center;
		box-sizing: border-box;
	}

	.empty-box {
		text-align: center;
		height: calc(var(--vh) - 180rpx);
	}

	.empty-box img {
		width: 128rpx;
	}

	.empty-box p {
		text-align: center;
		color: #a0a0a0;
		font-size: 32rpx;
		line-height: 44rpx;
		margin-top: 28rpx;
	}
</style>
