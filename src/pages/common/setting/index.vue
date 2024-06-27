<template>
	<view class="lottery-page pc-max-width"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%' }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx)`,marginTop:'20rpx'}"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="list-row">
				<view class="list-item" @click="toUrlSign('./userInfo')" v-if="showUserInfoItemMenu">
					<view class="left">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M17.0837 2H4.91699C3.81242 2 2.91699 2.89543 2.91699 4V18C2.91699 19.1046 3.81242 20 4.91699 20H6.33366C6.88594 20 7.33366 20.4477 7.33366 21C7.33366 21.5523 6.88594 22 6.33366 22H4.91699C2.70785 22 0.916992 20.2091 0.916992 18V4C0.916992 1.79086 2.70785 0 4.91699 0H17.0837C19.2928 0 21.0837 1.79086 21.0837 4V6.33333C21.0837 6.88562 20.6359 7.33333 20.0837 7.33333C19.5314 7.33333 19.0837 6.88562 19.0837 6.33333V4C19.0837 2.89543 18.1882 2 17.0837 2ZM13.1662 16.3999H17.0864C19.2914 16.3999 21.0856 18.1071 21.0837 20.2054C21.0837 21.1912 20.2406 21.9953 19.2027 21.9953H11.048C10.012 21.9953 9.16699 21.193 9.16699 20.2054C9.16699 18.1071 10.9611 16.3999 13.1662 16.3999ZM18.6818 12.275C18.6818 14.1401 17.0863 15.6582 15.1263 15.6582C13.1662 15.6582 11.5708 14.1401 11.5708 12.275C11.5708 10.4098 13.1662 8.89167 15.1263 8.89167C17.0863 8.89167 18.6818 10.4098 18.6818 12.275ZM3.66699 6.41667C3.66699 5.91041 4.0774 5.5 4.58366 5.5H8.25033C8.75659 5.5 9.16699 5.91041 9.16699 6.41667C9.16699 6.92293 8.75659 7.33333 8.25033 7.33333H4.58366C4.0774 7.33333 3.66699 6.92293 3.66699 6.41667ZM3.66699 15.5833C3.66699 15.0771 4.0774 14.6667 4.58366 14.6667H8.25033C8.75659 14.6667 9.16699 15.0771 9.16699 15.5833C9.16699 16.0896 8.75659 16.5 8.25033 16.5H4.58366C4.0774 16.5 3.66699 16.0896 3.66699 15.5833ZM4.58366 10.0833C4.0774 10.0833 3.66699 10.4937 3.66699 11C3.66699 11.5063 4.0774 11.9167 4.58366 11.9167H6.87533C7.38159 11.9167 7.79199 11.5063 7.79199 11C7.79199 10.4937 7.38159 10.0833 6.87533 10.0833H4.58366ZM20.167 10.0833C20.6733 10.0833 21.0837 9.67293 21.0837 9.16667C21.0837 8.66041 20.6733 8.25 20.167 8.25C19.6607 8.25 19.2503 8.66041 19.2503 9.16667C19.2503 9.67293 19.6607 10.0833 20.167 10.0833Z"
								:fill="themeColor.themeColor" />
						</svg>
						<view class="title">
							{{$t("common.setting.list1")}}
						</view>
					</view>
					<view class="right">
						<uni-icons type="right" style="font-size: 40rpx; color: #999999"></uni-icons>
					</view>
				</view>

				<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
				<view class="list-item" @click="langSelect">
					<view class="left">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
							<g clip-path="url(#clip0_104_14107)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M12.8125 7.32763C12.3962 6.71938 11.4437 7.01413 11.4437 7.75138V14.3251C11.4437 14.524 11.5227 14.7148 11.6634 14.8555C11.804 14.9961 11.9948 15.0751 12.1937 15.0751C12.3926 15.0751 12.5834 14.9961 12.7241 14.8555C12.8647 14.7148 12.9437 14.524 12.9437 14.3251V10.1746L16.075 14.7489C16.4912 15.3571 17.4437 15.0624 17.4437 14.3251V7.75138C17.4437 7.55247 17.3647 7.3617 17.2241 7.22105C17.0834 7.0804 16.8926 7.00138 16.6937 7.00138C16.4948 7.00138 16.304 7.0804 16.1634 7.22105C16.0227 7.3617 15.9437 7.55247 15.9437 7.75138V11.9019L12.8125 7.32763ZM9.78033 7.22162C9.63968 7.08097 9.44891 7.00195 9.25 7.00195H4.75C4.55109 7.00195 4.36032 7.08097 4.21967 7.22162C4.07902 7.36228 4 7.55304 4 7.75195V14.3257C4 14.5246 4.07902 14.7154 4.21967 14.856C4.36032 14.9967 4.55109 15.0757 4.75 15.0757H9.25C9.44891 15.0757 9.63968 14.9967 9.78033 14.856C9.92098 14.7154 10 14.5246 10 14.3257C10 14.1268 9.92098 13.936 9.78033 13.7954C9.63968 13.6547 9.44891 13.5757 9.25 13.5757H5.5V11.877H9.25C9.44891 11.877 9.63968 11.7979 9.78033 11.6573C9.92098 11.5166 10 11.3259 10 11.127L9.99475 11.0392C9.97326 10.8568 9.88556 10.6886 9.74828 10.5665C9.611 10.4444 9.4337 10.377 9.25 10.377H5.5V8.50195H9.25C9.44891 8.50195 9.63968 8.42294 9.78033 8.28228C9.92098 8.14163 10 7.95087 10 7.75195C10 7.55304 9.92098 7.36228 9.78033 7.22162Z"
									:fill="themeColor.themeColor" />
								<rect x="1" y="1" width="20" height="20" rx="5" :stroke="themeColor.themeColor"
									stroke-width="2" />
							</g>
							<defs>
								<clipPath id="clip0_104_14107">
									<rect width="22" height="22" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<view class="title">
							{{$t("common.setting.list5")}}
						</view>
					</view>
					<view class="right">
						<text
							class="title">{{ $config.configLanguage.languageSelect.find(item=>item.value === current).name }}</text>
						<uni-icons v-if="!$config.isForceServerLanguage&&!isEnvLanguage" type="right"
							style="font-size: 40rpx; color: #999999"></uni-icons>
						<!-- <uni-icons v-if="" type="right" style="font-size: 40rpx; color: #999999"></uni-icons> -->
					</view>
				</view>
				<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
				<view class="list-item" @click="themeSelect">
					<view class="left">
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.4321 2.4166V0.679012C16.4321 0.505185 16.3656 0.331358 16.2331 0.198271C16.1007 0.0658641 15.9269 0 15.7531 0C15.5793 0 15.4054 0.0658641 15.273 0.198271L11 4.41358L15.273 8.62821C15.4054 8.76062 15.5793 8.82716 15.7531 8.82716C15.9269 8.82716 16.1007 8.76062 16.2331 8.62821C16.3656 8.4958 16.4321 8.3213 16.4321 8.14815V6.45809C18.2994 6.50426 20.3398 6.84241 21.8642 9.16667V8.48765C21.8642 5.34179 19.4877 2.75475 16.4321 2.4166Z"
								fill="#07C160" />
							<path
								d="M5.5679 19.5834V21.321C5.5679 21.4948 5.63445 21.6686 5.76685 21.8017C5.89926 21.9341 6.07309 22 6.24691 22C6.42074 22 6.59457 21.9341 6.72698 21.8017L11 17.5864L6.72698 13.3718C6.59457 13.2394 6.42074 13.1728 6.24691 13.1728C6.07309 13.1728 5.89926 13.2394 5.76685 13.3718C5.63445 13.5042 5.5679 13.6787 5.5679 13.8519V15.5419C3.70062 15.4957 1.66019 15.1576 0.135803 12.8333V13.5123C0.135803 16.6582 2.51235 19.2452 5.5679 19.5834Z"
								fill="#1592FF" />
							<rect width="9.16667" height="9.16667" rx="4" fill="#07C160" />
							<rect x="12.833" y="12.8335" width="9.16667" height="9.16667" rx="4" fill="#1592FF" />
						</svg>

						<view class="title">
							{{$t("common.setting.list6")}}
						</view>
					</view>
					<view class="right">
						<text class="title" style="color: var(--theme-color)">
							{{$t(`common.setting.${themeColor.name}`)}}

						</text>
						<uni-icons type="right" style="font-size: 40rpx; color: #999999"
							v-if="!$config.isForceServerTheme"></uni-icons>
					</view>
				</view>
			</view>

			<view class="list-row">
				<view class="list-item" @click="clearCache">
					<view class="left">
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M18.7 6.45371H3.3C2.38873 6.45371 1.65 7.19244 1.65 8.10371C1.65 9.01498 2.38873 9.75371 3.3 9.75371H18.7C19.6113 9.75371 20.35 9.01498 20.35 8.10371C20.35 7.19244 19.6113 6.45371 18.7 6.45371ZM3.3 4.80371C1.47746 4.80371 0 6.28117 0 8.10371C0 9.92625 1.47746 11.4037 3.3 11.4037H18.7C20.5225 11.4037 22 9.92625 22 8.10371C22 6.28117 20.5225 4.80371 18.7 4.80371H3.3Z"
								:fill="themeColor.themeColor" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M12.833 1.65H9.16634C9.06509 1.65 8.98301 1.73208 8.98301 1.83333V4.76667H13.0163V1.83333C13.0163 1.73208 12.9343 1.65 12.833 1.65ZM9.16634 0C8.15382 0 7.33301 0.820811 7.33301 1.83333V6.41667H14.6663V1.83333C14.6663 0.820811 13.8455 0 12.833 0H9.16634Z"
								:fill="themeColor.themeColor" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M16.1335 20.35H5.86686C4.75309 20.35 3.8502 19.4471 3.8502 18.3333V11.4033H18.1502V18.3333C18.1502 19.4471 17.2473 20.35 16.1335 20.35ZM5.86686 22C3.84182 22 2.2002 20.3584 2.2002 18.3333V9.75333H19.8002V18.3333C19.8002 20.3584 18.1586 22 16.1335 22H5.86686Z"
								:fill="themeColor.themeColor" />
							<path
								d="M6.4 16.9037C6.4 16.7933 6.48954 16.7037 6.6 16.7037C6.71046 16.7037 6.8 16.7933 6.8 16.9037V20.4037H6.4V16.9037Z"
								:stroke="themeColor.themeColor" stroke-width="1.1" />
							<path
								d="M10.7994 16.9037C10.7994 16.7933 10.889 16.7037 10.9994 16.7037C11.1099 16.7037 11.1994 16.7933 11.1994 16.9037V20.4037H10.7994V16.9037Z"
								:stroke="themeColor.themeColor" stroke-width="1.1" />
							<path
								d="M15.1998 16.9037C15.1998 16.7933 15.2893 16.7037 15.3998 16.7037C15.5103 16.7037 15.5998 16.7933 15.5998 16.9037V20.4037H15.1998V16.9037Z"
								:stroke="themeColor.themeColor" stroke-width="1.1" />
						</svg>

						<view class="title">
							{{$t("common.setting.list7")}}
						</view>
					</view>
					<view class="right">
						<uni-icons type="right" style="font-size: 40rpx; color: #999999"></uni-icons>
					</view>
				</view>
				<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
				<view class="list-item" v-if="isApp&&isApp()">
					<view class="left">
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M22 4.36033V2.36031C22 1.4603 20.9 1.06029 20.2999 1.6603L18.0999 3.86032C16.3999 2.66031 14.2999 1.9603 11.9999 1.9603C8.19982 1.9603 4.79978 3.96032 3.09977 6.36035C2.69976 7.06036 3.19977 7.96037 3.99978 7.96037C4.29978 7.96037 4.59978 7.76036 4.79978 7.46036C6.0998 5.76034 8.39982 4.96033 10.9998 4.96033C12.7999 4.96033 14.4999 5.36034 15.7999 6.16035L13.6999 8.26037C13.0999 8.86038 13.4999 9.96039 14.3999 9.96039H16.3999H21C21.6 9.96039 22 9.56038 22 8.96038V4.36033Z"
								:fill="themeColor.themeColor" />
							<path
								d="M18.7002 13.9595C18.3002 13.9595 18.0002 14.1595 17.8002 14.4595C16.6002 16.1595 14.3002 16.9595 11.7001 16.9595C9.7001 16.9595 7.80008 16.4595 6.60007 15.4595L8.40009 13.6595C8.90009 13.0595 8.50009 11.9595 7.60008 11.9595H5.60006H1.00001C0.400004 11.9595 0 12.3595 0 12.9595V17.5595V19.5596C0 20.4596 1.10001 20.8596 1.70002 20.2596L4.10004 17.8595C5.80006 19.1595 8.10009 19.9596 10.6001 19.9596C14.5002 19.9596 17.8002 17.9595 19.5002 15.4595C20.0002 14.8595 19.5002 13.9595 18.7002 13.9595Z"
								:fill="themeColor.themeColor" />
						</svg>

						<view class="title">
							{{$t("common.setting.list8")}}: {{serverVersion}}
						</view>
					</view>
					<view class="right">
						<text class="title" style="color:  var(--theme-color)">
							{{$t("common.setting.list10")}}:  {{flutterAppVersionInfo.version}}({{flutterAppVersionInfo.number}})
						</text>
					</view>
				</view>
        <view class="list-item" v-else>
          <view class="left">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M22 4.36033V2.36031C22 1.4603 20.9 1.06029 20.2999 1.6603L18.0999 3.86032C16.3999 2.66031 14.2999 1.9603 11.9999 1.9603C8.19982 1.9603 4.79978 3.96032 3.09977 6.36035C2.69976 7.06036 3.19977 7.96037 3.99978 7.96037C4.29978 7.96037 4.59978 7.76036 4.79978 7.46036C6.0998 5.76034 8.39982 4.96033 10.9998 4.96033C12.7999 4.96033 14.4999 5.36034 15.7999 6.16035L13.6999 8.26037C13.0999 8.86038 13.4999 9.96039 14.3999 9.96039H16.3999H21C21.6 9.96039 22 9.56038 22 8.96038V4.36033Z"
                  :fill="themeColor.themeColor" />
              <path
                  d="M18.7002 13.9595C18.3002 13.9595 18.0002 14.1595 17.8002 14.4595C16.6002 16.1595 14.3002 16.9595 11.7001 16.9595C9.7001 16.9595 7.80008 16.4595 6.60007 15.4595L8.40009 13.6595C8.90009 13.0595 8.50009 11.9595 7.60008 11.9595H5.60006H1.00001C0.400004 11.9595 0 12.3595 0 12.9595V17.5595V19.5596C0 20.4596 1.10001 20.8596 1.70002 20.2596L4.10004 17.8595C5.80006 19.1595 8.10009 19.9596 10.6001 19.9596C14.5002 19.9596 17.8002 17.9595 19.5002 15.4595C20.0002 14.8595 19.5002 13.9595 18.7002 13.9595Z"
                  :fill="themeColor.themeColor" />
            </svg>

            <view class="title">
              {{$t("common.setting.list10")}}: {{$config.version_pro}}
            </view>
          </view>
          <view class="right">
            <text class="title" style="color:  var(--theme-color)">
            </text>
          </view>
        </view>
			</view>


			<!-- <view class="testLogin" v-if="!isLogin">
				<view class="reg-btn" @click="toUrl('/pages/common/reg')">注册</view>
				<view class="login-btn" @click="toUrl('/pages/common/login')">登录</view>
			</view> -->
			<view v-if="isLogin" class="logut-btn" @click="loginOut">
				{{$t("common.setting.logout")}}
			</view>
		</scroll-view>
		<u-popup ref="confirmTheme" mode="center" border-radius="24">
			<view class="language-box">
				<view class="title">{{$t("common.setting.list6")}}</view>
				<view class="radio-list">
					<view class="item" :class="{ active: item.id === themeColor.id }"
						v-for="(item, index) in $config.configUIMgr.themeColors" @click="changeTheme(item)">
						{{$t(`common.setting.${item.name}`)}}
						<!-- {{ item.title }} -->
						<filterIcon v-if="item.id === themeColor.id" src="@/static/img/liuhe/setting/selected.png"
							:width="48" :height="48" />
						<!-- <image class="img" src="@/static/img/liuhe/setting/selected.png"
							v-if="item.id === themeColor.id">
						</image> -->
					</view>
				</view>
				<!-- <text>是否立即清空缓存信息？</text> -->
				<view class="btn-box">
					<view class="btn cancel-btn" @click="cancelTheme">{{$t(`common.cancel`)}}</view>
					<view class="btn confirm-btn" @click="confirmTheme">{{$t(`common.ok`)}}</view>
				</view>
			</view>
		</u-popup>
		<u-popup ref="confirm" mode="center" border-radius="24">
			<view class="confirm-box">
				<view class="title">{{$t(`common.tip`)}}</view>
				<view class="notice">
					<text>{{$t(`common.setting.clear`)}}</text>
				</view>
				<view class="btn-box">
					<view class="btn cancel-btn" @click="cancel">{{$t(`common.cancel`)}}</view>
					<view class="btn confirm-btn" @click="confirm">{{$t(`common.ok`)}}</view>
				</view>
			</view>
		</u-popup>

		<u-popup ref="multilingual" mode="center" border-radius="24">
			<view class="language-box">
				<view class="title">{{$t(`common.setting.list5`)}}</view>
				<view class="radio-list">
					<view class="item" :class="{ active: item.value === current }"
						v-for="(item, index) in $config.configLanguage.languageSelect" @click="current = item.value">
						{{ item.name }}
						<filterIcon v-if="current === item.value" src="@/static/img/liuhe/setting/selected.png"
							:width="48" :height="48" />
						<!-- <image class="img" src="@/static/img/liuhe/setting/selected.png" v-if="current === item.value">
						</image> -->
					</view>
				</view>
				<view class="btn-box">
					<view class="btn cancel-btn" @click="langCancel">{{$t(`common.cancel`)}}</view>
					<view class="btn confirm-btn" @click="langConfirm">{{$t(`common.ok`)}}</view>
				</view>
			</view>
		</u-popup>

		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';

	import {
		info
	} from "@/utils/user";
	import {
		logout,
    doGetAppVersion
	} from "@/utils/common/index";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
  import {config} from "../../../config/config";
	export default {
		name: "index",
		components: {
			Header,
			AlertInjectLayer,
		},

		computed: {
			...mapGetters(['userInfo', 'themeColor', 'language','flutterAppVersionInfo']),
      showUserInfoItemMenu(){
        return this.userInfo&&!['demo'].includes(this.userInfo.userType);
      },

			showItem2(){
				return this.isLogin && !['demo'].includes(this.userInfo.userType)
			},
		},

		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("common.setting.title"),
				headerStyle: {
					backgroundColor: "#1794FF",
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF",
				},
				isLogin: false,
				share: false,
				win: false,
				hand: false,
				// userInfo: {},

				current: null,
				isEnvLanguage: false,
				winHeight: 0,
				configContantId:52,
				serverVersion: ''
			};
		},
		onLoad(option) {
			this.current = this.language
			this.isEnvLanguage = uni.getStorageSync("isEnvLanguage")
			if (isLogin()) {
				this.isLogin = true;
			}
			this.share = uni.getStorageSync("isShare");
			this.win = uni.getStorageSync("isWin");
			this.hand = uni.getStorageSync("isHand") || false;

			// var constants = uni.getStorageSync('config');
			// let serverContantsInfo = this.getContantInfoFromContants(constants);
			// this.serverVersion = serverContantsInfo.url;
      this.getAppVersion();

		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
      isApp:isApp,
			cancelTheme() {
				this.$refs.confirmTheme.close();
			},
			confirmTheme() {
				this.$refs.confirmTheme.close();
			},
			changeTheme(item) {
				console.log(item)
				this.$store.commit("SET_USER_THEME_ID", item.id);
			},
			toUrl(url) {
				uni.navigateTo({
					url: url,
				});
			},
			toUrlSign(url){
				if(['sign'].includes(this.userInfo.userType)){
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return
				}
				this.toUrl(url)
			},
			switchShare(e) {
				this.share = e.detail.value;
				uni.setStorageSync("isShare", this.share);
			},
			switchWin(e) {
				this.win = e.detail.value;
				uni.setStorageSync("isWin", this.win);
			},
			switchHand(e) {
				this.hand = e.detail.value;
				uni.setStorageSync("isHand", this.hand);
			},
			themeSelect() {
				if (this.$config.isForceServerTheme) return;
				// if (!this.$config.isDebug) {
				// 	pop('敬请期待')
				// 	return
				// } else {
				// 	console.warn("该功能已在非debug模式下关闭")
				// }
				this.$refs.confirmTheme.open();
			},
			clearCache() {
				this.$refs.confirm.open();
			},
			cancel() {
				this.$refs.confirm.close();
			},
			confirm() {
				//#ifdef H5
				let that = this;
				setTimeout(function() {
					that.$config.clearStorage(false);
				}, 2000);
				//#endif
				// #ifdef APP-PLUS
				var self = this;
				//使用plus.cache.clear 清除应用中的缓存数据
				plus.cache.clear();
				// #endif
				this.$refs.confirm.close();
				pop(this.$t("common.setting.clearSuccess"), 2000)
			},
			loginOut() {
				logout().then((res) => {
					if (res.code === 200) {
						this.$store.dispatch("userLoginOut");
						this.isLogin = false;
						// uni.rela
						// backPage(true);
						const pages = getCurrentPages(); // 获取页面栈
						const prevPage = pages[pages.length - 2];

						location.href = '/#/' + prevPage.route;

					} else {
						uni.showToast({
							title: this.$t("common.setting.logoutfaild"),
							duration: 2000,
							icon: "none",
						});
					}
				});
			},
			// 多语言选择
			langSelect() {
				if (this.$config.isForceServerLanguage || this.isEnvLanguage) return;
				if (!this.$config.isDebug) {
					pop('敬请期待')
					return
				} else {
					console.warn("该功能已在非debug模式下关闭")
				}
				this.$refs.multilingual.open();
			},
			langCancel() {
				this.current = uni.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LANGUAGE_SET_VALUE);
				this.$refs.multilingual.close();
			},
			langConfirm() {
				// const l = this.$config.configLanguage.languageSelect.find(item => item.name === this.current)
				uni.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LANGUAGE_SET_VALUE, this.current);
				uni.setLocale(this.current);
				this.$refs.multilingual.close();
				location.reload();
			},
			getContantInfoFromContants(contants){
			    if(!contants) return null;
			    for (let i in contants){
			        let info=contants[i];
			        if(info.type=='frontVersion'){
			           return info;
			        }
			    }
			    return null;
			},

      getAppVersion(){
        if(!isApp()){
          return ;
        }
        let _this=this;
        let type = "ios";
        let systemInfo = uni.getSystemInfoSync();
        if (systemInfo.ua.toLowerCase().indexOf("andorid") != -1) {
          type="android"
        }
        doGetAppVersion({type:type}).then(res=>{
          _this.$requestCache.bindLastCacheUpdateApiCallBack(res,_this.bindResponse,this);
          _this.bindResponse(res);
        })
      },

      bindResponse(res){
        let versionInfo = res.result;
        if(versionInfo&&versionInfo.version){
          this.serverVersion = versionInfo.version + `(${versionInfo.code})`;
        }
      }

		},
	};
