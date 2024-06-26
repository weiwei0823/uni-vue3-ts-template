<template>
	<view class="mint-tab-container-item" :class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" :isBack="false" showBack @back="back" isFixed />
		<scroll-view scroll-y class="scroll-y" :style="{height: `calc(${uWindowHeight}px - 110rpx)`}">
			<view class="content-box">
				<view class="sel-period" v-if="id == 0">
					<view v-for="(item, index) in nextMenu" :key="index" class="item"
						:class="isActive == index ? 'active' : ''" @click="lastArticle(index)">{{ item }}
					</view>
				</view>
				<view class="find-body">
					<view class="hd">{{ $t('pages.luntan.masterForum.add.selectPlatform') }}</view>
					<view class="tab-box">
						<view class="nav">
							<view v-for="(item, index) in navList" :key="index"
								:class="lotteryType == item.lotteryType ? 'nav-item active' : 'nav-item'"
								@click="selectType(item)">
								{{ item.name || item.lotteryName }}
							</view>
						</view>
					</view>
					<view class="hd">{{ $t('pages.luntan.masterForum.add.enterTitle') }}：</view>
					<view class="van-cell-group">
						<view class="van-cell van-field">
							<view class="van-cell__value van-cell__value--alone van-field__value">
								<view class="van-field__body">
									<input type="text" v-model="formData.title"
										placeholder-style="color:#d3c9cc;font-size:28rpx"
										:placeholder="$t('pages.luntan.masterForum.add.enterTitle')"
										class="van-field__control">
								</view>
							</view>
						</view>
					</view>
					<view class="hd">{{ $t('pages.luntan.masterForum.add.enterContent') }}：</view>
					<view class="van-cell-group">
						<editor id="editor" class="ql-container" v-model="formData.description" @ready="onEditorReady"
							:placeholder="$t('pages.luntan.liuhePicture.add.enterContent2')">

						</editor>
						<view class="red-envelopes" @click="sendRed()" style="display: none">
							<img src="@/static/img/forum/red.png">
							<view style="display:inline;" v-if="formData.amount == 0">{{
								$t('pages.luntan.masterForum.add.sendRedEnvelope')
							}}
							</view>
							<view style="display:inline;" v-else>
								{{ $t('pages.luntan.masterForum.add.sendRedEnvelope') }}<span>{{ formData.amount
								}}</span>{{ $t('pages.luntan.masterForum.add.currencyUnit') }},
								<span>{{ formData.count }}</span>{{ $t('pages.luntan.masterForum.add.totalAmount') }}
							</view>
						</view>
						<!--图片上传-->
						<view class="uploader">
							<cl-upload v-model="imgList" :fileName="'file'" :fileType="'image'" :action="action"
								:max="3" :headers="headers" :data="{ addWatermark: true }" :listStyle="{
									columnGap: '20rpx',
									rowGap: '20rpx',
									margin: '5px',
									width: '208rpx',
									height: '208rpx',
									radius: '24rpx',
									border: '1px dashed #A1A1A1'
								}" @onSuccess="onSuccess" @onError="onErrors">
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
						<p class="color-text">{{ $t('pages.luntan.masterForum.add.selectTextChangeColor') }}</p>
						<view class="color-list">
							<view v-for="(item, index) in colorList" :key="index"
								:class="colorIsActive == index ? 'color-item active' : 'color-item'" :style="item"
								@click="setColor(index, item)"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="ft-btn">
				<button type="primary" class="action" @click="send">{{ $t('pages.luntan.masterForum.add.publish')
				}}</button>
			</view>
			<view class="tip">
				<view class="tip-title">温馨提示：</view>
				<view class="tip-text">开奖日期禁止发布贴时间段：{{ articleTime }}</view>
			</view>
		</scroll-view>
		<!--注册界面-->
		<uni-popup ref="popup" background-color="#fff" mask-background-color="rgba(0,0,0,.7)" :is-mask-click="false">
			<view style="width: 100vw">
				<view class="header-box">
					<div class="header">
						<view class="box-bg">
							<uni-nav-bar backgroundColor="#fff" height="55" color="#ffffff" rightWidth="65px">
								<block slot="left">
									<uni-icons @click="closeRed" type="back" color="#000" size="16"
										style="font-weight: bold;margin-left: 10px" />
								</block>
								<view class="input-view" style="color:#000">
									{{ $t('pages.luntan.masterForum.add.selectTextChangeColor') }}
								</view>
							</uni-nav-bar>
						</view>
					</div>
				</view>
				<div class="pop-red-hb">
					<div class="title">{{ $t('pages.luntan.masterForum.add.minRedEnvelopeAmount') }}</div>
					<div class="input-box">
						<div class="van-row">
							<div class="van-col van-col--6">
								<label>{{ $t('pages.luntan.masterForum.add.publish') }}</label>
							</div>
							<div class="van-col van-col--16">
								<input v-model="amount" type="number" min="2" max="20" placeholder="0.00">
							</div>
							<div class="van-col van-col--2">
								<span>{{ $t('pages.luntan.masterForum.add.sendRedEnvelope') }}</span>
							</div>
						</div>
					</div>
					<div class="title">{{ $t('pages.luntan.masterForum.add.maximumAmount') }}</div>
					<div class="input-box">
						<div class="van-row">
							<div class="van-col van-col--6">
								<label>{{ $t('pages.luntan.masterForum.add.numberOfEnvelopes') }}</label>
							</div>
							<div class="van-col van-col--16"><input v-model="count" type="number" min="1" max="100"
									placeholder="0">
							</div>
							<div class="van-col van-col--2"><span>个</span></div>
						</div>
					</div>
					<div class="cont-prick">¥ {{ amount ? amount : '0.00' }}</div>
					<button class="van-button van-button--primary van-button--large van-button--block van-button--round"
						@click="putIn()">
						<div class="van-button__content"><span class="van-button__text">{{
							$t('pages.luntan.masterForum.add.putMoneyInEnvelope') }}</span></div>
					</button>
				</div>
			</view>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import {
		lastPeriodArticle,
		submitArticle,
		detail,
		editArticle,
		getArticleTime
	} from '@/utils/forum/index.js'
	import {
		config
	} from '@/config/config.js'
  import {
    lotteryTime
  } from '@/utils/lottery/index'
	export default {
		name: "add",
		components: {
			Header,
			AlertInjectLayer,
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.masterForum.add.publishForumPost'),
				lotteryType: 2,
				id: 0,
				action: config.me_base_url[0] + '/api/user/upImg',
				headers: {
					'X-Access-Token': this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_TOKEN)
				},
				navList: [{
						lotteryType: 2,
						name: this.$t('pages.luntan.masterForum.add.australianLottery')
					},
					{
						lotteryType: 1,
						name: this.$t('pages.luntan.masterForum.add.hongKongLottery')
					},
					{
						lotteryType: 5,
						name: '快乐8'
					},
					{
						lotteryType: 3,
						name: this.$t('pages.luntan.masterForum.add.taiwanLottery')
					},
					{
						lotteryType: 4,
						name: this.$t('pages.luntan.masterForum.add.newLottery')
					}
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
				nextMenu: [this.$t('pages.luntan.masterForum.add.loadPreviousContent'), this.$t(
					'pages.luntan.masterForum.add.loadPreviousTitle'), this.$t(
					'pages.luntan.masterForum.add.loadPreviousText')],
				lastPeriod: {},
				imgList: [],
				imgListId: [],
				amount: '0.00',
				count: 0,
				editorCtx: '',
				content: '',
				formData: {
					amount: 0.00,
					count: 0,
					title: '',
					description: '',
					pictureIds: [],
					type: 3,
				},
				articleTime: ''
			}
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
		},
		async onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
      await this.initNavMenu();
			this._getArticleTime()
			this.lastPeriodArticle()
			uni.setNavigationBarTitle({
				title: this.title
			});
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onUnload() {
			// alert("unload")
			// uni.hideKeyboard();
		},
		methods: {
			async _getArticleTime() {
				const res = await getArticleTime({
					lotteryType: this.lotteryType
				})
				this.articleTime = res.result
			},
			//返回
			back: function(msg = '') {
				uni.$emit('emitParams', {
					msg: msg
				})
				uni.hideKeyboard(); // 隐藏键盘
				setTimeout(() => {
					// this.$nextTick(() => {
					uni.navigateBack();
					// })
				}, 500)
			},
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
				// #endif
				if (this.id) {
					this.detail()
				}
			},
			//设置颜色
			setColor: function(index, item) {
				this.colorIsActive = index
				this.editorCtx.format('color', item.background)
			},
			//获取内容
			getContents: function() {
				const that = this
				this.editorCtx.getContents({
					success: (res) => {
						that.formData.description = res.html
						that.content = res.text.trim()
						this.fabu()
					},
				})
			},
			//文章详情获取
			detail: function() {
				let prams = {
					articleId: this.id
				}
				detail(prams).then(res => {
					if (res.code != 200) {
						pop(res.message, 2000)
						return false
					}
					this.info = res.result
					this.lotteryType = this.info.lotteryType
					this.formData.type = this.info.type
					this.formData.title = this.info.title
					for (let i = 0; i < this.info.pictureEntityList.length; i++) {
						this.imgList.push(this.info.pictureEntityList[i].pictureUrl)
						this.imgListId.push(this.info.pictureEntityList[i])
					}
					this.editorCtx.setContents({
						html: this.info.description
					})
				}).catch(err => {
					console.log(err)
				})
			},
			selectType(item) {
				this.lotteryType = item.lotteryType
				this.lastPeriodArticle()
				this._getArticleTime()
			},
			//获取上次发布的数据
			lastPeriodArticle: function() {
				let prams = {
					lotteryType: this.lotteryType
				}
				lastPeriodArticle(prams).then(res => {
					this.lastPeriod = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			lastArticle: function(index) {
				if (!this.lastPeriod) {
					pop(this.$t('pages.luntan.masterForum.add.noPreviousPost'), 1000)
				}
				this.isActive = index
				this.formData.title = '';
				this.editorCtx.clear()
				if (this.isActive == 0) {
					this.formData.title = this.lastPeriod.title
					this.editorCtx.setContents({
						html: this.lastPeriod.description
					})
				}
				if (this.isActive == 1) {
					this.formData.title = this.lastPeriod.title
				}
				if (this.isActive == 2) {
					this.editorCtx.setContents({
						html: this.lastPeriod.description
					})
				}
			},
			//发红包
			sendRed: function() {
				this.$refs.popup.open('right')
			},
			//关闭红包窗口
			closeRed: function() {
				this.$refs.popup.close()
			},
			//塞红包进去
			putIn: function() {
				if (this.amount < 1 || this.amount > 1000) {
					uni.showToast({
						title: this.$t('pages.luntan.masterForum.add.minRedEnvelopeAmount'),
						duration: 2000,
						icon: 'none'
					})
					return false
				}
				if (this.count < 1 || this.count > 1000) {
					uni.showToast({
						title: this.$t('pages.luntan.masterForum.add.minRedEnvelopeQuantity'),
						duration: 2000,
						icon: 'none'
					})
					return false
				}
				this.formData.amount = this.amount
				this.formData.count = this.count
				this.$refs.popup.close()
			},
			/**
			 * 自动上传返回的是一张图片信息
			 * 手动上传返回的是已选中所有图片或者视频信息
			 * */
			onSuccess(reslut) {
				console.log(reslut)
				// 把服务端返回的图片地址添加到list中与组件数据同步
				this.imgList.push(reslut.result.pictureUrl)
				this.imgListId.push(reslut.result)
			},
			//上传失败
			onErrors(err) {
				uni.showToast({
					title: this.$t('pages.luntan.masterForum.add.uploadFailed'),
					duration: 2000,
					icon: 'none'
				})
			},
			send: function() {
				this.getContents();
			},
			//提交表单
			fabu: function() {
				let imgId = [];
				let prams = this.formData;
				this.info && (prams.createTime = this.info.createTime)
				prams.lotteryType = this.lotteryType
				// if (this.imgListId.length == 0) {
				// 	pop('请上传图片')
				// 	return false
				// }
				for (let i = 0; i < this.imgListId.length; i++) {
					if (this.imgList.indexOf(this.imgListId[i].pictureUrl) != -1) {
						imgId.push(this.imgListId[i].id)
					}
				}
				prams.pictureIds = imgId
				if (prams.title == '') {
					pop(this.$t('pages.luntan.masterForum.add.enterTitle'))
					return false
				}
				if (!this.content) {
					pop(this.$t('pages.luntan.masterForum.add.enterContent'))
					return false
				}

				if (this.id) {
					prams.articleId = this.id
					editArticle(prams).then(res => {
						let msg = ''
						if (res.code != 200) {
							msg = res.message
						} else {
							msg = this.$t('pages.luntan.masterForum.add.publishSuccess')
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
				} else {
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
							uni.setStorageSync('addForum', new Date().getTime());
							msg = this.$t('pages.luntan.masterForum.add.publishSuccessAgain')
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
				}
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
	.mint-tab-container-item {
		background: var(--theme-auxiliary-color-default);
	}

	.header-box {
		height: auto;
	}

	.header,
	.box-bg {
		height: 46px;
	}

	.scroll-y {
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.content-box {
		background: #fff;
		padding: 20rpx 28rpx;
		border-radius: 24rpx;
	}

	.sel-period {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 68rpx;
		border-radius: 16rpx;
		background: #fff;
		border: 1px solid var(--theme-auxiliary-color-default);
		padding: 0 6rpx;
	}

	.sel-period .item {
		border-radius: 12rpx;
		width: 232rpx;
		height: 56rpx;
		color: #404040;
		font-size: 28rpx;
		display: grid;
		place-content: center;
	}

	.sel-period .active {
		background: var(--theme-auxiliary-color-default);
	}

	.find-body {
		margin-top: 20rpx;
	}

	.find-body .hd {
		font-size: 30rpx;
		color: #404040;
	}

	.tab-box {
		padding: 20rpx 0;
	}

	.nav {
		box-sizing: border-box;
		height: 68rpx;
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
		height: 30px;
		font-size: 28rpx;
		color: #404040;
		display: grid;
		place-content: center;
	}

	.nav .nav-item:last-child {
		border: 0px;
	}

	.nav .nav-item.active {
		background: #fff;
		border-radius: 12rpx;
		color: var(--theme-color);
	}

	.van-cell-group {
		background-color: #fff;
	}

	.van-cell {
		position: relative;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 0;
		overflow: hidden;
		color: #404040;
		font-size: 28rpx;
	}

	.van-cell__value {
		position: relative;
		overflow: hidden;
		color: #969799;
		text-align: right;
		vertical-align: middle;
		word-wrap: break-word;
		background: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
		border: 1px solid var(--theme-auxiliary-color-default);
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
		color: #404040;
		font-size: 30rpx;
	}

	.color-list {
		padding-top: 20rpx;
		display: flex;
		background: #fff;
		justify-content: space-between;
		align-items: center;
	}

	.color-list .color-item {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		box-sizing: content-box;
		border: 6rpx solid #fff;
	}

	.color-list .color-item.active {
		border: 6rpx solid #f7d7a3;
	}

	.ft-btn {
		padding: 0 28rpx;
		margin: 40rpx 0;
	}

	.ft-btn .action {
		background-color: var(--theme-color) !important;
		color: #fff;
		border-radius: 16rpx;
		height: 88rpx;
		font-size: 34rpx;
		display: grid;
		place-content: center;
	}

	.tip {
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
		border: 2rpx solid var(--theme-color);
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
		padding: 10px;
		font-size: 28rpx;
		color: #404040;
		border-radius: 16rpx;
		background: #fff;
		border: 1px solid var(--theme-auxiliary-color-default);
		margin-top: 20rpx;
	}

	.red-envelopes span {
		color: red;
		margin: 0 10rpx;
	}
</style>
<style lang="scss" scoped>
	/deep/ .ql-blank::before {
		color: #d3c9cc;
		font-size: 28rpx;
		font-style: normal;
	}
</style>
