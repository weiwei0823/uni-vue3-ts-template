<template>
    <view ref="scrollsss">
        <view id="item" ref="item" :style="{ height: scrollBarHeight + 'px', position: 'relative' }">
            <Item :style="{ width: '100%', position: 'absolute', top: item.top + 'px' }"
                v-for="(item, index) in visibleList" :item="item" :key="index" :scrollTop="scrollTop" />
        </view>
    </view>
</template>

<script>
import Item from './Item'
export default {
    name: "App",
    components: {
        Item
    },
    props: {
        luntanLoading: Boolean,
        scrollTop: Number,
        data: Array,
    },
    data() {
        return {
            bodyImageTop: 0,
            windowHeight: 0,
        };
    },
    computed: {
        scrollBarHeight() {
            return this.data.reduce((pre, current, index) => {
                return pre + current.height;
            }, 0)
        },
        visibleList() {
            const { scrollTop, windowHeight, bodyImageTop } = this;
            return this.data.map(item => {
                const { top, height } = item
                // 不显示
                item.show = top + bodyImageTop - windowHeight - scrollTop - 200 < 0 && (top + height + bodyImageTop) - scrollTop + 200 > 0;
                return item;
            });
        }
    },
    mounted() {
        uni.getSystemInfo({
            success: (res) => {
                this.windowHeight = res.windowHeight
            }
        });
        const query = uni.createSelectorQuery().in(this);
        query.select('#item').boundingClientRect(data => {
            this.bodyImageTop = data.top
        }).exec();
    },
};
</script>
