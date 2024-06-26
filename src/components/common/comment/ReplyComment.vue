<template>
	<view class="set-comment-box" :style="{ marginTop: safeHeight, height: `${uWindowHeight + windowBottom}px` }" :class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="$t('components.common.comment.ReplyComment.comment')" :isBack="false" showBack @back="closed" />
		<view class="from-box">
			<view class="title">{{ commentId > 0 ? $t('components.common.comment.ReplyComment.replyComment') :
				$t('components.common.comment.ReplyComment.publishComment') }}</view>
			<view class="content">
				<view class="van-cell van-field">
					<view class="van-cell__value van-cell__value--alone van-field__value">
						<view class="van-field__body">
							<textarea v-model="prams.content" rows="6" @input="textStr" :placeholder="placeholder"
								class="van-field__control" placeholder-style="color:#969799;font-size:28rpx"
								style="height: 176rpx;" maxlength="1200"></textarea>
						</view>
					</view>
				</view>
			</view>
			<view class="van-field__word-limit">
				<span class="van-field__word-num">{{ textlenth }}</span>/1200
			</view>
			<!--图片上传-->
			<view class="uploader">
				<cl-upload v-model="imgList" :fileName="'file'" :fileType="'image'" :action="action" :max="3"
					:data="{ addWatermark: true }" :listStyle="listStyle" :headers="headers" @onSuccess="onSuccess"
					@onError="onError">
					<template #addImg>
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M20.0232 6.09943H23.004C23.8326 6.09943 24.5037 6.77058 24.5 7.5992V20.2047C24.5 21.0333 23.8288 21.7045 23.0002 21.7045H1.99976C1.17114 21.7045 0.5 21.0333 0.5 20.2047V7.59545C0.5 6.76683 1.17114 6.09569 1.99976 6.09569H4.9768C5.54671 6.09569 6.06413 5.77699 6.31909 5.26707L7.28644 3.32862C7.5414 2.82245 8.05881 2.5 8.62872 2.5H16.375C16.9449 2.5 17.4623 2.82245 17.7173 3.33237L18.6809 5.26707C18.9321 5.77699 19.4533 6.09943 20.0232 6.09943ZM6.52905 13.3058C6.52905 16.6053 9.21363 19.2899 12.5131 19.2899C15.8126 19.2899 18.4972 16.6053 18.4972 13.3058C18.4972 10.0063 15.8126 7.32174 12.5131 7.32174C9.21363 7.32174 6.52905 10.0063 6.52905 13.3058ZM20.1994 8.81401C20.1994 9.32768 20.6156 9.74011 21.1255 9.74011C21.6354 9.74011 22.0479 9.32393 22.0516 8.81401C22.0516 8.30409 21.6354 7.89165 21.1255 7.89165C20.6156 7.89165 20.1994 8.30409 20.1994 8.81401ZM8.02903 13.3096C8.02903 10.835 10.0425 8.8253 12.5133 8.8253C14.9842 8.8253 16.9939 10.835 16.9976 13.3096C16.9976 15.7842 14.9879 17.7939 12.5133 17.7939C10.0387 17.7939 8.02903 15.7805 8.02903 13.3096Z"
								fill="#A1A1A1" />
						</svg>
					</template>
				</cl-upload>
			</view>
		</view>
		<view class="ft-btn">
			<button type="primary" class="action" @click="fabu">{{ $t('components.common.comment.ReplyComment.publish')
			}}</button>
		</view>
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import {
	config
} from '../../../config/config'
import {
	comment
} from '../../../utils/user/index.js'
import {
	mapGetters
} from 'pinia';
export default {
	name: "ReplyComment",
	components: {
		Header
	},
	props: {
		commentId: {
			type: Number,
			default: 0
		},
		relatedId: {
			type: Number,
			default: 0
		},
		createTime: {
			type: String,
			default: ''
		},
		commentType: {
			type: Number,
			default: 3
		},
		toUserId: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '请输入发布内容'
		}
	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top + "px",
			textlenth: 0,
			imgList: [],
			imgListId: [],
			action: config.me_base_url + '/api/user/upImg',
			headers: {
				'X-Access-Token': this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN)
			},
			listStyle: {
				columnGap: '16rpx',
				rowGap: '16rpx',
				margin: '5px',
				width: '218rpx',
				height: '218rpx',
				radius: '0px'
			},
			prams: {
				content: '',
				pictureIds: [],
				relatedId: 0,
				toUserId: 0,
				type: 3
			}
		}
	},
	computed: {
		...mapGetters(["themeColor", "uWindowHeight", "windowBottom"]),

	},
	methods: {
		closed: function (type = 1) {
			this.$emit('closeComent', type)
		},
		//计算输入框的字符长度
		textStr: function () {
			this.textlenth = this.prams.content.length
		},
		/**
		 * 自动上传返回的是一张图片信息
		 * 手动上传返回的是已选中所有图片或者视频信息
		 * */
		onSuccess(reslut) {
			// 把服务端返回的图片地址添加到list中与组件数据同步
			this.imgList.push(reslut.result.pictureUrl)
			this.imgListId.push(reslut.result)
		},
		//上传失败
		onError(err) {
			uni.showToast({
				title: this.$t('components.common.comment.ReplyComment.uploadFailed'),
				duration: 2000,
				icon: 'none'
			})
		},
		fabu: function () {
			let imgId = [];
			let prams = this.prams;
			prams.commentId = this.commentId
			prams.relatedId = this.relatedId
			prams.createTime = this.createTime
			prams.toUserId = this.toUserId
			prams.type = this.commentType
			for (let i = 0; i < this.imgListId.length; i++) {
				if (this.imgList.indexOf(this.imgListId[i].pictureUrl) != -1) {
					imgId.push(this.imgListId[i].id)
				}
			}
			prams.pictureIds = imgId
			comment(prams).then(res => {
				uni.showToast({
					title: res.message,
					duration: 2000,
					icon: 'none'
				})
				if (res.code == 200) {
					if (this.commentType == 6) {
						this.$emit('restComment')
					}
					this.closed(2)
				}
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>

<style scoped>
.header-box,
.header,
.box-bg {
	height: 46px;
}

.header {
	width: 100%;
}

.set-comment-box {
	width: 100vw;
	max-width: 480px;
	margin: auto;
	background: var(--theme-auxiliary-color-default);
}

.set-comment-box .from-box {
	padding: 0 28rpx;
	margin-top: 20rpx;
	background-color: #fff;
	border-radius: 24rpx;
}

.set-comment-box .from-box .title {
	font-size: 30rpx;
	color: #404040;
	padding: 20rpx 0;
}

.set-comment-box .from-box .content {
	border: 1px solid var(--theme-auxiliary-color-default);
	border-radius: 16rpx;
	padding: 20rpx;
}

.set-comment-box .from-box .content .van-cell {
	padding: 0;
}

.van-cell {
	position: relative;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	overflow: hidden;
	color: #323233;
	font-size: 14px;
	line-height: 24px;
	background-color: #fff;
}

.van-field__value {
	overflow: visible;
}

.van-cell__value--alone {
	color: #323233;
	text-align: left;
}

.van-cell__value {
	position: relative;
	vertical-align: middle;
	word-wrap: break-word;
}

.van-cell__value {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
}

.van-field__body {
	display: flex;
	-webkit-box-align: center;
	align-items: center;
}

.van-field__control {
	display: block;
	box-sizing: border-box;
	width: 100%;
	min-width: 0;
	margin: 0;
	padding: 0;
	color: #323233;
	line-height: inherit;
	text-align: left;
	background-color: transparent;
	border: 0;
	resize: none;
}

.van-field__word-limit {
	color: #3E4347;
	font-size: 28rpx;
	text-align: right;
	margin-top: 20rpx;
}

.set-comment-box .from-box .uploader {
	padding-top: 20rpx;
}

.set-comment-box .ft-btn {
	padding: 60rpx 28rpx;
}

.action {
	background-color: var(--theme-color);
	border-radius: 16rpx;
	font-size: 34rpx;
	height: 80rpx;
	line-height: 80rpx;
}
</style>

<style lang="scss" scoped>
/deep/ .file-list-row {
	border-radius: 24rpx !important;
	overflow: hidden;
	border: 1px dashed #A1A1A1 !important;
	background: rgba(244, 244, 244, 0.27);
	margin: 0 20rpx 20rpx 0 !important;
}

/deep/ .file-list {
	grid-template-columns: repeat(3, 1fr) !important;
	gap: 0 !important;
}
</style>
