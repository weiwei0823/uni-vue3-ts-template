<template>
	<view class="add-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="title">
			<image class="tan" src="/static/imgs-liuhe/bank/warning.png"></image>
			{{ $t('pages.common.userCenter.bank.add.BindCard') }}
		</view>
		<view class="from">
			<view class="from-row">
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.add.Name') }}</view>
					<view class="right">
						<uni-easyinput class="input-item" v-model="formData.realName" @blur="isDone" @clear="isDone"
							:inputBorder="false" :styles="styles" :disabled="isDisabled"
							:placeholderStyle="placeholderStyle2"
							:placeholder="$t('pages.common.userCenter.bank.add.NamePlaceholder')"></uni-easyinput>
					</view>
				</view>
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.add.CardNumber') }}</view>
					<view class="right">
						<uni-easyinput class="input-item"
							:suffixIcon="formData.bankNumber.length < 1 ? 'none' : 'closeempty'"
							@iconClick="clearBankNumber" v-model="formData.bankNumber" @focus="handleFocus"
							@blur="isDone" @clear="isDone" :inputBorder="false" :styles="styles"
							:placeholderStyle="placeholderStyle2"
							:placeholder="$t('pages.common.userCenter.bank.add.CardNumberPlaceholder')"></uni-easyinput>
					</view>
				</view>
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.add.Bank') }}</view>
					<view class="right" @click="selectBank()">
						<view class="text-box">
							<view class="text" v-if="!BankInfo.name">
								{{ $t('pages.common.userCenter.bank.add.SelectBank') }}
							</view>
							<view class="bank" v-else>
								<image :src="BankInfo.logoMobile"></image>
								{{ BankInfo.name }}
							</view>
						</view>
						<view class="arrow">
							<uni-icons type="forward" style="color: #999999;" size="20"></uni-icons>
						</view>
					</view>
				</view>
				<view class="from-rol">
					<view class="left">开户行：</view>
					<view class="right">
						<uni-easyinput class="input-item"
							:suffixIcon="formData.bankBranchName.length < 1 ? 'none' : 'closeempty'"
							@iconClick="clearBankNumber" v-model="formData.bankBranchName" @focus="handleFocus"
							@blur="isDone" @clear="isDone" :inputBorder="false" :styles="styles"
							:placeholderStyle="placeholderStyle2"
							placeholder="请输入开户行地址"></uni-easyinput>
					</view>
				</view>
			</view>
		</view>
		<view class="next-box">
			<view :class="[setIsDisbabled ? 'next-btn disabled' : 'next-btn']" @click="nextBtn">
				{{ $t('pages.common.userCenter.bank.add.Next') }}
			</view>
		</view>
		<uni-popup v-if="isShow" class="bank-list-box" ref="bank" type="bottom" @opened="onPopupOpened" @closed="closePay" @change="changePay">
			<bank-list @closePay="closePay" :data="bank" @searchBank="searchBank" @setBank="setBank" :isBack="false" >
			</bank-list>
		</uni-popup>
		<uni-popup ref="bankConfirm" type="right">
			<Confirm @closeNext="closeNext" @backIndex="backIndex" :data="BankInfo" :form-data="formData" />
		</uni-popup>
		<uni-popup ref="succ" type="right">
			<Success :option="option" />
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import BankList from "./common/BankList";
	import Confirm from "./common/Confirm";
	import Success from "./common/Success";
	import {
		bankList,
		getRealName
	} from "@/utils/lottery/mine";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			BankList,
			Confirm,
			Success
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.bank.add.AddBankCard'),
				headerStyle: {
					backgroundColor: "#fff",
					'border-radius': '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040",
					'font-weight': 600
				},
				placeholderStyle: "'font-weight': '500';'font-size': '32rpx';'line-height': '45rpx';'color': '#757575';",
				styles: {
					'width': '100%',
					'height': '100%',
					'border': 'none',
					'background': '#FFFFFF',
					'text-align': 'left',
				},
				placeholderStyle2: "font-weight: 400;font-size: 28rpx;",
				isAction: false,
				isShow:false,
				keyword: '',
				bank: [],
				BankInfo: {
					name: ""
				},
				isDisabled: false,
				formData: {
					bankId: '',
					realName: '',
					bankNumber: '',
					bankBranchName: ''
				},
				option: {},
				isFocus: false
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(option) {
			this.option = option
			this.realName()
			this.getBankList()
		},
		computed: {
			...mapGetters(['themeColor']),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			setIsDisbabled() {
				if (this.formData.bankNumber && this.BankInfo.name && this.formData.realName && this.formData.bankBranchName) {
					return false
				} else {
					return true
				}
			}
		},
		methods: {
			changePay(e){
				// console.log(e);
				if(e.show==false){
					this.closePay();
				}
			},
			backPage() {
				backPage()
			},
			selectBank() {
				// console.log('this.isFocus',this.isFocus);
				if (this.isFocus) {
					return
				}
				this.$nativeBridge.setStatusBarColor('#B2B2B2')
				this.isShow= true
				setTimeout(() => {
					this.$refs.bank.open()
				}, 100);
			},
			searchBank(keyword) {
				this.keyword = keyword
				this.getBankList()
			},
			setBank(item) {
				this.BankInfo = item
				this.formData.bankId = item.id
				this.isDone()
				this.closePay()
			},
			openPopup() {
                 this.$refs.popup.open();
			},
			closePopup() {
				this.$refs.popup.close();
			},
			onPopupOpened() {
              document.addEventListener('click', this.onMaskClick);
              document.addEventListener('touchstart', this.onMaskClick);
            },
            onPopupClosed() {
              document.removeEventListener('click', this.onMaskClick);
              document.removeEventListener('touchstart', this.onMaskClick);
            },
            onMaskClick(event) {
              const popup = this.$refs.popup.$el;
              if (!popup.contains(event.target)) {
                this.closePopup();
              }
            },
			closePay() {
				this.$nativeBridge.setStatusBarColor('#ffffff')
				this.isShow= false
			},
			handleFocus() {
				this.isFocus = true
			},
			isDone() {
				setTimeout(() => {
					this.isFocus = false
				}, 200);
				if (this.formData.realName != '' && this.formData.bankNumber != '' && this.formData.bankId != '' && this.formData.bankBranchName !== '') {
					this.isAction = true
				} else {
					this.isAction = false
				}
			},
			nextBtn() {
				if (this.setIsDisbabled) {
					return
				} else {
					this.$refs.bankConfirm.open()
				}
			},
			closeNext() {
				this.$refs.bankConfirm.close()
			},
			backIndex() {
				this.$refs.bankConfirm.close()
				this.$refs.succ.open()
			},
			realName() {
				getRealName().then(res => {
					if (res.result) {
						this.isDisabled = true
						this.formData.realName = res.result
					}
				}).catch(err => {})
			},
			getBankList() {
				let prams = {
					bankName: this.keyword,
				};
				bankList(prams).then(res => {
					this.bank = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			clearBankNumber(e) {
				this.formData.bankNumber = ''
				this.formData.bankBranchName = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .bank-div {
		max-width: 480px !important;
	}

	/deep/ .uni-popup {
		z-index: 999;
	}

	/deep/ .input-item .uni-easyinput__content .content-clear-icon {
		color: var(--theme-color) !important;
	}

	.add-box {


		.title {
			color: var(--theme-font-default-shallow-color);
			font-size: 26rpx;
			display: flex;
			align-items: center;
			padding: 20rpx 28rpx;

			.tan {
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}
		}

		.from {
			.from-row {
				border-radius: 24rpx;
				background: #FFF;
				overflow: hidden;

				.from-rol {
					display: flex;
					height: 96rpx;
					padding: 20rpx 28rpx;
					box-sizing: border-box;
					background: #FFFFFF;
					border-bottom: 1px solid var(--theme-auxiliary-color-default);
					align-items: center;

					&:last-child {
						border-bottom: none;
					}

					.left {
						font-weight: 400;
						color: var(--theme-font-default-deep-color);

						font-size: 28rpx;
					}

					.right {
						// width: 85%;
						width: calc(100% - 84rpx);
						flex: 1;
						display: flex;

						.text-box {
							width: 90%;
							margin-left: 20rpx;
							color: #999999;
							font-size: 28rpx;
							display: flex;
							align-items: center;
						}

						.bank {
							width: 90%;
							color: #404040;
							display: flex;
							align-items: center;

							image {
								margin-right: 4rpx;
								height: 40rpx;
								width: 40rpx;
							}
						}

						.arrow {
							width: 10%;
							text-align: right;
						}
					}
				}
			}
		}

		.next-box {
			clear: both;
			margin-top: 40rpx;
			display: flex;
			justify-content: center;

			.next-btn {
				width: 694rpx;
				height: 88rpx;
				background: var(--theme-color);
				border-radius: 16rpx;
				font-weight: 500;
				font-size: 34rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.next-btn.disabled {
				background: linear-gradient(90deg, #D2D2D2 0%, #C8C9CC 52.89%, #CCC 100%);
			}
		}
	}

	.bank-list-box {
		/deep/ .bank-div {
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

		/deep/ .content-box {
			border-radius: 40rpx 40rpx 0 0;
			overflow: hidden;
			max-width: 480px;
			margin-left: auto;
			margin-right: auto;
		}
	}


	/deep/ .header {
		border-radius: 0 0 20rpx 20rpx;
		overflow: hidden;

		.uni-navbar__header {
			padding: 0 28rpx;
		}
	}
</style>
