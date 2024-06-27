<template>
	<div class="user-operation" :class="['theme-' + themeColor.name]">
		<view class="left" :class="{ 'is-login': isLogin }">
			<view class="title-box" v-if="isLogin">
				<view class="name">{{ userInfo.nickname || userInfo.userName }}</view>
				<view class="level-box">
					<image class="img" src="@/static/imgs-liuhe/index_02/vip_back.png"></image>
					<view class="level">{{ parseInt(liuheVipSpeedInfo ? liuheVipSpeedInfo.level : "0") }}</view>
				</view>
			</view>
			<view class="title" v-else>{{ $t("components.CommonPages.pages-liuhe.components.userOperation.text1") }}
			</view>
			<view class="balance" v-if="isLogin">
				¥
				<view class="balance-number" v-if="balanceEnd && userInfo.userBalance > 1000">
					{{
						parseFloat(userInfo.userBalance).toLocaleString(undefined, {
							'minimumFractionDigits': 2, 'maximumFractionDigits': 2
						})
					}}
				</view>
				<u-count-to class="balance-number" :start-val="0" :decimals="2"
					:end-val="$store.state.appInfoStore.userInfo.userBalance" v-else></u-count-to>
				<image class="refresh" :src="`/static/imgs-liuhe/index_02/refresh.png`" :class="{ loading }"
					@click="freshUserBanlance"></image>
			</view>
			<view class="btns" v-else>
				<view class="btn login" @click="toLogin('login')">
					{{ $t("components.CommonPages.pages-liuhe.components.userOperation.text2") }}
				</view>
				<view class="btn register" @click="toLogin('register')">
					{{ $t("components.CommonPages.pages-liuhe.components.userOperation.text3") }}
				</view>
			</view>
		</view>
		<view class="right">
			<view class="item" v-for="(item, index) in operationList" :key="index" @click="toUrl(item)">
				<view class="img-box">
					<image class="img" :src="item.icon"></image>
				</view>
				<view class="name">{{ item.name }}</view>
			</view>
		</view>
	</div>
</template>

