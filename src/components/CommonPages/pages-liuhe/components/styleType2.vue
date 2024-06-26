<template>
	<view class="style-type-2">
		<view class="item" name="style2-typpe-item" v-for="item in data" @click="detail(item)">
			<image class="tuijian" src="/static/imgs-liuhe/index_02/categorys/item/tuijian.png" v-if="item.izHot">
			</image>
			<view class="icon">
        <lazy-image class="lazy-image img"
                    :scroll-top="scrollTop"
                    :src="item.icon"
                    :width="'100%'"
                    mode="widthFix">
          <template #loading>
            <image mode="widthFix" class="loading-image" :src="loadingImg"></image>
          </template>
        </lazy-image>
			</view>
			<view class="name">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
import lazyImage from "@/components/lazy-image/index.vue";

export default {
	components: {
    lazyImage
  },
	props: {
		data: {
			type: Array,
			default: function () {
				return []
			}
    },
    scrollTop: Number,
	},
  data() {
    return {
      loadingImg: '/static/img/zw.png',
    }
  },
	methods: {
		detail(item) {
			this.$config.gameRouterMgr.doOpenGameDetails(item, this);
		},
	}
}
</script>
<style lang="scss" scoped>
.style-type-2 {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	background: #fff;
	column-gap: 20rpx;

	.item {
		width: 158rpx;
		height: 204rpx;
		padding: 15rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
		background: var(--theme-auxiliary-color-default);
		text-align: center;
		position: relative;

		.tuijian {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
			width: 82rpx;
			height: 28rpx;
		}

		.icon {
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
        /deep/ {
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
			color: 404844;
			font-size: 26rpx;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

	}
}
</style>
