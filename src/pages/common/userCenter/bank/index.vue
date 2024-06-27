<template>
	<view class="bank-box pc-max-width"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed>
			<block slot="right">
				<view class="kefu" @click="isShow = !isShow">{{ $t('pages.common.userCenter.bank.index.Filter') }}
				</view>
			</block>
		</Header>

		<view class="filter-box" v-show="isShow" @click="isShow = false">
			<view class="filter-row" @click.stop="isShow = true">
				<view class="filter-list">
					<view class="filter-item" v-for="(item, index) in filterMenus" :class="{ act: curr == index }"
						@click.stop="selcetType(item, index)">
						{{ item.name }}
					</view>
				</view>
				<view class="filter-btn">
					<view class="cancel-btn" @click.stop="isShow = false">
						{{ $t('pages.common.userCenter.bank.index.Cancel') }}
					</view>
					<view class="confirm-btn" @click.stop="confirmBtn">
						{{ $t('pages.common.userCenter.bank.index.Confirm') }}
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y :enhanced="true" :bounces="false"
			:show-scrollbar="false" class="content-list">
			<view class="bank-list">
				<view class="list-item" v-for="(item, index) in showBankList">
					<view class="left">
						<view class="top" :class="{ 'is-qrcode': item.type == 3 }">
							<view class="img">
								<image :src="item.logoMobile || '@/static/img/user/bank/usdt.png'"></image>
							</view>
							<view class="title">
								<view class="name">{{ item.type == 4 ? 'USDT地址' : item.bankName }}</view>
								<view class="desc" v-if="item.type == 1">
									{{ $t('pages.common.userCenter.bank.index.SavingsCard') }}
								</view>
								<view class="desc" v-if="item.type == 4">{{ item.bankBranchName }}</view>
							</view>
							<view class="qrcode" v-if="item.type == 3">
								<image :src="item.bankNumber"></image>
							</view>
						</view>
						<view class="card" v-if="item.type == 1">
							<text style="margin-top: 20rpx;margin-right: 10rpx">**** **** ****</text>
							{{ " " + item.bankNumber.substr(-4) }}
						</view>
						<view class="card-bt" v-if="item.type == 2 || item.type == 4">
							{{ item.bankNumber }}
						</view>
					</view>
					<view class="right">
						<view class="untie-btn" @click="untie(item)">
							{{ $t('pages.common.userCenter.bank.index.Unbind') }}
						</view>
					</view>
				</view>

				<!--      <view class="list-item">
          <view class="left">
            <view class="top">
              <view class="img">
                <image src="@/static/img/user/bank/bank.png"></image>
              </view>
              <view class="title">
                <view class="name">OKpay钱包</view>
                <view class="desc"></view>
              </view>
            </view>
            <view class="card-bt">
              TMAHKaSdCz148808FTtjYWscaz83pbYdAMt
            </view>
          </view>
          <view class="right">
            <view class="untie-btn disabled">解<br/>绑</view>
          </view>
        </view>-->
			</view>
			<view class="btn-box">
				<view class="btn" v-show="bindType.indexOf(1)!=-1" @click="toUrl('/pages/common/userCenter/bank/add')">
					<imageSvgUrl style="margin-right:20rpx;" url="@/static/img/user/bank/svgs/1.svg" :width="48"
						:height="48" replaceThemeTargetColor="#07C160" />
					{{ $t('pages.common.userCenter.bank.index.AddNewBankCard') }}
				</view>
				<view class="btn" v-show="bindType.indexOf(4)!=-1"  @click="toUrl('/pages/common/userCenter/bank/usdt')">
					<imageSvgUrl style="margin-right:20rpx;" url="@/static/img/user/bank/svgs/1.svg" :width="48"
						:height="48" replaceThemeTargetColor="#07C160" />
					{{ $t('pages.common.userCenter.bank.index.AddUSDTAddress') }}
				</view>
				<view class="btn" v-show="bindType.indexOf(2)!=-1" @click="toUrl('/pages/common/userCenter/bank/wallet')">
					<imageSvgUrl style="margin-right:20rpx;" url="@/static/img/user/bank/svgs/1.svg" :width="48"
						:height="48" replaceThemeTargetColor="#07C160" />
					{{ $t('pages.common.userCenter.bank.index.AddThirdPartyWallet') }}
				</view>
				<view class="btn" v-show="bindType.indexOf(3)!=-1" @click="toUrl('/pages/common/userCenter/bank/qrcode')">
					<imageSvgUrl style="margin-right:20rpx;" url="@/static/img/user/bank/svgs/1.svg" :width="48"
						:height="48" replaceThemeTargetColor="#07C160" />
					{{ $t('pages.common.userCenter.bank.index.AddPaymentQRCode') }}
				</view>
			</view>
			<view class="hint">
				<view class="hint-box">
					<text class="hint-title">
						<!-- <image src="@/static/img/user/bank/warning.png"></image> -->
						<u-icon name="error-circle-fill" color="#f00" size="28"></u-icon>
						{{ $t('pages.common.userCenter.bank.index.Tip') }}</text>
					<view class="content">
						<view class="label">
							<view class="circle"></view>
							<view class="text">数字钱包存取款快捷方便</view>
						</view>
						<view class="label">
							<view class="circle"></view>
							<view class="text">
								您最多只能绑定5张银行卡；
							</view>
						</view>
						<view class="label">
							<view class="circle"></view>
							<view class="text">{{ $t('pages.common.userCenter.bank.index.MaxOneUSDTAddress') }}</view>
						</view>
						<view class="label">
							<view class="circle"></view>
							<view class="text">{{ $t('pages.common.userCenter.bank.index.MaxOneAlipayAndOneWeChat') }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="pwd-box">
				<view class="top-box">
					<view class="title">{{ $t('pages.common.userCenter.bank.index.EnterPaymentPassword') }}</view>
					<view class="close" @click="closed">
						<uni-icons type="closeempty" style="color: #D9D9D9;" size="25"></uni-icons>
					</view>
				</view>
				<one-input v-model="pwd" :maxlength="6" :isPwd="true" @finish="finishedOne" ref="hi" type="xin">
				</one-input>
				<view class="forget" @click="toUrl('/pages/common/userCenter/service/index')">
					{{ $t('pages.common.userCenter.bank.index.ForgotPassword') }}
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="err" type="center" :mask-click="false">
			<PopItem @close="close" :msg="msg"></PopItem>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	import {
		bankCardList,
		bankListInit,
		unbindBank
	} from "@/utils/lottery/mine";
	import oneInput from '@/components/myp-one/myp-one'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import PopItem from "@/components/common/PopItem/PopItem";
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
			PopItem,
			imageSvgUrl
		},
		computed: {
			...mapGetters(['themeColor']),
			showBankList(){
				if (!this.bankList.length) {
					return []
				}
				if (!this.prams.type) {
					return this.bankList
				}
				return this.bankList.filter((item)=>item.type === this.prams.type)
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.bank.index.MyBankCard'),
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
				isShow: false,
				curr: 0,
				filterMenus: [{
						type: 0,
						name: this.$t('pages.common.userCenter.bank.index.All')
					},
					{
						type: 1,
						name: this.$t('pages.common.userCenter.bank.index.BankCards')
					},
					{
						type: 2,
						name: this.$t('pages.common.userCenter.bank.index.Wallet')
					},
					{
						type: 3,
						name: this.$t('pages.common.userCenter.bank.index.QRCode')
					},
					{
						type: 4,
						name: 'USDT'
					}
				],
				checkData: null,
				prams: {
					type: '',
				},
				pwd: '',
				bankList: [],
				bindType:[],
				unId: 0,
				msg: '',
				winHeight: 0
			}
		},
		onLoad() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onShow() {
			this.getBankCardList()
		},
		methods: {
			close() {
				this.$refs.err.close()
			},
			back() {
				uni.redirectTo({
					url: "/pages/common/safeCenter/index"
				})
			},
			filterBtn() {
				this.$refs.popup.open();
			},
			selcetType(item, index) {
				this.curr = index
				this.checkData = item
			},
			confirmBtn() {
				this.isShow = false
				if (this.checkData != null) {
					if (this.checkData.type == 0) {
						this.prams.type = ""
					} else {
						this.prams.type = this.checkData.type
					}
					this.getBankCardList()
				}
			},
			//解绑
			untie(item) {
				this.unId = item.id
				this.pwd = '';
				this.$refs.popup.open();
				this.$nextTick(function () {
					this.$refs.hi.onFocus();
				});
			},
			closed() {
				this.$refs.popup.close()
			},
			finishedOne(val) {
				let prams = {
					id: this.unId,
					pinCode: val
				};
				this.$refs.popup.close()
				this.pwd = '';
				unbindBank(prams).then(res => {
					if (res.code == 200) {
						pop(res.message, 2000)
						this.getBankCardList()
					} else if (res.code == 600) {
						this.msg = res.message
						this.$refs.popup.close()
						this.$refs.err.open()
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toClear() {
				this.test = ''
				this.$refs.hi.clear()
			},
			toUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			//获取银行卡列表
			getBankCardList() {
				let prams = this.prams
				bankListInit(prams).then(res => {
					this.bankList = res.result.bankList||[]
					let types = res.result?res.result.bindType:[];
					this.bindType= types.map(i=>{ return Number(i)});
					console.warn(this.bindType)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank-box {

		display: flex;
		flex-direction: column;
		height: var(--vh);

		.kefu {
			font-weight: 500;
			font-size: 28rpx;
			line-height: 39rpx;
			color: var(--theme-color);
			text-align: right;
		}

		.filter-box {
			width: 100%;
			max-width: 480px;

			.filter-row {
				width: 100%;
				max-width: 480px;
				position: fixed;
				z-index: 20;
				height: var(--vh);
				background: rgba(0, 0, 0, 0.5);

				.filter-list {
					height: 158rpx;
					background: #F6F6F6;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					padding: 0px 28rpx;
					gap: 20rpx;

					.filter-item {
						width: 20%;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 83rpx;
						background: #FFFFFF;
						border: 1px solid #DDDDDD;
						border-radius: 10rpx;
						padding: 10rpx;
						gap: 10rpx;
						font-weight: 400;
						font-size: 28rpx;
						line-height: 22rpx;
						text-align: center;
						color: #000000;
					}

					.act {
						background: var(--theme-color);
						color: #FFFFFF;
					}
				}

				.filter-btn {
					margin-top: -1px;
					display: flex;
					background: #FFFFFF;
					border-radius: 0px 0px 30rpx 30rpx;
					font-weight: 400;
					font-size: 28rpx;
					text-align: center;

					.cancel-btn {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						padding: 10rpx;
						width: 50%;
						height: 80rpx;
						color: #949494;
					}

					.confirm-btn {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						padding: 10rpx;
						width: 50%;
						height: 80rpx;
						color: var(--theme-color);
					}
				}
			}
		}

		.content-list {
			flex: 1;
			height: 0;
			margin-top: 20rpx;

			.bank-list {
				display: flex;
				flex-direction: column;
				align-items: center;

				.list-item {
					height: 178rpx;
					width: 694rpx;
					background: #FFFFFF;
					border-radius: 24rpx;
					display: flex;
					margin-bottom: 26rpx;

					.left {
						width: 88%;
						padding: 29rpx;
						border-radius: 24rpx 0 0 24rpx;
						background: #FFFFFF;

						.top {
							display: flex;

							.img {
								margin-right: 36rpx;

								image {
									height: 68rpx;
									width: 68rpx;
								}
							}

							.title {
								display: flex;
								flex-direction: column;
								justify-content: center;

								.name {
									font-size: 32rpx;
									line-height: 32rpx;
									color: #404040;
									margin-bottom: 8rpx;
								}

								.desc {
									font-size: 24rpx;
									line-height: 24rpx;
									color: #404040;
								}
							}

							.qrcode {
								width: 40%;
								display: flex;
								align-items: center;
								flex-direction: row-reverse;

								image {
									height: 60rpx;
									width: 60rpx;
								}
							}
						}

						.is-qrcode {
							height: 100%;
							align-items: center;
						}

						.card {
							font-weight: 500;
							font-size: 40rpx;
							line-height: 46rpx;
							color: rgb(48, 51, 55);
							display: flex;
							justify-content: flex-start;
							align-items: center;
						}

						.card-bt {
							margin-top: 6rpx;
							font-weight: 500;
							font-size: 28rpx;
							line-height: 48rpx;
							color: rgb(48, 51, 55);
							width: 500rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
					}

					.right {
						width: 12%;
						border-top-right-radius: 24rpx;
						border-bottom-right-radius: 24rpx;
						position: relative;

						.untie-btn {
							height: 178rpx;
							width: 100%;
							background: #A1A1A1;
							display: flex;
							font-weight: 400;
							font-size: 28rpx;
							line-height: 22rpx;
							color: #FFFFFF;
							border-top-right-radius: 24rpx;
							border-bottom-right-radius: 24rpx;
							align-items: center;
							justify-content: center;
							writing-mode: tb-rl;
						}

						.disabled {
							background: #D7D7D7;
						}
					}
				}
			}

			.btn-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-top: 26rpx;

				.btn {
					width: 694rpx;
					height: 128rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					background: #FFFFFF;
					border-radius: 24rpx;
					font-weight: 400;
					font-size: 30rpx;
					line-height: 40rpx;
					color: #404040;
					margin-bottom: 30rpx;

					image {
						width: 48rpx;
						height: 48rpx;
						margin-right: 20rpx;
					}
				}
			}

			.hint {
				display: flex;
				justify-content: center;
				padding-bottom: 160rpx;

				.hint-box {
					width: 705rpx;

					.hint-title {
						font-size: 26rpx;
						line-height: 42rpx;
						text-align: center;
						color: #A1A1A1;
						font-weight: 500;

						image {
							width: 28rpx;
							height: 28rpx;
							margin-right: 10rpx;
						}
					}

					.content {
						font-weight: 400;
						font-size: 26rpx;
						line-height: 44rpx;
						color: #A1A1A1;
						padding-left: 20rpx;

						.label {
							display: flex;
							align-items: center;

							.circle {
								width: 12rpx;
								height: 12rpx;
								background: var(--theme-color);
								border-radius: 50%;
								margin-right: 10rpx;
							}

							.text {
								width: 90%;
							}
						}
					}
				}
			}
		}


		.pwd-box {
			height: 270rpx;
			width: 684rpx;
			border-radius: 20rpx;
			background: #FFFFFF;

			.top-box {
				display: flex;
				height: 80rpx;
				margin-bottom: 16rpx;
				position: relative;

				.title {
					width: 100%;
					font-weight: 400;
					font-size: 30rpx;
					line-height: 30rpx;
					text-align: center;
					color: #404040;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.close {
					position: absolute;
					right: 20rpx;
					top: 10rpx;
				}
			}

			.forget {
				margin-top: 22rpx;
				font-weight: 400;
				font-size: 28rpx;
				line-height: 30rpx;
				text-align: center;
				color: var(--theme-color);
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
