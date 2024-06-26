<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" isFixed />
		<scroll-view scroll-y class="scroll-y">
			<view class="find-body">
				<view class="hd">{{ $t('pages.luntan.find.findAdd.selectPlatform') }}</view>
				<view class="tab-box">
					<view class="nav">
						<view v-for="(item, index) in navList" :key="index"
							:class="lotteryType == item.lotteryType ? 'nav-item active' : 'nav-item'"
							@click="selectType(item)">
							{{ item.lotteryName }}
						</view>
					</view>
				</view>
				<view class="hd">{{ $t('pages.luntan.find.findAdd.title') }}</view>
				<view class="van-cell-group">
					<view class="van-cell van-field">
						<view class="van-cell__value van-cell__value--alone van-field__value">
							<view class="van-field__body">
								<input type="text" v-model="formData.title"
									placeholder-style="color:#A1A1A1;font-size:28rpx"
									:placeholder="$t('pages.luntan.find.findAdd.enterPublishTitle')"
									class="van-field__control">
							</view>
						</view>
					</view>
				</view>
				<view class="hd">{{ $t('pages.luntan.find.findAdd.content') }}</view>
				<view class="van-cell-group">
					<textarea placeholder-style="color:#A1A1A1"
						:placeholder="$t('pages.luntan.find.findAdd.enterContent')" class="ql-container"
						v-model="formData.description" auto-height />
					<!--图片上传-->
					<view class="uploader">
						<cl-upload v-model="imgList" :fileName="'file'" :fileType="'image'" :action="action" :max="3"
							:headers="headers" :data="{ addWatermark: true }" :listStyle="{
								columnGap: '20rpx',
								rowGap: '20rpx',
								margin: '5px',
								width: '208rpx',
								height: '208rpx',
								radius: '24rpx',
								border: '1px dashed #A1A1A1'
							}" @onSuccess="onSuccess" @onError="onError">
							<template #addImg>
								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"
									fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M20.0232 6.09943H23.004C23.8326 6.09943 24.5037 6.77058 24.5 7.5992V20.2047C24.5 21.0333 23.8288 21.7045 23.0002 21.7045H1.99976C1.17114 21.7045 0.5 21.0333 0.5 20.2047V7.59545C0.5 6.76683 1.17114 6.09569 1.99976 6.09569H4.9768C5.54671 6.09569 6.06413 5.77699 6.31909 5.26707L7.28644 3.32862C7.5414 2.82245 8.05881 2.5 8.62872 2.5H16.375C16.9449 2.5 17.4623 2.82245 17.7173 3.33237L18.6809 5.26707C18.9321 5.77699 19.4533 6.09943 20.0232 6.09943ZM6.52905 13.3058C6.52905 16.6053 9.21363 19.2899 12.5131 19.2899C15.8126 19.2899 18.4972 16.6053 18.4972 13.3058C18.4972 10.0063 15.8126 7.32174 12.5131 7.32174C9.21363 7.32174 6.52905 10.0063 6.52905 13.3058ZM20.1994 8.81401C20.1994 9.32768 20.6156 9.74011 21.1255 9.74011C21.6354 9.74011 22.0479 9.32393 22.0516 8.81401C22.0516 8.30409 21.6354 7.89165 21.1255 7.89165C20.6156 7.89165 20.1994 8.30409 20.1994 8.81401ZM8.02903 13.3096C8.02903 10.835 10.0425 8.8253 12.5133 8.8253C14.9842 8.8253 16.9939 10.835 16.9976 13.3096C16.9976 15.7842 14.9879 17.7939 12.5133 17.7939C10.0387 17.7939 8.02903 15.7805 8.02903 13.3096Z"
										fill="#A1A1A1" />
								</svg>
							</template>
						</cl-upload>
					</view>
				</view>
			</view>
			<view class="ft-btn">
				<button type="primary" class="action"
					@click="fabu">{{ $t('pages.luntan.find.findAdd.publish') }}</button>
			</view>
			<view class="tip">
				<view class="tip-title">温馨提示：</view>
				<view class="tip-text">开奖日期禁止发布贴时间段：{{ articleTime }}</view>
			</view>
		</scroll-view>
		<!--注册界面-->
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		lastPeriodArticle,
		submitArticle,
		detail,
		editArticle
	} from '@/utils/forum/index.js'
  import {
    lotteryTime
  } from '@/utils/lottery/index'
	import {
		config
	} from '@/config/config'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
	import {
		getArticleTime
	} from '@/utils/forum/index.js'
	export default {
		components: {
			Header,
			AlertInjectLayer,
		},
		name: "find-add",
		data() {
			this.memLotteriesArticleTime = {};
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.find.findAdd.publishDiscovery'),
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					1),
				id: 0,
				action: config.me_base_url + '/api/user/upImg',
				headers: {
					'X-Access-Token': this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_TOKEN)
				},
				navList: [
				],
				colorIsActive: -1,
				colorList: [{
						background: 'rgb(0, 0, 0)'
					},
					{
						background: 'rgb(220, 93, 131)'
					},
					{
						background: 'rgb(196, 68, 55)'
					},
					{
						background: 'rgb(87, 148, 135)'
					},
					{
						background: 'rgb(94, 149, 67)'
					},
					{
						background: 'rgb(159, 188, 105)'
					},
					{
						background: 'rgb(67, 84, 169)'
					},
					{
						background: 'rgb(235, 158, 78)'
					}
				],
				isActive: -1,
				lastPeriod: {},
				imgList: [],
				imgListId: [],
				amount: '0.00',
				editorCtx: '',
				content: '',
				formData: {
					type: 2,
					title: '',
					description: '',
					pictureIds: [],
				},
				articleTime: ''
			}
		},
		computed: {
			...mapGetters(["themeColor"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
	  async	onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.title
			});

      this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE, 1);
      await this.initNavMenu();
      this.freshArticleAllowDateTime()
		},
		methods: {
			async freshArticleAllowDateTime() {
				let lotteryType = this.lotteryType;
				if (this.memLotteriesArticleTime[lotteryType]) {
					this.articleTime = this.memLotteriesArticleTime[lotteryType];
				} else {
					const res = await getArticleTime({
						lotteryType: lotteryType
					})
					this.memLotteriesArticleTime[lotteryType] = res.result;
					this.articleTime = res.result
				}
			},
			//返回
			back: function(msg = '') {
				uni.$emit('emitParams', {
					msg: msg
				})
				uni.navigateBack()
			},
			selectType(item) {
				this.lotteryType = item.lotteryType;
				this.freshArticleAllowDateTime();
			},
			/**
			 * 自动上传返回的是一张图片信息
			 * 手动上传返回的是已选中所有图片或者视频信息
			 * */
			onSuccess(reslut) {
				// 把服务端返回的图片地址添加到list中与组件数据同步
				this.imgList.push(reslut.result.pictureUrl)
				this.imgListId.push(reslut.result)
			},
			//上传失败
			onError(err) {
				uni.showToast({
					title: this.$t('pages.luntan.find.findAdd.uploadFailed'),
					duration: 2000,
					icon: 'none'
				})
			},
			//提交表单
			fabu: function() {
				let imgId = [];
				let prams = this.formData;
				prams.lotteryType = this.lotteryType
				if (this.imgListId.length == 0) {
					pop(this.$t('pages.luntan.find.findAdd.uploadImage'))
					return false
				}
				for (let i = 0; i < this.imgListId.length; i++) {
					if (this.imgList.indexOf(this.imgListId[i].pictureUrl) != -1) {
						imgId.push(this.imgListId[i].id)
					}
				}
				prams.pictureIds = imgId
				if (prams.title == '') {
					pop(this.$t('pages.luntan.find.findAdd.enterTitle'))
					return false
				}
				// if (!prams.description) {
				// 	pop(this.$t('pages.luntan.find.findAdd.enterContent'))
				// 	return false
				// }
				prams.articleId = this.id
				submitArticle(prams).then(res => {
					let msg = ''
					if (res.code != 200) {
						if (res.code === 588) {
							// return
							uni.$emit('showPop', {
								refName: 'AlertNick'
							})
							return
						} else {
							msg = res.message
						}
					} else {
						msg = this.$t('pages.luntan.find.findAdd.publishSuccess')
					}
					uni.$emit('emitParams', {
						msg: msg
					})
					uni.navigateBack({
						delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
					});
				}).catch(err => {
					console.log(err)
				})
			},

      initNavMenu(){
        let _this=this;
        return new Promise(resolve=>{
          lotteryTime().then(res=>{
            let concat = res.result;
            _this.navList=concat||[];
            resolve();
          })
        })
      },
		}
	}
