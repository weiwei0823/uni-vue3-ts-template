<template>
	<view class="setting" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<view class="form-box">
			<view class="form-item">
				<view class="select">
					<uni-data-select v-model="rangeValue" :localdata="range" :clear="false">
						<template #itemImg="item">
							<view class="item-img">
								<image class="img" v-if="item.value === rangeValue"
									src="@/static/imgs-liuhe/activity/item-selected.png">
								</image>
							</view>
						</template>
					</uni-data-select>
				</view>
				<input class="uni-input" placeholder-style="color: #C9C9C9;" v-model="formData.phone"
					:placeholder="$t('common.setting.setMobile.mobilePlaceholder')" />
			</view>
			<view class="code-box">
				<image class="security" src="@/static/img/liuhe/setting/security.png"></image>
				<input class="uni-input" placeholder-style="color: #C9C9C9;" v-model="formData.code"
					:placeholder="$t('common.setting.setMobile.codePlaceholder')" />
				<view class="getCode" v-show="!isSend" @click="getCode">{{ codeText }}</view>
				<view class="getCode on-getCode" v-show="isSend">{{ sendText }}</view>
			</view>
		</view>
		<view class="submit-btn" @click="checkNewPhoneCode">{{$t("common.setting.setMobile.bind")}}</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		checkPhone
	} from "@/utils/common.ts"
	import {
		getVCode,
		checkCode
	} from "@/utils/common/index";
	import {
		bindMobile
	} from "@/utils/user/index";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		throttle
	} from "@/utils/function";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "setMobile",
		components: {
			Header,
			AlertInjectLayer
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				codeText: this.$t("common.setting.setMobile.codeText"),
				rangeValue: 0,
				range: [{
						value: 0,
						text: "+86"
					},
					{
						value: 1,
						text: "+63"
					},
					{
						value: 7,
						text: "+88"
					},
					{
						value: 15,
						text: "+56"
					},
					{
						value: 30,
						text: "+855"
					},
				],
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("common.setting.setMobile.title"),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				nickname: '',
				isSend: false,
				countDown: 60,
				formData: {
					phone: '',
					verificationToken: '',
					code: ''
				},
				sendText: '',
			}
		},
		methods: {
			verifyData() {
				return new Promise((resolve, reject) => {
					uni.$emit("showPop", {
						refName: "Verify",
						data: {
							verifyType: 'Slide',
							check_website: false
						},
						success: (response) => {
							if (response.close) response.close();
							resolve(response)
						},
						fail: reject,
					});
				})
			},
			/**
			 * 获取验证码
			 */
			getCode: throttle(async function() {
				let params = {};
				const phone = this.formData.phone
				if (!checkPhone(phone)) return false
				params = {
					phone: this.formData.phone,
					type: "bind"
				}
				const {ticket, randstr} = await this.verifyData()
				params.ticket = ticket
				params.randStr = randstr
				uni.showLoading({mask:true})
				getVCode(params).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: this.$t("common.setting.setMobile.sendSuccess"),
							duration: 1000,
							icon: "none"
						})
						this.isSend = true
						let timerId = setInterval(() => {
							this.countDown--;
							this.sendText = this.countDown + "S";
							if (this.countDown <= 0) {
								clearInterval(timerId);
								this.countDown = 60;
								this.isSend = false
								this.codeText = this.$t("common.setting.setMobile.reSend")
							}
						}, 1000);
					} else {
						pop(res.message, 2000)
					}
				}).finally(()=>{uni.hideLoading()}).catch(err => {
					console.log(err)
				})
			}, 200),
			checkNewPhoneCode() {
				checkCode({
					phone: this.formData.phone,
					type: "bind",
					code: this.formData.code
				}).then(res => {
					if (res.code === 200) {
						bindMobile({
							mobile: this.formData.phone,
							verificationToken: res.result.verificationToken,
						}).then(res => {
							if (res.code === 200) {
								uni.$emit('setSucc', {
									msg: this.$t("common.setting.setMobile.bindSuccess")
								})
								backPage()
							} else if (res.code === 500) {
								uni.showToast({
									title: res.message,
									icon: "none"
								})
							}
						})
					} else if (res.code === 500) {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		background: var(--theme-auxiliary-color-default);
		min-height: var(--vh);


		.form-box {
			margin-top: 20rpx;
			padding: 0 28rpx;

			.title {
				font-style: normal;
				font-weight: 400;
				font-size: 30rpx;
				color: #404040;
			}

			.form-item {
				height: 96rpx;
				border-radius: 20rpx;
				display: flex;
				background: #FFFFFF;
				margin-top: 14rpx;

				.select {
					width: 146rpx;
					font-size: 30rpx;

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

					::v-deep .uni-select {
						border: none;
						width: 170rpx;
						height: 88rpx;

						.uni-select__input-text {
							width: fit-content;
							margin-right: 20rpx;
							color: #404040;
						}

						.uni-select__selector {
							z-index: 999;
							transform: translate(140rpx, -110rpx);
						}

						.uni-popper__arrow {
							display: none;
						}

						.uni-select__selector-item {
							border-bottom: 1px solid var(--theme-auxiliary-color-default);
							align-items: center;

							&:last-child {
								border: none;
							}
						}
					}
				}

				.uni-input {
					width: 540rpx;
					height: 90rpx;
					background: #fff;
					text-align: left;
					border: 0px;
					padding-left: 10rpx;
					font-size: 30rpx;
				}
			}

			.code-box {
				height: 90rpx;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				background: #FFFFFF;
				margin-top: 20rpx;
				padding: 0 20rpx;

				.security {
					width: 48rpx;
					height: 48rpx;
				}

				.uni-input {
					flex: 1;
					height: 90rpx;
					background: #fff;
					text-align: left;
					border: 0rpx;
					border-radius: 20rpx 0 0 20rpx;
					padding-left: 10rpx;
				}

				.getCode {
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 300;
					font-size: 30rpx;
					color: var(--theme-color);
				}

				.on-getCode {
					width: 150rpx;
					height: 52rpx;
					border-radius: 8rpx;
					background: var(--theme-color);
					display: grid;
					place-content: center;
					color: #fff;
				}
			}
		}

		.submit-btn {
			width: 705rpx;
			margin: 75rpx auto;
			height: 88rpx;
			display: grid;
			place-content: center;
			border-radius: 16rpx;
			background: var(--theme-color);
			color: #FFF;
			font-size: 34rpx;
		}
	}
</style>
