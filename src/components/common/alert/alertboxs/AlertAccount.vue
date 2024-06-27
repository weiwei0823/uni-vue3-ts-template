<template>
	<u-popup v-model="show" mode="center" border-radius="24" :class="['theme-' + themeColor.name]" :z-index="zIndex"
		@open="handleOpen" @close="handleClose">
		<view class="account-box">
			<view class="titles" :style="stylesTitle">{{ title }}</view>
			<view class="notice">
				<view class="text" :style="stylesText" v-html="notice"></view>
				<view v-if="desc" class="desc" v-html="desc"></view>
			</view>
			<view class="btn-box">
				<view class="btn forget" @click="detail">
					查看详情
				</view>
				<view class="btn retry" @click="close">
					我知道了
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import defaultTemplate from '../../../../utils/defaultTemplate'
	import {
    mapState
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "Account",
		props: {
			zIndex: {
				type: [Number, String],
				default: () => {
					return 10075
				}
			},
		},
		data() {
			return {
				show: false,
				callback: null,
				title: '',
				notice: '',
				desc: '',
				detailUrl: '',
				stylesTitle: {},
				stylesText: {}
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ['themeColor']),
		},
		methods: {
			open(data, {
				callback
			}) {
				this.show = true
				this.callback = callback
				const {
					title,
					msgTxt,
					msgRemark,
					createTime,
					msgId,
					source,
					stylesTitle,
					stylesText
				} = defaultTemplate({
					title: '',
					msgTxt: '',
					msgRemark: '',
					createTime: '',
					msgId: '',
					source: '',
					stylesTitle: {},
					stylesText: {
						color: "#404040"
					}
				}, data)
				this.title = title
				this.notice = msgTxt;
				this.stylesTitle = stylesTitle;
				this.stylesText = stylesText;

				this.desc = msgRemark.replace(/交易ID/, "<br/>交易ID");
				this.detailUrl =
					`/pages/common/userCenter/accountLog/detail?createTime=${createTime}&id=${msgId}&source=${source}`
			},
			close() {
				this.show = false
			},
			handleOpen() {
				this.$emit('open')
				this.callback && this.callback({
					type: 'open'
				})
			},
			handleClose() {
				this.$emit('close')
				this.callback && this.callback({
					type: 'close'
				})
			},
			detail() {
				uni.navigateTo({
					url: this.detailUrl,
					success: () => {
						this.close()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.account-box {
		width: 600rpx;
		background: #FFFFFF;

		.titles {
			height: 90rpx;
			font-size: 34rpx;
			text-align: center;
			color: #404040;
			display: grid;
			place-items: center;
		}

		.notice {
			display: grid;
			place-content: center;
			padding: 0 30rpx 40rpx;
			text-align: center;

			.text {
				color: #404040;
				font-size: 30rpx;
				line-height: 57rpx;
			}

			.desc {
				font-size: 30rpx;
				color: #404040;
				margin-top: 20rpx;
				word-break: break-all;
			}
		}



		.btn-box {
			border-top: 1px solid var(--theme-auxiliary-color-default);
			height: 88rpx;
			display: grid;
			grid-template-columns: repeat(2, 1fr);

			.btn {
				display: grid;
				place-content: center;
				font-size: 34rpx;
			}

			.btn+.btn {
				border-left: 1px solid var(--theme-auxiliary-color-default);
			}

			.forget {
				color: #404040;
			}

			.retry {
				color: var(--theme-color);
			}
		}
	}
</style>
