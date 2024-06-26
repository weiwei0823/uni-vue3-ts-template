<template>
	<view class="log-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="prop-box">
			{{ step == 1 ? $t('pages.common.userCenter.pwd.update_pwd.OldPassword') : step == 2 ?
				$t('pages.common.userCenter.pwd.update_pwd.Prompt') :
				$t('pages.common.userCenter.pwd.update_pwd.ConfirmPassword') }}
		</view>
		<view class="pwd-box">
			<one-input v-if="step == 1" v-model="oldPwd" :maxlength="6" :isPwd="true" @finish="oldPwdVerify" ref="hi"
				type="xin">
			</one-input>
			<one-input v-if="step == 2" v-model="pinCode" :maxlength="6" :isPwd="true" @finish="newPwdAct" ref="oneInput2"
				type="xin">
			</one-input>
			<one-input v-if="step == 3" v-model="repinCode" :maxlength="6" :isPwd="true" @finish="finishedAct"
				ref="oneInput3" type="xin">
			</one-input>
		</view>
		<uni-popup ref="err" type="center" :mask-click="false">
			<PopItem @close="close" :msg="msg"></PopItem>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import oneInput from '@/components/myp-one/myp-one';
	import PopItem from "@/components/common/PopItem/PopItem";
	import {
		revisePinCode
	} from "@/utils/lottery/mine";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
import { nextTick } from 'vue';
	export default {

		name: "index",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			oneInput,
			PopItem
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.pwd.update_pwd.FinancialPasswordReset'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				step: 1,
				oldPwd: '',
				pinCode: '',
				repinCode: '',
				msg: '',
			}
		},
		computed: {
			...mapGetters(['themeColor']),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(){
			this.$nextTick(() => {
				this.$refs.hi.onFocus();
			});
		},
		methods: {
			back() {
				if (this.step > 1) {
					this.step -= 1
				} else {
					backPage()
				}
			},
			finishedOne(val) {
				this.oldPwd = val
				this.step = 2
			},
			errPwd() {
				this.$refs.err.open()
			},
			close() {
				this.$refs.err.close()
			},
			oldPwdVerify() {
				if (this.oldPwd == '') {
					pop(this.$t('pages.common.userCenter.pwd.update_pwd.EnterOldPassword'), 2000)
					return false
				}
				let prams = {
					'oldPinCode': this.oldPwd
				};
				revisePinCode(prams).then(res => {
					if (res.code == 200) {
						this.step = 2
						this.$nextTick(function () {
							this.$refs.oneInput2.onFocus();
						});
					} else if (res.code == 600) {
						this.msg = res.message
						this.oldPwd = "";
						this.errPwd()
					} else {
						this.oldPwd = "";
						pop(res.message, 1000)
					}
					setTimeout(() => {
						this.$nextTick(()=>{
							this.$refs.oneInput2?.$children[0]?.$children[0]?.$children[0]?.$refs?.input?.focus()
						})
					}, 500);
				}).catch(err => {
					console.log(err)
				})
			},
			newPwdAct() {
				if (this.pinCode == '') {
					pop(this.$t('pages.common.userCenter.pwd.update_pwd.EnterNewPassword'), 1000)
					return false
				}
				this.step = 3
				this.$nextTick(function () {
					this.$refs.oneInput3.onFocus();
				});
				// setTimeout(() => {

				// 	// this.$nextTick(()=>{
				// 	// 	this.$refs.oneInput3?.$children[0]?.$children[0]?.$children[0]?.$refs?.input?.focus()
				// 	// })
				// }, 500);
			},
			finishedAct(val) {
				this.repinCode = val
				if (this.pinCode == '') {
					pop(this.$t('pages.common.userCenter.pwd.update_pwd.EnterPassword'), 1000)
					return false
				}
				if (this.pinCode != this.repinCode) {
					pop(this.$t('pages.common.userCenter.pwd.update_pwd.PasswordMismatch'), 1000)
					this.step = 2
					this.pinCode = ''
					this.repinCode = ''
					return false
				}
				let prams = {
					oldPinCode: this.oldPwd,
					pinCode: this.pinCode
				};
				revisePinCode(prams).then(res => {
					if (res.code == 200) {
						uni.$emit('emitParams', {
							msg: this.$t('pages.common.userCenter.pwd.update_pwd.SuccessfullySet')
						})
						backPage()
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.log-box {

		height: var(--vh);
		background: var(--theme-auxiliary-color-default);

		.prop-box {
			font-size: 30rpx;
			text-align: center;
			color: var(--theme-auxiliary-color-remind);
			padding: 20rpx 0;
			margin-top: 20rpx;
		}

		::v-deep .code-box {
			.item {
				width: 88rpx;
				height: 88rpx;
				border-radius: 24rpx;
				border: 1px solid #A1A1A1;
				background: #FFF;
			}

			.active,
			.border {
				border: 1px solid var(--theme-color);
			}
		}
	}
</style>
