<template>
	<view class="log-box" :style="{ marginTop: safeHeight }">
		<Header :title="title" :isBack="false" showBack @back="back">

		</Header>
		<view class="prop-box">
			{{ step == 1 ? $t('pages.common.userCenter.pwd.set_pwd.Prompt') :
        $t('pages.common.userCenter.pwd.set_pwd.ConfirmPassword') }}
		</view>
		<view class="pwd-box">
			<one-input v-show="step == 1" :autoFocus="true" v-model="pwd" :maxlength="6" :isPwd="true" @finish="finishedOne" ref="hi"
				type="xin">
			</one-input>
			<one-input v-show="step == 2" :autoFocus="true" v-model="repwd" :maxlength="6" :isPwd="true" @finish="finishedAct" ref="oneInput2"
				type="xin">
			</one-input>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import oneInput from '@/components/myp-one/myp-one'
	import {
		setPinCode
	} from "@/utils/lottery/mine";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import Header from '@/components/common/header/index.vue';

	export default {
		name: "update_pwd",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar,
			oneInput,
			Header
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.pwd.set_pwd.FinancialPasswordSet'),
				step: 1,
				pwd: '',
				repwd: '',
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			back() {
				if (this.step == 2) {
					this.step = 1
				} else {
					backPage()
				}
			},
			finishedOne(val) {
				this.pwd = val
				this.step = 2
				setTimeout(() => {
					this.$nextTick(()=>{
						this.$refs.oneInput2?.$children[0]?.$children[0]?.$children[0]?.$refs?.input?.focus()
					})
				}, 500);
			},
			finishedAct(val) {
				this.repwd = val
				if (this.pwd == '') {
					pop(this.$t('pages.common.userCenter.pwd.set_pwd.EnterPassword'), 2000)
					return false
				}
				if (this.pwd != this.repwd) {
					pop(this.$t('pages.common.userCenter.pwd.set_pwd.PasswordMismatch'), 2000)
					this.step = 1
					this.pwd = ''
					this.repwd = ''
					return false
				}
				let prams = {
					pinCode: this.pwd
				};
				setPinCode(prams).then(res => {
					if (res.code == 200) {
						uni.$emit('emitParams', {
							msg: this.$t('pages.common.userCenter.pwd.set_pwd.SuccessfullySet')
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
			font-weight: 400;
			font-size: 28rpx;
			text-align: center;
			color: #CC3333;
			margin: 29rpx 0;
		}
	}

	/deep/ .flex-box {
		padding: 0 60rpx;
	}
</style>