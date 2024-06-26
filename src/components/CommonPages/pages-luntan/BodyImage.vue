<template>
    <view class="body-image">
        <view class="items" v-if="data1.length || data2.length">
            <Items :style="{ width: itemWidth + 'rpx' }" :data="data1" :scrollTop="scrollTop" />
            <Items :style="{ width: itemWidth + 'rpx' }" :data="data2" :scrollTop="scrollTop" />
        </view>
        <view class="loading">
            <LuntanLoading v-if="luntanLoading" />
	        <Empty v-else-if="!data1.length && !data2.length && !luntanLoading" style="height: 100%;"></Empty>
            <u-loadmore status="nomore" v-else-if="nomore" />
        </view>
    </view>
</template>

<script>
import Items from "./Items.vue";
import Empty from '@/components/common/empty/empty'
export default {
    components: {
        Items,
        Empty
    },
    props: {
        luntanLoading: Boolean,
        scrollTop: Number,
        nomore: Boolean
    },
    data() {
        return {
            itemWidth: 340,
            height_1: 0,
            height_2: 0,
            data1: [],
            data2: []
        }
    },
    methods: {
        clear() {
            this.height_1 = 0
            this.height_2 = 0
            this.data1 = []
            this.data2 = []
        },
        complete(data) {
            data.forEach((item) => {
                if (!item.largeHeight) {
                    return
                }
                const rate = item.largeWidth / this.$utlilCommons.caculationRpxToPx(this.itemWidth)
                item.height = item.largeHeight / rate + this.$utlilCommons.caculationRpxToPx(78 + 20)
                item.show = false;
                if (this.height_1 <= this.height_2) {
                    item.top = this.height_1
                    this.data1.push(item)
                    this.height_1 += item.height
                } else {
                    item.top = this.height_2
                    this.data2.push(item)
                    this.height_2 += item.height
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.body-image {
    background: #fff;
    border-radius: 24rpx;
    overflow: hidden;

    .items {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20rpx 28rpx;
        box-sizing: border-box;
    }

    .loading {
        margin: 40rpx 0;
    }
}
</style>
