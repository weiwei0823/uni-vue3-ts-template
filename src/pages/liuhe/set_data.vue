<template>
	<view class="lh-set-data" :class="['theme-' + themeColor.name]">
		<Header :isBack="isBack" title="安全资料完善">
			<template #right>
				<view class="tiaoguo" @click="jump">跳过</view>
			</template>
		</Header>
		<view class="content">
			<view class="steps">
				<view class="item">
					<imageSvgUrl :width="88" :height="88" :url="steps_src(0)" replaceThemeTargetColor="#07C160">
					</imageSvgUrl>
					<!-- <image class="icon" :src="steps_src(0)"></image> -->
					<view class="text" :class="{ 'text-current': current >= 0 }">设置资金密码</view>
				</view>
				<svg class="center" width="110" height="3" viewBox="0 0 110 3" fill="none">
					<rect width="110" height="3" rx="1.5" fill="#EBF1EE" />
					<rect class="rect" :width="current >= 1 ? 110 : 55" height="3" rx="1.5" :fill="themeColor.themeColor" />
				</svg>
				<view class="item">
					<image class="icon" :src="steps_src(1)" v-if="current < 1"></image>
					<imageSvgUrl :width="88" :height="88" :url="steps_src(1)" replaceThemeTargetColor="#07C160" v-else>
					</imageSvgUrl>

					<view class="text" :class="{ 'text-current': current >= 1 }">绑定银行卡</view>
				</view>
			</view>
			<view class="pwd-box" v-if="current === 0">
				<view class="title">{{ pwd_step === 0 ? '请设置资金密码，建议不要与银行卡取款密码相同' : '再次填写以确认' }}</view>
				<one-input v-show="pwd_step === 0" v-model="pwd" :maxlength="6" :isPwd="true" @finish="finishedOne" type="xin">
				</one-input>
				<one-input v-show="pwd_step === 1" v-model="repwd" :maxlength="6" :isPwd="true" @finish="finishedAct"
					type="xin">
				</one-input>
			</view>
			<view class="card-box" v-if="current === 1">
				<view class="title">
					<u-icon class="icon" name="info-circle-fill" :color="themeColor.themeAuxiliaryColorRemind" size="28"></u-icon>
					请绑定持卡人本人银行卡
				</view>
				<view class="inputs">
					<u-form-item class="item" label="姓名:">
						<u-input v-model="formData.realName" disabled placeholder="请输入姓名" />
					</u-form-item>
					<u-form-item class="item" label="卡号:">
						<u-input v-model="formData.bankNumber" placeholder="请输入银行卡号" coustCloseImg />
					</u-form-item>
					<view
						style="border-top: 1px solid var(--theme-auxiliary-color-default);border-bottom: 1px solid var(--theme-auxiliary-color-default);"
						@click="selectBank()">
						<u-form-item class="item" label="银行:" right-icon="arrow-right">
							<view style="width: 100%;">
								<view class="bank" v-if="!BankInfo">请选择银行</view>
								<view class="bank" v-else>
									<image class="icon" :src="BankInfo.logoMobile"></image>
									{{ BankInfo.name }}
								</view>
							</view>
						</u-form-item>
					</view>
					<u-form-item class="item" label="开户行:">
						<u-input v-model="formData.bankBranchName" placeholder="请输入开户行" />
					</u-form-item>
				</view>
			</view>
			<view class="bank-box" v-if="current === 2">
				<view class="title">
					<u-icon class="icon" name="info-circle-fill" :color="themeColor.themeAuxiliaryColorRemind" size="28"></u-icon>
					确认银行卡卡号
				</view>
				<view class="list-box">
					<image class="img" :src="BankInfo.logoMobile"></image>
					<view class="right">
						<view class="bank-name">{{ BankInfo.name }}</view>
						<view class="bank-number">{{ formData.bankNumber }}</view>
					</view>
				</view>
			</view>
			<view class="success-box" v-if="current === 3">
				<svg xmlns="http://www.w3.org/2000/svg" width="114" height="114" viewBox="0 0 114 114" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M75.5658 108.079C75.0505 107.435 74.1911 107.157 73.4071 107.412C68.241 109.092 62.7265 110 57 110C27.7289 110 4 86.2711 4 57C4 27.7289 27.7289 4 57 4C86.2711 4 110 27.7289 110 57C110 63.0566 108.984 68.8758 107.113 74.2967C106.844 75.0762 107.107 75.9404 107.742 76.4671C108.775 77.3241 110.404 77.0142 110.845 75.7469C112.889 69.8757 114 63.5676 114 57C114 25.5198 88.4802 0 57 0C25.5198 0 0 25.5198 0 57C0 88.4802 25.5198 114 57 114C63.2124 114 69.1927 113.006 74.7905 111.169C76.0657 110.75 76.4046 109.126 75.5658 108.079Z"
						:fill="themeColor.themeColor" />
					<path d="M88.3496 37.0498L49.5621 76.9498L26.5996 53.3288" :stroke="themeColor.themeColor" stroke-width="10"
						stroke-linecap="round" stroke-linejoin="round" />
					<path
						d="M104.64 90.9422L101.19 94.1204C99.9068 95.302 98.0885 95.6847 96.4549 95.2754L99.335 92.629C99.3778 92.5949 99.4243 92.5689 99.4645 92.5319L102.915 89.3537C103.868 88.4756 103.868 87.053 102.915 86.1749C101.963 85.2974 100.418 85.2974 99.4645 86.1749L96.0138 89.3537C96.0138 89.3537 96.0138 89.3537 96.0138 89.3543L96.0113 89.352L93.0269 92.0937C92.5971 90.5977 93.015 88.9375 94.2885 87.764L97.7391 84.5858C99.6454 82.8308 102.735 82.8308 104.64 84.5858C106.546 86.3408 106.546 89.1872 104.64 90.9422ZM90.4496 99.286L90.4458 99.2826C90.2208 99.4918 89.9086 99.6225 89.563 99.6225C88.8782 99.6225 88.3234 99.1126 88.3234 98.4837C88.3234 98.1542 88.4779 97.8594 88.7217 97.6513L96.923 90.1156C97.1498 89.8925 97.4703 89.7502 97.829 89.7502C98.5139 89.7502 99.0687 90.2601 99.0687 90.8891C99.0687 91.2001 98.9317 91.4821 98.7118 91.6879L98.7155 91.6914L90.4496 99.286ZM87.8924 96.8073L84.4417 99.9855C83.4892 100.863 83.4892 102.286 84.4417 103.164C85.3942 104.041 86.9392 104.041 87.8924 103.164L91.343 99.9855C91.3669 99.9624 91.3832 99.9364 91.4071 99.9133L94.3262 97.2304C94.7622 98.7311 94.3456 100.397 93.0683 101.575L89.6177 104.753C87.7114 106.508 84.622 106.508 82.7163 104.753C80.8107 102.997 80.8107 100.152 82.7163 98.3958L86.167 95.2176C87.4462 94.0395 89.257 93.6563 90.8868 94.0597L87.9168 96.7888C87.9087 96.7957 87.8999 96.8003 87.8924 96.8073Z"
						:fill="themeColor.themeColor" />
				</svg>
				<view class="bind-success">绑定成功</view>
			</view>
			<view class="next" @click="next">{{ current === 3 ? '完成' : current === 2 ? '确认绑定' : '下一步' }}</view>
		</view>
		<uni-popup v-if="isShow" ref="bank" type="bottom" class="bank-list-box" @closed="closePay" @change="changePay">
			<bank-list @closePay="closePay" :data="bank" @searchBank="searchBank" @setBank="setBank" />
		</uni-popup>
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import oneInput from '@/components/myp-one/myp-one'
import BankList from "@/pages/common/userCenter/bank/common/BankList";
import imageSvgUrl from '@/components/common/imageSvgUrl'
import {
	mapGetters
} from 'pinia';
import {
	addBankCard,
	bankList,
	getRealName,
	setPinCode
} from "@/utils/lottery/mine";
export default {
	components: {
		Header,
		oneInput,
		BankList,
		imageSvgUrl
	},
	data() {
		return {
			isBack: true,
			current: 1,
			pwd_step: 0,
			pwd: '',
			repwd: '',
			formData: {
				bankId: '',
				realName: '',
				bankNumber: '',
				bankBranchName: '',
			},
			bank: [],
			BankInfo: null,
			isShow: false,
		}
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor']),

	},
	onLoad() {
		this.realName()
		this.getBankList()
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	methods: {
		changePay(e) {
			// console.log(e);
			if (e.show == false) {
				this.closePay();
			}
		},
		async realName() {
			const res = await getRealName()
			if (res.result) {
				this.formData.realName = res.result
			}
		},
		async getBankList() {
			const res = await bankList({
				bankName: this.keyword
			})
			this.bank = res.result
		},
		setBank(item) {
			this.BankInfo = item
			this.formData.bankId = item.id
			this.closePay()
		},
		searchBank(keyword) {
			this.keyword = keyword
			this.getBankList()
		},
		selectBank() {
			this.$nativeBridge.setStatusBarColor('#B2B2B2')
			this.isShow = true
			setTimeout(() => {
				this.$refs.bank.open()
			}, 100);
		},
		closePay() {
			this.$nativeBridge.setStatusBarColor('#ffffff')
			this.isShow = false
		},
		async next() {
			if (this.current === 0) {
				if (this.pwd == '') {
					pop("请输入密码", 2000)
					return false
				}
				if (this.repwd !== this.pwd) {
					pop("两次密码不一致", 2000)
					return
				}
				const res = await setPinCode({
					pinCode: this.pwd
				})
				if (res.code !== 200) {
					pop(res.message, 2000)
					return
				}
				pop("设置成功", 2000)
				this.current = 1
				this.isBack = false
			} else if (this.current === 1) {
				if (this.formData.realName != '' && this.formData.bankNumber != '' && this.formData.bankId != '' && this.formData.bankBranchName !== '') {
					this.current = 2
					return
				}
				pop("请输入完整的信息", 2000)
			} else if (this.current === 2) {
				this.confirmBtn()
			} else if (this.current === 3) {
				this.jump()
			}
		},
		async confirmBtn() {
			if (this.isAction == true) {
				pop("请不要重复提交", 2000)
				return false
			}
			this.isAction = true
			// this.formData.bankNumber = prams.bankNumber.replace(/\s+/g, '');

			const res = await addBankCard({
				bankId: this.formData.bankId,
				bankNumber: this.formData.bankNumber.replace(/\s+/g, ''),
				realName: this.formData.realName,
				bankBranchName: this.formData.bankBranchName
			})

			this.isAction = false
			if (res.code !== 200) {
				pop(res.message, 2000)
				return false
			}
			this.current = 3
		},
		finishedOne(val) {
			this.pwd = val
			this.pwd_step = 1
		},
		finishedAct(val) {
			this.repwd = val
		},
		steps_src(num) {
			let img = this.current >= num ? 'green' : 'gray'

			return `/static/img/all/login/subtract-${img}.svg`
		},
		jump() {
			const urlMap = {
				'ALL': '/pages/liuhe/home/index',
				'LIUHE': '/pages/liuhe/indexNew',
				'LUNTAN': '/pages/luntan/index'
			}
			uni.switchTab({
				url: urlMap[this.$config.station]
			})
		},
	}
}
</script>
<style lang="scss" scoped>
::v-deep .u-form-item--left {
	width: 120rpx !important;
	flex: 0 0 120rpx !important;
}

.tiaoguo {
	text-align: right;
}

.content {
	.steps {
		padding: 80rpx 106rpx;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		background: #fff;
		border-radius: 24rpx;
		margin-top: 20rpx;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon {
				width: 88rpx;
				height: 88rpx;
			}

			.text {
				color: #A1A1A1;
				font-size: 28rpx;
				margin-top: 20rpx;
			}

			.text-current {
				color: var(--theme-color);
			}
		}

		.center {
			margin-top: 36rpx;

			.rect {
				transition: all .3s;
			}
		}
	}

	.pwd-box {
		padding: 60rpx;

		.title {
			color: var(--theme-auxiliary-color-remind);
			font-size: 28rpx;
			margin-bottom: 40rpx;
			text-align: center;
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

	.card-box {
		.title {
			color: #A1A1A1;
			font-size: 26rpx;
			padding: 20rpx 28rpx;

			.icon {
				margin-right: 10rpx;
			}
		}

		.inputs {
			border-radius: 24rpx;
			background: #FFF;
			margin-bottom: 40rpx;

			.item {
				padding: 30rpx 28rpx;
			}

			.bank {
				color: #404040;
				font-size: 28rpx;
				display: flex;
				align-items: center;

				.icon {
					width: 68rpx;
					height: 68rpx;
					margin-right: 10rpx;
				}
			}

			.item+.item {
				border-top: 1px solid var(--theme-auxiliary-color-default);
			}
		}
	}

	.bank-box {
		.title {
			color: #A1A1A1;
			font-size: 26rpx;
			padding: 20rpx 28rpx;

			.icon {
				margin-right: 10rpx;
			}
		}

		.list-box {
			border-radius: 24rpx;
			background: #FFF;
			margin-bottom: 40rpx;
			padding: 40rpx 28rpx;
			display: flex;

			.img {
				width: 68rpx;
				height: 68rpx;
			}

			.right {
				margin-left: 20rpx;

				.bank-name {
					font-size: 28rpx;
					color: #404040;
				}

				.bank-number {
					font-size: 24rpx;
					color: #3E4347;
				}
			}
		}
	}

	.success-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60rpx;

		.bind-success {
			margin-top: 20rpx;
		}
	}

	.next {
		margin: 0 32rpx;
		height: 88rpx;
		border-radius: 20rpx;
		background: var(--theme-color);
		display: grid;
		place-content: center;
		color: #FFF;
		font-size: 34rpx;
	}
}

.bank-list-box {
	::v-deep .bank-div {
		height: calc(var(--vh) - 88rpx) !important;
		max-width: 480px;

		.search-box {
			.uni-searchbar {
				width: 694rpx;
				height: 88rpx;

				.uni-searchbar__box {
					border-radius: 16rpx !important;
					width: 100%;
					height: 100% !important;
				}
			}
		}

		.uni-list-item__container {
			padding: 30rpx 28rpx;
		}
	}

	::v-deep .content-box {
		border-radius: 40rpx 40rpx 0 0;
		overflow: hidden;
		max-width: 480px;
		margin-left: auto;
		margin-right: auto;
	}
}

::v-deep {
	.uni-list--border {
		width: calc(100% - 28rpx);
		margin: 0 auto;
	}

	.uni-popup {
		z-index: 99999;
	}

	.content-box {
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;

		.bank {
			width: auto !important;
			max-width: none !important;
			height: calc(var(--vh) - 134rpx);
		}
	}
}
</style>
