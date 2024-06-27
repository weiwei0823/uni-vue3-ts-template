<template>
    <view class="ptp-empty">
        <image class="img" mode="widthFix" src="@/static/imgs-liuhe/activity/empty.png" alt=""></image>
        <view class="text">{{ $t('pages.luntan.masterForum.noData') }}</view>
    </view>
</template>

<style lang="scss" scoped>
.ptp-empty {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    margin: auto;
    text-align: center;

    .img {
        width: 398rpx;
    }

    .text {
        font-size: 26rpx;
        color: #D8D8D8;
        text-align: center;
    }
}
</style>
