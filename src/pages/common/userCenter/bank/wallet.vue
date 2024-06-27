<template>
	<view class="add-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!-- <NavBar :title="title" :header-style="headerStyle" :bg-color="headerStyle.backgroundColor"
			:font-color="fontColor" :title-style="titleStyle" :isBack="false">
			<block slot="left">
				<view class="" @click="backPage">
					<filterIcon src="@/static/imgs-liuhe/activity/back.png" :width="24" :height="42" />
				</view>

			</block>
		</NavBar> -->
		<Header :title="title" />
		<view class="title">
			<image class="tan" src="@/static/imgs-liuhe/bank/warning.png"></image>
			{{ $t('pages.common.userCenter.bank.wallet.BindWallet') }}
		</view>
		<view class="from">
			<view class="from-row">
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.wallet.RealName') }}</view>
					<view class="right">
						<uni-easyinput class="input-item" v-model="formData.realName" @input="realNames" @clear="isDone"
							:inputBorder="false" :styles="styles" :disabled="isDisabled"
							:placeholderStyle="placeholderStyle2"
							:placeholder="$t('pages.common.userCenter.bank.wallet.PleaseEnterName')">
						</uni-easyinput>
					</view>
				</view>
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.wallet.WalletName') }}</view>
					<view class="right" @click="selectBank()">
						<view class="text-box">
							<view class="text" v-if="!BankInfo">
								{{ $t('pages.common.userCenter.bank.wallet.SelectWallet') }}
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
					<view class="left">{{ $t('pages.common.userCenter.bank.wallet.ReceivingAddress') }}</view>
					<view class="right">
						<uni-easyinput class="input-item" v-model="formData.bankNumber" @input="bankNumbers"
							@clear="isDone" :inputBorder="false" clearableType="closeempty"
							primaryColor="var(--theme-color)" :styles="styles" :placeholderStyle="placeholderStyle2"
							:placeholder="$t('pages.common.userCenter.bank.wallet.PleaseEnterWalletAddress')">
						</uni-easyinput>
					</view>
				</view>
			</view>
		</view>
		<view class="next-box">
			<view class="next-btn" :class="isAction ? 'active' : 'next-btn'" @click="nextBtn">
				{{ $t('pages.common.userCenter.bank.wallet.Next') }}
			</view>
		</view>
		<uni-popup v-if="isShows" class="bank-list-box" ref="bank" type="bottom" @opened="onPopupOpened" @closed="closePay" @change="changePay">
			<bank-list :isShow="false" @closePay="closePay" :data="wallet"
				:title="$t('pages.common.userCenter.bank.wallet.ChooseThirdPartyWallet')" @searchBank="searchBank"
				@setBank="setBank" :isBack="false">
			</bank-list>
		</uni-popup>
		<uni-popup ref="bankConfirm" type="right">
			<ConfirmWallet @closeNext="closeNext" @backIndex="backIndex" :data="BankInfo" :form-data="formData" />
		</uni-popup>
		<uni-popup ref="succ" type="right">
			<Success />
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import BankList from "./common/BankList";
	import ConfirmWallet from "./common/ConfirmWallet";
	import {
		getRealName,
		walletList
	} from "@/utils/lottery/mine";
	import Success from "./common/Success";
	import {
		throttle
	} from "@/utils/function";
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "wallet",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar,
			BankList,
			ConfirmWallet,
			Success,
			Header
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: '添加数字钱包',
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
				isShows:false,
				keyword: '',
				wallet: [],
				BankInfo: null,
				isDisabled: false,
				formData: {
					bankId: '',
					realName: '',
					bankNumber: '',
				}
			}
		},
		onLoad() {
			this.realName()
			this.getWalletList()
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
				this.$nativeBridge.setStatusBarColor('#B2B2B2')
				this.isShows= true
				setTimeout(() => {
					this.$refs.bank.open()
				}, 100);
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
			searchBank(keyword) {
				this.keyword = keyword
				this.getWalletList()
			},
			setBank(item) {
				this.BankInfo = item
				this.formData.bankId = item.id
				this.isDone()
				this.closePay()
			},
			closePay() {
				this.$nativeBridge.setStatusBarColor('#ffffff')
				this.isShows= false
			},
			realNames: throttle(function() {
				this.isDone()
			}, 200),
			bankNumbers: throttle(function() {
				this.isDone()
			}, 200),
			isDone() {
				if (this.formData.realName != '' && this.formData.bankNumber != '' && this.formData.bankId != '') {
					this.isAction = true
				} else {
					this.isAction = false
				}
			},
			nextBtn() {
				if (!this.isAction) {
					return
				}
				this.$refs.bankConfirm.open()
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
				}).catch(err => {
					console.log(err)
				})
			},
			getWalletList() {
				walletList().then(res => {
					this.wallet = res.result
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .bank-div {
		max-width: 480px;
	}

	.add-box {


		.title {
			color: #A1A1A1;
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
			border-radius: 24rpx;
			overflow: hidden;

			.from-row {
				.from-rol {
					display: flex;
					height: 96rpx;
					padding: 0rpx 28rpx;
					background: #FFFFFF;
					border-bottom: 1px solid var(--theme-auxiliary-color-default);
					align-items: center;

					&:last-child {
						border-bottom: none;
					}

					.left {
						width: fit-content;
						white-space: nowrap;
						font-weight: 400;
						font-size: 28rpx;
						line-height: 42rpx;
						color: #404040;
					}

					.right {
						flex: 1;
						display: flex;

						.input-item {
							text-align: left;

							::v-deep .uni-icons {
								columns: var(--theme-color) !important;
							}
						}

						.text-box {
							width: 90%;
							margin-left: 20rpx;
							color: #999999;
							text-align: left;
							font-size: 28rpx;
							display: flex;
							align-items: center;
						}

						.bank {
							width: 90%;
							color: #404040;
							font-size: 28rpx;
							display: flex;
							align-items: center;
							justify-content: flex-start;

							image {
								margin-right: 10rpx;
								height: 48rpx;
								width: 48rpx;
							}
						}

						.arrow {
							text-align: left;
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
				background: #C8C9CC;
				border-radius: 16rpx;
				font-size: 34rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.active {
				width: 694rpx;
				height: 88rpx;
				background: var(--theme-color);
				border-radius: 16rpx;
				font-size: 34rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
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
	}

	::v-deep .header {
		border-radius: 0 0 20rpx 20rpx;
		overflow: hidden;

		.uni-navbar__header {
			padding: 0 28rpx;
		}
	}
</style>
