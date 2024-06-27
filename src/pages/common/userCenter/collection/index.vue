<template>
	<view class="collection-box" :style="{ marginTop: safeHeight,height: `${uWindowHeight}px` }"
		:class="['theme-' + themeColor.name]">
		<!--		<nav-bar :title="$t('pages.common.userCenter.index.collection.myCollection')" is-back></nav-bar>-->
		<Header :title="$t('pages.common.userCenter.index.collection.myCollection')" isFixed />
		<view class="collection-box-body">
			<view class="control-box">
				<view class="type">
					<view v-for="(item, index) in typeArr" :key="index"
						:class="item.name === activeType.name ? 'type-item-active' : ''" class="type-item"
						@click="handleType(item)">
						<text v-if="!item.url">{{ item.label }}</text>
						<img v-else :src="item.name === activeType.name ? item.active : item.url" alt="" />
					</view>
				</view>
				<view class="search">
					<uni-search-bar v-model="formData.title" :placeholder="searchTitle"
						placeholder-style="color: #c9c9cb;" bgColor="#FFFFFF" cancelButton="always"
						:cancelText="$t('pages.common.userCenter.index.collection.search')" @confirm="search"
						@cancel="search" @clear="clear">
						<template v-slot:searchIcon>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
								fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
									fill="#A1A1A1" />
							</svg>
						</template>
					</uni-search-bar>
				</view>
				<view class="tab">
					<view v-for="(item, index) in tabArr" :key="index"
						:class="item.name === activeTab.name ? 'tab-item-active' : ''" class="tab-item"
						@click="handleTab(item)">
						{{ item.label }}
					</view>
				</view>
			</view>

			<scroll-view :style="{height:`calc(${uWindowHeight}px - 400rpx)`}" scroll-y="true"
				v-if="this.list.length > 0 && !isLoading" class="list-box">
				<view class="list">
					<template>
						<view v-for="(item, index) in list" :key="index" class="list-item" @click="pictureDetail(item)">
							<view class="left">
								<view class="img">
									<!-- <image mode="aspectFill" style="width: 178rpx; height: 108rpx;"
										:src="item.pictureUrl" /> -->
									<loadingImage :src="item.pictureUrl" :width="178" :height="108" />
								</view>
								<view class="label">{{ item.pictureName }}</view>
							</view>
							<view class="right">
								<view :class="getClass(item.lotteryType)">
									<image class="flag" :use-theme-color="false" :src="getTypeIcon(item.lotteryType)"
										style="width: 44rpx;height: 44rpx" />

									<view class="txt">
										{{ getLotteryType(item.lotteryType) }}
									</view>
								</view>
								<view class="icon">
									<uni-icons type="forward" size="32rpx"></uni-icons>
								</view>
							</view>
						</view>
					</template>
				</view>
			</scroll-view>
			<empty v-else-if="this.list.length <= 0 && !isLoading"> </empty>
			<LuntanLoading class="loading" v-else-if="isLoading" />

		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import empty from "@/components/common/empty/empty.vue";
	import loadingImage from "@/components/common/loadingImage/index.vue";
	import UniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
	import Header from '@/components/common/header/index.vue';
	import {
		myCollection
	} from "@/utils/user";
  import {
    lotteryTime
  } from '@/utils/lottery/index'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		components: {
			AlertInjectLayer,
			UniIcons,
			empty,
			Header,
			loadingImage
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				searchValue: "",
				over: false,
				formData: {
					pageNum: 1,
					lotteryType: "",
					title: "",
					type: 1
				},
				typeArr: [  {
          label: this.$t('pages.common.userCenter.index.collection.all'),
          name: "",
        }
					// {
					//   label: this.$t('pages.common.userCenter.index.collection.worldCup'),
					//   name: "zc",
					//   url: "@/static/img/user/collection/collection-zq.gif",
					//   active: "@/static/img/user/collection/collection-zq2.gif",
					// },
				],
        typeArrConfig:[
          {
            label: this.$t('pages.common.userCenter.index.collection.all'),
            name: "",
          },
          {
            label: this.$t('pages.common.userCenter.index.collection.aocai'),
            name: "2",
            lotteryTypeId:2,
          },
          {
            label: this.$t('pages.common.userCenter.index.collection.gangcai'),
            name: "1",
            lotteryTypeId:1,
          },
          {
            label: this.$t('pages.common.userCenter.index.collection.happy8'),
            name: "5",
            lotteryTypeId:5,
          },
          {
            label: this.$t('pages.common.userCenter.index.collection.taicai'),
            name: "3",
            lotteryTypeId:3,
          },
          {
            label: this.$t('pages.common.userCenter.index.collection.xincai'),
            name: "4",
            lotteryTypeId:4,
          }
        ],


				tabArr: [{
						label: this.$t('pages.common.userCenter.index.collection.liuheGallery'),
						name: "lh",
					},
					{
						label: this.$t('pages.common.userCenter.index.collection.humorGuess'),
						name: "ym",
					},
				],
				activeTab: {
					label: this.$t('pages.common.userCenter.index.collection.liuheGalleryAll'),
					name: "lh",
				},
				activeType: {
					label: this.$t('pages.common.userCenter.index.collection.all'),
					name: "",
				},
				list: [],
				isLoading: false
			};
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor"]),
      ...mapState(useSystemInfoStore, ["uWindowHeight"]),
			searchTitle() {
				return `${this.$t('pages.common.userCenter.index.collection.text1')}${this.activeType.label}${this.$t('pages.common.userCenter.index.collection.text2')}`;
			},
		},
	  async	onLoad(option) {
      await this.initNavMenu();
			this.getList();
		},


		onReachBottom() {
			if (this.over === false) {
				this.formData.pageNum++
				this.getList()
			} else {
				return
			}
		},
		methods: {
			getLotteryType(type) {
				switch (type) {
					case 1:
						return this.$t('pages.common.userCenter.index.collection.liuheGalleryHongKong')
					case 2:
						return this.$t('pages.common.userCenter.index.collection.liuheGalleryMacao')
					case 3:
						return this.$t('pages.common.userCenter.index.collection.liuheGalleryTaiwan')
					case 4:
						return this.$t('pages.common.userCenter.index.collection.liuheGallerySingapore')
          case 5:
            return this.$t('pages.common.userCenter.index.collection.happy8')
				}
			},
			getTypeIcon(type) {
        if(this.typeArr.length<1){
          return null;
        }
        let info = this.typeArr.find((lotteryTime)=>{
          return lotteryTime.lotteryType == type;
        })
        if(info && info.icon)
        {
          return  info.icon;
        }
        switch (type) {
					case 1:
						return "@/static/img/menu/2.png"
					case 2:
						return "@/static/img/menu/1.png"
					case 3:
						return "@/static/img/menu/3.png"
					case 4:
						return "@/static/img/menu/4.png"
          case 5:
            return "@/static/img/menu/5.png"
				}
			},
			getClass(type) {
				switch (type) {
					case 1:
						return "tag hk"
					case 2:
						return "tag mo"
					case 3:
						return "tag tw"
					case 4:
						return "tag sn"
          case 5:
            return "tag sn"
				}
			},
			back() {
				uni.navigateBack();
			},
			search() {
				this.list = []
				this.formData.pageNum = 1
				this.getList()
			},
			getList() {
				this.isLoading = true
				myCollection(this.formData).then(res => {

					if (res.code === 200) {
						this.list = this.list.concat(res.result.records)
						if (res.result.records.length < 10) {
							this.over = true
						}
					}
					this.isLoading = false
				})
			},
			//图库详情
			pictureDetail(item) {
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, item
					.lotteryType);
				if (item.type == 1) {
					let url = "/pages/luntan/liuhePicture/detail?id=" + item.pictureId
					uni.navigateTo({
						url: url,
					})
				} else {
					let url = '/pages/luntan/humorousGuessing/index?id=' + item.pictureId
					uni.navigateTo({
						url: url,
					})
				}

			},
			// 类型点击事件
			handleType(item) {
				this.activeType = item;
				this.list = []
				this.formData.lotteryType = item.name
				this.formData.pageNum = 1
				this.getList();
			},
			// 选项卡切换事件
			handleTab(item) {
				this.activeTab = item;
				if (this.activeTab.name == "lh") {
					this.over = false;
					this.list = [];
					this.formData.pageNum = 1;
					this.formData.type = 1;
					this.getList()
				} else if (this.activeTab.name == "ym") {
					this.over = false;
					this.list = [];
					this.formData.pageNum = 1;
					this.formData.type = 8;
					this.getList()
				} else {
					this.list = []
				}
			},
      // 初始化菜单
      initNavMenu(){
        let _this=this;
        return new Promise(resolve=>{
          lotteryTime().then(res=>{
              let concat = res.result;
              concat.forEach((navInfo)=>{
                navInfo.name=navInfo.lotteryType.toString();
                navInfo.label=_this.getLotteryType(navInfo.lotteryType);
                navInfo.icon = navInfo.icon;
              })
              this.typeArr.push(...concat);
              resolve();
          })
        })
      },

    },
	};
