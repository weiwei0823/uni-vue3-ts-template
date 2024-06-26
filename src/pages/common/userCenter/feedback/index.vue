<template>
	<view class="feedback pc-max-width" :class="['theme-' + themeColor.name, { loadingBg: loading }]"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }">
		<view class="nav">
			<Header isFixed>
				<block slot="center">
					<view class="tab-box">
						<view class="nav">
							<view v-for="(item, index) in headerTab" :key="index"
								:class="item.key === dataType ? 'nav-item active' : 'nav-item'"
								@click="onChangeTab(index)">
								{{ item.name }}
							</view>
						</view>
					</view>
				</block>
			</Header>
		</view>
		<scroll-view scroll-y class="content" v-show="dataType === 1" :style="{height:`calc(${winHeight}px - 88rpx)`}"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="detail">
				<view class="title-t" :style="{ '--theme-color': themeColor.themeColor }"
					style="margin: 0;padding-left: 28rpx;">
					{{ $t("pages.common.userCenter.feedback.text1") }}
					<text class="tip">{{ $t("pages.common.userCenter.feedback.text2") }}</text>
				</view>
				<view class="item">
					<u-input class="textarea" auto-height maxlength="200" v-model="formData.description" type="textarea"
						:clearable="false" :placeholder="$t('pages.common.userCenter.feedback.text3')"
						placeholderStyle="color: #404040;" />
					<view class="size">{{ formData.description.length }}/200</view>
				</view>
				<view class="title-n" style="margin: 0;padding-left: 28rpx;">
					{{ $t("pages.common.userCenter.feedback.text4") }}<text
						class="tip">{{ $t("pages.common.userCenter.feedback.text5") }}</text>
				</view>
				<view class="item" style="margin-bottom: 40rpx;">
					<u-upload @on-choose-complete="onChooseComplete" @on-uploaded="onUploaded" ref="upload"
						class="upload" deletable :show-tips="false" upload-text="" :action="action" max-count="3"
						:limitType="['png', 'jpg', 'jpeg', 'webp', 'gif', 'image']" :maxSize="5000000" showTips
						@on-success="handleUploadSuccess" @on-remove="handleUploadRemove" custom-btn width="218"
						height="218">
						<template #addBtn>
							<svg xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109"
								fill="none">
								<rect x="0.5" y="0.5" width="108" height="108" rx="11.5"
									:fill="themeColor.themeAuxiliaryColorDefault" stroke="#A1A1A1"
									stroke-dasharray="2 2" />
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M53.4868 25.8965C51.6139 25.8965 50.0956 27.4148 50.0956 29.2876V51.33H28.0533C26.1804 51.33 24.6621 52.8483 24.6621 54.7212C24.6621 56.594 26.1804 58.1123 28.0533 58.1123H50.0956V80.1548C50.0956 82.0277 51.6139 83.546 53.4868 83.546C55.3597 83.546 56.8779 82.0277 56.8779 80.1548V58.1123H78.9205C80.7933 58.1123 82.3116 56.594 82.3116 54.7212C82.3116 52.8483 80.7933 51.33 78.9205 51.33H56.8779V29.2876C56.8779 27.4148 55.3597 25.8965 53.4868 25.8965Z"
									fill="#A1A1A1" />
							</svg>
						</template>
					</u-upload>
					<text class="text-tip">
						{{ $t("pages.common.userCenter.feedback.text6") }}
					</text>
				</view>
			</view>
			<view class="slot-tips">
				<view class="slot-tips-title">
					{{ $t("pages.common.userCenter.feedback.text7") }}

				</view>
				<text class="slot-tips-text">
					{{ $t("pages.common.userCenter.feedback.text8") }}
				</text>
			</view>
		</scroll-view>
		<view class="content" v-show="dataType === 2">
			<z-paging height="calc(100vh - 110rpx)" ref="paging" v-model="dataList" @query="getFeedbackList"
				:lower-threshold="10" :refresher-enabled="true" :refresherAnimated="false"
				:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
				:refresher-default-text="zpageUIConfig['refresher-default-text']"
				:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
				:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']" :refresher-default-style="'#EEEEEE'"
				:refresher-img-style="zpageUIConfig['refresher-img-style']"
				:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
				:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
				:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
				:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
				:show-loading-more-no-more-view="false" :show-loading-more-no-more-line="false" :hide-empty-view="false"
				:empty-view-center="true" :empty-view-text="''" :empty-view-img="'/static/img/null-empty.png'"
				:fixed="false" :empty-view-style="{ 'margin-bottom': '170px', opacity: loading ? 0 : 1 }"
				:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
				:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">

				<view class="items">
					<view class="detail" v-for="(item, index) in dataList" :key="index" @click="goDetail(item)">
						<view class="detail-title " style="margin: 0;padding-left: 28rpx;">
							<view class="feedback-title">
								{{ $t("pages.common.userCenter.feedback.text9") }}{{ item.id }}
							</view>
							<view class="right">
								<view class="right-text" :data-status="item.status">
									{{ item.status === 1 ? $t("pages.common.userCenter.feedback.text10")
										: $t("pages.common.userCenter.feedback.text11") }}
								</view>
								<uni-icons type="right" color="#A1A1A1" style="font-size: 40rpx"></uni-icons>
							</view>
						</view>
						<view class="content-box">


							<view class="description">
								{{ item.description }}
							</view>
							<view class="replay" v-if="item.reply">
								<text class="replay_title">回复：</text>
								{{item.reply}}
							</view>
							<view class="time">{{ item.updateTime }}</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>

		<view class="pop_toast" v-show="showCommitSuccess && dataType == 1">
			<image class="icon" src="/static/img/icon_breen_success.png"></image>
			<p class="icon-text">{{ $t("pages.common.userCenter.feedback.text12") }}</p>
		</view>
		<view class="bottom-button" v-show="dataType === 1">
			<view class="button" @click="confirmNext" :style="{ background: themeColor.themeColor }">下一步</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	import Header from '@/components/common/header/index.vue';
	import NavBar from "@/components/common/navBar/navBar";
	import {
		config
	} from '@/config/config'

	import {
		feedback,
		feedbackList
	} from '@/utils/user/feedback'
	import Pact from "../../../liuhe/pact.vue";
	export default {
		components: {
			Pact,
			NavBar,
			Header
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				dataType: 1,
				current: 0,
				headerTab: [{
						key: 1,
						name: this.$t("pages.common.userCenter.feedback.text13"),
					},
					{
						key: 2,
						name: this.$t("pages.common.userCenter.feedback.text14"),
					},
				],
				action: config.me_base_url + '/api/user/upImg',
				formData: {
					title: this.$t("pages.common.userCenter.feedback.text15"),
					description: '',
					pictureIdList: []
				},
				dataList: [],
				loading: false,
				//来源类型
				feedbackType: this.$config.enumMgr.USER_FEEDBACK_TYPE.BBS,
				showCommitSuccess: false,
				showCommitTimer: -1,
				isReload: true,
				winHeight: 0
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onLoad({
			type,
			dataType
		}) {
			this.feedbackType = this.$config.enumMgr.USER_FEEDBACK_TYPE.BBS;
			//判断类型 避免误传其它类型
			if (type == this.$config.enumMgr.USER_FEEDBACK_TYPE.LOTTERY) {
				this.feedbackType = this.$config.enumMgr.USER_FEEDBACK_TYPE.LOTTERY;
			}
			if (dataType) this.dataType = parseInt(dataType)
		},
		computed: {
			...mapGetters(["themeColor"]),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}

		},

		watch: {
			dataType(val) {
				if (val === 2) {
					if (!this.loading && this.isReload) {
						this.$refs.paging.reload()
					}
				}
			}
		},
		methods: {
			onChangeTab(index) {
				const {
					key
				} = this.headerTab[index]
				if (key == 2) {
					this.showCommitSuccess = false;
					clearTimeout(this.showCommitTimer);
				}
				this.dataType = key;
			},
			handleUploadSuccess(e) {
				console.error('e', e);
				this.formData.pictureIdList.push(e.result.id)
			},
			handleUploadRemove(e) {
				this.loading = false
				this.formData.pictureIdList.splice(e, 1)
			},
			async confirmNext() {
				let that = this;
				if (this.loading) {
					pop(this.$t("pages.common.userCenter.feedback.text16"), 1000)
					return
				}
				this.formData['project'] = this.feedbackType;
				const res = await feedback(this.formData)
				if (res.code === 200) {
					this.showCommitSuccesToast(1500, function() {
						this.onChangeTab(2)
					}, this);

					this.isReload = true

					this.formData = {
						title: this.$t("pages.common.userCenter.feedback.text17"),
						description: '',
						pictureIdList: []
					}
					this.$refs.upload.clear();
				} else {
					pop(res.message, 2000)
				}
			},
			showCommitSuccesToast(time, callback, cbRegion) {
				let that = this;
				clearTimeout(that.showCommitTimer);
				that.showCommitSuccess = true;
				that.showCommitTimer = setTimeout(() => {
					that.showCommitSuccess = false;
					clearTimeout(that.showCommitTimer);
					if (callback && cbRegion && callback instanceof Function) {
						callback.call(cbRegion);
					}
				}, time)
			},

			async getFeedbackList(pageNo) {
				this.isReload = false
				this.loading = true
				const res = await feedbackList({
					pageNum: pageNo
				})
				this.$refs.paging.complete(res.result.records);
				this.loading = false
			},
			goDetail(item) {
				uni.navigateTo({
					url: "./detail?id=" + item.id
				})
			},
			onChooseComplete() {
				this.loading = true
			},
			onUploaded() {
				this.loading = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-upload {
		flex-wrap: nowrap;
	}

	.tab-div-radius {
		background-color: #fff;
		height: 20rpx;
		width: 100%;
		position: fixed;
		top: 108rpx;
		z-index: 12;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;

	}

	::v-deep .tab-div-bg {
		border-radius: 0;
		z-index: 11;
	}

	body {
		background-color: var(--theme-auxiliary-color-default);
	}

	.loadingBg {
		background: #eeeeee;
	}

	::v-deep .u-list-item:first-child {
		margin-left: 0;
	}

	.title-t {
		font-weight: 500;
		font-size: 34rpx;
		color: var(--theme-font-default-deep-color);
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		padding: 20rpx 0;

		&::before {
			content: '';
			width: 6rpx;
			height: 24rpx;
			border-radius: 6rpx;
			background: var(--theme-color);
			display: block;
			margin-right: 20rpx;

		}

		.tip {
			color: var(--theme-font-default-deep-color);;
		}
	}

	.title-n {
		font-weight: 500;
		font-size: 28rpx;
		color: var(--theme-font-default-deep-color);;
		display: flex;
		align-items: center;

		padding: 20rpx 0;


		.tip {
			color: var(--theme-font-default-deep-color);;
		}
	}

	.feedback {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: var(--theme-auxiliary-color-default);

		.nav {

			::v-deep .header {
				grid-template-columns: repeat(3, 20% 60% 20%);

				.u-item-bg {
					border-radius: 12rpx !important;
					height: 56rpx !important;
				}
			}

			.header-tab {
				width: 316rpx;
				height: 68rpx !important;
				box-sizing: border-box;
				margin: 0 auto;
				border-radius: 16rpx !important;
				background: var(--theme-auxiliary-color-default) !important;
			}

			.tab-box {
				width: fit-content;
				box-sizing: border-box;
				margin: 0 auto;

				.nav {
					box-sizing: border-box;
					height: 68rpx;
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					justify-content: space-around;
					background: var(--theme-auxiliary-color-default);
					margin: 0 22rpx;
					padding: 0 6rpx;

					.nav-item {
						width: 138rpx;
						height: 56rpx;
						text-align: center;
						font-size: 28rpx;
						color: var(--theme-font-default-deep-color);
						display: grid;
						place-content: center;

						&:last-child {
							border: 0px;
						}
					}

					.active {
						background-color: #fff;
						color: var(--theme-color);
						border-radius: 12rpx;
					}
				}
			}
		}

		.bottom-button {
			padding: 24rpx;

			.button {
				//margin-top: 60rpx;
				display: flex;
				padding: 20rpx;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 16rpx;
				background: var(--theme-color);
				color: #FFF;
				text-align: center;

				font-size: 34rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}
		}
	}

	.detail {
		background: #FFFFFF;
		box-sizing: border-box;
		border-radius: 24rpx;
		margin-bottom: 20rpx;

		.item {
			font-weight: 400;
			font-size: 28rpx;
			color: #6F737B;
			align-items: center;
			padding: 0 28rpx;
		}

		.detail-title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 28rpx;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);

			.feedback-title {
				display: flex;
				align-items: center;

				&::before {
					content: '';
					width: 6rpx;
					height: 24rpx;
					border-radius: 6rpx;
					background: var(--theme-color);
					display: block;
					margin-right: 20rpx;

				}
			}
		}

		.item:last-child {
			border: none;
			padding-bottom: 20rpx;
		}
	}

	.slot-tips {
		padding: 0rpx 28rpx;
		flex: 1;
		height: 0;

		.slot-tips-title {
			color: var(--theme-auxiliary-color-remind);
			font-feature-settings: 'clig' off, 'liga' off;

			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 40rpx;
			/* 153.846% */
			letter-spacing: 0.624rpx;
		}

		.slot-tips-text {
			color: var(--theme-font-default-shallow-color);
			font-feature-settings: 'clig' off, 'liga' off;

			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 40rpx;
		}
	}

	.nav-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		.nav-tabs {
			display: flex;
			height: 60rpx;

			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			border-radius: 16rpx;
			background: var(--theme-auxiliary-color-default);
			box-sizing: border-box;
			padding: 10rpx 4rpx;

			.nav-tabs-item {
				// font-size: clamp(20rpx, 26rpx, 26rpx);
				width: 152rpx;
				height: 52rpx;
				display: flex;
				line-height: 52rpx;
				font-size: 28rpx;
				display: block;
				// padding: 10rpx 0;
				transition: .3s;
				font-weight: 400;
				color: var(--theme-font-default-deep-color);
				text-align: center;

				font-style: normal;
				font-weight: 400;
			}

			// .nav-tabs-item:nth-child(1) {
			// 	border-top-left-radius: 50rpx;
			// 	border-bottom-left-radius: 50rpx;
			// }

			// .nav-tabs-item:nth-child(2) {
			// 	border-top-right-radius: 50rpx;
			// 	border-bottom-right-radius: 50rpx;
			// }

			.nav-tabs-item.active {
				background-color: var(--theme-color);
				color: #fff;
				font-weight: 500;
				transition: .3s;
				border-radius: 12rpx;
				width: 152rpx;
				height: 52rpx;
				line-height: 52rpx;
				gap: 10px;
				text-align: center;
			}
		}
	}

	.content {
		flex: 1;
		height: 0;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;

		.title {
			color: var(--theme-font-default-deep-color);
			font-size: 30rpx;

			.tip {
				color: #666666;
			}
		}

		.textarea {
			min-height: 306rpx !important;
			color: #666;
			font-size: 28rpx;
			background: #FFF;
			border-radius: 16rpx;
			padding: 20rpx 10rpx 30rpx 20rpx !important;
			border: 1px solid var(--theme-auxiliary-color-default);
			width: calc(100% - 28rpx);
			border-color: var(--theme-auxiliary-color-default) !important;

			::v-deep .uni-textarea-wrapper {
				min-height: 160rpx;
			}

			::v-deep .uni-textarea-placeholder {
				color: var(--theme-font-default-shallow-color) !important;
			}

			::v-deep .u-input__input {
				padding: 0;
				height: 100%;
			}
		}

		.size {
			color: #3E4347;

			font-size: 28rpx;
			font-style: normal;
			font-weight: 400;

			text-align: right;
			margin-top: 20rpx;
		}

		.upload {
			margin-bottom: 20rpx;

			::v-deep .uicon-plus {
				font-size: 140rpx !important;
				color: rgba(192, 192, 192, 1) !important;
			}

			::v-deep .u-list-item {
				border: 1px dashed #cccccc;
				border-radius: 30rpx;

				.u-delete-icon .u-icon__icon {
					font-size: 10rpx !important;
					color: #CCCCCC;
				}
			}
		}

		.text-tip {
			color: #404040;

			font-size: 13px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}



		.items {
			display: flex;
			flex-direction: column;

			.time {
				color: #404040;

				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				margin-top: 20rpx;
				padding: 20rpx 0rpx;
				border-top: 2rpx dashed var(--theme-auxiliary-color-default);
			}

			.content-box {
				padding: 0 28rpx;
			}

			.description {
				background: #FFF;
				display: flex;
				align-items: center;
				padding-top: 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				font-size: 28rpx;
				color: #404040;
			}

			.replay {
				background: #FFF;
				display: flex;
				align-items: center;
				padding-top: 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				font-size: 28rpx;
				color: #404040;

				.replay_title {
					color: var(--theme-color);
				}
			}




			.right {

				display: flex;
				align-items: center;

				.right-text[data-status="1"] {
					color: var(--theme-color);
				}

				.right-text {
					color: var(--theme-auxiliary-color-remind);
					margin-top: -4rpx;
					font-size: 30rpx;
					font-style: normal;
					font-weight: 400;
					margin-right: 10rpx;
				}

				.icon {
					color: #404040;
				}
			}
		}

		.loading {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: auto;
			width: 100%;
			height: calc(var(--vh) - 150rpx);

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}

	.pop_toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(76, 76, 76, 0.76);
		padding: 10rpx 35rpx;
		display: flex;
		border-radius: 10rpx;
		z-index: 98;

		.icon {
			width: 40rpx;
			height: 40rpx;
		}

		.icon-text {
			margin-left: 10rpx;
			font-size: 24rpx;
			color: white;
			line-height: 40rpx;
		}
	}
</style>
