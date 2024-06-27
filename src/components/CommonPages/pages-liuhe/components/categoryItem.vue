<template>
	<Empty v-if="data.length <= 0 && !isLoading"></Empty>
	<view v-else>
		<view class="category-item" name="category-item" :style="`--columns-mum: ${columnsNum}`">
      <view class="item" :class="{bigItem: item.showLogoMode === 1}" v-for="(item, index) in data"
            v-if="dataType !== 4 || (dataType == 4 && item.collectStatus == 1)" @click="detail(item)" :key="index">
        <lazy-image v-if="item.showLogoMode === 1"
                    class="lazy-image bigImg"
                    :scroll-top="scrollTop"
                    :src="item.logoBig"
                    :width="'100%'"
                    mode="widthFix">
          <template #loading>
            <image mode="heightFix" style="height: 64px;" class="loading-image" :src="loadingImg"></image>
          </template>
        </lazy-image>
				<template v-else>
          <!--左上方推荐-->
          <lazy-image v-if="item.izHot"
                      class="lazy-image tuijian"
                      :scroll-top="scrollTop"
                      src="@/static/imgs-liuhe/index_02/categorys/item/tuijian.png"
                      :width="'100%'"
                      mode="widthFix">
            <template #loading>
              <image mode="widthFix" class="loading-image" :src="loadingImg"></image>
            </template>
          </lazy-image>
          <!--logo-->
          <view class="logo" v-if="[3, 4].includes(+dataType)">
            <lazy-image class="lazy-image img"
                        :scroll-top="scrollTop"
                        :src="item.logo"
                        :width="'100%'"
                        mode="widthFix">
              <template #loading>
                <image mode="widthFix" class="loading-image" :src="loadingImg"></image>
              </template>
            </lazy-image>
          </view>
          <!--其他-->
          <view class="logo" v-else>
            <lazy-image v-if="showFlagList[index]"
                        class="lazy-image img"
                        :scroll-top="scrollTop"
                        :src="item.logo"
                        :width="'100%'"
                        mode="widthFix">
              <template #loading>
                <image mode="widthFix" class="loading-image" :src="loadingImg"></image>
              </template>
            </lazy-image>
          </view>
					<view class="name">{{ item.name }}</view>
					<view class="star" v-if="item.type === 2 || showStar" @click.stop="collect(item)">
						<uni-icons type="star-filled" size="15"
							:color="item.collectStatus === 1 ? themeColor.themeAuxiliaryColorDot : '#fff'"></uni-icons>
					</view>
				</template>
			</view>

		</view>
		<view class="clear" @click="clearPlay" v-if="clearPlayShow">
			<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
				<g clip-path="url(#clip0_266_83589)">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M2.56843 3.125C2.19736 3.125 1.90802 3.4464 1.94686 3.81543L3.06528 14.4404C3.09876 14.7585 3.367 15 3.68685 15H11.3115C11.6314 15 11.8996 14.7585 11.9331 14.4404L13.0515 3.81543C13.0904 3.4464 12.801 3.125 12.4299 3.125H2.56843ZM4.41312 4.375C4.05238 4.375 3.76689 4.68016 3.79088 5.0401L4.33273 13.1679C4.35457 13.4955 4.62666 13.75 4.95497 13.75C5.31571 13.75 5.6012 13.4448 5.5772 13.0849L5.03535 4.95713C5.01351 4.62955 4.74143 4.375 4.41312 4.375ZM7.49654 4.375C7.15136 4.375 6.87154 4.65482 6.87154 5V13.125C6.87154 13.4702 7.15136 13.75 7.49654 13.75C7.84172 13.75 8.12154 13.4702 8.12154 13.125V5C8.12154 4.65482 7.84172 4.375 7.49654 4.375ZM9.95773 4.95713C9.97957 4.62955 10.2517 4.375 10.58 4.375C10.9407 4.375 11.2262 4.68016 11.2022 5.0401L10.6603 13.1679C10.6385 13.4955 10.3664 13.75 10.0381 13.75C9.67738 13.75 9.39189 13.4448 9.41588 13.0849L9.95773 4.95713Z"
						fill="#404040" />
					<path
						d="M6.5625 0C6.21732 0 5.9375 0.279822 5.9375 0.625C5.9375 0.970178 5.65768 1.25 5.3125 1.25H1.875C1.18464 1.25 0.625 1.80964 0.625 2.5H14.375C14.375 1.80964 13.8154 1.25 13.125 1.25H9.6875C9.34232 1.25 9.0625 0.970178 9.0625 0.625C9.0625 0.279822 8.78268 0 8.4375 0H6.5625Z"
						fill="#404040" />
				</g>
				<defs>
					<clipPath id="clip0_266_83589">
						<rect width="15" height="15" fill="white" />
					</clipPath>
				</defs>
			</svg>
			清空最近记录
		</view>

	</view>
