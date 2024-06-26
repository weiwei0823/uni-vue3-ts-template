<template>
	<view class="one-box" name="one-item">
    <view v-for="(item, index) in data"
          :key="index"
          class="one-box-img"
          @click="detail(item)">
      <lazy-image :src="item.icon"
                class="lazy-image"
                :scroll-top="scrollTop"
                :width="'100%'"
                :style="{
                  position: 'relative',
                  top: `${index < offsetY.length ? offsetY[index] : 0}rpx`,
                }"
                  mode="widthFix">
      <template #loading>
        <image mode="widthFix" class="loading-image" :src="loadingImg"></image>
      </template>
    </lazy-image>
    </view>
	</view>
</template>

<script>
import lazyImage from "@/components/lazy-image/index.vue";

export default {
	name: "OneItem",
	components: {lazyImage},
	props: {
		data: {
			type: Array,
			default: function () {
				return [];
			},
		},
		offsetY: {
			type: Array,
			default: function () {
				return [];
			},
		},
    scrollTop: Number,
	},
  data() {
    return {
      loadingImg: this.$store.state.appInfoStore.contantsConfigTypeMap['23']?.url,
    }
  },
	methods: {
		detail(item) {
			this.$config.gameRouterMgr.doOpenGameDetails(item, this);
		},
	},
};
</script>

<style lang="scss" scoped>
.one-box {
	display: flex;
	justify-content: center;
  margin-top:20rpx;
	image {
		height: 160rpx;
		width: 100%;
	}

  &-img {
    height: 100%;
    width: 100%;

    ::v-deep .lazy-image {
      width: 100%;
      height: 100%;

      .loading-img, .origin-img {
        height: 100%;
        width: 100%;

        img {
          object-fit: contain;
        }
      }
    }
  }
}
</style>
