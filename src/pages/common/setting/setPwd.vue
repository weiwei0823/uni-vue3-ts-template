<template>
	<view class="setting pc-max-width"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%' }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<scroll-view :scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx)`,marginTop:'20rpx'}">
			<view class="content">
				<view class="tips-box">
					<view class="title-box">
						<view class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
								fill="none">
								<circle cx="7" cy="7" r="7" transform="matrix(1 0 0 -1 0 14)"
									:fill="themeColor.themeAuxiliaryColorRemind" />
								<path
									d="M6.80208 8.27669C6.32083 8.27669 6 7.95587 6 7.55482V4.10587C6 3.70482 6.32082 3.38398 6.80208 3.38398C7.28332 3.38398 7.60415 3.7048 7.60415 4.10586V7.55481C7.60415 7.95586 7.28333 8.27669 6.80208 8.27669ZM6.80208 9.47982C7.28332 9.47982 7.60415 9.80064 7.60415 10.2819C7.60415 10.7632 7.28333 11.084 6.80208 11.084C6.32083 11.084 6 10.7632 6 10.2819C6 9.80065 6.32082 9.47982 6.80208 9.47982Z"
									fill="white" />
							</svg>
						</view>
						<text class="title">{{$t("common.setting.setPwd.tip1")}}</text>
					</view>
					<view class="list-text">
						<view class="text">{{$t("common.setting.setPwd.tip2")}}</view>
						<view class="text">{{$t("common.setting.setPwd.tip3")}}</view>
						<view class="text">{{$t("common.setting.setPwd.tip4")}}</view>
						<view class="text">{{$t("common.setting.setPwd.tip5")}}</view>


					</view>
				</view>
				<view class="form-box" ref="inputs">
					<view class="form-item">
						<view class="title">
							{{$t("common.setting.setPwd.tip6")}}
						</view>
						<LHInput ref="oldPwdRef" class="item" v-model="formData.oldPwd"
							:placeholder="$t('common.setting.setPwd.tip6')" type="password" close isRule
							:rule="rules.oldPwd" />
					</view>

					<view class="form-item">
						<view class="title">
							{{$t("common.setting.setPwd.tip7")}}
						</view>
						<LHInput ref="newPwdRef" class="item" v-model="formData.newPwd"
							:placeholder="$t('common.setting.setPwd.tip8')" type="password" showPasswordLevel close
							isRule :rule="rules.newPwd" />
					</view>

					<view class="form-item">
						<view class="title">
							{{$t("common.setting.setPwd.tip9")}}
						</view>
						<LHInput ref="confirmNewPwdRef" class="item" v-model="formData.confirmNewPwd"
							placeholder="请再次输入密码" type="password" close isRule
							:rule="rules.confirmNewPwd" />
					</view>

				</view>
				<view class="btn-box" @click="submitForm"> {{$t("common.ok")}}</view>
				<view class="forget">
					{{$t("common.setting.setPwd.forget")}}？<text class="kefu"
						@click="goToUrl('/pages/common/userCenter/service/index')">{{$t("common.setting.setPwd.lianxi")}}</text>
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import FormItem from "@/pages/liuhe/common/FormItem";
	import LHInput from '@/components/common/LHInput/index.vue';
	import {
		updatePassword
	} from "@/utils/user/index";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "setPwd",
		components: {
			Header,
			AlertInjectLayer,
			LHInput,
			FormItem
		},
		computed: {
			...mapGetters(['themeColor']),
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("common.setting.setPwd.title"),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				showNewPassword: true,
				showReNewPassword: true,
				isAction: true,
				pwdVaildate: [{
					type: "MinLength",
					minLength: 8,
					msg: this.$t("common.setting.setPwd.err1")
				}],
				repwdVaildate: [{
					type: "Each",
					msg: this.$t("common.setting.setPwd.err2")
				}],
				formData: {
					oldPwd: "",
					newPwd: "",
					confirmNewPwd: ""
				},
				winHeight: 0,
				rules: {
					oldPwd: {
						required: true,
						message: this.$t("common.setting.setPwd.err3"),
						trigger: ['input', 'blur'],
					},
					newPwd: {
						required: true,
						rule: /^([0-9A-Za-z\d,.]){8,12}$/,
						ruleMessage: this.$t("common.setting.setPwd.err4"),
						message: this.$t("common.setting.setPwd.err5"),
						trigger: ['input', 'blur'],
					},
					confirmNewPwd: {
						required: true,
						validator: (rule, value, type) => {
							if (!value) {
								return false
							}
							if (value !== this.formData.newPwd) {
								return this.$t("common.setting.setPwd.err6")
							}
							return true;
						},
						message: this.$t("common.setting.setPwd.err7"),
						trigger: ['input', 'blur'],
					},
				}
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			uni.onWindowResize(() => {
				this.winHeight = uni.getSystemInfoSync().windowHeight;
			})
		},
		methods: {
			submitForm() {
				const inputsRef = [this.$refs.oldPwdRef, this.$refs.newPwdRef, this.$refs.confirmNewPwdRef]
				inputsRef.forEach(input => {
					input.checkRule('blur')
				});
				this.$nextTick(() => {
					const pass_through_inputs = inputsRef.filter(input => input.message)
					if (pass_through_inputs.length > 0) {
						return
					}
					updatePassword(this.formData).then(res => {
						if (res.code === 200) {
							this.isAction = false
							uni.$emit('setSucc', {
								msg: res.message
							})
							backPage()
						} else if (res.code === 500) {
							pop(res.message)
						}
					})
				})
			},
			goToUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		background: var(--theme-auxiliary-color-default);
		min-height: var(--vh);


		.content {
			padding: 20rpx 28rpx;
			padding-top: 0;
		}

		.tips-box {
			padding: 20rpx 28rpx;
			border-radius: 34rpx;
			background: #EEE;
			color: #A1A1A1;

			.title-box {
				display: flex;

				.icon {
					margin-right: 10rpx;
				}

				.title {
					font-size: 26rpx;
				}
			}

			.list-text {
				margin-left: 28rpx;

				.text {
					font-size: 24rpx;
					line-height: 44rpx;
					display: flex;
					align-items: center;

					&::before {
						content: '';
						width: 12rpx;
						height: 12rpx;
						border-radius: 12rpx;
						background: var(--theme-color);
						display: block;
						margin-right: 10rpx;
					}
				}
			}
		}

		.form-box {
			.form-item {
				/deep/ .form-col {
					.form-item {
						width: 100%;
						border-radius: 20rpx;
						border: none;
						background: #fff;
						padding: 0 20rpx;
						box-sizing: border-box;

						.show {
							right: 0;
						}
					}
				}

				.title {
					color: #404040;
					font-size: 30rpx;
					font-weight: 600;
					padding: 20rpx;
					display: flex;
					align-items: center;

					&::before {
						content: '';
						width: 6rpx;
						height: 24rpx;
						border-radius: 6rpx;
						background: var(--theme-color);
						margin-right: 20rpx;
						display: block;
					}
				}

			}
		}

		.btn-box {
			height: 88rpx;
			display: grid;
			place-content: center;
			border-radius: 16rpx;
			background: var(--theme-color);
			color: #FFF;
			font-size: 34rpx;
			margin: 60rpx 0;
		}

		.forget {
			text-align: center;
			font-weight: 600;
			font-size: 30rpx;
			color: #A1A1A1;

			.kefu {
				color: var(--theme-color);
			}
		}
	}
</style>
