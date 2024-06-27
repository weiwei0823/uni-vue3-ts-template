<template>
	<uni-popup ref="testLogin" type="center" :class="['theme-' + themeColor.name]" @change="handleChange">
		<view class="logout">
			<view class="img">
				<svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
					<g clip-path="url(#clip0_19552_43956)">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M11.7289 44.5H32.7826C35.7484 44.4071 38.553 43.1163 40.5562 40.9307C43.1067 38.398 44.1767 35.3959 43.9764 30.6434C43.5904 21.4023 36.4471 15.2221 32.4992 12.6796C32.6959 12.4557 32.8852 12.2446 33.0663 12.0427C34.2216 10.7548 35.0402 9.84232 35.2598 8.36711C35.404 7.6116 35.3802 6.8336 35.1903 6.08831C35.0003 5.34302 34.6487 4.6487 34.1605 4.05463C33.371 3.08795 32.2504 2.44985 31.0166 2.26457C29.7829 2.07929 28.5244 2.36009 27.4862 3.0523C26.1768 1.4339 24.2028 0.49513 22.1214 0.500019C20.0693 0.509798 18.1296 1.44368 16.8446 3.04252C14.2501 1.63437 11.7778 2.11842 10.2485 4.03019C9.25174 5.23788 8.85109 6.82694 9.14913 8.36222C9.48157 10.2186 10.4104 11.2229 11.2667 12.1487C11.4298 12.3251 11.5903 12.4987 11.7436 12.6747C7.81526 15.1585 0.383682 21.2557 0.0123479 30.6482C-0.144004 35.4252 1.18987 38.3931 3.70615 40.9258C5.80224 43.131 8.68496 44.4169 11.7289 44.5ZM28.2351 29.6836C29.2097 29.6836 29.9999 30.4605 29.9999 31.4206C29.9999 32.3789 29.2097 33.1576 28.2351 33.1576H24.7058V35.3287C24.7058 36.528 23.7183 37.5 22.4999 37.5C21.2815 37.5 20.294 36.5281 20.294 35.3287V33.1576H16.7646C15.79 33.1576 15 32.3789 15 31.4206C15 30.4604 15.7901 29.6836 16.7646 29.6836H20.294V27.9466H16.7646C15.79 27.9466 15 27.1681 15 26.2097C15 25.2496 15.7901 24.4727 16.7646 24.4727H20.294V24.3539L16.3778 20.4999C15.6837 19.8163 15.6837 18.7087 16.3778 18.0259C17.0718 17.3431 18.1967 17.3431 18.8908 18.0259L22.4702 21.5482L26.0635 18.0114C26.7575 17.3295 27.8825 17.3295 28.5765 18.0114C29.2706 18.695 29.2706 19.8027 28.5765 20.4855L24.7059 24.2953V24.4726H28.2353C29.2099 24.4726 30 25.2496 30 26.2096C30 27.1681 29.2099 27.9465 28.2353 27.9465H24.7059V29.6836L28.2351 29.6836Z"
							:fill="themeColor.themeAuxiliaryColorDot" />
					</g>
					<defs>
						<clipPath id="clip0_19552_43956">
							<rect width="44" height="44" fill="white" transform="translate(0 0.5)" />
						</clipPath>
					</defs>
				</svg>
				<view class="msg">
					试玩登陆成功，试玩金额：2000.00
				</view>
			</view>
			<view class="btn" @click="closePop">
				我知道了！
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "TestLogin",
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		methods: {
			handleChange({show}){
				let color = '#ffffff'
				let isLightColor = false
				if (show) {
					color = '#999999'
					isLightColor = true
				}
				setTimeout(() => {
					this.$nativeBridge.setStatusBarColor(color, isLightColor)
				}, 120);
			},
			showPop() {
				this.$refs.testLogin.open()
			},
			closePop() {
				this.$refs.testLogin.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logout {
		width: 600rpx;
		border-radius: 24rpx;
		background: #FFFFFF;

		.img {
			padding: 40rpx 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				height: 130rpx;
				width: 118rpx;
				margin-top: 50rpx;
			}
		}

		.msg {
			margin-top: 20rpx;
			font-weight: 400;
			font-size: 30rpx;
			color: #404040;
			text-align: center;
		}

		.btn {
			height: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34rpx;
			color: var(--theme-color);
			display: grid;
			place-content: center;
			border-top: 1px solid var(--theme-auxiliary-color-default);
		}
	}
</style>
