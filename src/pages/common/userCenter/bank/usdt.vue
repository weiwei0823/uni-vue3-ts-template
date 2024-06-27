<template>
	<view class="add-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!-- <NavBar :title="title" :header-style="headerStyle" :bg-color="headerStyle.backgroundColor" :font-color="fontColor"
			:title-style="titleStyle" :isBack="false">
			<block slot="left">
				<view class="" @click="backPage">
					<filterIcon src="@/static/imgs-liuhe/activity/back.png" :width="24" :height="42" />
				</view>

			</block>
		</NavBar> -->
		<Header :title="title" />
		<view class="title">
			<image class="tan" src="@/static/imgs-liuhe/bank/warning.png"></image>
			{{ $t('pages.common.userCenter.bank.usdt.BindingInstructions') }}
		</view>
		<view class="from">
			<view class="from-row">
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.usdt.USDTAddress') }}</view>
					<view class="right">
						<uni-easyinput class="input-item" v-model="formData.bankNumber" @blur="isDone" @clear="isDone"
							clearableType="closeempty" primaryColor="var(--theme-color)" :inputBorder="false"
							:styles="styles" :placeholderStyle="placeholderStyle2"
							:placeholder="$t('pages.common.userCenter.bank.usdt.UsdtAddress')">
						</uni-easyinput>
					</view>
				</view>
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.usdt.Network') }}</view>
					<view class="right" @click="selectBank()">
						<view class="text-box">
							<view class="text" v-if="!BankInfo">
								{{ $t('pages.common.userCenter.bank.usdt.SelectNetwork') }}
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
			</view>
		</view>
		<view class="next-box">
			<view class="next-btn" :class="isAction ? 'active' : 'next-btn'" @click="nextBtn">下一步</view>
		</view>
		<uni-popup v-if="isShow" class="bank-list-box" ref="bank" type="bottom" @opened="onPopupOpened" @closed="closePay" @change="changePay">
			<bank-list @closePay="closePay" :data="showBank" @searchBank="searchBank" @setBank="setBank"
				:title="$t('pages.common.userCenter.bank.usdt.SelectNetwork')"
				:placeholder="$t('pages.common.userCenter.bank.usdt.EnterNetworkName')">
			</bank-list>
		</uni-popup>
		<uni-popup ref="bankConfirm" type="right">
			<ConfirmUsdt @closeNext="closeNext" @backIndex="backIndex" :data="BankInfo" :form-data="formData"
				:text="$t('pages.common.userCenter.bank.usdt.NetworkName')" />
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
	import ConfirmUsdt from "./common/ConfirmUsdt";
	import Success from "./common/Success";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		getUSDTMain
	} from "@/utils/lottery/mine";
	import Header from '@/components/common/header/index.vue';
	import defaultTemplate from "@/utils/defaultTemplate";
	import {
		bankList
	} from "@/utils/lottery/mine";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "usdt",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar,
			BankList,
			ConfirmUsdt,
			Success,
			Header
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.bank.index.AddUSDTAddress'),
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
				placeholderStyle2: "font-weight: 400;font-size: 28rpx;text-align:left",
				isAction: false,
				isShow:false,
				keyword: '',
				bank: [{
						id: 1,
						name: 'TRC20',
						logoMobile: '@/static/img/user/bank/virtual.png'
					},
					{
						id: 2,
						name: 'ERC20',
						logoMobile: '@/static/img/user/bank/ethereum.png'
					},
					{
						id: 3,
						name: 'OMNI',
						logoMobile: '@/static/img/user/bank/bitcoin.png'
					},
					{
						id: 4,
						name: 'BEP2',
						logoMobile: '@/static/img/user/bank/bian.png'
					}
				],
				BankInfo: null,
				formData: {
					bankId: '',
					bankNumber: '',
				}
			}
		},
		computed: {
			...mapGetters(["themeColor"]),
			showBank() {
				return this.bank.filter(item => item.name.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1)
			},
		},
		onLoad() {
			getUSDTMain({
				groupId: 3
			}).then((res) => {
				const data = defaultTemplate([], res.result)
				this.bank = data.map(item => ({
					id: item.id,
					name: item.name,
					logoMobile: item.logo
				}))
			})
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
				this.isShow= true
				setTimeout(() => {
					this.$refs.bank.open()
				}, 100);
			},
			searchBank(keyword) {
				this.keyword = keyword
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
			isDone() {
				if (this.formData.bankNumber != '' && this.formData.bankId != '') {
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
					padding: 20rpx 28rpx;
					box-sizing: border-box;

					.uni-searchbar {
						width: 100%;
						height: 88rpx;
						padding: 0 !important;

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
