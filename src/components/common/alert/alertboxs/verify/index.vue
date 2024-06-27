<template>
	<u-popup v-model="show" mode="center" border-radius="10" :z-index="zIndex" :mask-close-able="false"
		@open="handleOpen" @close="handleClose" z-index="10001">
		<view class="verify" :class="['theme-' + themeColor.name]">
			<component ref="verify" :is="componentId" :getCodeKey="key" @success="handleSuccess" @fail="fail">
			</component>
			<view class="btn-icons">
				<svg @click="close" width="24" height="24" viewBox="0 0 24 24" fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M7.30761 15.7929C6.91709 16.1834 6.91709 16.8165 7.30761 17.2071C7.69814 17.5976 8.3313 17.5976 8.72183 17.2071L12.1005 13.8284L15.3787 17.1066C15.7692 17.4971 16.4024 17.4971 16.7929 17.1066C17.1834 16.716 17.1834 16.0829 16.7929 15.6923L13.5147 12.4142L17.2071 8.72178C17.5976 8.33126 17.5976 7.69809 17.2071 7.30757C16.8166 6.91705 16.1834 6.91705 15.7929 7.30757L12.1005 11L8.30761 7.20706C7.91709 6.81654 7.28392 6.81654 6.8934 7.20706C6.50288 7.59759 6.50288 8.23075 6.8934 8.62128L10.6863 12.4142L7.30761 15.7929Z"
						fill="#A1A1A1" />
					<rect x="1" y="1" width="22" height="22" rx="11" stroke="#A1A1A1" stroke-width="2" />
				</svg>
				<svg v-if="componentId !== 'Slide'" style="margin-left:20rpx;" @click="$refs.verify.loadData()" xmlns="http://www.w3.org/2000/svg"
					width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path
						d="M-3.81873e-05 11.9998C-3.8165e-05 11.4901 0.413137 11.0767 0.923077 11.0767C1.43302 11.0767 1.84619 11.4901 1.84619 11.9998C1.84619 17.5985 6.40136 22.154 12.0004 22.154C15.6147 22.154 18.9853 20.208 20.7973 17.0751C21.0524 16.634 21.617 16.4831 22.0584 16.7379C22.4996 16.9933 22.6507 17.5589 22.3953 17.9994C20.2549 21.7008 16.2716 24.0002 12.0004 24.0002C5.38326 24.0002 -3.84766e-05 18.6166 -3.81873e-05 11.9998Z"
						fill="#A1A1A1" />
					<path
						d="M1.22362 6.93201C1.22362 6.78958 1.25667 6.64473 1.32639 6.50951C3.39588 2.49434 7.48557 0.000243419 11.9996 0.000243616C18.6167 0.000243905 24 5.38387 24 12.0007C24 12.5103 23.5868 12.9238 23.0769 12.9238C22.5669 12.9238 22.1538 12.5103 22.1538 12.0007C22.1538 6.40191 17.5986 1.84647 11.9996 1.84647C8.17971 1.84647 4.71894 3.95713 2.96767 7.35569C2.73388 7.80882 2.17737 7.98672 1.72423 7.75293C1.40631 7.58948 1.22362 7.26616 1.22362 6.93201Z"
						fill="#A1A1A1" />
					<path
						d="M16.8159 17.4104C16.8159 16.9008 17.2291 16.4886 17.7391 16.4886L21.7392 16.4886C22.2491 16.4886 22.6836 16.9083 22.6836 17.418L22.6836 21.4181C22.6836 21.9277 22.2498 22.3412 21.7399 22.3412C21.2299 22.3412 20.7962 21.9277 20.7962 21.4181L20.7962 18.3322L17.739 18.3322C17.2291 18.3322 16.8159 17.9201 16.8159 17.4104Z"
						fill="#A1A1A1" />
					<path
						d="M1.04116 7.07672L1.04116 3.07655C1.04116 2.56692 1.45299 2.15344 1.96293 2.15344C2.47287 2.15344 2.88469 2.56692 2.88469 3.07655L2.88469 6.16257L5.95579 6.16257C6.46573 6.16257 6.87891 6.57471 6.87891 7.08434C6.87891 7.59398 6.46573 8.00611 5.95579 8.00611L1.95566 8.00611C1.44572 8.00614 1.04116 7.58636 1.04116 7.07672Z"
						fill="#A1A1A1" />
				</svg>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import Select from './Select'
	import Input from './Input'
	import Slide from './Slide'
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";

	export default {
		name: "Verify",
		components: {
			Select,
			Input,
			Slide
		},
		props: {
			zIndex: {
				type: [Number, String],
				default: () => {
					return 10075
				}
			}
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor", "webSiteConfig"]),
		},
		data() {
			return {
				show: false,
				success: null,
				fail: null,
				/**
				 * 验证码类型: Select 点选 Input 输入 Slide 滑动
				 */
				verifyTypeList: ['Select', 'Input', 'Slide'],
				componentId: 'Select',
				key: ''
			}
		},
		methods: {
			isShowVerify() {
				return this.webSiteConfig.website_real_person_switch === 1
			},
			open(data = {}, {
				success,
				fail
			}) {
				// 判断真人验证开关是否开启 如果未开启 不打开验证码窗口
				if (data.check_website !== false && !this.isShowVerify()) {
					success({
						close: this.close
					})
					return
				}
				this.show = true

				const {
					verifyType,
					key
				} = data
				this.key = key
				// 如果没指定验证码类型 随意使用一个
				this.componentId = verifyType || this.verifyTypeList[Math.floor(Math.random() * this.verifyTypeList
					.length)]

				this.success = success
				this.fail = fail
			},
			close() {
				this.show = false
			},
			handleOpen() {
				this.$emit('open')
				this.callback && this.callback({
					type: 'open'
				})
			},
			handleClose() {
				this.$emit('close')
				this.callback && this.callback({
					type: 'close'
				})
			},
			handleSuccess(res) {
				this.success({
					...res,
					close: this.close
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.verify {
		width: 600rpx;
		// height: 726rpx;
		box-sizing: border-box;
		border-radius: 12rpx;
		border-top: 10rpx solid var(--theme-color);
		padding: 40rpx 30rpx;
		display: flex;
		flex-direction: column;
		// gap: 40rpx;

		.btn-icons {
			display: flex;
			align-items: center;
			// gap: 20rpx;
			margin-top: 40rpx;
		}
	}
</style>
<style>
	.verify:has(.fail) {
		border-top-color: var(--theme-auxiliary-color-remind);
	}
	.verify:has(.slide) {
		width: 700rpx;
	}
</style>