</script>

<style scoped>
	.header-box {
		height: 46px;
	}

	.header-box .header {
		position: fixed;
		top: 0;
		height: 46px;
		z-index: 1;
		border-bottom: 1px solid #ebedf0;
		width: 100%;
		max-width: 480px;
	}

	.sel-period {
		display: flex;
		padding: 10rpx 30rpx;
		justify-content: space-between;
	}

	.sel-period uni-view {
		padding: 6rpx 20rpx;
		border-radius: 8rpx;
		border: 2rpx solid #c5c5c5;
		width: 180rpx;
		text-align: center;
		color: #404040;
		font-size: 24rpx;
		line-height: 27.6rpx;
	}

	.sel-period .active {
		background: var(--theme-color);
		border: none;
		color: #fff;
	}

	.scroll-y {
		height: calc(var(--vh) - 110rpx);
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.find-body {
		padding: 20rpx 28rpx;
		background: #fff;
		border-radius: 28rpx;
	}

	.find-body .hd {
		font-size: 30rpx;
		color: #404040;
		margin-bottom: 20rpx;
	}

	.tab-box {
		margin-bottom: 20rpx;
	}

	.nav {
		box-sizing: border-box;
		height: 69rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: space-around;
		background: var(--theme-auxiliary-color-default);
		padding: 0 6rpx;
	}

	.nav .nav-item {
		width: 25%;
		height: 56rpx;
		text-align: center;
		line-height: 56rpx;
		border-color: var(--theme-color);
		font-size: 24rpx;
		color: #404040;
	}

	.nav .nav-item:last-child {
		border: 0px;
	}

	.nav .nav-item.active {
		background-color: #fff;
		color: var(--theme-color);
		border-radius: 12rpx;
	}

	.van-cell-group {
		background-color: #fff;
	}

	.van-cell {
		position: relative;
		display: flex;
		width: 100%;
		height: 78rpx;
		box-sizing: border-box;
		padding: 20rpx;
		border: 1px solid var(--theme-auxiliary-color-default);
		border-radius: 16rpx;
		overflow: hidden;
		color: #404040;
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}

	.van-cell__value {
		position: relative;
		overflow: hidden;
		color: #969799;
		text-align: right;
		vertical-align: middle;
		word-wrap: break-word;
	}

	.van-cell__value--alone {
		color: #323233;
		text-align: left;
	}

	.van-field__value {
		overflow: visible;
		width: 100%;
	}

	.van-cell__value .van-field__body input {
		height: 28rpx;
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

	.tip {
		margin-top: 40rpx;
		font-size: 26rpx;
		line-height: 40rpx;
		padding: 0 28rpx;
	}

	.tip .tip-title {
		color: var(--theme-auxiliary-color-remind);
	}

	.tip .tip-text {
		color: #A1A1A1;
	}

	.uni-textarea {
		border: none;
		position: relative;
		overflow: initial;
		font-size: 28rpx;
		line-height: 3rpx;
		background-color: #fff;
		color: #404040;
		text-align: left;
		border-radius: 10rpx;
	}

	.content {
		padding: 20rpx;
		min-height: 300rpx;
		padding-left: 30rpx;
		width: 90%;
	}

	.red-envelopes {
		padding: 20rpx 30rpx;
		font-size: 28rpx;
	}

	.red-envelopes img {
		width: 32rpx;
		margin-right: 10rpx;
		vertical-align: bottom;
	}

	.uploader {
		padding-top: 20rpx;
	}

	.color-text {
		padding: 30rpx 26rpx 0;
		color: #999;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.color-list {
		padding: 20rpx 26rpx 30rpx;
		display: flex;
		background: #fff;
		justify-content: space-between;
		align-items: center;
	}

	.color-list .color-item {
		width: 10%;
		height: 50rpx;
		border-radius: 4rpx;
		box-sizing: content-box;
		border: 6rpx solid #fff;
	}

	.color-list .color-item.active {
		border: 6rpx solid #f7d7a3;
	}

	.ft-btn {
		padding: 0 28rpx;
		margin-top: 60rpx;
	}

	.ft-btn .action {
		background-color: var(--theme-color) !important;
		color: #FFF;
		height: 88rpx !important;
		box-sizing: border-box;
		border-radius: 16rpx;
		font-size: 34rpx;
	}

	.pop-red-hb {
		padding: 30rpx;
	}

	.pop-red-hb .title {
		font-size: 24rpx;
		color: #666;
		padding: 20rpx 0;
	}

	.pop-red-hb .input-box {
		padding: 20rpx;
		position: relative;
		background: #eee;
		border-radius: 8rpx;
		margin-bottom: 40rpx;
		height: 44rpx;
	}

	.van-col--6 {
		width: 25%;
	}

	.van-col--16 {
		width: 66.66666667%;
	}

	.van-col--2 {
		width: 8.33333333%;
	}

	.van-col {
		float: left;
		box-sizing: border-box;
		min-height: 2rpx;
	}

	.pop-red-hb .input-box label {
		font-size: 32rpx;
		position: relative;
		z-index: 1;
	}

	.pop-red-hb .input-box input {
		font-size: 32rpx;
		border: 0;
		width: 100%;
		text-align: right;
		background: #eee;
	}

	.pop-red-hb .input-box span {
		float: right;
		color: red;
		font-size: 32rpx;
	}

	.pop-red-hb .cont-prick {
		font-size: 64rpx;
		padding: 40rpx 0;
		text-align: center;
		font-weight: 700;
	}

	.van-button {
		height: 80rpx !important;
		position: relative;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-size: 32rpx;
		line-height: 2.4rpx;
		text-align: center;
		cursor: pointer;
		transition: opacity .2s;
		-webkit-appearance: none;
	}

	.van-button--round {
		border-radius: 999px;
	}

	.van-button--block {
		display: block;
		width: 100%;
	}

	.van-button--primary {
		color: #fff;
		background-color: var(--theme-color);
		;
		border: 2rpx solid var(--theme-color);
		;
	}

	.van-button__content {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		height: 100%;
	}

	.ql-container {
		height: auto;
		min-height: 0;
		font-size: 28rpx;
		color: #404040;
		border-radius: 12rpx;
		border: 1px solid var(--theme-auxiliary-color-default);
		padding: 20rpx;
	}

	.red-envelopes span {
		color: red;
		margin: 0 10rpx;
	}
</style>