</script>

<style lang="scss" scoped>
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.list-box {
		flex-shrink: 0;
		// height: calc(100vh - 280rpx - 40rpx - 80rpx);
		margin-top: 20rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 28rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #323233;
		position: relative;

		&::after {
			position: absolute;
			box-sizing: border-box;
			content: " ";
			pointer-events: none;
			right: 16px;
			bottom: 0;
			left: 16px;
			border-bottom: 1px solid #ebedf0;
			transform: scaleY(.5);
		}

		&:last-child {
			&::after {
				border-bottom: 0;
			}

		}

		&>.left {
			display: flex;
			align-items: center;
			// gap: 0 20rpx;

			.img {
				width: 178rpx;
				height: 108rpx;
				border-radius: 12rpx;
				overflow: hidden;
			}

			.label {
				margin-left: 20rpx;
				color: #404040;
				font-size: 28rpx;
			}
		}

		&>.right {
			display: flex;
			align-items: center;

			&>.tag {
        width: 160rpx;
        height: 64rpx;
        border-radius: 8rpx;
        padding: 10rpx 0rpx 10px 20rpx;
        box-sizing: border-box;
        background: var(--theme-auxiliary-color-default);
        display: flex;
        .img{
          width: 44rpx;
          height: 44rpx;
        }
				.txt {
          width: 100rpx;
          line-height: 44rpx !important;
          //margin-left: 20rpx;
          font-size: 28rpx;
          text-align: center;
          color: #404040;
				}
			}


			&>.icon {
				color: #404040;
				display: flex;
				align-items: center;
				margin-left: 20rpx;
			}
		}
	}

	.collection-box-body {
		background-color: #f4f4f4;
		width: 100%;
		height: calc(100% - 44px);
		position: absolute;
		display: flex;
		flex-direction: column;

		.control-box {
			margin-top: 20rpx;
			padding-top: 26rpx;
			border-radius: 24rpx;
			background: white;

			&>.type {
				display: flex;
				align-items: center;
				margin: 0 16px;
				height: 68rpx;
				width: 694rpx;
				border-radius: 16rpx;
				padding: 10rpx 6rpx;
				background: var(--theme-auxiliary-color-default);
				box-sizing: border-box;
        justify-content:space-between;
				.type-item-active {
					background-color: #fff;
					color: var(--theme-color) !important;
					border-radius: 12rpx;
					font-weight: 500;
				}

				.type-item {
					flex: 1;
					color: #404040;
					font-size: 28rpx;
					/*border: 1px solid var(--theme-color);*/
					text-align: center;
					line-height: 56rpx;
					height: 56rpx;
          max-width: 170rpx;

					&:not(:first-child) {
						border-left: none;
					}

					img {
						height: 100%;
					}
				}
			}

			&>.search {
				width: 694rpx;
				height: 76rpx;
				margin-top: 20rpx;
				margin-left: auto;
				margin-right: auto;
				background: var(--theme-auxiliary-color-default);
				border-radius: 16rpx;
				overflow: hidden;

				::v-deep .uni-searchbar {
					height: 76rpx;
					padding: 0px !important;

					.uni-searchbar__box {
						height: 100% !important;
						background-color: var(--theme-auxiliary-color-default) !important;
					}

					.uni-searchbar__box-icon-search .uni-icons {
						font-size: 40rpx !important;
						font-weight: bold;
					}

					.uni-searchbar__cancel {
						padding: 0rpx 20rpx !important;
						color: var(--theme-color);
						font-size: 30rpx;
					}
				}
			}

			&>.tab {
				background-color: #fff;
				display: flex;
				align-items: center;
				margin: 0rpx 28rpx;
				height: 88rpx;
				box-sizing: border-box;

				.tab-item-active {
					color: var(--theme-color) !important;
					font-weight: 500;
					font-size: 34rpx !important;
				}

				.tab-item-active::after {
					content: "";
					display: block;
					width: 36rpx;
					height: 6rpx;
					background: var(--theme-color);
					border-top-left-radius: 6rpx;
					border-top-right-radius: 6rpx;
					position: absolute;
					bottom: 0rpx;
					left: calc(50% - 18rpx);
				}

				.tab-item {
					flex: 1;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					font-weight: 500;
					position: relative;
					font-size: 30rpx;
					color: #404040;
				}
			}
		}




		.list {
			// margin-top: 20rpx;
			// background-color: #fff;
			// position: relative;
			border-radius: 24rpx;
			overflow: hidden;
		}
	}
</style>
