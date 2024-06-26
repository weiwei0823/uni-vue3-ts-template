<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight, height: `${uWindowHeight}px` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" :isFixed="true" />
		<!--		<view class="tab-div-bg"></view>-->
		<scroll-view :scroll-y="!isShow" @scroll="scroll" class="content-list"
			:style="{ height: `calc(${uWindowHeight}px - 120rpx)` }">
			<view class="top-class">
				<!--切换位置-->
				<view class="tab">
					<view class="tab-box">
						<view :class="isActive == 0 ? 'tab-item active' : 'tab-item'" @click="isActive = 0">
							{{ $t('pages.luntan.humorousGuessing.text0') }}
						</view>
						<view v-if="lotteryType == 1 || lotteryType == 2" :class="isActive == 1 ? 'tab-item active' : 'tab-item'"
							@click="isActive = 1">
							{{ $t('pages.luntan.humorousGuessing.text1') }}
						</view>
					</view>
				</view>
				<!--年月份-->
				<view class="m-tabs-years">
					<view class="m-tabs-years-bd">
						<span v-for="(item, index) in yearRangeList" :key="index" @click="selectYears(item)"
							:class="item.id == years ? 'act' : ''">
							{{ item.name }}
						</span>

						<span class="m-tabs-more" v-if="yearMoreList.length">
							<uni-data-select stroke="#A1A1A1" class="item" ref="selectRef" :clear="false" v-model="years"
								:localdata="yearMoreList" coustIcon @change="selectYearsData" placeholder="更多">
							</uni-data-select>
						</span>

					</view>
				</view>
				<!--期数-->
				<view class="m-tabs-period-home van-row">
					<view class="m-tabs-period">
						<scroll-view :scroll-into-view="scrollIntoView" scroll-x scroll-with-animation>
							<view class="m-tabs-period-bd">
								<span :id="`scroll-view-${index}`" v-for="(item, index) in periodList" :key="index"
									:class="period == item.guessId ? 'act' : ''" @click="selectPeriod(item, index)">{{
										item.name }}</span>
							</view>
						</scroll-view>
					</view>
					<view class="van-dropdown-menu">
						<view class="van-dropdown-menu__bar">
							<view class="van-dropdown-menu__item">
								<!-- <view role="button" tabindex="0" class="van-dropdown-menu__item"> -->
								<span class="van-dropdown-menu__title" @click.stop="isShow = !isShow">
									<view class="van-ellipsis">

										<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
											<path d="M1 1L5 5L9 1" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
												stroke-linejoin="round" />
										</svg>
									</view>
								</span>
							</view>
						</view>
					</view>
					<view class="van-dropdown-box" :style="{ top: (180 - scrollTop) + 'px' }" v-show="isShow"
						@click="isShow = false">
						<scroll-view @click.stop="" scroll-y class="scroll-y" style="height:70%">
							<view class="item" :class="{ act: period == item.guessId }" v-for="(item, index) in periodList"
								:key="index" @click.stop="selectPeriod(item, index)">
								{{ item.name }}
							</view>
						</scroll-view>
					</view>
				</view>

				<!--开奖内容区域-->
				<view class="picture-content" v-if="lotteryObj && lotteryObj.isFit">
					<!--开奖号区域-->
					<view class="border-box" v-if="lotteryObj">
						<lottery :lotteryDetail="lotteryObj" :isHistoryPage="true" :headerStyle="2">
							<template v-slot:header>
								<view class="body-hd-2">
									{{ lotteryObj.year }}{{ $t('pages.luntan.humorousGuessing.text2') }}
									{{ $t('pages.luntan.humorousGuessing.text3') }}{{ lotteryObj.period
									}}{{ $t('pages.luntan.humorousGuessing.text4') }}
								</view>
							</template>
							<template v-slot:lottery></template>
							<template v-slot:footer><span></span></template>
						</lottery>
					</view>
					<!--图片文本-->
					<view v-show="isActive == 0">
						<view class="title">{{ detailObj.pictureTitle }}</view>
						<view class="text">
							<rich-text :nodes="detailObj.pictureContent"></rich-text>
						</view>
					</view>
					<!--视频文本-->
					<view v-show="isActive == 1">
						<view class="title">{{ detailObj.videoTitle }}</view>
						<view class="text">
							<rich-text :nodes="detailObj.videoContent"></rich-text>
						</view>
					</view>
				</view>
				<!--图片区域-->
				<view class="media" v-if="isActive == 0">
					<view class="media-block" v-for="(item, index) in detailObj.pictureList">
						<image style="width:100%;background: #fff;" :index="index" :src="item.pictureUrl" mode="widthFix"></image>
						<svg @click="downImg(item.pictureUrl)" class="down-img" width="64" height="64" viewBox="0 0 64 64"
							fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="64" height="64" rx="32" fill="black" fill-opacity="0.5" />
							<path
								d="M43 42H21C20.7348 42 20.4804 42.1054 20.2929 42.2929C20.1054 42.4804 20 42.7348 20 43C20 43.2652 20.1054 43.5196 20.2929 43.7071C20.4804 43.8946 20.7348 44 21 44H43C43.2652 44 43.5196 43.8946 43.7071 43.7071C43.8946 43.5196 44 43.2652 44 43C44 42.7348 43.8946 42.4804 43.7071 42.2929C43.5196 42.1054 43.2652 42 43 42ZM41.04 28.52H36V21.06C36 20.7789 35.8883 20.5093 35.6895 20.3105C35.4907 20.1117 35.2211 20 34.94 20H28.94C28.6802 20.0296 28.4404 20.1542 28.2669 20.3499C28.0934 20.5456 27.9983 20.7985 28 21.06V28.52H22.96C22.7696 28.5136 22.5817 28.5652 22.4213 28.668C22.2608 28.7708 22.1354 28.92 22.0617 29.0957C21.988 29.2713 21.9693 29.4653 22.0083 29.6518C22.0473 29.8383 22.1421 30.0086 22.28 30.14L31.32 39.2C31.5049 39.3715 31.7478 39.4668 32 39.4668C32.2522 39.4668 32.4951 39.3715 32.68 39.2L41.72 30.14C41.8579 30.0086 41.9527 29.8383 41.9917 29.6518C42.0307 29.4653 42.012 29.2713 41.9383 29.0957C41.8645 28.92 41.7392 28.7708 41.5787 28.668C41.4183 28.5652 41.2304 28.5136 41.04 28.52Z"
								fill="white" />
						</svg>

					</view>

				</view>
				<!--视频-->
				<cover-view class="media video-block" v-else style="width: 100%;background: #fff;">
					<cover-view style="width: 90%;margin: auto;" v-if="showVideo">
						<video style="width:85%;background: #fff;padding: 0px 7% 0px 8%;" id="myVideo" :autoplay="true"
							:poster="poster" :src="detailObj.videoUrl" controls></video>
					</cover-view>
				</cover-view>
			</view>
			<!--投票区域-->
			<view class="open-class">

				<view class="vote-home-bd" v-show="isOpen" v-if="detailObj.voteResult">
					<uni-row class="vote-list">
						<uni-col class="vote-list-item" :span="12" v-for="(item, index) in detailObj.voteResult">
							<view class="col-top-font">
								<span class="num-piao">{{ item.voteCount }}票</span>
							</view>
							<view class="col-td">
								<span class="name">{{ item.animalName }}</span>
								<label class="proportion">
									<i :style="'width:' + item.rate + '%;'"></i>
								</label>
								<span class="rate">{{ item.rate.split(".")[0] }}%</span>
							</view>
						</uni-col>
					</uni-row>
					<!--按钮部分-->
					<view class="" v-if="isActive == 0">
						<view class="ms-bd-btn">
							<view class="van-row">
								<view class="van-col van-col--12" style="padding-right: 10rpx;" @click="openVote">
									<button type="primary" class="vote-btn">{{
										$t('pages.luntan.liuhePicture.detail.vote')
									}}</button>
								</view>
								<view class="van-col van-col--12" style="padding-left: 10rpx;" @click="voteDetail">
									<button type="primary" class="vote-his">{{
										$t('pages.luntan.liuhePicture.detail.voteRecords')
									}}</button>
								</view>
							</view>
						</view>
					</view>
					<view class="ft-btns" v-else>
						<view class="van-row">
							<view class="van-col van-col--7" style="padding-right: 13.3333px;">
								<span @click="details(detailObj.previousPeriodId)">{{ $t('pages.luntan.humorousGuessing.text11')
									}}</span>
							</view>
							<view class="van-col van-col--10" style="padding-left: 6.66667px; padding-right: 6.66667px;">
								<label @click="openVote">{{ $t('pages.luntan.humorousGuessing.text12') }}</label>
							</view>
							<view class="van-col van-col--7" style="padding-left: 13.3333px; padding-right: 1.77636e-15px;">
								<span @click="details(detailObj.nextPeriodId)">{{ $t('pages.luntan.humorousGuessing.text13') }}</span>
							</view>
						</view>
					</view>
					<view style="clear: both"></view>
				</view>
				<!--投票显示隐藏按钮-->
				<view class="open-hide" v-if="isOpen == false">
					<view class="ab">
						<svg xmlns="http://www.w3.org/2000/svg" width="169" height="34" viewBox="0 0 169 34" fill="none">
							<path
								d="M159.479 0H0.769043C3.63307 0.979914 6.19727 2.67324 8.21738 4.91866C11.4175 8.38976 13.8948 12.4574 15.5063 16.8866C15.9875 18.0584 16.3778 19.2652 16.6736 20.4963L17.1633 22.5306C17.9416 25.8013 19.808 28.7142 22.4595 30.7962C25.1111 32.8783 28.392 34.0073 31.7696 34H137.248C140.626 34.0083 143.907 32.8797 146.559 30.7975C149.211 28.7152 151.077 25.8018 151.854 22.5306L152.35 20.4963C152.636 19.2659 153.017 18.0592 153.489 16.8866C155.115 12.4533 157.61 8.38531 160.829 4.91866C162.835 2.67811 165.383 0.984968 168.231 0L159.479 0Z"
								:fill="themeColor.themeColor" />
						</svg>
					</view>
					<view class="open" @click="isOpen = !isOpen">
						<view class="openLabel">
							{{ isOpen ? $t('pages.luntan.humorousGuessing.text14') :
								$t('pages.luntan.humorousGuessing.text15') }}
						</view>
						<svg style="margin-left:20rpx;" xmlns="http://www.w3.org/2000/svg" width="20" height="19"
							viewBox="0 0 20 19" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M0.833871 10.1011C0.248085 9.51531 0.248085 8.56556 0.833871 7.97977C1.41966 7.39399 2.3694 7.39399 2.95519 7.97977L9.85507 14.8797L16.755 7.97977C17.3407 7.39399 18.2905 7.39399 18.8763 7.97977C19.4621 8.56556 19.4621 9.51531 18.8763 10.1011L10.9157 18.0616C10.3299 18.6474 9.3802 18.6474 8.79441 18.0616L0.833871 10.1011ZM2.53974 3.56196C1.95395 2.97617 1.95395 2.02642 2.53974 1.44063C3.12552 0.854847 4.07527 0.854847 4.66106 1.44063L9.5708 6.35038L14.4806 1.44063C15.0663 0.854849 16.0161 0.854849 16.6019 1.44063C17.1877 2.02642 17.1877 2.97617 16.6019 3.56196L10.6315 9.53236C10.0457 10.1181 9.09593 10.1181 8.51014 9.53236L2.53974 3.56196Z"
								fill="white" />
						</svg>
					</view>
				</view>
				<view class="close-hide" v-if="isOpen == true">

					<span class="open" @click="isOpen = !isOpen">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M0.93934 11.5524C0.353553 12.1382 0.353553 13.088 0.93934 13.6737C1.52513 14.2595 2.47487 14.2595 3.06066 13.6737L12.6141 4.12034L22.1675 13.6737C22.7532 14.2595 23.703 14.2595 24.2888 13.6737C24.8746 13.088 24.8746 12.1382 24.2888 11.5524L13.6747 0.938363C13.0889 0.352577 12.1392 0.352577 11.5534 0.938363L0.93934 11.5524ZM3.21383 20.2713C2.62804 20.8571 2.62804 21.8068 3.21383 22.3926C3.79961 22.9784 4.74936 22.9784 5.33515 22.3926L12.235 15.4927L19.1349 22.3926C19.7207 22.9784 20.6704 22.9784 21.2562 22.3926C21.842 21.8068 21.842 20.8571 21.2562 20.2713L13.2957 12.3107C12.7099 11.7249 11.7602 11.7249 11.1744 12.3107L3.21383 20.2713Z"
								fill="#A1A1A1" />
						</svg>
						<label>{{ isOpen ? $t('pages.luntan.humorousGuessing.text14') :
							$t('pages.luntan.humorousGuessing.text15')
							}}</label>
					</span>
				</view>
				<view style="clear: both"></view>
				<!--相关数据-->
				<view style="height: 16px; padding:20rpx 28rpx;" class="v-interaction">
					<view class="interaction" style="border-top:2rpx solid var(--theme-auxiliary-color-default);">
						<view class="van-row" style="margin-top:20rpx;">
							<view class="van-col van-col--18" style="display:flex;">
								<span class="tool-item">

									<svg v-if="detailObj.thumbUp == 0" xmlns="http://www.w3.org/2000/svg" width="15" height="16"
										viewBox="0 0 15 16" fill="none">
										<path
											d="M9.88273 5.23257C9.9849 4.76247 10.0388 4.28248 10.0433 3.80007M9.88273 5.23257L13.5383 14.3901C13.3865 14.695 13.1561 14.954 12.8708 15.1401C12.6195 15.3272 12.3141 15.4272 12.0008 15.4251H3.67578V14.6751M9.88273 5.23257H9.67578V5.98257L10.3867 6.22165C10.4133 6.14232 10.4387 6.06262 10.4628 5.98257L9.88273 5.23257ZM10.0433 3.80007C10.0428 3.31331 9.99003 2.82802 9.88578 2.35257V2.30007M10.0433 3.80007L9.29331 3.79316C9.2933 3.79443 9.29329 3.7957 9.29328 3.79697M10.0433 3.80007L9.29328 3.80075C9.29328 3.79949 9.29328 3.79823 9.29328 3.79697M9.88578 2.30007C9.78604 1.89103 9.551 1.5277 9.21882 1.26904C8.88663 1.01037 8.47679 0.871534 8.05578 0.875066M9.88578 2.30007H9.13578V2.35257V2.40191M9.88578 2.30007L9.67049 2.35257L9.15713 2.47775C9.15089 2.45216 9.14377 2.42686 9.13578 2.40191M8.05578 0.875066C7.81534 0.882529 7.57888 0.938517 7.36062 1.03967C7.14236 1.14081 6.94679 1.28504 6.78567 1.46367C6.62455 1.6423 6.5012 1.85166 6.42303 2.07916C6.34486 2.30667 6.31348 2.54763 6.33078 2.78757V2.84007V2.94507C6.28813 3.83573 5.92949 4.68205 5.31922 5.33219C4.70894 5.98232 3.88697 6.39372 3.00078 6.49257H3.67578V7.13151M8.05578 0.875066L8.06207 1.62504C8.06493 1.62502 8.06778 1.625 8.07063 1.625M8.05578 0.875066L8.07905 1.6247C8.07624 1.62479 8.07344 1.62489 8.07063 1.625M3.67578 7.13151C3.48202 7.17991 3.28434 7.21559 3.08392 7.23794L3.04248 7.24257H3.00078H2.92578V11.3676V14.6751H3.67578M3.67578 7.13151V11.3676V14.6751M3.67578 7.13151C4.51012 6.92307 5.27173 6.47862 5.86604 5.84549C6.59837 5.06533 7.02874 4.04974 7.07992 2.98094L7.08078 2.96301V2.94507V2.84007V2.78757V2.76056L7.07884 2.73363C7.06881 2.59451 7.087 2.4548 7.13233 2.32288C7.17766 2.19096 7.24918 2.06957 7.3426 1.966C7.43602 1.86242 7.54942 1.77879 7.67597 1.72014C7.79998 1.66268 7.93412 1.63035 8.07063 1.625M3.67578 14.6751H12.0008H12.006V14.6751C12.1561 14.6761 12.3024 14.6282 12.4228 14.5385L12.4415 14.5246L12.4611 14.5119C12.6345 14.3988 12.7746 14.2414 12.8668 14.056L12.8953 13.9986L12.9109 13.9773M12.9109 13.9773L14.236 8.05512L14.2239 7.97528L14.2305 7.88978C14.2494 7.64521 14.1934 7.4007 14.0699 7.1888M12.9109 13.9773L12.9332 13.947C12.9196 13.9655 12.9097 13.9865 12.904 14.0088C12.9034 14.0111 12.9029 14.0134 12.9024 14.0156L12.9038 14.0088L12.9039 14.0088L12.9109 13.9773ZM8.07063 1.625C8.31955 1.62482 8.5615 1.70776 8.75803 1.86079C8.93602 1.99939 9.0674 2.18821 9.13578 2.40191M9.13578 2.40191V2.43382L9.15319 2.5132C9.24565 2.93488 9.29261 3.36527 9.29328 3.79697M9.29328 3.79697C9.28679 4.45902 9.17597 5.11592 8.96491 5.74348L8.63226 6.73257H9.67578H13.2533V6.73258L13.2586 6.73255C13.4223 6.73138 13.5834 6.77307 13.7259 6.85348C13.8678 6.93349 13.9863 7.04906 14.0699 7.1888M14.0699 7.1888C14.0695 7.18805 14.069 7.18731 14.0686 7.18656L14.7158 6.80757L14.0711 7.19088C14.0707 7.19018 14.0703 7.18949 14.0699 7.1888Z"
											stroke="#A1A1A1" stroke-width="1.5" stroke-miterlimit="10" />
										<mask id="path-2-inside-1_22326_68152" fill="white">
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M2.25 15.4325H1C0.447715 15.4325 0 14.9848 0 14.4325V7.5C0 6.94772 0.447715 6.5 1 6.5H2.25" />
										</mask>
										<path
											d="M2.25 13.9325H1V16.9325H2.25V13.9325ZM1.5 14.4325V7.5H-1.5V14.4325H1.5ZM1 8H2.25V5H1V8ZM1.5 7.5C1.5 7.77614 1.27614 8 1 8V5C-0.380713 5 -1.5 6.11929 -1.5 7.5H1.5ZM1 13.9325C1.27614 13.9325 1.5 14.1564 1.5 14.4325H-1.5C-1.5 15.8132 -0.380712 16.9325 1 16.9325V13.9325Z"
											fill="#A1A1A1" mask="url(#path-2-inside-1_22326_68152)" />
									</svg>
									<svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M14.7146 6.65867C14.3914 6.1317 13.9117 5.86259 13.2543 5.83595C13.2208 5.83149 13.1868 5.82862 13.1518 5.82862L9.67515 5.8171C9.91312 5.10028 10.0434 4.32961 10.0434 3.63711C10.0434 3.15303 9.99 2.66583 9.8854 2.18883L9.86397 2.13205L9.86239 2.13233C9.64638 1.30044 8.91257 0.724609 8.05741 0.724609C7.07357 0.724609 6.3314 1.54602 6.3314 2.63526L6.33034 2.68939L6.3303 2.69105V2.69106C6.3293 2.72996 6.32832 2.768 6.3314 2.79894C6.28173 4.60551 4.8418 6.12729 2.98241 6.33913L2.92276 6.34568L2.90918 11.2198V15.2781L3.15659 15.2782L3.16703 15.2801L3.2235 15.2796L3.22377 15.2782L11.8494 15.2817L12.0037 15.2775C12.3562 15.2775 12.555 15.1881 12.8673 14.9872C13.1554 14.801 13.3887 14.5385 13.5378 14.2356C13.5833 14.1687 13.6162 14.096 13.6366 14.0181L14.974 8.0387C14.9934 7.96366 15.0002 7.88518 14.9944 7.81562C15.0242 7.40685 14.9275 7.00675 14.7146 6.65867ZM1 6.34961C0.447715 6.34961 0 6.79732 0 7.34961V14.3496C0 14.9019 0.447715 15.3496 1 15.3496H1.25C1.80228 15.3496 2.25 14.9019 2.25 14.3496V7.34961C2.25 6.79732 1.80228 6.34961 1.25 6.34961H1Z"
											:fill="themeColor.themeAuxiliaryColorRemind" />
									</svg>
									{{ " " }}{{ detailObj.thumbUpCount | moneyFormat
									}}{{ $t('pages.luntan.humorousGuessing.text5') }}
								</span>
								<span class="tool-item">
									<svg v-if="detailObj.comment == 0" width="15" height="16" viewBox="0 0 15 16" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M10.5 11.375H10.1893L9.96967 11.5947L7.5 14.0643L5.03033 11.5947L4.81066 11.375H4.5H3C1.75736 11.375 0.75 10.3676 0.75 9.125V3.875C0.75 2.63236 1.75736 1.625 3 1.625H12C13.2426 1.625 14.25 2.63236 14.25 3.875V9.125C14.25 10.3676 13.2426 11.375 12 11.375H10.5Z"
											stroke="#A1A1A1" stroke-width="1.5" />
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
											fill="#A1A1A1" />
									</svg>
									<svg v-else width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="Group 1420067929">
											<path id="Rectangle 9298"
												d="M0 3.875C0 2.21815 1.34315 0.875 3 0.875H12C13.6569 0.875 15 2.21815 15 3.875V9.125C15 10.7819 13.6569 12.125 12 12.125H10.5L7.5 15.125L4.5 12.125H3C1.34315 12.125 0 10.7819 0 9.125V3.875Z"
												:fill="themeColor.themeColor" />
											<path id="Union" fill-rule="evenodd" clip-rule="evenodd"
												d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
												fill="white" />
										</g>
									</svg>
									{{ " " }}{{ detailObj.commentCount | moneyFormat
									}}{{ $t('pages.luntan.humorousGuessing.text6') }}
								</span>
								<!---->
								<span class="tool-item">
									<svg v-if="detailObj.collect == 0" xmlns="http://www.w3.org/2000/svg" width="15" height="16"
										viewBox="0 0 15 16" fill="none">
										<path
											d="M8.52273 13.1666L8.52365 13.167L10.9101 14.4202C10.9102 14.4203 10.9103 14.4204 10.9104 14.4204C11.0266 14.4811 11.1574 14.5082 11.2881 14.4985C11.419 14.4888 11.5445 14.4428 11.6506 14.3655C11.7566 14.2882 11.839 14.1828 11.8883 14.0612C11.9376 13.9396 11.9519 13.8067 11.9296 13.6774L11.9295 13.6767L11.4747 11.0219L8.52273 13.1666ZM8.52273 13.1666C8.20702 13.0013 7.85599 12.915 7.49966 12.915C7.14332 12.915 6.79229 13.0013 6.47659 13.1666L6.47566 13.167L4.08826 14.4208L4.0877 14.4211C3.9714 14.4823 3.84029 14.5097 3.70921 14.5002C3.57813 14.4907 3.45234 14.4446 3.34608 14.3673C3.23981 14.29 3.15733 14.1845 3.10798 14.0627C3.05862 13.9409 3.04436 13.8077 3.06682 13.6782L3.06689 13.6778L3.52527 11.0264L3.52534 11.026C3.58606 10.6736 3.56005 10.3117 3.44958 9.97165C3.3391 9.63157 3.14748 9.3235 2.89126 9.07407L0.962618 7.19385L0.962527 7.19377C0.868499 7.10213 0.801987 6.98601 0.770514 6.85854C0.739041 6.73108 0.743862 6.59735 0.784432 6.47248C0.825001 6.34761 0.899701 6.23658 1.00008 6.15195C1.10047 6.06732 1.22253 6.01247 1.35246 5.9936L1.3525 5.99359L4.01889 5.60615L4.02102 5.60584C4.3736 5.55358 4.70826 5.41662 4.99632 5.20669C5.28438 4.99677 5.51725 4.72014 5.67499 4.40051L5.67506 4.40036L6.86734 1.98306C6.86736 1.98302 6.86738 1.98298 6.8674 1.98294C6.9255 1.86526 7.01536 1.76617 7.12682 1.69687C7.23833 1.62756 7.367 1.59082 7.49829 1.59082C7.62959 1.59082 7.75826 1.62756 7.86976 1.69687C7.98126 1.76619 8.07115 1.86532 8.12925 1.98306L8.12979 1.98415L9.32501 4.39641C9.32511 4.39662 9.32521 4.39683 9.32532 4.39704C9.48305 4.71641 9.71581 4.99281 10.0037 5.2026L10.4454 4.59647L10.0037 5.2026C10.2917 5.41252 10.6264 5.54948 10.979 5.60175L10.9811 5.60206L13.6475 5.9895L13.6475 5.98951C13.7775 6.00838 13.8995 6.06323 13.9999 6.14786C14.1003 6.23249 14.175 6.34351 14.2156 6.46838C14.2561 6.59326 14.261 6.72699 14.2295 6.85445C14.198 6.98192 14.1315 7.09804 14.0375 7.18967L14.0374 7.18976L12.1087 9.06998C12.1086 9.07011 12.1085 9.07023 12.1084 9.07036C11.8523 9.31972 11.6608 9.62764 11.5504 9.96756L12.2637 10.1993M8.52273 13.1666L12.2637 10.1993M12.2637 10.1993L11.5504 9.96756M12.2637 10.1993L11.5504 9.96756M11.5504 9.96756C11.44 10.3074 11.414 10.669 11.4745 11.0212L11.5504 9.96756Z"
											stroke="#A1A1A1" stroke-width="1.5" />
									</svg>
									<svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
										<path
											d="M8.17495 13.8311L10.5624 15.0848C10.8026 15.2105 11.0731 15.2665 11.3434 15.2465C11.6138 15.2265 11.8732 15.1313 12.0923 14.9717C12.3113 14.812 12.4814 14.5943 12.5833 14.3431C12.6852 14.0919 12.7148 13.8172 12.6687 13.55L12.2138 10.8945C12.1737 10.6622 12.1909 10.4235 12.2637 10.1993C12.3366 9.97501 12.4629 9.77187 12.6319 9.60738L14.5609 7.72679C14.7552 7.53747 14.8926 7.29758 14.9576 7.03424C15.0226 6.77089 15.0127 6.49461 14.9289 6.23664C14.845 5.97866 14.6907 5.74928 14.4833 5.57444C14.276 5.39961 14.0238 5.28629 13.7553 5.2473L11.089 4.85985C10.8563 4.82537 10.6355 4.73499 10.4454 4.59647C10.2553 4.45795 10.1017 4.27542 9.99757 4.06451L8.80182 1.65118C8.68179 1.40794 8.49609 1.20313 8.26573 1.05992C8.03537 0.916715 7.76954 0.84082 7.49829 0.84082C7.22705 0.84082 6.96121 0.916715 6.73085 1.05992C6.50049 1.20313 6.3148 1.40794 6.19477 1.65118L5.00243 4.0686C4.89834 4.27951 4.74468 4.46205 4.5546 4.60057C4.36452 4.73909 4.1437 4.82946 3.91104 4.86395L1.24465 5.25139C0.976218 5.29038 0.724048 5.4037 0.516663 5.57854C0.309278 5.75338 0.15495 5.98275 0.0711346 6.24073C-0.0126811 6.4987 -0.022641 6.77499 0.0423813 7.03833C0.107404 7.30167 0.244814 7.54157 0.439072 7.73088L2.3681 9.61148C2.53705 9.77596 2.66342 9.97911 2.73627 10.2034C2.80912 10.4276 2.82627 10.6663 2.78623 10.8986L2.32785 13.55C2.28146 13.8175 2.31091 14.0927 2.41288 14.3443C2.51484 14.596 2.68525 14.814 2.90478 14.9738C3.12432 15.1335 3.38421 15.2286 3.65501 15.2482C3.9258 15.2678 4.19668 15.2112 4.43696 15.0848L6.82436 13.8311C7.03275 13.722 7.26445 13.665 7.49966 13.665C7.73486 13.665 7.96657 13.722 8.17495 13.8311Z"
											:fill="themeColor.themeAuxiliaryColorRemind" />
									</svg>
									{{ " " }}{{ detailObj.collectCount | moneyFormat
									}}{{ $t('pages.luntan.humorousGuessing.text7') }}
								</span>
							</view>
							<view class="van-col van-col--6">
								<view class="right-text">
									{{ detailObj.clickCount | moneyFormat
									}}{{ $t('pages.luntan.humorousGuessing.text8') }}
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			<!--广告区域-->
			<view class="v-interaction ads-class">
				<ads :listPicture="listPicture"></ads>
				<comment v-if="loadingFinish" @setIsLoadMore="setIsLoadMore" ref="comment" :relatedId="period" :type="8"
					:createTime="detailObj.createTime ? detailObj.createTime.toString() : ''"></comment>
			</view>
			<!--评论区域-->
		</scroll-view>

		<!--底部悬浮-->
		<view class="tool-bottom">
			<view class="tool-bottom-body">
				<view class="left" @click="replyComment">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M2.93386 12.7977L4.15272 12.6877C4.6516 12.6389 5.1244 12.4178 5.47702 12.0652L14.7181 2.82443C15.3632 2.1792 15.3632 1.13255 14.7181 0.483921C14.0684 -0.161307 13.0219 -0.161307 12.3733 0.483921L3.13681 9.72012C2.77966 10.0773 2.55856 10.5456 2.51434 11.0491L2.40436 12.2681C2.37715 12.5675 2.62886 12.8238 2.93386 12.7977ZM0.799976 14.4005C0.358161 14.4005 0 14.7586 0 15.2005C0 15.6423 0.358161 16.0004 0.799976 16.0004H15.1995C15.6414 16.0004 15.9995 15.6423 15.9995 15.2005C15.9995 14.7586 15.6414 14.4005 15.1995 14.4005H0.799976Z"
							fill="#A1A1A1" />
					</svg>
					<label for="commentInput">{{ $t('pages.luntan.masterForum.detail.leaveComment')
						}}...</label>
				</view>
				<view class="right van-row">
					<view class="van-col" @click="thumbUp()">
						<svg v-if="detailObj.thumbUp == 0" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
							viewBox="0 0 22 22" fill="none">
							<path
								d="M17.5991 21.0649H5.11406V15.9389V9.50753C6.36814 9.23895 7.51638 8.59398 8.40094 7.65165C9.43027 6.55509 10.0352 5.12762 10.1071 3.62537L10.1081 3.60565V3.5859V3.4319V3.3549V3.3252L10.1059 3.29558C10.0886 3.05456 10.1201 2.81253 10.1986 2.584C10.2771 2.35547 10.401 2.14518 10.5629 1.96575C10.7247 1.78631 10.9211 1.64144 11.1404 1.53984C11.3568 1.43954 11.591 1.38345 11.8294 1.37482C12.2576 1.37332 12.674 1.51546 13.012 1.77865C13.3286 2.02521 13.5591 2.36454 13.6721 2.74805V2.80629L13.6912 2.8936C13.8311 3.53178 13.9022 4.18313 13.9031 4.83646C13.8934 5.83692 13.726 6.82959 13.4071 7.77791L13.0412 8.8659H14.1891H19.4361V8.86592L19.442 8.86588C19.73 8.86382 20.0135 8.9372 20.2644 9.07872C20.5145 9.2198 20.7234 9.42368 20.8706 9.67021C21.0803 10.0296 21.1756 10.4444 21.1435 10.8593L21.1362 10.9534L21.1504 11.0467C21.1536 11.0677 21.1543 11.089 21.1526 11.1101L19.192 19.8728L19.1919 19.8728L19.1903 19.8803C19.19 19.8818 19.1894 19.8832 19.1884 19.8845L19.1468 19.9413L19.1154 20.0044C18.9583 20.3202 18.7198 20.5882 18.4244 20.7809L18.4029 20.7949L18.3823 20.8102C18.1578 20.9774 17.8848 21.0669 17.6048 21.0649V21.0649H17.5991Z"
								stroke="#404040" stroke-width="1.65" stroke-miterlimit="10" />
							<mask id="path-2-inside-1_21025_123703" fill="white">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M3.3 21.9008H1.1C0.492486 21.9008 0 21.4083 0 20.8008V9.8998C0 9.29229 0.492487 8.7998 1.1 8.7998H3.3" />
							</mask>
							<path
								d="M3.3 20.2508H1.1V23.5508H3.3V20.2508ZM1.65 20.8008V9.8998H-1.65V20.8008H1.65ZM1.1 10.4498H3.3V7.1498H1.1V10.4498ZM1.65 9.8998C1.65 10.2036 1.40375 10.4498 1.1 10.4498V7.1498C-0.418781 7.1498 -1.65 8.38102 -1.65 9.8998H1.65ZM1.1 20.2508C1.40376 20.2508 1.65 20.497 1.65 20.8008H-1.65C-1.65 22.3196 -0.418785 23.5508 1.1 23.5508V20.2508Z"
								fill="#404040" mask="url(#path-2-inside-1_21025_123703)" />
						</svg>
						<svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M21.5814 9.03238C21.1073 8.25951 20.4039 7.86481 19.4396 7.82573C19.3905 7.8192 19.3406 7.81499 19.2892 7.81499L14.1902 7.79808C14.5392 6.74675 14.7303 5.61644 14.7303 4.60077C14.7303 3.89078 14.652 3.17623 14.4986 2.47663L14.4672 2.39335L14.4648 2.39375C14.148 1.17366 13.0718 0.329102 11.8175 0.329102C10.3746 0.329102 9.28605 1.53384 9.28605 3.13139L9.2845 3.21077L9.28444 3.21323C9.28297 3.27027 9.28153 3.32607 9.28605 3.37146C9.2132 6.02108 7.10131 8.25303 4.3742 8.56374L4.28671 8.57333L4.2668 15.7221V21.6742L4.62967 21.6743L4.64497 21.6772L4.72779 21.6765L4.72819 21.6744L17.3792 21.6795L17.6054 21.6734C18.1225 21.6734 18.414 21.5422 18.872 21.2476C19.2946 20.9745 19.6368 20.5894 19.8554 20.1453C19.9221 20.0471 19.9705 19.9405 20.0004 19.8261L21.9619 11.0564C21.9903 10.9464 22.0003 10.8313 21.9919 10.7293C22.0355 10.1297 21.8936 9.54291 21.5814 9.03238ZM1.1 8.5791C0.492487 8.5791 0 9.07159 0 9.6791V20.6791C0 21.2866 0.492486 21.7791 1.1 21.7791H2.2C2.80751 21.7791 3.3 21.2866 3.3 20.6791V9.6791C3.3 9.07159 2.80751 8.5791 2.2 8.5791H1.1Z"
								:fill="themeColor.themeAuxiliaryColorRemind" />
						</svg>
						<div class="label">{{ detailObj.thumbUpCount | moneyFormat }}</div>
					</view>
					<view class="van-col " @click="collect">
						<uni-icons color="#404040" class="icon" type="star" size="28" v-if="detailObj.collect == 0"></uni-icons>
						<uni-icons color="#EC3232" class="icon act" type="star-filled" size="28" v-else></uni-icons>
						<div class="label">{{ detailObj.collectCount | moneyFormat }}</div>
					</view>
				</view>
			</view>
		</view>
		<!--投票弹窗-->
		<uni-popup ref="vote" type="dialog" background-color="#fff" mask-background-color="rgba(0,0,0,.7)">
			<vote @closeVote="closeVote" @openPopup="openPopup" :year="detailObj.year" :period="detailObj.period"
				:voteResult="detailObj.voteResult" :type="8" :relatedId="detailObj.id">
			</vote>
		</uni-popup>
		<!-- 分享 -->
		<uni-popup class="share" ref="share" type="share" safeArea backgroundColor="#fff">
			<share @closefx="closefx"></share>
		</uni-popup>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--评论弹窗-->
		<uni-popup ref="comentPopup" background-color="#fff" mask-background-color="rgba(0,0,0,.7)" :is-mask-click="false">
			<view style="width: 100vw;height: var(--vh)">
				<reply-comment ref="replyComment" @closeComent="closeComent" :commentId="0" :relatedId="detailObj.id"
					:commentType="8">
				</reply-comment>
			</view>
		</uni-popup>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<AlertInjectLayer />
		<Login v-if="showLogin" @closePopup="showLogin = false" />
	</view>
