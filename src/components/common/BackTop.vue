<template>
    <svg v-if="scrollTop > 100" class="back-top-icon" @click="handleBacktop" xmlns="http://www.w3.org/2000/svg" width="44"
        height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="22" fill="#A1A1A1" fill-opacity="0.8" />
        <path
            d="M22.8671 31.0902V19.0748L29.6036 25.8338C29.9809 26.2111 30.5968 26.2111 30.9709 25.8338C31.3482 25.4565 31.3482 24.8406 30.9709 24.4665L22.7316 16.2015C22.5317 16.0016 22.264 15.908 22.0028 15.9209C21.7384 15.908 21.474 16.0016 21.274 16.2015L13.2766 24.4246C12.8993 24.8019 12.8993 25.4179 13.2766 25.7919C13.6539 26.1692 14.2699 26.1692 14.6439 25.7919L20.9322 19.2779V31.0902C20.9322 31.6223 21.3676 32.0576 21.8996 32.0576C22.4317 32.0576 22.8671 31.6223 22.8671 31.0902ZM30.9322 14.0345H13.067C12.5317 14.0345 12.0996 13.6023 12.0996 13.067C12.0996 12.5317 12.5317 12.0996 13.067 12.0996H30.9322C31.4675 12.0996 31.8996 12.5317 31.8996 13.067C31.8996 13.6023 31.4643 14.0345 30.9322 14.0345Z"
            fill="white" />
    </svg>
</template>

<script>
export default {
    props: {
        scrollTop: Number
    },
    methods: {
        handleBacktop() {
            this.$emit('update:scrollTop', 0)
        }
    },
}
</script>

<style lang="scss" scoped>
.back-top-icon {
    position: absolute;
    width: 96rpx;
    height: 96rpx;
    right: 30rpx;
    bottom: calc(140rpx + var(--safe-area-inset-bottom));
}
</style>