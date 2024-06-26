<template>
	<view class="play-box pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{ position: `fixed`, height:`${uWindowHeight}px`, marginTop: safeHeight,width:'100%'  }">
		<Header :title="title" />
		<scroll-view scroll-y class="scroll-y" :style="{height:`calc(${uWindowHeight}px - 108rpx)`,marginTop:'20rpx',}"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<uni-collapse accordion v-model="accordionVal" :style="{paddingBottom:'var(--safe-area-inset-bottom)'}">
				<uni-collapse-item v-for="(item, index) in data">
					<template v-slot:title>
						<view class="title">{{ item.name }}</view>
					</template>
					<view class="content">

						<view class="text" v-for="(i, k) in item.children">
							<view class="text-item" v-for="(v, key) in filterSameName(i.children,i.id)">
								<view class="text">{{ v.name }}</view>
								<rich-text :nodes="replaceNullStr(v.helpStr)" class="text"></rich-text>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</scroll-view>

		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import WholeSelector from '@/config/templateMemSelector/WholeSelector.js'
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "how_to_play",
		components: {
			Header,
			AlertInjectLayer,
		},
		data() {
      this.memFilterMap={};
			return {
				title: "玩法说明",
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				titleStyle: {
					color: '#FFFFFF',
				},
				data: [],
				accordionVal: '',
				winHeight: 0,
				initedSuccess: false
			}
		},
		computed: {
			...mapGetters(['themeColor', 'safeHeight', 'uWindowHeight']),

		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		beforeDestroy() {
			uni.$off('lotteryIdMapFresh');
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(option) {
			let that = this;
			uni.$off('lotteryIdMapFresh');
			uni.$on('lotteryIdMapFresh', function() {
				!that.initedSuccess && that.getData(option.id);
			});
			this.getData(option.id)
		},
		methods: {
		 async	getData(lotteyId) {
				if (this.initedSuccess) return;
				try {
					let data =await WholeSelector.getMemeLotteryByLotteryId(+lotteyId);
          console.log("玩法说明",data);
					this.data = data;
					this.initedSuccess = true;
				} catch (e) {

				}
			},
			replaceNullStr(v){
				v = v.replaceAll("? ", "");
				return v;
			},
      //过滤配置的同名称的玩法
      filterSameName(list,parentId){
       //在内存中缓存结果降低消耗
       if(this.memFilterMap[parentId]){
          return  this.memFilterMap[parentId];
       }
       let map={};
       let l=[];
       list.map(item=>{
         if(map[item.name]) return;
         map[item.name]=true;
         l.push(item)
       });
       this.memFilterMap[parentId]=l;
       return l;

      }
		}
	}
</script>

<style lang="scss" scoped>
	.play-box {

		background: var(--theme-auxiliary-color-default);
		height: 100vh;
		display: flex;
		flex-direction: column;

		::v-deep .uni-collapse {
			border-radius: 24rpx;
			overflow: hidden;
			padding: 0 28rpx;
			box-sizing: border-box;

			.uni-collapse-item {
				.uni-collapse-item__title {
					border-bottom-color: var(--theme-auxiliary-color-default);
				}

				&:last-child .uni-collapse-item__title {
					border-bottom: none;
				}

				.uni-icons {
					font-size: 40rpx !important;
					color: #404040 !important;
				}

				.uni-collapse-item__wrap-content {
					border-bottom: none;
				}
			}
		}

		.title {
			height: 80rpx;
			font-weight: 400;
			font-size: 34rpx;
			color: #404040;
			display: flex;
			align-items: center;

			&::before {
				content: '';
				width: 6rpx;
				height: 24rpx;
				background: var(--theme-color);
				border-radius: 6rpx;
				margin-right: 14rpx;
			}
		}

		.content {
			//background: #F6F6F6;
			padding: 20rpx 0;
			font-weight: 400;
			font-size: 28rpx;
			color: #6F737B;

			.text {
				margin-top: 20rpx;
			}
		}

		.rule-list {
			flex: 1;
			height: 0;
			margin-top: 20rpx;
			border-radius: 24rpx;
			overflow: hidden;
		}
	}
</style>