</template>

<script>
import Empty from '@/components/common/empty/empty'
import {clearUserNewlyPlay, gameCollect} from "@/utils/lottery/list";
import {mapState} from 'pinia';
import lazyImage from "@/components/lazy-image/index.vue";
import useAppInfoStore from "@/store/modules/appInfoStore";

export default {
		components: {
      lazyImage,
			Empty
		},
		props: {
			clearPlayShow: false,
			isLoading: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			scrollTop: Number,
			columnsNum: {
				type: Number,
				default: () => {
					return 3
				}
			},
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			showFlagList: {
				type: Array,
				default: function() {
					return []
				}
			},
			dataType: {
				type: [Number, String]
			},

			showStar: Boolean,
			mh: null
		},
  data() {
    return {
      loadingImg: this.$store.state.appInfoStore.contantsConfigTypeMap['23']?.url,
    }
  },
		mounted() {
			let that = this;
			uni.$on("do_update_all_item_collect_status", function(info) {
				that.updateCollectStatusAfterEmitEvent(info);
			})
			this.initDetailInfo();
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor", "userInfo"]),
			isLogin() {
				return !!this.userInfo;
			}
		},
		methods: {
			async initDetailInfo() {
				this.$store.dispatch("initDetailInfo");
			},
			async clearPlay() {
				const res = await clearUserNewlyPlay();
				this.$emit("refreshPlayData")
			},
			detail(item) {
				// console.log(item)
				this.$config.gameRouterMgr.doOpenGameDetails({
					...item,
					...item.data
				}, this);
			},
			//收藏按钮点击
			async collect(item) {
				if (!this.isLogin) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					});
					return;
				}
				const res = await gameCollect({
					gameId: item.id
				})
				if (res.code === 200) {
					item.collectStatus = res.result ? 1 : 0
					if (this.dataType == 4) {
						let index = this.data.indexOf(item);
						index != -1 && this.data.splice(index, 1);
					}
					pop(item.collectStatus === 1 ? '收藏成功' : '取消成功')
					this.$emit('collectSuccess');
					//收藏页面修改状态同步到所有已渲染收藏元素
					uni.$emit("do_update_all_item_collect_status", {
						id: item.id,
						collectStatus: item.collectStatus
					})
					return
				}
				pop(res.message)
			},
			/**
			 * 全局推送处理所有已存在列表组件状态
			 * @param info
			 */
			updateCollectStatusAfterEmitEvent(info) {
				for (let i = 0; i < this.data.length; i++) {
					let item = this.data[i];
					if (item.id == info.id) {
						item.collectStatus = info.collectStatus;
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.clear {
		width: calc(100% - 56rpx);
		height: 78rpx;
		border-radius: 20rpx;
		background-color: #f4f4f4;
		display: flex;
		align-items: center;
		gap: 20rpx;
		color: #404040;
		font-family: MiSans;
		font-size: 28rpx;
		font-weight: 400;
		margin-top: 20rpx;
		margin-left: auto;
		margin-right: auto;
		justify-content: center;
	}

	::v-deep .fixedView {
		left: 0;
		right: 30rpx;
	}

	.empty-box {
		height: auto;
		margin-top: 90rpx;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
		max-width: 480px;
	}

	.category-item {
		display: grid;
		grid-template-columns: repeat(var(--columns-mum), 1fr);
		gap: 20rpx;

		.item {
			width: 158rpx;
			height: 204rpx;
			position: relative;
			padding: 15rpx;
			box-sizing: border-box;
			border-radius: 24rpx;
			background: var(--theme-auxiliary-color-default);
			display: flex;
			flex-direction: column;
			align-items: center;

			.tuijian {
				position: absolute;
				left: 0;
				top: 0;
				z-index: 1;
				width: 82rpx;
				height: 28rpx;
			}

			.logo {
				width: 128rpx;
				height: 128rpx;
				border-radius: 20rpx;
				overflow: hidden;
				display: grid;
				place-items: center;

				.img {
					width: 100%;
					height: 100%;
				}

        .lazy-image {
          ::v-deep {
            .loading-img, .origin-img {
              width: 128rpx;
              height: 128rpx;

              img {
                object-fit: contain;
              }
            }
          }
        }
			}

			.name {
				margin-top: 15rpx;
				color: #404040;
				font-size: 26rpx;
				text-align: center;
				white-space: nowrap;
				width: 140rpx;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.star {
				position: absolute;
				top: 0;
				right: 0;
				width: 40rpx;
				height: 40rpx;
				border-radius: 50rpx;
				background: rgba(64, 64, 64, 0.50);
				display: grid;
				place-items: center;
			}
		}

		.bigItem{
			grid-column: 1 / -1;
			width: 100%;
			padding: 0;
			.bigImg{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
