<template>
	<view class="mint-tab-container-item pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }">
		<!--顶部导航栏-->
		<Header :title="title" :headerStyle="{ borderRadius: 0 }" isFixed :headerInnerStyle="{borderRadius:0}">
			<block slot="right">
				<view class="uni-list-cell-db" style="display: flex;justify-content: flex-end;">
					<picker @change="bindTimeChange" :value="index" :range="array" @cancel="handleCancel">
						<svg @click="iconClick" style="margin-top: 22rpx;" xmlns="http://www.w3.org/2000/svg" width="22"
							height="22" viewBox="0 0 22 22" fill="none">
							<g clip-path="url(#clip0_22326_67249)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M8.25 1.375C8.25 0.614453 7.63555 0 6.875 0C6.11445 0 5.5 0.614453 5.5 1.375V2.75H3.4375C2.29883 2.75 1.375 3.67383 1.375 4.8125V6.875H20.625V4.8125C20.625 3.67383 19.7012 2.75 18.5625 2.75H16.5V1.375C16.5 0.614453 15.8855 0 15.125 0C14.3645 0 13.75 0.614453 13.75 1.375V2.75H8.25V1.375ZM20.625 8.25H1.375V19.9375C1.375 21.0762 2.29883 22 3.4375 22H18.5625C19.7012 22 20.625 21.0762 20.625 19.9375V8.25ZM7.0293 11.0016C7.28243 11.0016 7.48763 11.2068 7.48763 11.46V14.21C7.48763 14.4631 7.28243 14.6683 7.0293 14.6683H4.2793C4.02617 14.6683 3.82096 14.4631 3.82096 14.21V11.46C3.82096 11.2068 4.02617 11.0016 4.2793 11.0016H7.0293ZM7.0293 15.8911C7.28243 15.8911 7.48763 16.0963 7.48763 16.3494V19.0994C7.48763 19.3526 7.28243 19.5578 7.0293 19.5578H4.2793C4.02617 19.5578 3.82096 19.3526 3.82096 19.0994V16.3494C3.82096 16.0963 4.02617 15.8911 4.2793 15.8911H7.0293ZM9.7793 11.0016C9.52617 11.0016 9.32096 11.2068 9.32096 11.46V14.21C9.32096 14.4631 9.52617 14.6683 9.7793 14.6683H12.5293C12.7824 14.6683 12.9876 14.4631 12.9876 14.21V11.46C12.9876 11.2068 12.7824 11.0016 12.5293 11.0016H9.7793ZM12.5293 15.8911C12.7824 15.8911 12.9876 16.0963 12.9876 16.3494V19.0994C12.9876 19.3526 12.7824 19.5578 12.5293 19.5578H9.7793C9.52617 19.5578 9.32096 19.3526 9.32096 19.0994V16.3494C9.32096 16.0963 9.52617 15.8911 9.7793 15.8911H12.5293ZM15.2793 11.0016C15.0262 11.0016 14.821 11.2068 14.821 11.46V14.21C14.821 14.4631 15.0262 14.6683 15.2793 14.6683H18.0293C18.2824 14.6683 18.4876 14.4631 18.4876 14.21V11.46C18.4876 11.2068 18.2824 11.0016 18.0293 11.0016H15.2793ZM18.0293 15.8911C18.2824 15.8911 18.4876 16.0963 18.4876 16.3494V19.0994C18.4876 19.3526 18.2824 19.5578 18.0293 19.5578H15.2793C15.0262 19.5578 14.821 19.3526 14.821 19.0994V16.3494C14.821 16.0963 15.0262 15.8911 15.2793 15.8911H18.0293Z"
									:fill="themeColor.themeColor" />
							</g>
							<defs>
								<clipPath id="clip0_22326_67249">
									<rect width="22" height="22" fill="white" />
								</clipPath>
							</defs>
						</svg>

					</picker>
				</view>
			</block>
		</Header>

		<!--搜索-->
		<view class="search-div" style="margin-top:-2rpx;">

			<view class="search_new" style="">
				<view style="width: 90%; height: 72rpx;">
					<uni-search-bar :bgColor="themeColor.themeAuxiliaryColorDefault" radius="8"
						:placeholderStyle="'color:#A1A1A1;font-size: 26rpx;'"
						:placeholder="$t('pages.luntan.dataCollection.index.searchRelatedArticles')" cancelButton="none"
						v-model="searchValue" @confirm="search">
						<template v-slot:searchIcon>
							<svg @click="search" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
								viewBox="0 0 18 18" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M12.7814 12.7814C9.85751 15.7054 5.11688 15.7054 2.19295 12.7814C-0.730983 9.85751 -0.730983 5.11688 2.19295 2.19295C5.11688 -0.730983 9.85751 -0.730983 12.7814 2.19295C15.7054 5.11688 15.7054 9.85751 12.7814 12.7814ZM11.0167 11.0167C9.06742 12.966 5.907 12.966 3.95772 11.0167C2.00843 9.0674 2.00843 5.90698 3.95772 3.95769C5.907 2.0084 9.06742 2.0084 11.0167 3.95769C12.966 5.90698 12.966 9.0674 11.0167 11.0167ZM15.8698 14.105C15.3824 13.6177 14.5923 13.6177 14.105 14.105C13.6177 14.5923 13.6177 15.3824 14.105 15.8698L15.8698 17.6345C16.3571 18.1218 17.1472 18.1218 17.6345 17.6345C18.1218 17.1472 18.1218 16.3571 17.6345 15.8698L15.8698 14.105Z"
									fill="#A1A1A1" />
							</svg>
						</template>
					</uni-search-bar>

				</view>
				<!-- role="button" tabindex="0" -->
				<view @click="search" class="van-search__action">
					<view :style="`font-size: 15px; color: ${themeColor.themeColor};`">
						{{ $t('pages.luntan.dataCollection.index.search') }}
					</view>
				</view>
			</view>
		</view>
		<!--列表-->
		<view class="loading" v-if="loading">
			<ltLoading />
		</view>
		<scroll-view scroll-y class="scroll-y" v-else-if="list.length > 0"
			:style="{height:`calc( ${winHeight}px - 88rpx)`}" :enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="search-list clearfix">
				<view class="search-item" v-for="(item, index) in list" :key="index">
					<view class="search-rol" @click="lists(item)">{{ item.articleTypeName }}</view>
				</view>
			</view>
		</scroll-view>
		<view class="search-list empty" v-else>
			<empty></empty>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import {
		listArticleType
	} from "@/utils/data/index.js";
	import {
		listYear
	} from '@/utils/live/index'
	import Empty from '@/components/common/empty/empty'
	import NavBar from '@/components/common/navBar/navBar.vue'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import {
		setPickerStyle
	} from "@/utils/common.ts";
	import Header from '@/components/common/header/index.vue';
	import ltLoading from '@/components/common/loading/LuntanLoading.vue'
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			Empty,
			Header,
			ltLoading
		},
		data() {
			const date = new Date();
			return {
				title: this.$t('pages.luntan.dataCollection.index.dataCollection'),
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					this.$config.defaultValues.DEFAULT_SELECT_LOTTERY_TYPE, true),
				years: '',
				array: [],
				index: 0,
				searchValue: '',
				list: [],
				allList: [],
				loading: false,
				winHeight: 0,
			}
		},
		onLoad(option) {
			this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE) || 1
			if (this.lotteryType == 1) {
				this.title = this.$t('pages.luntan.dataCollection.index.hongKong') + this.title
			} else if (this.lotteryType == 2) {
				this.title = this.$t('pages.luntan.dataCollection.index.macau') + this.title
			} else if (this.lotteryType == 3) {
				this.title = this.$t('pages.luntan.dataCollection.index.taiwan') + this.title
			} else if (this.lotteryType == 5) {
				this.title = '快乐8' + this.title
			} else {
				this.title = this.$t('pages.luntan.dataCollection.index.singapore') + this.title
			}
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.listYear()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			iconClick() {
				setPickerStyle(this.themeColor.themeColor);
				this.$nativeBridge.setStatusBarColor('#B2B2B2')
			},
			handleCancel(){
				this.$nativeBridge.setStatusBarColor('#fff')
			},
			//返回
			back: function() {
				backPage()
			},
			lists: function(item) {
				let url = "/pages/luntan/dataCollection/Index/List"
				uni.navigateTo({
					url: url + "?title=" + item.articleTypeName + "&id=" + item.articleTypeId +
						"&type=4&year=" + this.years,
				})
			},
			//时间选择
			bindTimeChange: function(e) {
				this.loading = true
				this.years = this.array[e.detail.value]
				this.listArticleType()
			},
			listYear() {
				this.loading = true
				let prams = {
					lotteryType: this.lotteryType
				}
				listYear(prams).then(res => {
					this.array = res.result
					this.listArticleType()
				}).catch(err => {
					console.log(err)
				})
			},
			listArticleType: function() {
				let prams = {
					type: 4,
					lotteryType: this.lotteryType,
					year: this.years
				}
				listArticleType(prams).then(res => {
					this.list = res.result.list ? res.result.list : []
					this.allList = this.list
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			},
			//搜索功能
			search: function() {
				let val = this.searchValue
				if (val == '') {
					this.list = this.allList
					return false
				}
				const list = []
				this.allList.forEach((item, index) => {
					// 声明一个变量接收
					let res = item.articleTypeName.indexOf(val);
					if (res != -1) {
						list.push(item)
					}
				})
				this.list = list
			}
		}
	}