</template>

<script>
import Comment from "@/components/common/comment/Comment";
import {
	listYear,
	listPeriod,
	detail
} from "@/utils/vote/index.js"
import {
	lotteryDetail,
	listSpreadByType,
	advertList
} from "@/utils/common/index.js"
import {
	collect,
	thumbUp
} from "@/utils/user/index.js"
import {
	period
} from "@/utils/lottery/index"

import Header from '@/components/common/header/index.vue';
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import Lottery from '@/components/common/lottery/Lottery'
import Ads from '@/components/common/ad/Ad'
import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
import ReplyComment from "@/components/common/comment/ReplyComment";
import Login from "@/components/common/login/Login";
import Share from "@/components/common/share/Share";
import Vote from "@/components/common/vote/Vote";
import NavBar from "@/components/common/navBar/navBar";
import MyVideo from "@/components/common/video/MyVideo";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	mapGetters
} from 'pinia';
import {config} from "@/config/config";
export default {
	name: "index",
	components: {
		AlertInjectLayer,
		UniCol,
		UniRow,
		Comment,
		Lottery,
		Ads,
		cusPreviewImg,
		ReplyComment,
		Login,
		Share,
		Vote,
		NavBar,
		MyVideo,
		Header
	},
	data() {
		const date = new Date();
		return {
			scrollIntoView: '',
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			headerStyle: {
				backgroundColor: '#ffffff',
			},
			title: "幽默竞猜",
			lotteryName: '',
			lotteryType: 1,
			scrollTop: 0,
			isLoadMore: false,
			isActive: 0,
			isShow: false,
			showVideo: true, //是否显示视频
			isOpen: false,
			listPicture: [],
			current: 0,
			years: date.getFullYear(), //默认年份
			yearList: [], //年列表
			period: 0, //当前期数
			periodName: '', //期数名称
			periodList: [], //期数列表
			detailObj: {}, //相关数据
			lotteryObj: {}, //开奖信息
			ImgList: [],
			poster: '',
			showLogin: false,
			yearRangeList: [],
			yearMoreList: [],
			lotteryType: '',
			loadingFinish: false,
			lastData: {
				year: 0,
				number: 0,
				period: 0
			}
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	onLoad(option) {
		let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG);
		if (!configData) return console.warn("config data is not loaded");
		this.poster = configData.find(item => item.type === '23')?.url

		uni.setNavigationBarTitle({
			title: this.title
		});
		this.period = option.id ? option.id : 0;
		this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
			.LOCAL_STORE_LOTTERYTYPE, this.$config.defaultValues.DEFAULT_SELECT_LOTTERY_TYPE, true);
		this.lotteryName = this.$config.configLotties.getLotteryTypeTimeNameByLotteryTypeId(this.lotteryType);

		this.listYear()
		this.listSpreadByType()
	},
	onReachBottom() {
		this.lower()
	},
	computed: {
		...mapGetters(["themeColor", "uWindowHeight"]),

	},
	methods: {
		scroll(e) {
			this.scrollTop = e.detail.scrollTop
		},
		voteDetail: function () {
			uni.navigateTo({
				url: "voteDetails?id=" + this.detailObj.id + "&years=" + this.years
			});
		},
		downImg(url) {
			// #ifdef APP-PLUS

			// #endif
			// #ifdef H5
			this.$nativeBridge.saveImageByUrl(url, function (res) {
				if (res.code == -1) {
					var oA = document.createElement("a");
					oA.download = 'a'; // 设置下载的文件名，默认是'下载'
					oA.href = url;
					document.body.appendChild(oA);
					oA.click();
					oA.remove();
				} else {
					pop(res.msg);
				}
			}, this);



			// #endif
		},
		//轮播图获取
		listSpreadByType: function () {
			let prams = {
				projectType: 1,
				code: 3,
			}
			advertList(prams).then(res => {
				this.listPicture = res.result
			}).catch(err => {

			})
		},
		//轮播图事件
		change(e) {
			this.current = e.detail.current
		},
		//获取年
		listYear: function () {
			let prams = {
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERYTYPE)
			};
			listYear(prams).then(res => {
				this.yearList = res.result;
				const rangeList = []
				const moreList = []
				this.yearList.forEach((item, key) => {
					if (key < 4) {
						rangeList.push(item)
					} else {
						moreList.push({
							value: item.id,
							text: item.name
						})
					}
				})
				this.yearRangeList = rangeList
				this.yearMoreList = moreList;
				this.listPeriod()
			}).catch(err => {
				console.log(err)
			})
		},
		//选择年
		selectYears: function (item) {
			if(this.lastData?.year === item.id && this.lastData?.number === this.detailObj?.number) return;
			this.scrollIntoView = 'scroll-view-0';
			this.period = 0;
			this.periodName = '';
			this.periodList = [];
			this.detailObj = {};
			this.lotteryObj = {};
			this.years = item.id;
			this.listPeriod();
		},
		selectYearsData: function (item) {
			this.years = item
			this.listPeriod(1)
		},
		//获取期
		listPeriod: function (type = 0) {
			let prams = {
				year: this.years,
				platform: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERYTYPE)
			};

			listPeriod(prams).then(res => {
				this.$requestCache.bindLastCacheUpdateApiCallBack(res, this.bindListPeriodResponse, this);
				this.bindListPeriodResponse(res);
				this.selectPeriod(res.result[0], 0)
			}).catch(err => {
				console.log(err)
			})
		},
		bindListPeriodResponse(res) {
			if (this.period == 0) {
				this.period = res.result[0].guessId
			}
			// this.period = res.result[0].guessId
			this.periodList = res.result
			// this.detail()
		},


		//选择期
		selectPeriod: function (item, index) {
			if(this.lastData?.period === item?.guessId && this.lastData?.number === this.detailObj?.number) return;
			this.scrollIntoView = 'scroll-view-' + index;
			this.period = item?.guessId;
			this.detailObj = {};
			this.lastData.period = item?.guessId;
			this.periodName = item.name;
			this.isShow = false;
			this.detail();
		},
		//根据其
		details: function (period) {
			if (!period) {
				pop("暂无数据")
				return false
			}
			this.period = period
			this.detail()
		},
		//获取文章信息
		detail: function (flag) {
			let prams = {
				id: this.period
			};
			this.loadingFinish = false;

			detail(prams).then(res => {
				if (res.result) {
					this.loadingFinish = true;
					this.$requestCache.bindLastCacheUpdateApiCallBack(res, this.bindDetailResponse, this);
					this.bindDetailResponse(res);
				}
			}).catch(err => {
				console.log(err)
			})
		},
		bindDetailResponse(res) {
			this.detailObj = JSON.parse(JSON.stringify(res.result));
			const { year, title, number } = res.result;
			this.title = this.lotteryName + " " + title;
			this.years = year;

			const lastYear = this.lastData?.year;
			const lastNum = this.lastData?.number;
			if(lastYear === year && lastNum === number) return;
			this.lottery(number,year);
			this.$nextTick(()=>{
				this.$refs.comment?.restComment()
			});
		},

		//获取开奖信息
		lottery: function (number,year) {
			let prams = {
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERYTYPE),
				number: number,
				year: year,
			}
			this.lotteryObj = {};
			period(prams).then(res => {
				this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netRes) => {
					this.lotteryObj = netRes.result;
				}, this)
				this.lotteryObj = JSON.parse(JSON.stringify(res.result));
				this.lastData.year = year;
				this.lastData.number = number;
			}).catch(err => {
				console.log(err)
			})
		},
		//打开登录界面
		openPopup: function () {
			if (this.$config.station === 'LUNTAN') {
				this.showLogin = true
				return
			}
			uni.$emit('showPop', {
				refName: 'AlertMessage'
			})
		},
		//分享弹窗
		fenxiang: function () {
			this.$refs.share.open()
		},
		//关闭分享
		closefx: function () {
			this.$refs.share.close()
		},
		//投票
		openVote: function () {
			if (!isLogin()) {
				if (this.$config.station === 'LUNTAN') {
					this.showLogin = true
					return
				}
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			this.$refs.vote.open()
			this.$nativeBridge.setStatusBarColor('#b2b2b2')

		},
		//关闭投票
		closeVote: function () {
			this.$refs.vote.close()
			this.$nativeBridge.setStatusBarColor('#ffffff')
			this.detail()
		},
		//加载更多
		lower: function () {
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.isLoadMore = true
				this.$refs.comment.listLatest()
			}
		},
		setIsLoadMore: function () {
			this.isLoadMore = false
		},
		//打开评论
		replyComment: function () {
			if (!isLogin()) {
				if (this.$config.station === 'LUNTAN') {
					this.showLogin = true
					return
				}
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			this.showVideo = false
			this.$refs.comentPopup.open('right')
		},
		//关闭评论
		closeComent: function () {
			this.$refs.comentPopup.close()
			this.$refs.comment.restComment()
			this.showVideo = true
			this.detail()
		},
		//点赞接口
		thumbUp: function () {
			let token = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN);
			if (!token) {
				if (this.$config.station === 'LUNTAN') {
					this.showLogin = true
					return
				}
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			let prams = {
				relatedId: this.detailObj.id,
				type: 8,
				createTime: this.detailObj.createTime
			}
			thumbUp(prams).then(res => {
				uni.showToast({
					title: res.message,
					duration: 2000,
					icon: 'none'
				})
				if (res.code == 200) {
					this.detailObj.thumbUp = 1
					this.detailObj.thumbUpCount++
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//收藏
		collect: function () {
			if (!isLogin()) {
				if (this.$config.station === 'LUNTAN') {
					this.showLogin = true
					return
				}
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			let prams = {
				relatedId: this.detailObj.id,
				type: 8
			}
			collect(prams).then(res => {
				if (res.code == 200) {
					this.detailObj.collect = res.result
					if (res.result == 1) {
						this.detailObj.collectCount = this.detailObj.collectCount + 1
					} else {
						this.detailObj.collectCount = this.detailObj.collectCount - 1
					}
				}
				pop(res.message, 2000)
			}).catch(err => {
				console.log(err)
			})
		},
	},
}
</script>
<style scoped lang="scss">
/deep/ .uni-select--mask {
	z-index: 999999;
}

.item {
	background: var(--theme-auxiliary-color-default);
	border-radius: 12rpx;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;

	/deep/ .uni-select {
		border: none;
		padding: 0 20rpx;
		font-size: 26rpx;
		height: 52rpx;

		.select-svg {
			transform: rotate(180deg);
		}

		.select-svg-show {
			transform: rotate(0deg);
		}

		.uni-select__input-box {
			gap: 10rpx;
		}

		.uni-select--mask {
			// background: rgba(0, 0, 0, 0.06);
		}

		.uni-select__selector {
			z-index: 999;
			// transform: translate(100rpx, -80rpx);
			border-radius: 24rpx;
		}

		.uni-select__selector-item {
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
			align-items: center;
			white-space: nowrap;

			&:last-child {
				border: none;
			}
		}

		.uni-popper__arrow {
			display: none;
		}

		.uni-select__input-text {
			color: #404040;
			text-align: center;

			font-size: 26rpx;
			font-weight: 400;
		}
	}
}

.ms-bd-btn {
	// padding: 0 28rpx;
	background: #fff;
}

.ms-bd-btn .van-row {
	display: inline-block;
	width: 100%;
}

.vote-btn,
.vote-his {
	border-radius: 16rpx;
	height: 86rpx;
	line-height: 86rpx;
	font-size: 34rpx;
	border: 2rpx solid var(--theme-color);
}

.vote-btn {
	background-color: var(--theme-color);
	color: #fff;
}

.vote-his {
	background-color: #fff;
	color: var(--theme-color);
}

.zw {
	position: sticky;
	top: 86rpx;
	z-index: 1;
	width: 100%;
	height: 20rpx;
	background: var(--theme-auxiliary-color-default);
}



.video-block {
	padding: 0 !important;
}

.media {
	padding: 0px 32rpx 10rpx;
	margin-top: 20rpx;
	box-sizing: border-box;

	image {
		border-radius: 24rpx;
	}

	.media-block {
		position: relative;

		.down-img {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
}

.rate {
	color: #404040;
	text-align: right;

	font-size: 26rpx;
	font-weight: 400;
	margin-left: 15rpx;
	min-width: 67rpx;
}

.col-top-font {
	text-align: center;


	.num-piao {
		color: #404040;

		font-size: 26rpx;
		font-weight: 400;
		margin-left: -30rpx;
	}
}
</style>
<style lang="scss" scoped>
.mint-tab-container-item {
	background: var(--theme-auxiliary-color-default);
	height: 100vh;
	display: flex;
	flex-direction: column;

	.content-list {
		flex: 1;
		height: 0;
		border-radius: 24rpx 24rpx 0 0;
		margin-top: 20rpx;
		overflow: hidden;

		.top-class {
			margin-bottom: 20rpx;
			padding-top: 20rpx;
			background-color: #fff;
			// border-top-left-radius: 24rpx;
			// border-top-right-radius: 24rpx;
			border-radius: 24rpx;
			box-sizing: border-box;
			overflow: hidden;
		}
	}
}

.header-box,
.header,
.box-bg {
	height: 46px;
}

.header {
	z-index: 5;
	border-bottom: 2rpx solid #ebedf0;
}

.scroll-Y {
	height: var(--vh);
}

.tab {
	width: 100%;
	/* margin-top: 20rpx; */
	/* padding-bottom: 30rpx;
		padding-top: 22rpx;
		height: 42rpx; */
	box-sizing: border-box;
	padding-left: 28rpx;
	padding-right: 28rpx;
}

.tab-box {
	display: flex;
	justify-content: center;
	background: var(--theme-auxiliary-color-default);
	border-radius: 16rpx;
	padding: 6rpx;
	box-sizing: border-box;
	/* height: 30px;
		margin: 0 16px; */
}

.tab-box .tab-item {
	width: 100%;
	/* border: 1px solid var(--theme-color); */
	/* background-color: #fff; */
	text-align: center;
	/* line-height: 28px; */
	font-size: 28rpx;
	color: #404040;
	padding: 8rpx 0;
}

.tab-box .tab-item.active {
	background: #fff;
	color: var(--theme-color);
	border-radius: 12rpx;
	font-weight: 500;

}

.m-tabs-years {
	/* overflow-x: auto; */
	background-color: #fff;
	padding-bottom: 20rpx;
	padding-left: 28rpx;
	padding-right: 28rpx;
}

.m-tabs-years .m-tabs-years-bd {
	/* overflow: hidden; */
	white-space: nowrap;
	min-width: 100%;
	margin-top: 20rpx;
	display: flex;
	justify-content: space-between;
	/* padding-left: 28rpx; */
}

.m-tabs-more {
	display: flex !important;
	align-items: center;
	padding: 0 !important;

	/* padding: 6rpx 10rpx !important; */
	/* gap: 10rpx; */
	border-radius: 12rpx;
	background: var(--theme-auxiliary-color-default);
}

.m-tabs-years .m-tabs-years-bd span {
	/* 	border: 1Px solid #a9a9a9;
		border-radius: 30rpx;
		width: 110rpx;
		height: 40rpx;
		text-align: center;
		line-height: 36rpx;
		font-size: 24rpx;
		margin: 20rpx 28rpx 0 0; */
	display: inline-block;
	padding: 6rpx 10rpx;
	color: #404040;
	text-align: center;

	font-size: 28rpx;
	font-weight: 400;


}

.m-tabs-years .m-tabs-years-bd span.act {
	border: 1px solid var(--theme-color);
	background: var(--theme-color);
	color: #fff;
	border-radius: 12rpx;

}

.m-tabs-period-home {
	border-top: 1px solid var(--theme-auxiliary-color-default);
	background-color: #fff;
	position: relative;
	display: flex;
	justify-content: space-between;
}

.m-tabs-period {
	overflow-x: auto;
	width: calc(100% - 80rpx);
	margin: 20rpx 0 20rpx 28rpx;
}

.m-tabs-period .m-tabs-period-bd {
	height: 60rpx;
	white-space: nowrap;
	min-width: 100%;
}

.m-tabs-period .m-tabs-period-bd span {
	text-align: left;
	font-size: 28rpx;
	display: inline-block;
	color: #404040;
	font-weight: 400;
	margin-right: 44rpx;
}

.m-tabs-period .m-tabs-period-bd span.act {
	color: var(--theme-color);
	font-size: 30rpx;
	font-weight: 500;
}

.m-tabs-period-home .van-dropdown-menu {
	height: 30Px;
	width: 8rpx;
	text-align: center;
	display: flex;
	justify-content: center;
	margin: 20rpx 28rpx 20rpx 0;
}

.van-dropdown-menu__bar {
	width: 58px;
	height: 22px;
	line-height: 22px;
	/* margin-top: 8rpx; */
	/* background: var(--theme-color); */
	border-radius: 15px;
}

.van-dropdown-menu__title {
	font-size: 12px;
	color: #fff;
}

.van-ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.van-dropdown-box {
	position: fixed;
	width: 100%;
	max-width: 480px;
	height: var(--vh);
	background-color: rgba(0, 0, 0, .7);
	z-index: 99999;

	.scroll-y {
		background: #fff;
		border-radius: 0 0 24rpx 24rpx;
		overflow: hidden;
		padding: 20rpx 0;
		box-sizing: border-box;

		.item {
			float: left;
			width: 150rpx;
			height: 70rpx;
			display: grid;
			place-content: center;
			border-radius: 12rpx;
			border: 1px solid var(--theme-auxiliary-color-default);
			margin-left: 28rpx;
			margin-bottom: 20rpx;
			font-size: 28rpx;
			color: #404040;
		}

		.act {
			border: 1px solid var(--theme-color);
			color: var(--theme-color);
		}
	}
}

.van-dropdown-box-in {
	width: 100%;
	max-height: 80%;
	background-color: #fff;
	overflow-y: auto;
	box-sizing: border-box;
	border-radius: 0 0 24rpx 24rpx;
	overflow: hidden;
}


.dropdown-body .van-col {
	display: inline-block;
	width: 25%;
	text-align: center;
	float: unset;
}


.dropdown-body .van-col span {
	display: inline-block;
	width: 160rpx;
	height: 66rpx;
	line-height: 66rpx;
	border-radius: 12rpx;

	border: 1px solid var(--theme-auxiliary-color-default);
	text-align: center;
	margin-bottom: 20rpx;
	font-size: 28rpx;
	color: #404040;
}

.dropdown-body .van-col span.act {
	border: 1px solid var(--theme-color);
	color: var(--theme-color);
}

.picture-content {
	padding: 0rpx 32rpx 10rpx;
	/* border-top: 8rpx solid #f8f8f8; */
	background: #fff;
}

.picture-content .border-box {
	/* padding: 10rpx; */
	padding: 0;
}

.picture-content .border-box .body-hd-2 {
	text-align: center;
	color: var(--theme-color);
	/* margin-top: -10rpx; */
	padding-top: 20rpx;
	padding-bottom: 16rpx;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.picture-content .title {
	color: #404040;
	font-size: 34rpx;
	text-align: center;
	font-weight: 600;
	padding: 10rpx 0 20rpx 0;
}

.picture-content .text {
	/* line-height: 44rpx; */
	color: #404040;

	font-size: 28rpx;
	/* font-style: normal; */
	font-weight: 400;
	line-height: 40rpx;
	/* 142.857% */
}




.summary {
	font-size: 14px;
	color: #404040;
}

.vote-home-bd {
	padding: 0 32rpx;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	margin-top: 20rpx;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	background-color: #fff;
}

.vote-list {
	overflow: hidden;
}

.vote-list .vote-list-item:nth-child(odd) {
	padding-right: 24rpx;
}

.vote-list .vote-list-item {
	margin-bottom: 34rpx;
}

.van-col--12 {
	width: 50%;
}

.van-col {
	float: left;
	box-sizing: border-box;
	min-height: 1px;
}

.vote-list .col-td {
	display: flex;
	align-items: center;
}

.vote-list-item:nth-child(odd) {
	padding-right: 17rpx !important;
}

.vote-list-item:nth-child(2n) {
	padding-left: 17rpx !important;
}

.vote-list .name {
	margin-right: 10rpx;
	color: #404040;
	text-align: center;

	font-size: 26rpx;
	font-weight: 400;
}

.vote-list .proportion {
	flex: 1;
	display: flex;
	width: 100%;
	height: 24rpx;
	/* border: 1px solid var(--theme-color); */
	background-color: var(--theme-auxiliary-color-default);
	font-size: 10px;
	border-radius: 8px;
	text-align: right;
	position: relative;
}

.vote-list .proportion i {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 50%;
	background: var(--theme-color);
	border-radius: 7px;
	top: -0.1px;
	height: 24rpx;
}

.vote-list .proportion span {
	position: absolute;
	right: 4px;
	top: 5rpx;
	line-height: 14px;
}

.vote-list .num-piao {
	/* text-align: right;
		font-size: 12px;
		color: #7e7e7e;
		line-height: 32rpx;
		min-width: 90rpx; */
}

.ft-btns {
	/* margin-bottom: 30rpx; */
	display: flow-root;
}

.van-col--7 {
	width: 29.16666667%;
}

.van-col {
	float: left;
	box-sizing: border-box;
	min-height: 1px;
}

.van-col--10 {
	width: 41.66666667%;
}

.ft-btns label,
.ft-btns span {
	height: 86rpx;
	display: inline-block;
	width: 100%;
	background: var(--theme-auxiliary-color-default);
	color: #404040;
	font-size: 34rpx;
	text-align: center;
	line-height: 86rpx;
	border-radius: 16rpx;
}

.ft-btns label {
	background: var(--theme-color);
	color: #fff;
}

.ab {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.open-hide {
	/* height: 106rpx;
		line-height: 106rpx; */
	height: 68rpx;
	background: #fff;
	width: 100%;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);
	color: #A1A1A1;
	font-size: 28rpx;

}

.open-hide .open {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	color: #fff;
	position: relative;


}

.openLabel {
	color: #FFF;
	text-align: center;

	font-size: 34rpx;
	font-weight: 500;
	line-height: 0;
}


.close-hide {
	height: 96rpx;

	background: #fff;

	.open {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.uni-label-pointer {
			margin-top: 10rpx;
			color: #A1A1A1;

			font-size: 28rpx;
			font-weight: 400;
		}
	}
}

.open-class {
	border-radius: 24rpx;
	background-color: #FFF;
	overflow: hidden;
	padding-bottom: 20rpx;
}

.open-hide span {
	width: 206rpx;
	height: 46rpx;
	/* background-image: url("@/static/img/shuqi.png");
		background-size: 100% 100%; */
	display: inline-block;
	line-height: 46rpx;
	font-size: 24rpx;
	color: #fff;
	position: relative;
}

.v-interaction {
	padding: 0 32rpx;
	margin-bottom: 20rpx;
}

.ads-class {
	margin-top: 20rpx;
	padding: 0;
	padding-bottom: 50px;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	overflow: hidden;

}

/deep/ .vant-swiper-body-mini {
	border-radius: 0;
}

.interaction {
	position: relative;
}

.van-col--18 {
	width: 75%;
}

.interaction .tool-item {
	margin-right: 20rpx;
	color: #404040;

	font-size: 28rpx;
	font-weight: 400;
	display: flex;
	align-items: center;

}

.tool-item svg {
	margin-right: 10rpx;
}

.tool-item .icon {
	color: #888 !important;
}

.tool-item .act {
	color: var(--theme-color) !important;
}

.van-col--6 {
	width: 25%;
}

.interaction .right-text {
	text-align: right;
	color: #404040;

	font-size: 28rpx;
	font-weight: 400;
	white-space: nowrap;
}

.tool-bottom {
	position: fixed;
	padding-bottom: var(--safe-area-inset-bottom);
	width: 100%;
	bottom: 0;
	max-width: 480px;
	z-index: 15;
	background-color: #fff;
	/* border-radius: 40rpx 40rpx; */
	overflow: hidden;
	box-shadow: 0px -0.5px 0px 0px var(--theme-auxiliary-color-default);
	border-radius: 40rpx 40rpx 0px 0px;
}

.tool-bottom .tool-bottom-body {
	max-width: 960rpx;
	margin: 0 auto;
	height: 116rpx;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

.tool-bottom .left {
	flex: 1;
	height: 76rpx;
	display: flex;
	align-items: center;
	background-color: var(--theme-auxiliary-color-default);
	border-radius: 16rpx;
	color: silver;
	text-align: left;
	padding: 0 20rpx;
	box-sizing: border-box;
}

.tool-bottom .left label {
	margin-left: 30rpx;
	font-size: 24rpx;
	display: block;
}

.tool-bottom .tool-bottom-body .van-row.right {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.tool-bottom .right {
	text-align: center;
}

.tool-bottom .right uni-text {
	line-height: 1;
}

.tool-bottom .right .label {
	font-size: 26rpx;
	color: #404040;
	margin-left: 10rpx;
}

.tool-bottom .right .van-col {
	margin-left: 20rpx;
	display: flex;
	align-items: center;
}

.tool-bottom .right img {
	width: 30rpx;
	height: 30rpx;
}

.left label {
	margin-left: 30rpx;
	font-size: 24rpx;
	display: block;
}

.right-item {
	text-align: center;
	margin-top: 16rpx;
}

.right-item .icon {
	font-size: 18px;
}

.right-item .act {
	color: var(--theme-color) !important;
}

.right-item .img {
	width: 15Px;
	height: 15Px;
}

.right-item .label {
	font-size: 24rpx;
	color: #666;
}
</style>