</script>

<style lang="scss" scoped>
	.lottery-page {
		background: var(--theme-auxiliary-color-default);
	}

	.list-row {
		border-radius: 24rpx;
		background: #ffffff;
		margin-top: 20rpx;

		&:first-child {
			margin-top: 0;
		}

		.list-item {
			display: flex;
			height: 96rpx;
			align-items: center;
			padding: 0 28rpx;

			.left {
				flex: 1;
				display: flex;

				image {
					height: 44rpx;
					width: 44rpx;

				}

				.title {
					margin-left: 20rpx;
					font-weight: 400;
					font-size: 30rpx;
					color: #404040;
				}
			}

			.right {
				display: flex;
				justify-content: flex-end;

				.title {
					margin-right: 10rpx;
					font-weight: 500;
					font-size: 28rpx;
					color: #404040;
					line-height: 52rpx;
				}

				::v-deep {
					.uni-switch-input {
						border: none;
						background: #f5f5f5;

						&::before {
							background: none;
						}

						&::after {
							background-color: var(--theme-color);
							top: 1px;
						}
					}

					.uni-switch-input-checked {
						&::after {
							background-color: #fff;
							top: 1px;
						}
					}
				}
			}
		}
	}

	.testLogin {
		display: flex;
		justify-content: center;
		margin-top: 30rpx;

		.reg-btn,
		.login-btn {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 337.5rpx;
			height: 90rpx;
			border-radius: 50rpx;
			font-weight: 400;
			font-size: 32rpx;
		}

		.reg-btn {
			background: #ffffff;
			border: 1px solid #39b4aa;
			color: #39b4aa;
			margin-right: 30rpx;
		}

		.login-btn {
			background: linear-gradient(89.45deg, #2db49c 0.35%, #09b371 94.83%);
			border: 1px solid #39b4aa;
			color: #ffffff;
		}
	}

	.logut-btn {
		margin: 0 32rpx;
		height: 88rpx;
		display: grid;
		place-content: center;
		border-radius: 20rpx;
		border: 1px solid var(--theme-color);
		color: var(--theme-color);
		font-size: 34rpx;
		margin-top: 80rpx;
	}

	.confirm-box,
	.language-box {
		width: 600rpx;
		height: 340rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.title {
			height: 108rpx;
			font-size: 34rpx;
			text-align: center;
			color: #404040;
			display: grid;
			place-items: center;
		}

		.notice {
			flex: 1;
			display: grid;
			align-items: flex-start;
			justify-content: center;
			font-size: 30rpx;
			color: #404040;
			line-height: 56rpx;
		}

		.btn-box {
			border-top: 1px solid var(--theme-auxiliary-color-default);
			height: 88rpx;
			display: grid;
			grid-template-columns: repeat(2, 1fr);

			.btn {
				display: grid;
				place-content: center;
				font-size: 34rpx;
			}

			.btn+.btn {
				border-left: 1px solid var(--theme-auxiliary-color-default);
			}

			.cancel-btn {
				color: #404040;
			}

			.confirm-btn {
				color: var(--theme-color);
			}
		}
	}

	.language-box {
		height: fit-content;

		.radio-list {
			display: flex;
			flex-direction: column;

			.item {
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				color: #404040;
				font-size: 30rpx;
			}

			.active {
				background: var(--theme-auxiliary-color-default);

				.img {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
</style>
