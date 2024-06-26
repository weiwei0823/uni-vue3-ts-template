<template>
	<view class="lh-wallet pc-max-width" :class="['theme-' + themeColor.name]">
		<Header :title="$t('components.common.pages-liuhe.LiuheWallet.wallet')" @back="handleback" isFixed :isBack="$config.station === 'ALL'">
			<template #right>
				<view class="setting-box" @click="setting">
					<svg style="flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
						viewBox="0 0 22 22" fill="none">
						<path
							d="M21.499 13.0625L19.6342 11.6482C19.6539 11.4518 19.6735 11.2357 19.6735 11C19.6735 10.7643 19.6539 10.5482 19.6342 10.3518L21.499 8.9375C22.0093 8.54464 22.1467 7.85714 21.813 7.26786L19.7324 3.75179C19.4968 3.33929 19.0454 3.08393 18.5743 3.08393C18.4172 3.08393 18.2798 3.10357 18.1228 3.1625L15.9047 4.02679C15.5318 3.77143 15.1392 3.55536 14.7466 3.37857L14.4129 1.11964C14.3148 0.471429 13.7652 0 13.0978 0H8.89717C8.22978 0 7.68017 0.471429 7.58203 1.1L7.26796 3.37857C6.87538 3.55536 6.50243 3.77143 6.10985 4.02679L3.89178 3.1625C3.73474 3.10357 3.57771 3.08393 3.42068 3.08393C2.94958 3.08393 2.49812 3.31964 2.2822 3.73214L0.181895 7.26786C-0.151798 7.81786 -0.0143947 8.54464 0.495959 8.9375L2.36071 10.3518C2.34108 10.5875 2.32146 10.8036 2.32146 11C2.32146 11.1964 2.32146 11.4125 2.36071 11.6482L0.495959 13.0625C-0.0143947 13.4554 -0.151798 14.1429 0.181895 14.7321L2.26257 18.2482C2.49812 18.6607 2.94958 18.9161 3.42068 18.9161C3.57771 18.9161 3.71511 18.8964 3.87215 18.8375L6.09022 17.9732C6.46317 18.2286 6.85575 18.4446 7.24833 18.6214L7.58203 20.8804C7.66054 21.5089 8.22978 22 8.89717 22H13.0978C13.7652 22 14.3148 21.5286 14.4129 20.9L14.7466 18.6214C15.1392 18.4446 15.5121 18.2286 15.9047 17.9732L18.1228 18.8375C18.2798 18.8964 18.4369 18.9161 18.5939 18.9161C19.065 18.9161 19.5165 18.6804 19.7324 18.2679L21.8327 14.7125C22.1467 14.1429 22.0093 13.4554 21.499 13.0625ZM15.7084 11C15.7084 13.5929 13.5885 15.7143 10.9975 15.7143C8.40644 15.7143 6.28651 13.5929 6.28651 11C6.28651 8.40714 8.40644 6.28571 10.9975 6.28571C13.5885 6.28571 15.7084 8.40714 15.7084 11Z"
							fill="#A1A1A1" />
					</svg>
					<view class="text">{{ $t('components.common.pages-liuhe.LiuheWallet.settings') }}</view>
				</view>
			</template>
		</Header>
		<scroll-view scroll-y class="scroll-y" :enhanced="true"
			:bounces="false" :show-scrollbar="false"
			:style="{height:`calc(${uWindowHeight}px - 108rpx + var(--safe-area-inset-bottom))`}"
		>
			<view class="content" :class="{ 'show-tabBar': showTabBar }">
				<view class="card">
					<view class="item1" v-if="hasLogin">
						<view class="left">
							<image class="avatar" :src="userInfo.headImgUrl"></image>
							<view class="level">
								{{ vipLevelText }}
								<!-- VIP{{ userInfo.userLevel?userInfo.userLevel.toString().split(".")[0]:0}} -->
								<!-- {{ vipLevelText === $t('components.common.pages-liuhe.LiuheWallet.ordinaryMember') ? 'VIP0' :
								vipLevelText }} -->
							</view>
						</view>
						<view class="right">
							<view class="text-box nickname">
								<view class="text">
									<!-- {{ $t('components.common.pages-liuhe.LiuheWallet.nickname') }} -->
									{{ userInfo.nickname || userInfo.userName }}
								</view>
								<view class="copy-btn" @click="copyText(userInfo.nickname || userInfo.userName)">
									{{ $t('components.CommonPages.pages-liuhe.LiuheWallet.Copy') }}
								</view>
							</view>
							<view class="text-box invite-code" v-if="hasLogin && !['demo'].includes(userInfo.userType)">
								<view class="text">{{ $t('components.common.pages-liuhe.LiuheWallet.inviteCode') }}{{
								userInfo.inviteCode }}</view>
								<view class="copy-btn" @click="copyText(userInfo.inviteCode)">
									{{ $t('components.CommonPages.pages-liuhe.LiuheWallet.Copy') }}
								</view>
							</view>
						</view>
					</view>
					<view class="header-left" style="align-items: center;" v-else @click="toLogin">
						<view class="header-left-avatar">
							<image src="/static/img/common/userCenter/no-login.png" mode="" />

						</view>
						<view class="no-login">

							{{$t("pages.common.userCenter.index.text3")}}
						</view>
					</view>
					<view class="item2">
						<view class="top" v-if="hasLogin">
							<view class="loading" v-if="loading">
								<u-loading mode="circle" size="20"></u-loading>
							</view>
							<template v-else>
								<u-line-progress style="position: relative;"
									:active-color="themeColor.themeAuxiliaryColorDot" inactive-color="#fff" height="32"
									:percent="percent">
									<view
										style="position: absolute;left:0;width:480rpx;text-align: center;font-size:22rpx;">
										<template v-if="highestLevel">
											{{ $t('components.common.pages-liuhe.LiuheWallet.congrats') }}
											<text>VIP</text>
											{{ $t('components.common.pages-liuhe.LiuheWallet.highestLevelReached') }}
										</template>
										<template v-else>
											{{ $t('components.common.pages-liuhe.LiuheWallet.distanceToNextLevel') }}
											<text>
												{{ vipSpeedInfo.nextLevelName }}
											</text>
											{{ $t('components.common.pages-liuhe.LiuheWallet.amountToWager') }}
											{{ vipSpeedInfo.gapCodingAmount }}
										</template>
									</view>
								</u-line-progress>
							</template>
							<view class="vip-right" @click="vip">
								VIP特权
								<svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11"
									fill="none">
									<path d="M1 1.5L5 5.5L1 9.5" stroke="white" stroke-width="1.5"
										stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</view>
							<!-- <svg class="right" @click="vip" xmlns="http://www.w3.org/2000/svg" width="56" height="21"
							viewBox="0 0 56 21" fill="none">
							<path
								d="M3.77183 15L0.196832 5.12H1.40583L4.31783 13.362H4.39583L7.30783 5.12H8.51683L4.94183 15H3.77183ZM10.831 5.12V15H9.71304V5.12H10.831ZM15.8379 5.12C17.0252 5.12 17.9395 5.38433 18.5809 5.913C19.2222 6.433 19.5429 7.17833 19.5429 8.149C19.5429 9.11967 19.2309 9.865 18.6069 10.385C17.9829 10.905 17.0945 11.165 15.9419 11.165H14.0049V15H12.8869V5.12H15.8379ZM15.7339 10.112C16.5832 10.112 17.2375 9.943 17.6969 9.605C18.1562 9.267 18.3859 8.78167 18.3859 8.149C18.3859 7.51633 18.1562 7.031 17.6969 6.693C17.2375 6.355 16.5832 6.186 15.7339 6.186H14.0049V10.112H15.7339ZM32.1792 9.189H30.5412V10.658H32.0622V11.594H30.5412V14.077C30.5412 14.467 30.4848 14.7747 30.3722 15C30.2682 15.2253 30.0862 15.3857 29.8262 15.481C29.5748 15.5763 29.2238 15.624 28.7732 15.624H27.4732L27.3172 14.701H28.5392C28.8165 14.701 29.0245 14.675 29.1632 14.623C29.3105 14.5623 29.4102 14.467 29.4622 14.337C29.5142 14.207 29.5402 14.0163 29.5402 13.765V11.594H25.1722V10.658H29.5402V9.189H24.8472V8.227H27.9802V6.615H25.5232V5.679H27.9802V4.041H28.9682V5.679H31.6462V6.615H28.9682V8.227H32.1792V9.189ZM24.8862 9.826L25.0162 10.853L23.7552 11.295V15.832H22.8452V11.607L20.8952 12.283L20.6482 11.256L22.8452 10.515V7.772H21.8702C21.7228 8.75133 21.6015 9.462 21.5062 9.904L20.6222 9.735C20.7782 9.11967 20.9125 8.40467 21.0252 7.59C21.1465 6.77533 21.2418 5.94767 21.3112 5.107L22.1692 5.172L22.1432 5.458C22.1172 5.744 22.0695 6.19033 22.0002 6.797H22.8452V4.106H23.7552V6.797H25.0162V7.772H23.7552V10.203L24.8862 9.826ZM26.2122 11.867C26.9315 12.5863 27.4775 13.1583 27.8502 13.583L27.1742 14.259C26.9575 13.999 26.6888 13.7 26.3682 13.362C26.0562 13.024 25.7832 12.7337 25.5492 12.491L26.2122 11.867ZM38.1462 11.308C37.7302 10.892 37.2145 10.424 36.5992 9.904V15.897H35.6632V9.839C35.2125 10.957 34.6665 11.9883 34.0252 12.933L33.6742 11.724C34.0382 11.2127 34.4065 10.567 34.7792 9.787C35.1605 8.99833 35.4465 8.21833 35.6372 7.447H34.0122V6.485H35.6632V3.937H36.5992V6.485H38.1982V7.447H36.5992V8.825C36.8938 9.05033 37.2318 9.32333 37.6132 9.644C38.0032 9.96467 38.3282 10.2507 38.5882 10.502L38.1462 11.308ZM42.1372 11.984C42.9258 12.946 44.0005 13.9297 45.3612 14.935L44.7372 15.858C43.3852 14.818 42.3062 13.804 41.5002 12.816C40.6248 13.8473 39.4245 14.8787 37.8992 15.91L37.2102 15.104C38.8135 14.038 40.0355 12.9937 40.8762 11.971C40.3042 11.1303 39.8448 10.229 39.4982 9.267C39.1602 8.29633 38.8828 7.174 38.6662 5.9H38.6402V4.912H44.3212V5.887C44.1218 7.187 43.8488 8.32233 43.5022 9.293C43.1642 10.2637 42.7092 11.1607 42.1372 11.984ZM39.6412 5.9C39.8405 7.00067 40.0832 7.97133 40.3692 8.812C40.6638 9.644 41.0452 10.4153 41.5132 11.126C41.9812 10.424 42.3582 9.65267 42.6442 8.812C42.9302 7.97133 43.1512 7.00067 43.3072 5.9H39.6412Z"
								fill="white" />
							<path d="M51 6.5L55 10.5L51 14.5" stroke="white" stroke-width="1.5" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg> -->
						</view>
						<!-- #32DB83 -->
						<u-line v-if="hasLogin" :color="themeColor.linearBeginColor" border-style="dashed" margin="20rpx 0" />
						<view class="bottom">
							<view class="item">
								<view class="price-title">{{ $t('components.CommonPages.pages-liuhe.LiuheWallet.WalletBalance')
							}}
								</view>
								<view class="price">
									<view class="unit">¥</view>
									<u-loading mode="circle" size="24" v-if="loading"></u-loading>
									<template v-else-if="userInfo.userBalance">
										<view class="text" v-if="isEnd1 && userInfo.userBalance > 1000">
											{{ parseFloat(userInfo.userBalance).toLocaleString(undefined, {
											'minimumFractionDigits': 2, 'maximumFractionDigits': 2
										}) }}
										</view>
										<u-count-to class="text" :decimals="2" :start-val="0"
											:end-val="userInfo.userBalance" @end="isEnd1 = true" v-else></u-count-to>
									</template>
									<template v-else>0.00</template>

									<view class="shuaxin" :class="{ run: isRefresh }" @click="refresh" v-if="hasLogin && !loading">
										<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M4.55185 3.69352C6.06398 2.38324 7.9985 1.66323 9.99935 1.66602C14.6018 1.66602 18.3327 5.39686 18.3327 9.99936C18.3327 11.7794 17.7743 13.4294 16.8244 14.7827L14.166 9.99936H16.666C16.6661 8.69238 16.2821 7.41419 15.5616 6.32374C14.8411 5.23328 13.816 4.37866 12.6137 3.86613C11.4114 3.3536 10.0849 3.20578 8.79931 3.44104C7.51368 3.6763 6.32556 4.28427 5.38268 5.18936L4.55185 3.69352ZM15.4468 16.3052C13.9347 17.6155 12.0002 18.3355 9.99935 18.3327C5.39685 18.3327 1.66602 14.6019 1.66602 9.99936C1.66602 8.21936 2.22435 6.56936 3.17435 5.21602L5.83268 9.99936H3.33268C3.33258 11.3063 3.71664 12.5845 4.43713 13.675C5.15762 14.7654 6.18274 15.6201 7.38503 16.1326C8.58733 16.6451 9.91375 16.7929 11.1994 16.5577C12.485 16.3224 13.6731 15.7144 14.616 14.8094L15.4468 16.3052Z"
												fill="#FFFFFF" />
										</svg>
									</view>

									<!--								<image class="shuaxin " :class="{ run: isRefresh }"-->
									<!--									src="@/static/img/all/wallet/shuaxin.png" @click="refresh"></image>-->
								</view>
							</view>
							<view class="item"
								@click="$router.push('/pages/common/userCenter/accountLog/outstanding_balance')">
								<view class="price-title">
									{{ $t('components.CommonPages.pages-liuhe.LiuheWallet.UnsettledBalance') }}
								</view>
								<view class="price">
									<view class="unit">¥</view>
									<template v-if="mineData.unsettledAmount">
										<view class="text" v-if="isEnd2 && mineData.unsettledAmount > 1000">
											{{ parseFloat(mineData.unsettledAmount).toLocaleString(undefined,
											{
												'minimumFractionDigits': 2, 'maximumFractionDigits': 2
											}) }}
										</view>
										<u-count-to class="text" :decimals="2" :start-val="0"
											:end-val="mineData.unsettledAmount" @end="isEnd2 = true"
											v-else></u-count-to>
									</template>
									<template v-else>0.00</template>
								</view>
							</view>
						</view>
					</view>
					<view class="item3">
						<template v-for="(item, index) in rechargeWithdrawalList">
							<view class="item" @click="onClick(item)">
								<image class="icon" :src="item.icon"></image>
								<view class="title" :style="{ color: item.color }">{{ item.title }}</view>
							</view>
							<u-line :hair-line="false" direction="col" length="40"
								:color="themeColor.themeAuxiliaryColorDefault"
								v-if="index < rechargeWithdrawalList.length - 1" />
						</template>
					</view>
				</view>
				<view class="btn-list" v-for="item in btnlList">
					<template v-for="(btns, btnsIndex) in item">
						<view :class="btns[0].type === 'TUIGUANG' ? 'btns promotion' : 'btns'">
							<view v-if="btns[0].type === 'TUIGUANG'">
								<image class="banner" src="@/static/img/all/wallet/banner.png"
									@click="onClick(btns[0])">
								</image>
							</view>
							<view :class="btn.type === 'TUIGUANG' ? 'btn promotion-item' : 'btn'" v-for="btn in btns"
								@click="onClick(btn)">
								<image class="icon" :src="btn.icon"></image>
								<view class="right">
									<view class="title">
										{{ btn.title }}
										<image class="hot" src="@/static/img/all/wallet/hot.png"
											v-if="btn.type === 'tuiguang'">
										</image>
										<view v-if="btn.type === 'YUEBAO'" class="yuebao">
											{{ $t('components.common.pages-liuhe.LiuheWallet.annualRate') }}{{ mineData.baseRate
										}}%
										</view>
									</view>
									<view class="sub-title-box">
										<view v-if="btn.type == 'NETWORK'">
											<view class="sub-title network-name">{{ lineName }}</view>
										</view>
										<view class="sub-title" :style="{ color: btn.subColor }">{{ btn.subTitle }}
										</view>
										<view v-if="btn.type === 'YUEBAO'" class="yuebao">
											+{{ mineData.yesterdayProfit }}
										</view>
									</view>
								</view>
							</view>
						</view>
						<u-line class="line" :color="themeColor.themeAuxiliaryColorDefault"
							v-if="btnsIndex < item.length - 1" />
					</template>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="confirm" type="center" background-color="#fff">
			<view class="confirm-box">
				<view class="title">{{ $t('components.common.pages-liuhe.LiuheWallet.tip') }}</view>
				<view class="notice">
					<text>{{ $t('components.common.pages-liuhe.LiuheWallet.noFundPasswordSet') }}</text>
					<text>{{ $t('components.common.pages-liuhe.LiuheWallet.withdrawalRequiresFundPassword') }}</text>
				</view>
				<view class="btn-box">
					<view class="cancel-btn" @click="cancel">
						{{ $t('components.common.pages-liuhe.LiuheWallet.cancel') }}
					</view>
					<view class="confirm-btn" @click="confirm">
						{{ $t('components.common.pages-liuhe.LiuheWallet.confirm') }}
					</view>
				</view>
			</view>
		</uni-popup>
		<TabBar :current="4" v-if="showTabBar" />
		<AlertInjectLayer />
		<Network ref="network" :lineName.sync="lineName" />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import TabBar from '@/components/Tabbar/Liuhe'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import Network from '@/components/network'

	import defaultTemplate from "@/utils/defaultTemplate";
	import {
		vipSpeed
	} from "@/utils/user/vip";
	import {
		bindStatus
	} from "@/utils/lottery/mine";
	import {
		init as mineInit
	} from '@/utils/mine'

	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			Header,
			TabBar,
			AlertInjectLayer,
			Network
		},
		props: {
			showTabBar: Boolean
		},
		mounted() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		watch: {
			// userInfo(ov, nv) {
			// 	console.log(nv, "newen")
			// 	// this.initData();
			// }
		},
		data() {
			return {
				lineName: '默认线路',
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				status: 0,
				loading: false,
				mineData: {},
				isRefresh: false,
				isEnd1: false,
				isEnd2: false,
				rechargeWithdrawalList: [{
					title: this.$t('components.common.pages-liuhe.LiuheWallet.recharge'),
					color: '#FF5C00',
					icon: '/static/img/all/wallet/chongzhi.png',
					type: 'CHONGZHI',
					url: '/pages/common/pay/index',
					isLogin: true
				}, {
					title: this.$t('components.common.pages-liuhe.LiuheWallet.withdraw'),
					color: '#0390F5',
					icon: '/static/img/all/wallet/tixian.png',
					type: 'TIXIAN',
					url: '/pages/common/withdraw/index',
					isLogin: true
				}, {
					title: this.$t('components.common.pages-liuhe.LiuheWallet.instantTopUp'),
					color: '#B924FF',
					icon: '/static/img/all/wallet/miantizhichong.png',
					type: 'MIANTIZHICHONG',
					url: '/pages/common/withdraw/mtzc',
					isLogin: true
				}, ],
				winHeight: 0,
				bindStatusLoading: false
			}
		},
		computed: {
			...mapGetters(['orderList', "debugWebsocketTimeInterval", "inLotteryId", 'themeColor','uWindowHeight']),
			hasLogin(){
				return isLogin()
			},
			percent() {
				return this.highestLevel ? 100 : parseInt(this.vipSpeedInfo.speed)
			},
			btnlList() {
				return [
					[
						[{
							title: this.$t('components.common.pages-liuhe.LiuheWallet.accountChangeDetail'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.viewAccountChanges'),
							icon: '/static/img/all/wallet/zhangbian.png',
							url: '/pages/common/userCenter/accountLog/menu',
							isLogin: true,
						}, {
							title: this.$t('components.common.pages-liuhe.LiuheWallet.messageCenter'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.viewAnnouncementsInbox'),
							icon: '/static/img/all/wallet/speaker.png',
							url: '/pages/liuhe/notice/index',
							isLogin: true,
						}],
						[{
							title: this.$t('components.common.pages-liuhe.LiuheWallet.securityCenter'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.protectYourAccount'),
							subColor: this.themeColor.themeColor,
							icon: '/static/img/all/wallet/anquanzhongxin.png',
							url: '/pages/common/safeCenter/index',
							isLogin: true,
						}, {
							title: this.$t('components.common.pages-liuhe.LiuheWallet.gameRecords'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.viewAccountChanges'),
							icon: '/static/img/all/wallet/game.png',
							url: '/pages/common/userCenter/profitreport/profitreport',
							isLogin: true,
						}],
						[{
							title: this.$t('components.common.pages-liuhe.LiuheWallet.customerServiceCenter'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.contactCustomerService'),
							icon: '/static/img/all/wallet/customers.png',
							url: '/pages/common/userCenter/service/index'
						}, {
							title: this.$t('components.common.pages-liuhe.LiuheWallet.downloadApp'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.goToDownloadPage'),
							icon: '/static/img/all/wallet/app-download.png',
							type: 'APPDOWNLOAD',
							url: '/#/pages/common/userCenter/downloadPage'
						}]
					],
					[
						[{
							title: this.$t('components.common.pages-liuhe.LiuheWallet.promotionEarnMoney'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.monthlyIncomeMillion'),
							icon: '/static/img/all/wallet/tuiguang.png',
							type: 'TUIGUANG',
							url: '/pages/common/promoteEarn/index',
							isLogin: true,
						}]
					],
					[
						[{
							title: this.$t('components.common.pages-liuhe.LiuheWallet.bonusBalance'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.yesterdayEarnings'),
							icon: '/static/img/all/wallet/huabei.png',
							type: 'YUEBAO',
							url: '/pages/common/yueBao/index',
							isLogin: true,
						}, {
							title: this.$t('components.common.pages-liuhe.LiuheWallet.creditRecovery'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.recoverBalance'),
							icon: '/static/img/all/wallet/edu_n.png',
							url: '/pages/common/userCenter/wallet/quota',
							isLogin: true,
						}],
						[{
							title: this.$t('components.common.pages-liuhe.LiuheWallet.helpCenter'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.answerVariousQuestions'),
							icon: '/static/img/all/wallet/help.png',
							url: '/pages/liuhe/help/index'
						}, {
							title: this.$t('components.common.pages-liuhe.LiuheWallet.storeRecords'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.viewAccountChanges'),
							icon: '/static/img/all/wallet/store-records.png',
							url: '/pages/common/userCenter/accountLog/index',
							isLogin: true,
						}],
						[{
							title: this.$t('components.common.pages-liuhe.LiuheWallet.rewardForFeedback'),
							subTitle: this.$t('components.common.pages-liuhe.LiuheWallet.directlyRewardGift'),
							icon: '/static/img/all/wallet/feedback.png',
							url: `/pages/common/userCenter/feedback/index?type=${this.$config.enumMgr.USER_FEEDBACK_TYPE.LOTTERY}`,
							isLogin: true,
						}, {
							title: this.$t('components.common.pages-liuhe.LiuheWallet.networkStatus'),
							subTitle: this.debugWebsocketTimeInterval + 'MS',
							subColor: this.debugWebsocketTimeInterval < 150 ? '#5ac54c' : this
								.debugWebsocketTimeInterval > 150 && this.debugWebsocketTimeInterval < 300 ?
								'#ff7010' : '#ff0000',
							icon: '/static/img/all/wallet/wangluozhuangtai.png',
							type: 'NETWORK',
							url: 'NETWORK'
						}]
					]
				]
			},
			userInfo() {
				return this.$store.state.appInfoStore?.userInfo || {}
			},
			//显示VIP等几（INT）
			vipSpeedInfo() {
				return this.userInfo?.liuheVipSpeedInfo || {}
			},
			highestLevel() {
				const {
					nextLevel,
					level
				} = this.vipSpeedInfo
				return nextLevel === level && nextLevel !== 0 && level !== 0
			},

			vipLevelText() {
				let info = this.vipSpeedInfo;
				if (!info.level) return "VIP0";

				return "VIP" + info.level.toString().split(".")[0];
			}
		},
		methods: {
			toLogin() { //前往登录页面
				uni.navigateTo({
					url: "/pages/common/login"
				})
			},
			_onShow() {
				this.$nativeBridge.setStatusBarColor('#fff')
				if (isLogin()) {
					this.getInit()
					this.$store.dispatch("updateUserInfoLiuheVip")
					this.initData()
				}
			},
			handleback() {
				const urlMap = {
					ALL: '/pages/liuhe/home/index',
					LIUHE: '/pages/liuhe/indexNew',
					LUNTAN: '/pages/luntan/index'
				}
				uni.switchTab({
					url: urlMap[this.$config.station]
				})
			},
			async initData() {
				const res = await mineInit()
				if (res.code !== 200) return;
				const data = defaultTemplate({
					nickname: '',
					inviteCode: "",
					userBalance: 0,
					unsettledAmount: 0,
					baseRate: 0,
					yesterdayProfit: 0,
					lineList: [{
						id: '',
						type: '',
						urlType: '',
						name: this.$t('components.common.pages-liuhe.LiuheWallet.line1'),
						url: "",
						projectType: '',
						status: '',
						qqList: [],
						createTime: "",
						updateTime: ""
					}]
				}, res.result)
				this.mineData = data;
				!isNaN(data.userBalance) && this.$store.dispatch(
					"updateUserInfoProperties", {
						userBalance: data.userBalance
					})
			},
			async getInit() {
				this.bindStatusLoading = true
				const res = await bindStatus();
				this.status = res.result?.status || 0
				this.bindStatusLoading = false
			},
			async onClick(item) {
				if (item.isLogin && (!isLogin() || ['demo','sign'].includes(this.userInfo.userType))) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return;
				}
				let isProEnv = !this.$config.isDebug;

				if (!item || !item.url) {
					pop(this.$t('components.common.pages-liuhe.LiuheWallet.comingSoon'), 2000)
					return false
				}
				// if (this.$config.station === this.$config.enumMgr.STATION.ALL && item.type === 'APPDOWNLOAD') {
				//     pop('敬请期待', 2000)
				//     return false;
				// }

				if (["CHONGZHI", "MIANTIZHICHONG", "TIXIAN", ].includes(item.type) && !this.isTest()) {
					return
				}
				if (item.type == "NETWORK") {
					this.$refs.network.open()
				}
				if (this.bindStatusLoading) {
					return
				}
				if (item.type == 'TIXIAN' || item.type == 'MIANTIZHICHONG') {
					if (this.status == 2) {
						uni.$emit('showPop', {
							refName: 'AlertMsg',
							data: {
								title: this.$t('components.common.pages-liuhe.LiuheWallet.reminder'),
								content: this.$t(
									'components.common.pages-liuhe.LiuheWallet.setFundPasswordReminder')
							},
							confirm: () => {
								uni.navigateTo({
									url: "/pages/common/userCenter/pwd/set_pwd"
								})
							},
						})
						return false
					} else if (this.status == 3) {
						uni.navigateTo({
							url: "/pages/common/userCenter/bank/bind"
						})
						return false
					} else if (this.status == 0) {
						return false
					}
				}
				if (item.type == 'APPDOWNLOAD') {
					return this.$nativeBridge.openUrl(item.url);
				}

				let url = item.url
				uni.navigateTo({
					url: url
				})
			},
			copyText(text) {
				this.copy(text)
				// uni.setClipboardData({
				// 	data: text,
				// 	success: (res) => {
				// 		uni.showToast({
				// 			title: this.$t('components.common.pages-liuhe.LiuheWallet.copySuccess')
				// 		})
				// 	}
				// })
			},
			copy(text, callback) {
				var copyInput = document.getElementById('copyInput');
				if (!copyInput) {
					var copyInput = document.createElement('input');
					copyInput.setAttribute('id', 'copyInput');
					copyInput.setAttribute('disabled', 'disabled');
					copyInput.style.position = 'fixed';
					copyInput.style.left = '-100%';
					copyInput.style.top = '0';
					copyInput.style.zIndex = -100;
					copyInput.style.opacity = 0;
					document.body.appendChild(copyInput);
				}
				copyInput.value = text;
				copyInput.focus();
				copyInput.select();

				// document.execCommand 可能会被废弃
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					uni.showToast({
						title: this.$t('components.common.pages-liuhe.LiuheWallet.copySuccess')
					})
				}

				copyInput.blur();

				callback && callback(true);
			},
			async refresh() {
				this.isEnd1 = false;
				this.loading = true;
				this.$store.dispatch("updateUserInfoLiuheVip");
				await this.$store.dispatch("updateUserBalanceFromServer");
				this.loading = false;
			},
			setting() {
				uni.navigateTo({
					url: '/pages/common/setting/index'
				})
			},
			isTest() {
				if (['sign','demo'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: "AlertMsg",
						data: {
							title: this.$t('components.common.pages-liuhe.LiuheWallet.loginReminder'),
							content: this.$t('components.common.pages-liuhe.LiuheWallet.notLoggedInReminder')
						},
						confirm: () => {
							uni.navigateTo({
								url: "/pages/common/login"
							})
						}
					})
					return false
				}
				return true
			},
			vip() {
				uni.navigateTo({
					url: '/pages/common/userCenter/wallet/vip'
				})
			},

			cancel() {
				this.$refs.confirm.close()
			},
			confirm() {
				this.cancel()
				uni.navigateTo({
					url: "/pages/common/userCenter/pwd/set_pwd"
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.loading {
		flex: 1;
		text-align: center;
		background: #fff;
		border-radius: 32rpx;
		height: 32rpx;
		display: grid;
		place-content: center;
	}

	.vip-right {
		color: #FFF;
		text-align: center;

		font-size: 26rpx;
		font-style: normal;
		font-weight: 400;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
		white-space: nowrap;

		svg {
			margin-left: 10rpx;
		}

		/* 154.144% */
	}

	/deep/ .header {
		background: var(--theme-auxiliary-color-default);
		border-radius: none;
		z-index: 99;
	}

	.lh-wallet {
		background: var(--theme-auxiliary-color-default);

		.setting-box {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #404040;
			font-size: 30rpx;

			.text {
				margin-left: 20rpx;
			}
		}

		.scroll-y {
			border-radius: 24rpx;
			overflow: hidden;
			margin: 20rpx 28rpx;
			width: calc(100% - 56rpx);
			/*height: calc(var(--vh) - 108rpx + var(--safe-area-inset-bottom))*/
		}

		.content {
			padding-bottom: 20rpx;

			.card {
				display: flex;
				flex-direction: column;
				padding: 20rpx;
				border-radius: 24rpx;
				background: #FFF;

				.item1 {
					display: flex;
					height: 96rpx;

					.left {
						display: flex;
						position: relative;
						border-radius: 24rpx;
						overflow: hidden;
						margin-right: 20rpx;

						.avatar {
							width: 96rpx;
							height: 96rpx;
						}

						.level {
							position: absolute;
							width: 88rpx;
							height: 32rpx;
							right: 0;
							bottom: 0;
							background: url('/static/img/all/wallet/level-bg1.png');
							background-size: 100% 100%;
							color: #FFF;
							display: grid;
							align-content: center;
							text-align: right;
							padding-right: 6rpx;
							font-size: 24rpx;
							font-weight: 500;
							box-sizing: border-box;
							white-space: nowrap;
						}
					}

					.right {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						overflow: hidden;
						flex: 1;

						.text-box {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.text {
								width: 350rpx;
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
							}

							.copy-btn {
								min-width: 116rpx;
								height: 44rpx;
								display: grid;
								place-content: center;
								margin-left: 10px;
								font-size: 22rpx;
								line-height: 44rpx;
								background: var(--theme-color);
								color: #fff;
								border-radius: 8rpx;
							}
						}

						.nickname {
							.text {
								color: #404040;
								font-weight: 600;
								font-size: 30rpx;
							}
						}

						.invite-code {
							.text {
								color: #404040;
								font-size: 26rpx;
								font-weight: 400;
							}
						}
					}
				}

				.item2 {
					display: flex;
					flex-direction: column;
					padding: 20rpx;
					border-radius: 24rpx;
					background: linear-gradient(180deg, var(--theme-color) 0%, var(--theme-color) 100%);
					margin-top: 20rpx;

					.top {
						display: flex;
						align-items: center;
						padding: 20rpx 0;

						/deep/ .u-active {
							border-radius: 30rpx;
							height: 24rpx;
							margin-left: 4rpx;
							color: #404040;
							font-size: 22rpx;
							justify-content: center;
						}

						.right {
							flex-shrink: 0;
							margin-left: 24rpx;
						}
					}

					.bottom {
						display: flex;
						justify-content: space-between;

						.item {
							display: flex;
							flex-direction: column;

							.price-title {
								color: #fff;
								font-size: 28rpx;
							}

							.title {
								color: #FFF;
								font-size: 28rpx;
							}

							.price {
								font-size: 34rpx;
								font-weight: 600;
								background: linear-gradient(90deg, #F1CF78 0%, #F6E195 54.17%, #F1CF78 100%);
								background-clip: text;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
								align-items: center;
								margin-top: 10rpx;
								display: flex;
								align-items: center;

								.unit {
									background: linear-gradient(90deg, #F1CF78 0%, #F6E195 54.17%, #F1CF78 100%);
									background-clip: text;
									-webkit-background-clip: text;
									-webkit-text-fill-color: transparent;
									display: inline-block;
									margin-right: 10rpx;
								}

								.text {
									font-weight: 600 !important;
									font-size: 34rpx !important;
									background: linear-gradient(90deg, #F1CF78 0%, #F6E195 54.17%, #F1CF78 100%);
									background-clip: text;
									-webkit-background-clip: text;
									-webkit-text-fill-color: transparent;
									display: inline-block;
								}


								.shuaxin {
									width: 40rpx;
									height: 40rpx;
									margin-left: 10rpx;
									display: inline-block;
									position: relative;
								}
							}
						}
					}
				}

				.item3 {
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;
					padding: 10rpx 20rpx;
					align-items: center;

					.item {
						display: flex;
						align-items: center;

						.icon {
							width: 68rpx;
							height: 68rpx;
							margin-right: 10rpx;
						}

						.title {
							font-size: 30rpx;
						}
					}
				}
			}

			.btn-list {
				display: flex;
				flex-direction: column;
				border-radius: 24rpx;
				background: #FFF;
				margin-top: 28rpx;

				.btns {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					padding: 20rpx;
					height: 130rpx;
					box-sizing: border-box;

					.btn {
						display: flex;
						align-items: center;

						.icon {
							width: 68rpx;
							height: 68rpx;
						}

						.right {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							margin-left: 20rpx;
							white-space: nowrap;

							.title {
								color: #404040;
								font-size: 30rpx;
								display: flex;
								align-items: flex-end;
							}

							.yuebao {
								color: var(--theme-auxiliary-color-remind);
								font-size: 24rpx;
								margin-left: 10rpx;
							}

							.sub-title-box {
								display: flex;
								align-items: center;

								.network-name {
									margin-right: 10rpx;
								}
							}

							.sub-title {
								color: #404040;
								font-size: 24rpx;
							}

							.hot {
								width: 32rpx;
								height: 32rpx;
								margin-left: 10rpx;
							}
						}
					}

				}

				.promotion {
					width: 694rpx;
					height: 176rpx;
					border-radius: 12px;
					background: var(--theme-auxiliary-color-default);
					position: relative;

					.promotion-item {
						position: absolute;
						left: 244rpx;
						top: 44rpx;

						.right {
							display: none;
						}

						.icon {
							display: none;
						}
					}

					.banner {
						width: 694rpx;
						height: 204rpx;
						position: absolute;
						left: 0;
						bottom: 0;
					}
				}

				.line {
					width: calc(100% - 40rpx) !important;
					margin: 20rpx auto !important;
				}
			}

		}

		.show-tabBar {
			padding-bottom: 120rpx;
		}
	}

	@keyframes rotate {
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

	/*
turn : 定义的动画名称
1s : 动画时间
linear : 动画以何种运行轨迹完成一个周期
infinite :规定动画应该无限次播放
*/
	.run {
		animation: rotate 1s linear infinite;
	}

	.confirm-box {
		height: 339rpx;
		width: 540rpx;
		border-radius: 10rpx;
		padding: 20rpx 54rpx 20rpx 54rpx;

		.title {
			height: 80rpx;
			font-weight: 400;
			font-size: 32rpx;
			line-height: 80rpx;
			text-align: center;
			color: #9A9A9A;
			border-bottom: 2rpx solid #E6E6E6;
		}

		.notice {
			height: 160rpx;
			font-weight: 400;
			font-size: 28rpx;
			text-align: center;
			color: #404040;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.btn-box {
			display: flex;
			color: #FFFFFF;
			font-weight: 400;
			font-size: 26rpx;

			.cancel-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 60rpx;
				width: 200rpx;
				border-radius: 264rpx;
				padding: 10rpx 74rpx;
				background: #8CB2C9;
				margin-right: 20rpx;
			}

			.confirm-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 60rpx;
				width: 200rpx;
				border-radius: 264rpx;
				padding: 10rpx 74rpx;
				background: #FF9900;
				margin-left: 20rpx;
			}
		}
	}
		.header-left {
			display: flex;

			.no-login {
				color: #404040;

				font-size: 34rpx;
				font-style: normal;
				font-weight: 500;
				line-height: normal;
				margin-left: 20rpx;
			}

			.header-left-avatar {
				width: 96rpx;
				height: 96rpx;
				position: relative;
				border-radius: 20rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}

				.header-left-level {
					width: 100%;
					height: 32rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					background: url("/static/img/common/userCenter/levelBack.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
					color: #FFF;
					text-align: center;

					font-size: 24rpx;
					font-weight: 500;
					display: flex;
					align-items: center;
					padding-left: 34rpx;

				}
			}

			.header-left-mess {
				margin-left: 20rpx;

				.copy-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 20rpx;
					padding: 6rpx 10rpx;
					border: 1px solid;
					border-radius: 14rpx;


					font-size: 22rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
				}

				.topMargin {
					margin: 24rpx 0;
				}

				.header-left-mess-name {
					display: flex;
					align-items: center;
					color: #404040;

					font-size: 30rpx;
					font-style: normal;
					font-weight: 500;
					line-height: normal;

					.name {
						text-overflow: ellipsis;
						max-width: 300rpx;
						overflow: hidden;
						white-space: nowrap;
						display: flex;
						align-items: center;

						image {
							min-width: 36rpx;
							width: 36rpx;
							height: 36rpx;

						}

						.name-level {
							color: #404040;

							font-size: 30rpx;
							font-weight: 500;
							margin-left: 10rpx;
							margin-right: 20rpx;
						}

						.nickname {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap
						}
					}

					.copy-btn {
						border-color: #404040;
						color: #404040;
						white-space: nowrap;
					}
				}

				.header-left-mess-invate {
					display: flex;
					align-items: center;
					color: #404040;

					font-size: 26rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					margin-top: 11rpx;

					.copy-btn {
						border-color: #404040;
						color: #404040;
					}
				}
			}
		}
</style>
