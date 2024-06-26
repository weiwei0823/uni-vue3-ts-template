<template>
	<view class="cl-updata">
		<view class="file-list" :style="[listRowStyle]">

			<view v-for="(item, index) in FileList" @tap="onClickRow(item, index)" class="file-list-row" :style="[rowStyle]"
				:key="index">

				<image v-if="fileUrlType(item) === 'image'" :src="item.url || item" :style="[imgStyle]" mode="aspectFill">
				</image>

				<video v-else class="_video" :style="[imgStyle]" :src="item.url || item"
					:show-center-play-btn="!showPlayBbtn" :controls="false">
					<cover-view v-if="showPlayBbtn" class="play" @tap="onPlay(item, index)">
						<slot name="playImg">
							<image style="width: 100%;" src="https://i.postimg.cc/xC6HNmy9/play.png" mode="widthFix">
							</image>
						</slot>
					</cover-view>
				</video>

				<view v-if="remove" @tap.stop="onRemove(item, index)">
					<slot name="delete">
						<view class="remove">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<circle cx="12" cy="12" r="12" fill="black" fill-opacity="0.5" />
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M7.30673 15.6915C6.9162 16.082 6.9162 16.7152 7.30673 17.1057C7.69725 17.4962 8.33042 17.4962 8.72094 17.1057L12.0987 13.7279L15.3778 17.007C15.7683 17.3975 16.4015 17.3975 16.792 17.007C17.1825 16.6165 17.1825 15.9833 16.792 15.5928L13.5129 12.3137L17.2062 8.62043C17.5967 8.22991 17.5967 7.59675 17.2062 7.20622C16.8157 6.8157 16.1825 6.8157 15.792 7.20622L12.0987 10.8995L8.30673 7.10749C7.9162 6.71696 7.28304 6.71696 6.89251 7.10749C6.50199 7.49801 6.50199 8.13118 6.89251 8.5217L10.6845 12.3137L7.30673 15.6915Z"
									fill="white" />
							</svg>
						</view>
					</slot>
				</view>
			</view>

			<view v-if="add && FileList.length < max" @tap="onClickAdd" :style="[addStyle]" class="file-list-row add-image">

				<slot name="addImg">
					<!--					<image src="https://i.postimg.cc/5yGCnMRG/add.png" mode="widthFix"></image>-->
					<uni-icons type="camera-filled" color="#dcdee0" size="24"></uni-icons>
				</slot>
			</view>
		</view>


		<view v-if="tempVideoUrl" class="mask">
			<image @tap="tempVideoUrl = ''" class="_root" src="https://s3.bmp.ovh/imgs/2022/07/27/4ad2b0fbe8d65e7e.png"
				mode="widthFix"></image>

			<view class="block" @tap.stop>
				<video autoplay :src="tempVideoUrl"></video>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "updata",
	props: {
		//受控图片列表
		value: {
			type: Array,
			default: () => [],
		},
		// 文件类型 'image', 'video', 'all'
		fileType: {
			type: String,
			default: 'all'
		},
		// 上传图片参数
		imageFormData: {
			type: Object,
			default: () => {
				return {
					compress: true,
					quality: 80
				}
			}
		},
		// 上传视频参数
		videoFromData: {
			type: Object,
			default: () => { }
		},

		// 必选参数，上传的地址
		action: {
			type: String,
			default: ''
		},

		// 设置上传的请求头部
		headers: {
			type: Object,
			default: () => { }
		},

		// 上传时附带的额外参数
		data: {
			type: Object,
			default: () => { }
		},

		// 是否开启预览图片
		isPreviewImage: {
			type: Boolean,
			default: true
		},
		// 是否使用自定义播放按钮
		showPlayBbtn: {
			type: Boolean,
			default: true
		},

		// 图片指示器样式，可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。
		indicator: {
			type: String,
			default: 'none'
		},
		// 是否在选取文件后立即进行上传	
		autoUpload: {
			type: Boolean,
			default: true
		},
		// 是否显示删除按钮
		remove: {
			type: Boolean,
			default: true
		},
		// 是否添加按钮
		add: {
			type: Boolean,
			default: true
		},
		// 最多显示数量
		max: {
			type: Number,
			default: 9
		},
		// 列表样式
		listStyle: {
			type: Object,
			default: () => { }
		},
		// 删除提示弹窗标题
		deleteTitle: {
			type: String,
			default: '提示'
		},
		// 删除提示弹窗文案
		deleteText: {
			type: String,
			default: '您确认要删除吗？'
		},

	},
	data() {
		return {
			// 渲染列表
			FileList: [],

			// 预览视频地址
			tempVideoUrl: '',

			// 临时文件列表
			tempFile_paths: [],
		};
	},
	watch: {
		'value': {
			handler: function (newData, oldData) {
				this.FileList = newData;
			},
			deep: true,
			immediate: true
		}
	},
	computed: {
		listRowStyle() {
			const style = {
				'grid-template-columns': `repeat(${this.listStyle?.columns || 4}, 1fr)`, // 每行数量	
				'grid-column-gap': this.listStyle?.columnGap || '40rpx', // 行间距	
				'grid-row-gap': this.listStyle?.rowGap || '40rpx', // 列间距
				'padding': this.listStyle?.padding || '0rpx' // 列表内边距
			}
			return style;
		},
		rowStyle() {

			const style = {
				'aspect-ratio': this.listStyle?.height ? '' : this.listStyle?.ratio || '1/1', // 图片比例	
				'height': this.listStyle?.height || '140rpx',
				'width': this.listStyle?.width || '',
			}
			return style;
		},
		imgStyle() {
			const style = {
				'border-radius': this.listStyle?.radius || '6rpx', // 图片圆角
			}
			return style;
		},
		addStyle() {
			const style = {
				'aspect-ratio': this.listStyle?.height ? '' : this.listStyle?.ratio || '1/1', // 图片比例
				'height': this.listStyle?.height || '160rpx',
				'width': this.listStyle?.width || '',
				'border-radius': this.listStyle?.radius || '6rpx', // 图片圆角
				'background-color': this.listStyle?.backgroundColor || '#f7f8fa', //背景颜色
				'border': this.listStyle?.border || 'none' //背景颜色
			}
			return style;
		}
	},
	methods: {

		/**
		 * 删除已选择文件
		 * */
		onRemove(item, index) {
			/*uni.showModal({
				title: this.deleteTitle,
				content: this.deleteText,
				success: (res) => {
					if (res.confirm) {

					}
				}
			});*/
			const tempFileIndex = this.tempFile_paths.indexOf(item.url || item);

			if (tempFileIndex > -1) {
				this.tempFile_paths.splice(tempFileIndex, 1)
			}

			this.FileList.splice(index, 1)
			this.$emit('input', this.FileList)
		},

		/**
		 * 点击已选择文件
		 * */
		onClickRow(item, index) {
			this.previewImage(item, index);
			this.$emit('onImage', {
				item,
				index
			})
		},

		/**
		 * 点击选择图片按钮
		 * */
		onClickAdd() {

			switch (this.fileType) {
				case 'image':
					this.onChooseFile(1);
					break;
				case 'video':
					this.onChooseFile(2);
					break;
				case 'all':
					uni.showActionSheet({
						itemList: ['相册', '视频'],
						success: (res) => {
							const tapIndex = res.tapIndex;
							if (tapIndex === 0) {
								this.onChooseFile(1);
							} else {
								this.onChooseFile(2);
							}
						},
						fail: (res) => {
							console.error(res.errMsg);
						}
					});
					break;
				default:
					this.onChooseFile(1);
					break;
			}
		},


		/**
		 * 从本地选择文件。
		 * @param { number } 选择类型 1:图片 2视频
		 * */
		async onChooseFile(updataType) {
			const that = this;
			if (updataType === 1) {

				const data = Object.assign({}, {
					// 最多可以选择的图片张数，默认9
					count: 9,
					// 仅对 mediaType 为 image 时有效，是否压缩所选文件
					// #ifndef MP-TOUTIAO
					sizeType: ['original', 'compressed'],
					// #endif
					// album 从相册选图，camera 使用相机，默认二者都有。
					sourceType: ['camera', 'album'],

					compress: false
				}, this.imageFormData)
				data['count'] = this.max - this.FileList.length
				uni.chooseImage({
					...data,
					success: async (res) => {
						const tempFilePaths = res.tempFiles;
						const compress = that.imageFormData?.compress || false;

						if (compress) {
							const compressImage = await that.compressImage(tempFilePaths, res.tempFiles);
							upload(compressImage);

						} else {
							upload(tempFilePaths.map(item => item.path));
						}

						function upload(imagesTemp) {
							if (that.autoUpload) {
								imagesTemp.map(item => {
									that.updataFile(item)
								})
							} else {
								that.FileList = [...that.FileList, ...imagesTemp]
								that.tempFile_paths = [...that.tempFile_paths, ...imagesTemp]
							}
						}

					},
					fail(err) {
						that.$emit('onError', err)
						console.error('选择图片失败', err)
					}

				})
			}

			if (updataType === 2) {

				const data = Object.assign({}, {
					// 	拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
					maxDuration: 60,
					// #ifndef MP-TOUTIAO
					// 'front'、'back'，默认'back'
					camera: "back",
					// #endif

					// album 从相册选视频，camera 使用相机拍摄，默认二者都有。
					sourceType: ['camera', 'album'],
					// 是否压缩所选的视频源文件，默认值为 true，需要压缩。
					compressed: true,
					// 'front'、'back'，默认'back'
				}, this.videoFormData)

				uni.chooseVideo({
					...data,
					success(res) {
						const tempFilePath = res.tempFilePath;
						if (that.autoUpload) {
							that.updataFile(tempFilePath)
						} else {
							that.FileList.push({
								url: tempFilePath,
								type: 'video'
							})
							that.tempFile_paths.push(tempFilePath)
						}
					},
					fail(err) {
						console.error('选择视频失败', err)
					}

				})
			}

			// 拍摄或从手机相册中选择图片或视频。
			if (this.fileType === 3) {

				const data = Object.assign({}, this.imageFormData, this.this.videoFormData, {
					// 最多可以选择的图片张数，默认9
					count: 9,

					// #ifdef MP-WEIXIN
					sizeType: ['original', 'compressed'],
					// #endif

					// album 从相册选图，camera 使用相机，默认二者都有。
					sourceType: ['camera', 'album'],
				})

				uni.chooseMedia({
					count: 9,
					mediaType: ['image', 'video'],
					sourceType: ['album', 'camera'],
					maxDuration: 30,
					camera: 'back',
					success(res) {
					}
				})
			}
		},

		/**
		 * 上传文件到服务器
		 * @param {url} tempFile 文件临时地址
		 * */
		updataFile(tempFile) {
			const that = this;
			uni.showLoading({
				title: '正在上传中...',
				icon: 'loading',
			})
			return new Promise((resolve) => {


				const uploadTask = uni.uploadFile({
					url: that.action,
					filePath: tempFile,
					name: 'file',
					formData: that.data,
					header: that.headers,
					// #ifdef MP-ALIPAY
					fileType: this.fileUrlType(tempFile),
					// #endif
					success: (uploadFileRes) => {
						const data = JSON.parse(uploadFileRes.data)
						uni.hideLoading();
						that.success(data)
						resolve(data)
					},
					fail: (error) => {
						uni.hideLoading();
						console.error('error', error);
						that.$emit('onError', error)
					}
				});

				uploadTask.onProgressUpdate((res) => {
					that.$emit('onProgress', {
						...res,
						...tempFile
					})
				});
			});
		},

		/**
		 * 手动上传
		 * */
		submit() {
			return new Promise((resolve) => {
				if (this.tempFile_paths.length <= 0) {
					this.success([])
					return console.error('没有可上传文件');
				}

				const promises = this.tempFile_paths.map(item => {
					return this.updataFile(item)
				})

				Promise.all(promises).then(reslut => {
					this.tempFile_paths = [];
					this.success(reslut)
					resolve(reslut)
				})
			})
		},

		/**
		 * 返回数据
		 * */
		success(data) {

			this.$emit('onSuccess', data);

			// 自定义数据结构-选择性开启
			// const list = data.map(item=> {
			// 	return JSON.parse(item).data.link;
			// })
			// this.$emit('input', [...this.FileList, ...list]);
		},
		/**
		 * 压缩图片
		 * @param {array} tempFilePaths 临时路径数组
		 * @return {array} 被压缩过的路径数组
		 * */
		async compressImage(tempFilePaths, files) {
			const that = this;

			return new Promise(resolve => {

				if (tempFilePaths.length <= 0) {
					console.error('压缩数组不能为空')
					resolve([])
				}

				const promiseImages = (item) => {
					return new Promise(resol => {
						let { size, path, type } = item
						//大于1M进行压缩，
						if (size < (1024 * 1024)) {
							resol(path)
							return false
						}
						// #ifdef H5
						this.canvasDataURL(path, {
							quality: that.imageFormData.quality / 100
						}, (base64Codes) => {
							resol(base64Codes);
						})
						// #endif

						// #ifndef H5
						uni.compressImage({
							src: path,
							quality: that.imageFormData.quality || 80,
							success: res => {
								resol(res.tempFilePath);
							},
							fail(err) {
								console.log('压缩失败', err);
								resol(err);
							}
						})
						// #endif
					})
				}
				const compressImages = files.map(item => {
					return promiseImages(item)
				})
				// const compressImages = tempFilePaths.map(item => {
				// 	return promiseImages(item)
				// })

				uni.showLoading({
					title: '压缩中...',
					icon: 'loading',
				})

				Promise.all(compressImages).then(res => {
					uni.hideLoading();
					resolve(res)
				}).catch(err => {
					uni.hideLoading();
					resolve(err)
				})
			})
		},

		/**
		 * H5压缩图片质量
		 * */
		canvasDataURL(path, obj, callback) {
			var img = new Image();
			img.src = path;
			img.onload = function () {
				var that = this;
				//原始图片宽度、高度
				const originImageWidth = that.width,
					originImageHeight = that.height;
				//默认最大尺度的尺寸限制在（1920 * 1080）
				const maxWidth = 1920,
					maxHeight = 1080,
					ratio = maxWidth / maxHeight;
				//目标尺寸
				let targetWidth = originImageWidth,
					targetHeight = originImageHeight;
				//当图片的宽度或者高度大于指定的最大宽度或者最大高度时,进行缩放图片
				if (originImageWidth > maxWidth || originImageHeight > maxHeight) {
					//超过最大宽高比例
					if (originImageWidth / originImageHeight > ratio) {
						//宽度取最大宽度值maxWidth,缩放高度
						targetWidth = maxWidth;
						targetHeight = Math.round(maxWidth * (originImageHeight / originImageWidth));
					} else {
						//高度取最大高度值maxHeight,缩放宽度
						targetHeight = maxHeight;
						targetWidth = Math.round(maxHeight * (originImageWidth / originImageHeight));
					}
				}

				// 默认按比例压缩
				// var w = that.width,
				// 	h = that.height,
				// 	scale = w / h;
				// w = obj.width || w;
				// h = obj.height || (w / scale);
				var quality = 0.8; // 默认图片质量为0.8
				//生成canvas
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				// 创建属性节点
				var anw = document.createAttribute("width");
				anw.nodeValue = targetWidth;
				var anh = document.createAttribute("height");
				anh.nodeValue = targetHeight;
				canvas.setAttributeNode(anw);
				canvas.setAttributeNode(anh);
				ctx.drawImage(that, 0, 0, targetWidth, targetHeight);
				// 图像质量
				if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
					quality = obj.quality;
				}
				// quality值越小，所绘制出的图像越模糊
				var base64 = canvas.toDataURL('image/jpeg', quality);
				// 回调函数返回base64的值
				callback(base64);
			}
		},

		/**
		 * 预览图片
		 * @param {string, object} item 文件信息
		 * */
		previewImage(item) {
			const that = this;

			if (that.fileUrlType(item) === 'video' || item.type === 'video') return false;
			if (!that.isPreviewImage) return false;

			const imgs = that.FileList.filter(item => {
				return that.fileUrlType(item) !== 'video' && item.type !== 'video'
			})
			const current = imgs.indexOf(item);

			uni.previewImage({
				current: current,
				urls: imgs,
				indicator: that.indicator,
				loop: true,
				success() {

				}
			})
		},

		/**
		 * 预览视频
		 * @param {string, object} item 文件信息
		 * */
		onPlay(item, index) {
			this.$emit('onVideo', {
				item,
				index
			})
			this.tempVideoUrl = item.url || item;
		},

		/**
		 * 是否img类型
		 * @param {string, object} item 文件信息
		 * */
		fileUrlType(item) {
			if (!item) {
				console.error('列表文件尾缀或地址错误')
				return false;
			}

			const url = item.url || item.path || item || false
			const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i

			if (IMAGE_REGEXP.test(url) || this.isBase64(url)) {
				return 'image';
			} else {
				return 'video';
			}
		},
		isBase64(str) {
			return str.includes('data:image/jpeg;base64,') || str.includes('blob:')
		}
	}
}
</script>

<style lang="scss" scoped>
.cl-updata {
	.file-list {
		display: grid;

		&-row {
			display: inline-flex;
			align-items: center;
			position: relative;

			image {
				height: 100%;
				width: 100%;
			}

			._video {
				position: relative;
				width: 100%;
				height: 100%;

				.play {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 30%;
					z-index: 9;
				}
			}

			.remove {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 3;

				uni-text {
					width: 5px;
					height: 5px;
					position: absolute;
					right: 7px;
					top: 1px;
				}
			}
		}

		.add-image {
			display: flex;
			align-items: center;
			justify-content: center;
			/*border: 2rpx dashed #ccc;*/
			margin: 0 20rpx 20rpx 0;
			background-color: #f7f8fa;

			&:active {
				opacity: 0.8;
			}

			image {
				width: 40%;
			}
		}
	}

	.mask {
		height: var(--vh);
		background-color: #000;
		position: fixed;
		top: 0%;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99;

		.block {
			padding: 0 30rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;

			video {
				width: 100%;
			}
		}

		._root {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			left: 40rpx;
			top: 100rpx;
		}
	}
}
</style>