<script>
import {
	vipSpeed
} from "@/utils/user/vip";
import {
	mapGetters
} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
export default {
	props: {
		status: {
			type: Number,
			default: () => {
				return 0
			}
		}
	},


	data() {
		return {
			loading: false,
			balanceEnd: false,
			operationList: [{
				icon: '@/static/imgs-liuhe/index_02/cash-in.png',
				name: this.$t("components.CommonPages.pages-liuhe.components.userOperation.text4"),
				islogin: true,
				url: '/pages/common/pay/index'
			},
			{
				icon: '@/static/imgs-liuhe/index_02/cash-out.png',
				name: this.$t("components.CommonPages.pages-liuhe.components.userOperation.text5"),
				islogin: true,
				url: '/pages/common/withdraw/index',
				code: "withdraw"
			},
			{
				icon: '@/static/imgs-liuhe/index_02/gift.png',
				name: this.$t("components.CommonPages.pages-liuhe.components.userOperation.text6"),
				islogin: true,
				url: '/pages/liuhe/activity/index',
				code: 'favorable'
			},
			{
				icon: '@/static/imgs-liuhe/index_02/wallet.png',
				name: this.$t("components.CommonPages.pages-liuhe.components.userOperation.text7"),
				islogin: true,
				url: '/pages/liuhe/my',
				code: 'purse'
			},
			]
		}
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor']),
		userInfo() {
			return this.$store.state.appInfoStore.userInfo
		},
		//是否登录
		isLogin() {
			return this.userInfo != null;
		},

		liuheVipSpeedInfo() {
			return this.userInfo && this.userInfo.liuheVipSpeedInfo ? this.userInfo.liuheVipSpeedInfo : null;

		}

	},

	methods: {

		toLogin(type) {
			const urlMap = {
				'login': '/pages/common/login',
				'register': '/pages/common/reg'
			}
			uni.navigateTo({
				url: urlMap[type]
			})
		},
		//判断是否试玩登录
		isTestUser() {
			if (['sign', 'demo'].includes(this.userInfo.userType)) {
				uni.$emit('showPop', {
					refName: 'AlertMessage',
					data: 'demo'
				})
				return false
			}
			return true
		},
		async toUrl(item) {
			if (!isLogin() && item.islogin == true) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return
			}
			if (item.code === "purse") {
				if (this.$config.station === 'LIUHE') {
					uni.switchTab({
						url: '/pages/liuhe/my'
					})
					return;
				}

				if (this.$config.station === 'ALL') {
					uni.navigateTo({
						url: '/pages/common/userCenter/wallet/index'
					})
					return;
				}

				uni.navigateTo({
					url: item.url
				})
				return
			}
			if (!this.isTestUser()) return

			if (this.status == 0) {
				return
			} else if (this.status == 2 && ["withdraw"].includes(item.code)) {
				uni.$emit("showPop", {
					refName: "SetFundPassword"
				});
				return;
			} else if (this.status == 3 && 'withdraw' === item.code) {
				uni.navigateTo({
					url: "/pages/common/userCenter/bank/bind"
				})
				return
			}
			uni.navigateTo({
				url: item.url
			})
		},
		async freshUserBanlance() {

			this.isEnd1 = false
			this.loading = true
			await this.$store.dispatch("appInfoStoreInit");
			setTimeout(() => {
				this.loading = false;
			}, 2000);
		}
	}
}
</script>
<style lang="scss" scoped>
.user-operation {
	background: #FFF;
	border-radius: 0 0 24rpx 24rpx;
	height: 162rpx;
	box-sizing: border-box;
	padding: 20rpx 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.left {
		width: 270rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 110rpx;

		.title-box {
			display: flex;
			align-items: center;

			.name {
				color: #404040;
				font-size: 28rpx;
				font-weight: 500;
				margin-right: 10rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.level-box {
				height: 36rpx;
				display: flex;
				align-items: center;

				.img {
					width: 114rpx;
					height: 100%;
				}

				.level {
					/*background: var(--theme-color);*/
					font-size: 22rpx;
					width: fit-content;
					min-width: 22rpx;
					height: 26rpx;
					line-height: 22rpx;
					color: #ffe500;
					border-radius: 0 22rpx 22rpx 0;
					margin-left: -26rpx;
					z-index: 1;
					font-weight: 600;
					margin-top: 7rpx;
				}
			}
		}

		.title {
			color: #404040;
			font-size: 28rpx;
		}

		.balance {
			display: flex;
			align-items: center;
			font-weight: 600;
			color: #FFD43D !important;

			.balance-number {
				color: #FFD43D !important;
				font-size: 34rpx !important;
				font-weight: 600 !important;
				margin-right: 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: block;
				margin-left: 10rpx;
				font-family: 'Roboto' !important;
			}

			.refresh {
				width: 40rpx;
				height: 40rpx;
				flex-shrink: 0;
			}


			.loading {
				animation: rotation 1s linear infinite;
			}

			@keyframes rotation {
				0% {
					-webkit-transform: rotate(0deg);
				}

				25% {
					-webkit-transform: rotate(90deg);
				}

				50% {
					-webkit-transform: rotate(180deg);
				}

				75% {
					-webkit-transform: rotate(270deg);
				}

				100% {
					-webkit-transform: rotate(360deg);
				}
			}
		}

		.btns {
			display: flex;
			align-items: center;

			.btn {
				width: 110rpx;
				height: 52rpx;
				display: grid;
				place-items: center;
				font-size: 28rpx;
				font-weight: 500;
				border-radius: 12rpx;
			}

			.login {
				color: #FFF;
				background: var(--theme-color);
				margin-right: 20rpx;
			}

			.register {
				color: var(--theme-color);
				border: 2rpx solid var(--theme-color);
			}
		}
	}

	.is-login {
		height: 96rpx;
	}

	.right {
		display: flex;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.img-box {
				width: 80rpx;
				height: 80rpx;
				border-radius: 20rpx;
				background: var(--theme-auxiliary-color-default);
				display: grid;
				place-items: center;

				.img {
					width: 60rpx;
					height: 60rpx;
				}

			}

			.name {
				margin-top: 10rpx;
				color: #404040;
				font-size: 24rpx;
				font-weight: 500;
			}
		}

		.item+.item {
			margin-left: 20rpx;
		}
	}
}
</style>
