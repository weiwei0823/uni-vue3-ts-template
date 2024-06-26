<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" isFixed>
			<block slot="right">
				<view class="uni-list-cell-db" style="justify-content: flex-end;">
					<picker @change="bindTimeChange" :value="index" :range="array" @cancel="handleCancel">
						<svg @click="iconClick" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
							viewBox="0 0 22 22" fill="none">
							<g clip-path="url(#clip0_22501_83543)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M8.25 1.375C8.25 0.614453 7.63555 0 6.875 0C6.11445 0 5.5 0.614453 5.5 1.375V2.75H3.4375C2.29883 2.75 1.375 3.67383 1.375 4.8125V6.875H20.625V4.8125C20.625 3.67383 19.7012 2.75 18.5625 2.75H16.5V1.375C16.5 0.614453 15.8855 0 15.125 0C14.3645 0 13.75 0.614453 13.75 1.375V2.75H8.25V1.375ZM20.625 8.25H1.375V19.9375C1.375 21.0762 2.29883 22 3.4375 22H18.5625C19.7012 22 20.625 21.0762 20.625 19.9375V8.25ZM7.0293 11.0016C7.28243 11.0016 7.48763 11.2068 7.48763 11.46V14.21C7.48763 14.4631 7.28243 14.6683 7.0293 14.6683H4.2793C4.02617 14.6683 3.82096 14.4631 3.82096 14.21V11.46C3.82096 11.2068 4.02617 11.0016 4.2793 11.0016H7.0293ZM7.0293 15.8911C7.28243 15.8911 7.48763 16.0963 7.48763 16.3494V19.0994C7.48763 19.3526 7.28243 19.5578 7.0293 19.5578H4.2793C4.02617 19.5578 3.82096 19.3526 3.82096 19.0994V16.3494C3.82096 16.0963 4.02617 15.8911 4.2793 15.8911H7.0293ZM9.7793 11.0016C9.52617 11.0016 9.32096 11.2068 9.32096 11.46V14.21C9.32096 14.4631 9.52617 14.6683 9.7793 14.6683H12.5293C12.7824 14.6683 12.9876 14.4631 12.9876 14.21V11.46C12.9876 11.2068 12.7824 11.0016 12.5293 11.0016H9.7793ZM12.5293 15.8911C12.7824 15.8911 12.9876 16.0963 12.9876 16.3494V19.0994C12.9876 19.3526 12.7824 19.5578 12.5293 19.5578H9.7793C9.52617 19.5578 9.32096 19.3526 9.32096 19.0994V16.3494C9.32096 16.0963 9.52617 15.8911 9.7793 15.8911H12.5293ZM15.2793 11.0016C15.0262 11.0016 14.821 11.2068 14.821 11.46V14.21C14.821 14.4631 15.0262 14.6683 15.2793 14.6683H18.0293C18.2824 14.6683 18.4876 14.4631 18.4876 14.21V11.46C18.4876 11.2068 18.2824 11.0016 18.0293 11.0016H15.2793ZM18.0293 15.8911C18.2824 15.8911 18.4876 16.0963 18.4876 16.3494V19.0994C18.4876 19.3526 18.2824 19.5578 18.0293 19.5578H15.2793C15.0262 19.5578 14.821 19.3526 14.821 19.0994V16.3494C14.821 16.0963 15.0262 15.8911 15.2793 15.8911H18.0293Z"
									:fill="themeColor.themeColor" />
							</g>
							<defs>
								<clipPath id="clip0_22501_83543">
									<rect width="22" height="22" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<!-- <uni-icons custom-prefix="iconfont" type="rili" :color="themeColor.themeColor" size="16"
							style="width:15px;height:15px;margin-right:10px;" @click="iconClick" /> -->
					</picker>
				</view>
			</block>
		</Header>


		<!-- <nav-bar :isBack="true" :title="title">
			<block slot="right">
				<view class="uni-list-cell-db">
					<picker @change="bindTimeChange" :value="index" :range="array">
						<uni-icons custom-prefix="iconfont" type="rili" :color="themeColor.themeColor"
							@click="iconClick" size="16" style="margin-right:10px;" />
					</picker>
				</view>
			</block>
		</nav-bar> -->
		<!--表格部分-->
		<scroll-view scroll-y class="scroll-y" :style="{height:`calc(${winHeight}px - 280rpx - var(--safe-area-inset-bottom))`}" :enhanced="true"
			:bounces="false" :show-scrollbar="false">
			<LuntanLoading class="loading" v-if="loading" />
			<view class="table-content" v-else>


				<table>
					<tr style="line-height: 40px;" class="first-th">
						<th v-for="(item, index) in tableData.rows" :key="index">{{ item.label }}</th>
					</tr>
					<tr v-for="(item, index) in tableData.rols" :key="index">
						<td class="">
							<view>{{ item.yearAndTerm }}</view>
						</td>
						<td>
							<view :class="item.normal1.red == 0 || 'red'">{{ item.normal1.value }}</view>
						</td>
						<td>
							<view :class="item.normal2.red == 0 || 'red'">{{ item.normal2.value }}</view>
						</td>
						<td>
							<view :class="item.normal3.red == 0 || 'red'">{{ item.normal3.value }}</view>
						</td>
						<td>
							<view :class="item.normal4.red == 0 || 'red'">{{ item.normal4.value }}</view>
						</td>
						<td>
							<view :class="item.normal5.red == 0 || 'red'">{{ item.normal5.value }}</view>
						</td>
						<td>
							<view :class="item.normal6.red == 0 || 'red'">{{ item.normal6.value }}</view>
						</td>
						<td>
							<view :class="item.special.red == 0 || 'red'">{{ item.special.value }}</view>
						</td>
					</tr>
				</table>
				<!--底部-->
			</view>
		</scroll-view>
		<view class="footer">
			<count-fab :lotterytype="lotteryType"></count-fab>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import CountFab from "@/components/common/fab/CountFab"
	import {
		consecutiveStat
	} from "@/utils/zxcount";
	import {
		listYear
	} from '@/utils/live/index'
	import NavBar from "@/components/common/navBar/navBar.vue";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters,

	} from 'pinia';
	import Header from '@/components/common/header/index.vue';
	import {
		setPickerStyle
	} from "@/utils/common.ts";
	export default {
		name: "lmzs",
		components: {
			AlertInjectLayer,
			CountFab,
			Header
		},
		data() {
			const date = new Date();
			return {
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.informationCount.lmzs.title'),
				lotteryType: 1,
				type: 1,
				years: '',
				index: 0,
				array: [],
				startDate: (date.getFullYear() - 4) + '',
				endDate: (date.getFullYear()) + '',
				tableData: [],
				winHeight: 0
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onLoad(option) {
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('argParams', function(data) {
				this.lotteryType = data.lotteryType
			})
			this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE)

			this.title = this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.title;
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.listYear()
			this.consecutiveStat()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor"]),
		},
		methods: {
			iconClick() {
				setPickerStyle(this.themeColor.themeColor);
				this.$nativeBridge.setStatusBarColor('#B2B2B2')
			},
			handleCancel(){
				this.$nativeBridge.setStatusBarColor('#fff')
			},
			back: function() {
				uni.reLaunch({
					url: "/pages/luntan/home/index/Index" // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			//时间选择
			bindTimeChange: function(e) {
				this.years = this.array[e.detail.value]
				this.consecutiveStat()
			},
			listYear() {
				let prams = {
					lotteryType: this.lotteryType
				}
				listYear(prams).then(res => {
					this.array = res.result
					this.years = this.array[this.index]
				}).catch(err => {
					console.log(err)
				})
			},
			consecutiveStat: function() {
				this.loading = true
				let prams = {
					year: this.years,
					type: this.type
				};
				consecutiveStat(prams).then(res => {
					this.tableData = res.result
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.scroll-y {
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.header-box,
	.header,
	.box-bg {
		height: 46px;
	}

	.input-view {
		font-size: 16px;
	}

	.uni-subtitle {
		font-size: 14px;
	}

	.footer {
		height: 80px;
	}

	.curyear {
		width: 50px;
		height: 35px;
		line-height: 35px;
		color: #03bf03;
		margin-right: 5px;
	}

	table {
		width: 100%;
		background: #fff;
		border-collapse: collapse;
		text-align: center;
	}

	table th {
		font-weight: 400;
		color: #404040;
		font-size: 24rpx;
	}

	table tr:nth-of-type(2n) {
		background: #f8f8f8;
	}

	table tr {
		line-height: 56rpx;
	}

	table tr td {
		font-size: 28rpx;
		border: 1px solid #e1e1e1;
	}

	table td>uni-view.red {
		width: 44rpx;
		height: 44rpx;
		color: #fff;
		background: red;
		border-radius: 50%;
		text-align: center;
		line-height: 44rpx;
		margin: 0 auto;
	}

	.table-content {
		padding: 20rpx 28rpx;
		background-color: #fff;
		box-sizing: border-box;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		overflow: hidden;
	}

	.first-th {
		background-color: var(--theme-color);
	}

	.first-th th {
		color: #FFF;
		font-feature-settings: 'clig' off, 'liga' off;

		font-size: 28rpx;
		font-weight: 400;
	}
</style>
