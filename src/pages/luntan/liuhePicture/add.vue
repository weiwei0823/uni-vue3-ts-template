<template>
	<view style="height: var(--vh)" :class="['theme-' + themeColor.name]">
		<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }">
			<!--顶部导航栏-->
			<Header :title="title" />
			<!--标题-->
			<view class="form-box">
				<view class="pcTitle pcCom">
					<view class="tips">{{
            $t("pages.luntan.liuhePicture.add.title")
          }}</view>
					<view class="conts">
						<input placeholder-style="color:#A1A1A1" v-model="form.title" class="title" type="text"
							:placeholder="$t('pages.luntan.liuhePicture.add.enterTitle')" />
						<uni-icons class="deletes" type="closeempty" @click="form.title = ''"></uni-icons>
					</view>
				</view>
				<view class="pcConts">
					<view class="tips">{{
            $t("pages.luntan.liuhePicture.add.content")
          }}</view>
					<view class="conts">
						<textarea auto-height placeholder-style="color:#A1A1A1" v-model="form.description" id="contents"
							class="cont" name="description"
							:placeholder="$t('pages.luntan.liuhePicture.add.enterContent')"></textarea>
					</view>
				</view>
			</view>
			<view class="submits" @click="fabu">{{
        $t("pages.luntan.liuhePicture.add.publish")
      }}</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import {
		detail
	} from "@/utils/picture/index.js";
	import {
		submitArticle
	} from "@/utils/forum/index.js";
	import Header from "@/components/common/header/index.vue";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "add",
		components: {
			AlertInjectLayer,
			Header,
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("pages.luntan.liuhePicture.add.publishIllustration"),
				pictureId: 0,
				info: {},
				form: {
					title: "",
					description: "",
					type: 12,
				},
			};
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.title,
			});
			this.pictureId = option.id;
			this.detail();
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		//返回
		methods: {
			back: function() {
				uni.navigateBack();
			},
			//详情
			async detail() {
				let prams = {
					pictureId: this.pictureId,
				};
				await detail(prams)
					.then((res) => {
						this.info = res.result;
						this.form.title =
							this.$t("pages.luntan.liuhePicture.add.issue") +
							this.info.year +
							this.info.period +
							this.$t("pages.luntan.liuhePicture.add.period") +
							this.info.pictureName +
							this.$t("pages.luntan.liuhePicture.add.illustration");
					})
					.catch((err) => {
						console.log(err);
					});
			},
			//发布帖子
			fabu: function() {
				let prams = this.form;
				prams.lotteryType = this.info.lotteryType;
				prams.pictureId = this.info.pictureId;
				if (prams.title == "") {
					pop(this.$t("pages.luntan.liuhePicture.add.enterTitle"));
					return false;
				}
				if (!prams.description) {
					pop(this.$t("pages.luntan.liuhePicture.add.enterContent"));
					return false;
				}
				submitArticle(prams)
					.then((res) => {
						let msg = "";
						if (res.code != 200) {
							if (res.code === 588) {
								// return
								uni.$emit('showPop', {
									refName: 'AlertNick'
								})
								return
							} else {
								msg = res.message;
								pop(msg, 2000);
							}

						} else {
							/*uni.setStorageSync('addForum',new Date().getTime());*/
							msg = this.$t("pages.luntan.liuhePicture.add.publishSuccess");
							uni.$emit("emitParams", {
								msg: msg,
							});
							uni.navigateBack();
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style scoped>
	.header,
	.header-box,
	.box-bg {
		height: 44px;
	}

	.mint-tab-container-item {
		padding: 0 0 100rpx 0;

		background-color: var(--theme-auxiliary-color-default);
	}

	.form-box {
		width: 100%;
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.pcCom {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0 28rpx;
		background: #fff;
		color: #404040;
	}

	.pcCom .tips {
		color: #404040;
		font-size: 30rpx;
		padding: 20rpx 0;
	}

	.pcCom>uni-view {
		width: 702rpx;
		height: 44rpx;
	}

	.pcCom .conts {
		font-size: 28rpx;
		height: 78rpx;
		border-radius: 16rpx;
		border: 1px solid var(--theme-auxiliary-color-default);
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.conts .title,
	.conts .cont {
		width: 100%;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.pcCom .deletes {
		right: 20rpx;
		background-size: 100% 100%;
		height: 36rpx;
		width: 36rpx;
		font-size: 36rpx !important;
		position: absolute;
		color: #a6a6a6 !important;
	}

	.pcConts {
		margin-top: 0;
		height: auto;
		clear: both;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0 28rpx;
		background: #fff;
		color: #404040;
		padding-bottom: 20rpx;
	}

	.pcConts .tips {
		color: #404040;
		font-size: 30rpx;
		padding: 20rpx 0;
	}

	.pcConts>uni-view {
		width: 702rpx;
		height: 44rpx;
	}

	.pcConts .conts {
		height: auto;
	}

	.conts #contents {
		height: auto;
		min-height: 0;
		border-radius: 16rpx;
		border: 1px solid var(--theme-auxiliary-color-default);
		max-width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		display: block;
		width: 100%;
		overflow: hidden;
		resize: both;
	}

	.submits {
		width: 694rpx;
		height: 88rpx;
		background: var(--theme-color);
		border-radius: 16rpx;
		margin: 40rpx auto;
		font-size: 34rpx;
		color: #fff;
		display: grid;
		place-content: center;
	}
</style>
