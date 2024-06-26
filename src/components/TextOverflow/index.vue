<template>
	<view class="container">
		<view class="content-wrapper" :class="{ 'webkit-line-clamp': isHide }">
			<view class="content" >
				<text class="icon-1" v-show="isHide" @click="isHide = false">{{ $t('components.common.comment.Comment.expand') }}</text>
				<text>{{ text }}</text>
				<text class="icon-2" v-if="!isHide" @click="isHide = true">
					{{ $t('components.common.comment.Comment.collapse') }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		text: String
	},
	data() {
		return {
			isHide: true
		}
	}
};
</script>

<style scoped>
.content-wrapper {
	display: flex;
	position: relative;
	overflow: hidden;
}

.content {
	font-size: 26rpx;
	line-height: 40rpx;
	color: #404040;
}

.webkit-line-clamp {
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	height: 120rpx;
}
.webkit-line-clamp .content::before{
	content: '';
	display: block;
	float: right;
	width: 0px;
	height: calc( 120rpx - 40rpx );
}

	/*撑开高度，确保icon-1位于文本右下方*/
/*.content::before {*/
/*	content: '';*/
/*	display: block;*/
/*	float: right;*/
/*	width: 0px;*/
/*	height: calc(100% - 18px);*/
/*}*/

/*用于文本未超出时遮挡icon-1*/
.content::after {
	position: absolute;
	content: '';
	display: inline-block;
	width: 100%;
	height: 100%;
	background: #ffffff;
}

/*文本超出后显示的图标*/
.icon-1 {
	float: right;
	clear: both;
	display: block;
	color: #5C7D99;
	font-size: 28rpx;
}

/*文本未超出时显示的图标*/
.icon-2 {
	position: relative;
	display: inline-block;
	color: #5C7D99;
	font-size: 28rpx;
}

/*文本未超出，且文本恰巧在某行末尾结束，遮挡处于正下方的icon-1*/
.icon-2::after {
	content: '';
	position: absolute;
	background: #ffffff;
	left: 0px;
	bottom: -40px;
}
</style>