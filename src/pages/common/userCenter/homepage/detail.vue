<template>
	<view class="detail-home" :style="{ marginTop: safeHeight }">
		<!-- <NavBar :title="title" :content="content" :is-show-right="isShowRight" :header-style="headerStyle"
      :font-color="fontColor" :bg-color="bgColor" :title-style="titleStyle">
    </NavBar> -->
		<Header @back="backPage" :title="title" :isFixed="true">

		</Header>
		<!-- :style="{ height: `calc(${uWindowHeight}px - 130rpx)` }" -->
		<view class="releasedetail-body">
			<h4>{{ info.title }}</h4>
			<view class="detail" v-if="!loading">
				<view class="tag examine" :style="{ backgroundColor: info.status == 0 ? themeColor.themeColor : '#EC3232' }">{{
					info.status
						== 0 ? '审核中' :
						'审核失败' }}</view>
				<span class="time">{{ info.createTime }}</span>
			</view>
			<view class="desc">
				<rich-text :nodes="info.description"></rich-text>
			</view><!---->
			<view class="pic">
				<image v-for="(item, index) in info.pictureList" :key="index" :src="item" mode="aspectFill" style="width: 218rpx;
					height: 218rpx; border-radius: 24rpx;" :style="{ marginLeft: index === 0 ? '0' : '20rpx' }"></image>
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
import {
  mapGetters, mapState
} from 'pinia';
import Header from '@/components/common/header/index.vue';
import NavBar from "@/components/common/navBar/navBar";
import {
	detail
} from '@/utils/forum/index.js'
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import useAppInfoStore from "@/store/modules/appInfoStore";
import useSystemInfoStore from "@/store/modules/systemInfoStore";

export default {
	name: "homepage",
	components: {
		NavBar,
		Header,
		AlertInjectLayer,

	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: "帖子详情",
			content: "...",
			isShowRight: true,
			headerStyle: {
				backgroundColor: "#fff"
			},
			titleStyle: {
				color: "rgb(51, 51, 51)"
			},
			fontColor: "rgb(51, 51, 51)",
			bgColor: "#fff",
			articleId: 0,
			info: {},
			createTime: '',
			loading: false
		}
	},
	computed: {
    ...mapState(useAppInfoStore, ["themeColor"]),
    ...mapState(useSystemInfoStore, ["uWindowHeight", "windowBottom"]),
	},
	onLoad(option) {
		this.articleId = option.id
		this.createTime = option.createTime

		this.detail()
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	methods: {
		backPage() {
			// backPage()
			// uni.navigateBack()
			uni.navigateTo({
				url: "/pages/common/userCenter/homepage/homepage",
			})
		},
		detail: function () {
			let prams = {
				articleId: this.articleId,
				createTime: this.createTime
			}
			console.log(prams)
			this.loading = true
			detail(prams).then(res => {
				this.info = res.result
				this.loading = false
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-home {
	background: #f4f4f4;
	height: var(--vh);
}

.releasedetail-body {
	background: #fff;
	// min-height: calc(var(--vh) - 104rpx);
	margin-top: 20rpx;
	padding: 14rpx 26rpx;
	border-radius: 24rpx;

	.pic {
		display: flex;
		margin-top: 20rpx;
		flex-wrap: wrap;
	}

	h4 {
		font-size: 34rpx;
		line-height: 52rpx;
		color: #404844;
		margin-bottom: 14rpx;
		word-break: break-all;
	}

	.detail {

		display: flex;
		justify-content: space-between;
		align-items: center;

		.tag {
			display: inline-block;
			padding: 6rpx 20rpx;
			font-size: 30rpx;
			text-align: center;
			display: flex;
			align-items: center;
			border-radius: 12rpx;
		}

		.examine {
			background: #f9dddd;
			color: #fff;
		}

		.time {
			float: right;
			color: #a0aba5;
			font-size: 24rpx;
			position: relative;
		}
	}

	.desc {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #404844;
		margin-top: 18rpx;
	}
}
</style>
