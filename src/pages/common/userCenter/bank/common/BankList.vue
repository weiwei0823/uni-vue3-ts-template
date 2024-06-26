<template>
	<view class="bank-div" :style="{height:`${uWindowHeight}px`}">
		<view class="bank" :style="{ marginTop: safeHeight,height:`${uWindowHeight}px` }">
			<NavBar :isBack="false" :title="title || $t('pages.common.userCenter.bank.common.SelectBank')"
				:header-style="headerStyle" :bg-color="headerStyle.backgroundColor" :font-color="fontColor"
				:title-style="titleStyle">
			</NavBar>
			<view class="search-box" v-show="isShow">
				<uni-search-bar v-model="keyword"
					:placeholder="placeholder || $t('pages.common.userCenter.bank.common.EnterBankName')"
					@confirm="searchBank" @clear="clear" :cancelButton="'none'" radius="16">
				</uni-search-bar>
			</view>
			<scroll-view scroll-y class="list-box">
				<uni-list-item class="list-item" thumb-size="base" v-for="(item, index) in data" clickable
					@click="setBank(item)">
					<template v-slot:header>
						<view class="slot-box">
							<image class="slot-image" :src="item.logoMobile"></image>
						</view>
					</template>
					<template v-slot:body>
						<text class="slot-text">{{ item.name }}</text>
					</template>
				</uni-list-item>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "bank",
		components: {
			NavBar
		},
		props: {
			data: {
				type: Array,
				default: [],
			},
			title: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			},
			isBack: {
				type: Boolean,
				default: true
			},
			isShow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040"
				},
				keyword: '',
			}
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
			headerStyle() {
				return {
					backgroundColor: this.themeColor.themeAuxiliaryColorDefault,
					height: '88rpx'
				}
			},
		},
		methods: {
			back() {
				this.$emit('closePay');
			},
			clear() {
				this.keyword = ''
			},
			searchBank() {
				this.$emit("searchBank", this.keyword)
			},
			setBank(item) {
				this.$emit("setBank", item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-scroll-view-content .list-item:nth-child(1) .uni-list--border {
		display: none;
	}

	.bank-div {
		width: 100vw;
		background: rgba(0, 0, 0, 0.1);
		position: relative;
	}

	.bank {

		width: 100vw;
		max-width: 480px;
		margin: auto;
		height: var(--vh);
		background: #ffffff;

		.list-box {
			height: calc(var(--vh) - 300rpx);

			.list-item {
				padding: 12rpx 0;

				.slot-box {
					display: flex;
					align-items: center;
					background: var(--theme-auxiliary-color-default);
					border-radius: 20rpx;
					overflow: hidden;

					.slot-image {
						height: 68rpx;
						width: 68rpx;
					}
				}

				.slot-text {
					margin-left: 10rpx;
					font-weight: 400;
					font-size: 28rpx;
					color: #404040;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>