</script>

<style>
	.uni-picker-custom {}
</style>
<style scoped lang="scss">
	::v-deep .uni-searchbar__box {
		height: 72rpx;
	}

	::v-deep .uni-searchbar__box-icon-clear {
		height: 72rpx;
		display: flex;
		align-items: center;
	}

	.tab-div-bg {
		top: 144rpx;
		height: 54rpx;
	}

	.mint-tab-container-item {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.search_new {
		background-color: var(--theme-auxiliary-color-default);
		display: flex;
		width: 100%;
		height: 72rpx;
		border-radius: 16rpx;
		overflow: hidden;
		align-items: center;
	}

	.header-box,
	.header,
	.box-bg {
		height: 46px;
	}

	.input-view {
		font-size: 16px;
	}

	.curyear {
		width: 50px;
		height: 35px;
		line-height: 35px;
		color: #03bf03;
		margin-right: 5px;
	}

	.search-div {
		padding: 20rpx 10px;
		// padding-bottom: 20rpx;
		background: #fff;
		display: flex;
		height: auto;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		box-sizing: border-box;
		width: 100%;

		::v-deep .uni-searchbar {
			padding: 0;
		}
	}

	.van-search__action {
		width: 10%;
		text-align: right;
		padding-right: 20rpx;
		// line-height: 50px;
		display: flex;
		align-items: center;
		height: 72rpx;

		&:focus-visible {
			border: none;
			outline: 0;
		}
	}

	.scroll-y {
		height: calc(var(--vh) - 210rpx);
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.search-list {
		border-radius: 24rpx;
		padding: 20rpx 20rpx 0;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		flex: 1;
	}


	.loading {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 20rpx;
		margin-top: 113rpx;

		.loading_img {
			width: 68rpx;
			height: 68rpx;
		}

		.loading_text {
			margin-top: 20rpx;
			color: #A1A1A1;
			text-align: center;
			font-size: 30rpx;
		}
	}

	::v-deep.empty-box {
		height: 100%;
	}

	.empty {
		width: 100%;
		background: var(--theme-auxiliary-color-default) !important;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-list .search-item {
		// float: left;
		width: 33.333%;
		color: #979797;
	}

	.search-list .search-item .search-rol {
		width: 192rpx;
		height: 56rpx;
		border-radius: 12rpx;
		line-height: 56rpx;
		border-radius: 12rpx;
		border: 2rpx solid var(--theme-auxiliary-color-default);
		text-align: center;
		margin: 0 auto 28rpx auto;
		font-size: 28rpx;
		color: #404040;
		text-align: center;

		font-weight: 400;
	}

	::v-deep .uni-input-placeholder {
		color: #A1A1A1 !important;
	}
</style>
