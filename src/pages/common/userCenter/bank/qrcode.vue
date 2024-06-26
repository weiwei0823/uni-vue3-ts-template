<template>
	<view class="add-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!-- <NavBar :title="title" :header-style="headerStyle" :bg-color="headerStyle.backgroundColor"
			:font-color="fontColor" :title-style="titleStyle" :isBack="false">
			<block slot="left">
				<view class="" @click="backPage">
					<filterIcon src="/static/imgs-liuhe/activity/back.png" :width="24" :height="42" />
				</view>

			</block>
		</NavBar> -->
		<Header :title="title" />
		<view class="title">
			<image class="tan" src="/static/imgs-liuhe/bank/warning.png"></image>
			{{ $t('pages.common.userCenter.bank.qrcode.UploadQRCode') }}
		</view>
		<view class="from">
			<view class="from-row">
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.qrcode.RealName') }}</view>
					<view class="right">
						<uni-easyinput class="input-item" v-model="formData.realName" @blur="isDone" @clear="isDone"
							:inputBorder="false" :styles="styles" :disabled="isDisabled"
							:placeholderStyle="placeholderStyle2"
							:placeholder="$t('pages.common.userCenter.bank.qrcode.EnterName')">
						</uni-easyinput>
					</view>
				</view>
				<view class="from-rol">
					<view class="left">{{ $t('pages.common.userCenter.bank.qrcode.WalletName') }}</view>
					<view class="right" @click="selectBank()">
						<view class="text-box">
							<view class="text" v-if="!BankInfo">
								{{ $t('pages.common.userCenter.bank.qrcode.SelectWallet') }}
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
				<view class="from-rol from-upload">
					<view class="left">{{ $t('pages.common.userCenter.bank.qrcode.UploadQRCodeImage') }}</view>
					<view class="upload">
						<cl-upload v-model="imgList" :fileName="'file'" :fileType="'image'" :action="action"
							:headers="headers" :data="{ addWatermark: false }" :max="1" :listStyle="{
								columnGap: '16rpx',
								rowGap: '16rpx',
								margin: '5px',
								width: '100%',
								height: '85px',
								radius: '20rpx',
								border: '2px dashed #CCCCCC',
								backgroundColor: '#EEEEEE',
							}" @onSuccess="onSuccess" @onError="onErrors">
							<block slot="addImg">
								<uni-icons type="plusempty" color="#dcdee0" size="50"></uni-icons>
							</block>
						</cl-upload>
					</view>
				</view>
			</view>
		</view>
		<view class="next-box">
			<view class="next-btn" :class="isAction ? 'active' : 'next-btn'" @click="nextBtn">
				{{$t('pages.common.userCenter.bank.qrcode.Next')}}
			</view>
		</view>
		<uni-popup v-if="isShow" class="bank-list-box" ref="bank" type="bottom" @opened="onPopupOpened" @closed="closePay"  @change="changePay">
			<bank-list :isShow="false" @closePay="closePay" :data="qrcode"
				:title="$t('pages.common.userCenter.bank.qrcode.SelectQRCodeType')" @searchBank="searchBank"
				@setBank="setBank">
			</bank-list>
		</uni-popup>
		<uni-popup ref="bankConfirm" type="right">
			<ConfirmQrcode @closeNext="closeNext" @backIndex="backIndex" :data="BankInfo" :form-data="formData" />
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
	import ConfirmQrcode from "./common/ConfirmQrcode";
	import {
		getRealName,
		qrcodeTypeList
	} from "@/utils/lottery/mine";
	import {
		config
	} from "@/config/config";
	import Success from "./common/Success";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import Header from '@/components/common/header/index.vue';
	export default {
		name: "qrcode",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar,
			BankList,
			ConfirmQrcode,
			Success,
			Header
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor"]),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.bank.qrcode.AddQRCode'),
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
				qrcode: [],
				BankInfo: null,
				imgList: [],
				action: config.me_base_url[0] + '/api/user/upImg',
				headers: {
					'X-Access-Token': this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_TOKEN)
				},
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
			this.getQrcodeTypeList()
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
				this.getQrcodeTypeList()
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
				if (this.formData.realName != '' && this.formData.bankNumber != '' && this.formData.bankId != '') {
					this.isAction = true
				} else {
					this.isAction = false
				}
			},
			nextBtn() {
				if (this.isAction == false) {
					return false;
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
			getQrcodeTypeList() {
				qrcodeTypeList().then(res => {
					this.qrcode = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 * 自动上传返回的是一张图片信息
			 * 手动上传返回的是已选中所有图片或者视频信息
			 * */
			onSuccess(reslut) {
				// 把服务端返回的图片地址添加到list中与组件数据同步
				this.imgList.push(reslut.result.pictureUrl)
				this.formData.bankNumber = reslut.result.pictureUrl
				this.isDone()
			},
			//上传失败
			onErrors(err) {
				uni.showToast({
					title: '上传失败',
					duration: 2000,
					icon: 'none'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .bank-div {
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

							/deep/ .uni-icons {
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
								border-radius: 50%;
								overflow: hidden;
							}
						}

						.arrow {
							text-align: left;
						}
					}
				}

				.from-upload {
					display: block;
					padding-top: 23rpx;
					height: 255rpx;

					.upload {
						margin-top: 23rpx;
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
	}

	/deep/ .header {
		border-radius: 0 0 20rpx 20rpx;
		overflow: hidden;

		.uni-navbar__header {
			padding: 0 28rpx;
		}
	}
</style>
