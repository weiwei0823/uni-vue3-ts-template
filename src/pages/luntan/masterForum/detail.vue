<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight, height: `calc(${uWindowHeight}px)` }"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" :isBack="false" showBack @back="back" :is-fixed="true">
			<block slot="right">
				<!--				<uni-icons style="text-align: right;" @click="openJin" type="more-filled" size="16"-->
				<!--					:color="themeColor.themeColor"></uni-icons>-->
				<view style="text-align: right;" @click="openJin">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_20536_87042)">
							<circle cx="2" cy="10" r="2" :fill="themeColor.themeColor" />
							<circle cx="10" cy="10" r="2" :fill="themeColor.themeColor" />
							<circle cx="18" cy="10" r="2" :fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_20536_87042">
								<rect width="20" height="20" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</view>

			</block>
		</Header>

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y content" show-scrollbar="true"
			scroll-with-animation="true" @scrolltolower="lower" @scroll="scroll"
			:style="{ height: `calc(${uWindowHeight}px - 100rpx - 96rpx - var(--safe-area-inset-bottom))`, paddingBottom: 'var(--safe-area-inset-bottom)' }">
			<!--开奖区域-->
			<view class="lottery" v-if="lastLottery">
				<lottery :lotteryDetail="lastLottery" :lotteryFooterShow="false" :isHistoryPage="true"
					:backChangeWithTheme="true">
					<template v-slot:header></template>
					<template v-slot:lottery></template>
					<template v-slot:footer>
						<span v-if="lastLottery.isNewest == false"></span>
					</template>
				</lottery>
			</view>
			<view class="images-box" name="info_type_2" v-if="info.type == 2 && info.pictureList.length > 0">
				<view class="images" style="position: relative">
					<swiper :style="{ height: swiperHeight + 'px' }" @change="changeSwiper" class="swiper" :indicator-dots="false"
						:autoplay="false" :current="current">
						<swiper-item v-for="(item, index) in info.pictureList">
							<fast-lazy-load @click="previewImg(info.pictureList, item)" radius="16rpx" :id="'content-wrap' + index"
								:src="item" width="calc(100%)" style="width: calc(100% - 56rpx);margin: 0 auto;" mode="widthFix"
								:isMark="true">
								<template v-slot:loading>
									<image class="lazy-image" :src="loadingImg" mode="widthFix"></image>
								</template>
								<template v-slot:error>
									<image class="lazy-image" :src="loadingImg" mode="widthFix"></image>
								</template>
							</fast-lazy-load>
						</swiper-item>
					</swiper>
					<view class="current-text">
						{{ current + 1 }}/{{ info.pictureList.length }}
					</view>
				</view>
			</view>
			<!--帖子作者简介-->
			<view class="detail-body">
				<!--帖子点赞作者相关信息-->
				<!-- downloadShow?'downloadTop': -->
				<view :style="{ height: detailHeight + 'px', backgroundColor: '#fff', paddingTop: '40rpx' }"
					:class="isTop ? 'top' : ''">
					<view id="detail" :style="isTop == 1 ? 'marginTop:' + safeHeight : ''">
						<view class="detail-body-box">
							<view class="cell-top clearfix">
								<view class="user-img">
									<view class="left-image">
										<view class="van-image van-image--round">
											<image :src="info.headPic || ''" class="van-image__img" @click="homepage(info)">
											</image>
										</view>
										<view class="level">
											VIP{{ parseInt(info.userLevel || 0) }}
										</view>
									</view>
									<view class="user-info">
										<view class="name" @click="homepage(info)" :title="info.username">
											<!-- 用户昵称： -->
											{{ info.username }}
											<span class="reportInfo"></span>
										</view>
										<view class="time" @click="homepage(info)">
											{{ info.createTimeStr || info.updateTime || '' }}
										</view>
									</view><!---->

								</view>
								<view class="right-tool">
									<span class="btn editor" v-if="info.editable" @click="editForum">{{
										$t('pages.luntan.masterForum.detail.edit') }}</span>
									<view class="btn follow"
										v-show="($store.state.appInfoStore.userInfo && $store.state.appInfoStore.userInfo.id ? $store.state.appInfoStore.userInfo.id != info.userId : true) && !info.editable && info.concern == 0"
										@click="concern()">
										{{ $t('pages.luntan.masterForum.detail.follow') }}
									</view>

									<span class="btn editor" @click="history" v-if="!info.editable">{{
										$t('pages.luntan.masterForum.detail.historyPosts') }}</span>
									<!-- <view class="btn follow" v-show="info.concern == 0" @click="concern()">
										{{ $t('pages.luntan.masterForum.detail.follow') }}
									</view>
									<span class="btn editor" v-if="info.editable" @click="editForum">{{
										$t('pages.luntan.masterForum.detail.edit') }}</span>
									<span class="btn editor" v-else @click="history">{{
										$t('pages.luntan.masterForum.detail.historyPosts') }}</span> -->
								</view>
							</view>
							<view class="interaction-info van-row">
								<view class="van-col ">
									<view class="num">{{ info.thumbUpCount | moneyFormat }}</view>
									<view class="label">{{ $t('pages.luntan.masterForum.detail.likes') }}</view>
								</view>
								<view class="van-col">
									<view class="num">{{ info.fansCount | moneyFormat }}</view>
									<view class="label">{{ $t('pages.luntan.masterForum.detail.followers') }}</view>
								</view>
								<view class="van-col ">
									<div class="num">{{ info.concernCount | moneyFormat }}</div>
									<div class="label">{{ $t('pages.luntan.masterForum.detail.following') }}</div>
								</view>
								<view class="van-col">
									<div class="num">{{ info.score | moneyFormat }}</div>
									<div class="label">{{ $t('pages.luntan.masterForum.detail.growthValue') }}</div>
								</view>
								<view class="van-col ">
									<view class="num">{{ info.clickCount | moneyFormat }}</view>
									<view class="label">{{ $t('pages.luntan.masterForum.detail.reads') }}</view>
								</view>
								<view class="right" @click="qidai">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M4.03514 5.91715C4.78993 4.48727 6.27139 3.50041 8.00131 3.50041C9.73124 3.50041 11.2127 4.48727 11.9675 5.91715C13.5169 4.76856 14.5717 2.9894 14.7077 0.945374C14.3702 0.682838 13.9646 0.5 13.5029 0.5H2.49977C2.03799 0.5 1.63247 0.682838 1.29492 0.945374C1.43088 2.98706 2.48571 4.76856 4.03514 5.91715ZM12.4616 7.55899L12.4616 7.55909C12.4815 7.7043 12.5017 7.85045 12.5017 8.0009C12.5017 10.4856 10.4857 12.5015 8.00103 12.5015C5.51631 12.5015 3.50041 10.4856 3.50041 8.0009C3.50041 7.85233 3.52002 7.70937 3.53975 7.56551L3.53975 7.56546C3.54555 7.52321 3.55135 7.48089 3.55667 7.43832C2.22993 6.58274 1.16103 5.36382 0.5 3.91518V16.5005C0.5 17.6046 1.39544 18.5 2.49949 18.5H13.5002C14.6043 18.5 15.4997 17.6046 15.4997 16.5005V3.91753C14.841 5.36382 13.7698 6.58508 12.4454 7.43832C12.4505 7.47852 12.456 7.51872 12.4616 7.55899ZM10.7476 7.85107C10.7476 8.08782 10.5765 8.25893 10.3398 8.25893H8.41059V8.99732H10.3398C10.5765 8.99732 10.7476 9.17078 10.7476 9.40753C10.7476 9.64428 10.5765 9.8154 10.3398 9.8154H8.41059V10.9663C8.41059 11.2031 8.23947 11.3742 8.00272 11.3742C7.76597 11.3742 7.59485 11.2031 7.59485 10.9663V9.8154H5.66568C5.42893 9.8154 5.25781 9.64428 5.25781 9.40753C5.25781 9.17078 5.42893 8.99732 5.66568 8.99732H7.59485V8.25659H5.66568C5.42893 8.25659 5.25781 8.08547 5.25781 7.84872C5.25781 7.61197 5.42893 7.44085 5.66568 7.44085H7.28544L5.66334 5.77187C5.58598 5.69686 5.54379 5.59607 5.54145 5.48824C5.54145 5.38276 5.58364 5.27962 5.66334 5.19992C5.82508 5.03818 6.07589 5.03818 6.23763 5.19992L8.00507 7.01423L9.76781 5.25383C9.92955 5.09209 10.1804 5.09209 10.3421 5.25383C10.5038 5.41557 10.5038 5.66639 10.3421 5.82813L8.72704 7.4432H10.3398C10.5765 7.4432 10.7476 7.61431 10.7476 7.85107Z"
											fill="url(#paint0_linear_21642_50984)" />
										<defs>
											<linearGradient id="paint0_linear_21642_50984" x1="7.99986" y1="0.5" x2="7.99986" y2="18.5"
												gradientUnits="userSpaceOnUse">
												<stop stop-color="#EC5F32" />
												<stop offset="1" stop-color="#DD1F1F" />
											</linearGradient>
										</defs>
									</svg>
									<view class="text">打赏</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!--标题-->
				<view class="content-box has-read" v-if="info.type != 2">{{ info.title }}</view>
				<!--图解-->
				<view class="images-box" style="display: block;width: auto;padding: 30rpx;border-radius:0;"
					v-if="info.type == 12">
					<view style="width: 100%">
						<image style="width: 100%" :src="info.picture.largePictureUrl" mode="widthFix"></image>
					</view>
				</view>
				<!--文章详情-->
				<scroll-view scroll-x :data-infotype="info.type" class="desc-body-box"
					:class="{ radius: !info.pictureList.length }">
					<mp-html :content="info.description"
						style="overflow: unset;" /><!--<rich-text :nodes="info.description"></rich-text>-->
				</scroll-view>
				<!--图集-->
				<view v-if="info.pictureList.length" style="width: 100%;max-width: 480px">
					<view class="images-box" v-if="info.type != 2">
						<view class="images">
							<uni-row class="img-box-1">
								<uni-col :span="8" style="padding-left: 5px;" v-for="(item, index) in info.pictureList">
									<!-- <Watermark :url="item" :width="'100%'" :height="'180rpx'" :id="'wate'+index" /> -->
									<fast-lazy-load :id="'content-wrap' + index" @click="previewImg(info.pictureList, item)"
										class="img-list" :radius="'8rpx'" :src="item" :width="'100%'" :height="'180rpx'" mode="aspectFill"
										:isMark="true">
										<template v-slot:loading>
											<image class="lazy-image" :src="loadingImg"></image>
										</template>
										<template v-slot:error>
											<image class="lazy-image" :src="loadingImg"></image>
										</template>
									</fast-lazy-load>
								</uni-col>
							</uni-row>
						</view>
					</view>
				</view>
				<!--广告轮播图区域-->
				<view class="v-interaction">
					<ads :listPicture="listPicture" :bindLotteryType="info ? info.lotteryType : -1"></ads>
				</view>
				<!--粉丝区域-->
				<!--        <view class="fans-top">
          <img src="@/static/img/forum/liwu.png" class="title">
          <span class="huanghua">
            <img src="@/static/img/forum/jinbi.png">
            <label>0</label>
          </span>
          <span class="honghua">
            <img src="@/static/img/forum/honghua.png">
            <label>0</label>
          </span>
          <span class="more">查看更多 &gt;</span>
        </view>-->
				<!--排行榜-->
				<!--        <div class="gift">
          <div class="liwu-list van-row">
            <div class="van-col van-col&#45;&#45;8">
              <div class="user-img-box">
                <div class="user-img-top top2">
                  <img
                      src="https://img.sycccf.com:4949/unite49files/user/2021/10/25/1746885/1635162169865-20211025194249-1815455420.png"
                      class="userimg">
                  <img src="@/static/img/forum/two.png" class="userimgxs">
                </div>
              </div>
              <div class="name">沙场湫点兵</div>
              <div class="liwuname">
                <span>12000彩金</span>
                <span>325红花</span>
              </div>
            </div>
            <div class="van-col van-col&#45;&#45;8">
              <div class="user-img-box">
                <div class="user-img-top top1">
                  <img
                      src="https://img.sycccf.com:4949/unite49files/user/2022/08/18/1333445/20220818234143-1094191866.png"
                      class="userimg">
                  <img src="@/static/img/forum/one.png" class="userimgxs">
                </div>
              </div>
              <div class="name">浅月流歌</div>
              <div class="liwuname">
                <span>11546.11彩金</span><span>2464红花</span>
              </div>
            </div>
            <div class="van-col van-col&#45;&#45;8">
              <div class="user-img-box">
                <div class="user-img-top top3">
                  <img
                      src="https://img.sycccf.com:4949/unite49files/user/2021/12/01/1376523/1638360542399-20211201200902-1610491737.png"
                      class="userimg">
                  <img src="@/static/img/forum/three.png" class="userimgxs">
                </div>
              </div>
              <div class="name">东方神起</div>
              <div class="liwuname">
                <span>8969.77彩金</span>
                <span>9951红花</span>
              </div>
            </div>
          </div>&lt;!&ndash;&ndash;&gt;
        </div>-->
				<!--热门评论-->
				<comment ref="comment" :relatedId="id" :type="type" :isShow="true" :createTime="info.createTime || createTime"
					:userId="info.userId" @setIsLoadMore="setIsLoadMore" @openPopup="openPopup"></comment>
			</view>
			<!--底部悬浮框-->

		</scroll-view>
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
						<svg v-if="info.thumbUp == 0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
							fill="none">
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
						<div class="label">{{ info.thumbUpCount | moneyFormat }}</div>
					</view>
					<view class="van-col " @click="replyComment">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
							<path
								d="M15.4 16.2248H15.0583L14.8166 16.4664L11 20.2831L7.18336 16.4664L6.94173 16.2248H6.6H3.3C1.93309 16.2248 0.825 15.1167 0.825 13.7498V3.8498C0.825 2.4829 1.9331 1.3748 3.3 1.3748H18.7C20.0669 1.3748 21.175 2.4829 21.175 3.84981V13.7498C21.175 15.1167 20.0669 16.2248 18.7 16.2248H15.4Z"
								stroke="#404040" stroke-width="1.65" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M7.14766 8.79941C7.14766 9.71068 6.40893 10.4494 5.49766 10.4494C4.58639 10.4494 3.84766 9.71068 3.84766 8.79941C3.84766 7.88814 4.58639 7.14941 5.49766 7.14941C6.40893 7.14941 7.14766 7.88814 7.14766 8.79941ZM12.6477 8.79941C12.6477 9.71068 11.9089 10.4494 10.9977 10.4494C10.0864 10.4494 9.34766 9.71068 9.34766 8.79941C9.34766 7.88814 10.0864 7.14941 10.9977 7.14941C11.9089 7.14941 12.6477 7.88814 12.6477 8.79941ZM16.4977 10.4494C17.4089 10.4494 18.1477 9.71068 18.1477 8.79941C18.1477 7.88814 17.4089 7.14941 16.4977 7.14941C15.5864 7.14941 14.8477 7.88814 14.8477 8.79941C14.8477 9.71068 15.5864 10.4494 16.4977 10.4494Z"
								fill="#404040" />
						</svg>
						<div class="label">{{ info.commentCount | moneyFormat }}</div>
					</view>
				</view>
			</view>
		</view>

		<!--评论弹窗-->
		<uni-popup ref="comentPopup" background-color="#fff" mask-background-color="rgba(0,0,0,.7)" :is-mask-click="false">
			<view style="width: 100vw;height: var(--vh);max-width:480px;">
				<reply-comment ref="replyComment" @closeComent="closeComent" :commentId="commentId" :relatedId="id"
					:createTime="info.createTime" :commentType="info.type"></reply-comment>
			</view>
		</uni-popup>
		<view class="jin-box">
			<uni-popup ref="jinPopup" mask-background-color="rgba(0,0,0,.3)" :is-mask-click="true" @change="handleChange">
				<view class="van-action-sheet__content">
					<button type="primary" class="action-button" style="color: #404040;" @click="homepage(info)">{{
						$t('pages.luntan.masterForum.detail.viewUserPage') }}</button>
					<button type="primary" class="action-button" style="color: #404040;" @click="history">{{
						$t('pages.luntan.masterForum.detail.historyPosts') }}</button>
					<button type="primary" style="color: var(--theme-color);"
						v-if="info.highQuality == 0 && info.canRaise == 1 && info.applyBestStatus == 0" class="action-button"
						@click="jiajin">{{ $t('pages.luntan.masterForum.detail.applyFeatured')
						}}</button>
					<button type="primary" style="color: var(--theme-color);"
						v-else-if="info.highQuality == 0 && info.canRaise == 1 && info.applyBestStatus == 1"
						class="action-button">{{
							$t('pages.luntan.masterForum.detail.featuredPending')
						}}</button>
					<button type="primary" v-else-if="info.highQuality == 1" style="color: var(--theme-color);"
						class="action-button" :style="`color: ${themeColor.themeColor};`">{{
							$t('pages.luntan.masterForum.detail.featuredSuccess')
						}}</button>
					<button type="primary" class="action-button red" style="color: var(--theme-auxiliary-color-remind);"
						@click="report">{{
							$t('pages.luntan.masterForum.detail.report') }}</button>
				</view>
				<button type="primary" class="action-button" style="color: var(--theme-color);" @click="closeJin">{{
					$t('pages.luntan.masterForum.detail.cancel') }}</button>
			</uni-popup>
		</view>
		<!-- 分享 -->
		<uni-popup class="share" ref="share" type="share" safeArea backgroundColor="#fff">
			<share @closefx="closefx"></share>
		</uni-popup>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--悬浮菜单栏-->
		<fab></fab>
		<AlertInjectLayer />
		<Login v-if="showLogin" @closePopup="showLogin = false" />
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import Fab from "@/components/common/fab/Fab";
import Lottery from '@/components/common/lottery/Lottery'
import Ads from '@/components/common/ad/Ad'
import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
import Comment from "@/components/common/comment/Comment";
import ReplyComment from "@/components/common/comment/ReplyComment";
import Login from "@/components/common/login/Login";
import Share from "@/components/common/share/Share";

import {
	period
} from "@/utils/lottery/index.js"
import {
	detail,
	applyRaise
} from '@/utils/forum/index.js'
import {
	advertList,
	listSpreadByType
} from "@/utils/common/index.js"
import {
	concern,
	thumbUp
} from '@/utils/user/index.js'
import Vote from "@/components/common/vote/Vote";
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import NavBar from "@/components/common/navBar/navBar.vue"
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	mapGetters
} from 'pinia';
import Watermark from '@/components/common/watermark/index.vue';
import useAppInfoStore from "@/store/modules/appInfoStore";
import useSystemInfoStore from "@/store/modules/systemInfoStore";
export default {
	name: "detail",
	components: {
		Header,
		AlertInjectLayer,
		UniCol,
		UniRow,
		Vote,
		Fab,
		Lottery,
		cusPreviewImg,
		Ads,
		Comment,
		Login,
		ReplyComment,
		Share,
		NavBar,
		Watermark
	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t('pages.luntan.masterForum.detail.details'),
			loadingImg: '@/static/img/zw.png',
			scrollTop: 0,
			isTop: 0, //吸附判断
			isGet: false, //是否获取悬浮高度
			lotteryType: 0, //
			old: {
				scrollTop: 0,
				myScroll: 0,
			},
			current: 0,
			status: 'more', //触底加载状态
			isLoadMore: false,
			id: 0,
			createTime: '',
			type: 3,
			lastLottery: {}, //最后一次开奖信息
			info: {
				pictureList: []
			}, //帖子详情
			listPicture: [], //广告图
			ImgList: [],
			commentId: 0, //评论ID
			isOpen: false,
			msg: '',
			swiperHeight: 0,
			detailHeight: 110,
			showLogin: false,
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	onLoad(option) {
		//方式一：接收参数
		this.id = parseInt(option.id)
		this.createTime = option.createTimeStr || option.createTime
		this.type = parseInt(option.type)
		this.lotteryType = option.lotteryType
		uni.$on('emitParams', data => {
			this.msg = data.msg
		})
		this.detail()
		this.listSpreadByType()
		uni.setNavigationBarTitle({
			title: this.title
		});
		let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG)
		this.loadingImg = configData.find(item => item.type == 23)?.url
		this.$nextTick(function () {
			this.getDetailHeight();
		})
		setTimeout(() => {
			this.getOtherHeight();
		}, 1000)
		if (option.comment == 1) {
			setTimeout(() => {
				this.replyComment();
			}, 0)
		}
	},
	onShow() {

		if (this.msg) {
			pop(this.msg, 2000)
			this.msg = ''
		}
	},

	watch: {
		info(value) {
			if (value) {
				uni.$emit(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LUNTAN_DETAILS_UPDATE_CLICKCOUNT, value);
			}
		}
	},

	computed: {
    ...mapState(useAppInfoStore, ["themeColor", "userInfo"]),
    ...mapState(useSystemInfoStore, ["uWindowHeight", "downloadShow"]),
	},
	methods: {
		handleChange({
			show
		}) {
			let color = '#ffffff'
			let isLightColor = false
			if (show) {
				color = '#B2B2B2'
				isLightColor = true
			}
			setTimeout(() => {
				this.$nativeBridge.setStatusBarColor(color, isLightColor)
			}, 120);
		},
		getOtherHeight() {
			const height1 = document.querySelector(".lottery")?.offsetHeight;
			const height2 = document.querySelector(".images-box")?.offsetHeight;

			console.log(height1)
			console.log(height2)
		},
		back: function () {
			// const pages = getCurrentPages();
			// console.log(pages);
			// console.log(pages[pages.length - 2])
			// return;
			backPage()
			// uni.navigateTo({
			// 	url: "/pages/luntan/masterForum/index"
			// });
		},
		history: function (item) {
			uni.navigateTo({
				url: "history?userId=" + this.info.userId + "&lotteryType=" + this.info
					.lotteryType + "&type=" + this.info
						.type // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
			});
		},
		report: function () {
			this.$refs.jinPopup.close()
			uni.navigateTo({
				url: "report?relatedId=" + this.info.articleId + "&type=" + this.info.type + "&title=" +
					this.info.title + '&articleTime=' + this.info
						.createTime // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
			});
		},
		//用户主页
		homepage: function (item) {
			uni.navigateTo({
				url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId
			})
		},
		//编辑器
		editForum: function () {
			uni.navigateTo({
				url: '/pages/luntan/masterForum/add?id=' + this.info.articleId
			})
		},
		getDetailHeight: function () {
			/*下次 DOM 更新时，找到某个控件，再进行复杂计算并确定其高度后*/
			const query = uni.createSelectorQuery();
			query.select('#detail').boundingClientRect(data => {
				this.old.myScroll = data.top;
				this.detailHeight = data.height
			}).exec();
		},
		navY: function () {
			/*下次 DOM 更新时，找到某个控件，再进行复杂计算并确定其高度后*/
			const query = uni.createSelectorQuery();
			query.select('#detail').boundingClientRect(data => {
				this.old.myScroll = data.top;
				this.detailHeight = data.height
			}).exec();
		},
		lotteryName: function (lotteryId) {
			let lotteryName = ''
			this.navList.forEach((item, index) => {
				if (item.lotteryType == lotteryId) {
					lotteryName = item.name
					return
				}
			})
			return lotteryName
		},
		//分享弹窗
		fenxiang: function () {
			this.$refs.share.open()
		},
		//关闭分享
		closefx: function () {
			this.$refs.share.close()
		},
		//加载更多
		lower: function (e) {
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.isLoadMore = true
				this.pageNum += 1
				this.$refs.comment.listLatest()
			}
		},
		//
		qidai() {
			pop(this.$t('components.CommonPages.pages-luntan.LuntanMarket.comingSoon'), 2000)
		},
		setIsLoadMore: function () {
			this.isLoadMore = false
		},
		//滚动条监听
		scroll: function (e) {
			this.old.scrollTop = e.detail.scrollTop
			if (!this.isGet) {
				this.isGet = true
				this.navY()
			}
			if ((this.old.scrollTop) >= this.old.myScroll) {
				this.isTop = 1
			} else {
				this.isTop = 0
			}
		},
		//开奖信息
		period: function () {
			let prams = {
				lotteryType: this.info.lotteryType,
				number: this.info.period,
				year: this.info.year
			}
			period(prams).then(res => {
				this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netRes) => {
					this.lastLottery = netRes.result
				}, this)
				this.lastLottery = res.result
			}).catch(err => {
				console.log(err)
			})
		},
		//文章详情获取
		detail: function () {
			let prams = {
				articleId: this.id,
				createTime: this.createTime
			}
			console.log(prams)
			detail(prams).then(res => {
				this.$requestCache.bindLastCacheUpdateApiCallBack(res, this.bindDetailInfoData, this);
				this.bindDetailInfoData(res);
			}).catch(err => {
				console.log(err)
			})
		},
		bindDetailInfoData(res) {
			this.info = res.result;
			let title = this.$config.configLotties.getLotteryTypeTimeNameByLotteryTypeId(this.info.lotteryType);
			if (this.type != 4) {
				this.title = title + this.$t('pages.luntan.masterForum.detail.issue') + this.info
					.period + this.$t('pages.luntan.masterForum.detail.period')
				if (this.type == 2) {
					let title = this.info.title.slice(0, 6) + "..."
					this.title = this.title + ":" + title
				}
			}
			this.$refs.comment.commentLists()
			this.period()
			//动态设置swiper的高度
			this.$nextTick(() => {
				this.setSwiperHeight();
			});
			setTimeout(() => {
				this.setSwiperHeight()
			}, 1000)
		},


		async changeSwiper(e) {
			this.current = e.detail.current;
			//动态设置swiper的高度，使用nextTick延时设置
			await this.setSwiperHeight();
		},
		//动态设置swiper的高度
		setSwiperHeight() {
			let element = "#content-wrap" + this.current;
			let query = uni.createSelectorQuery().in(this);
			query.select(element).boundingClientRect();
			query.exec((res) => {
				if (res && res[0]) {
					this.swiperHeight = res[0].height;
				}
			});
		},
		//轮播图获取
		listSpreadByType: function () {
			let prams = {
				projectType: 1,
				code: 3,
			}
			console.error("listSpreadByType")
			advertList(prams).then(res => {
				this.listPicture = res.result
			}).catch(err => {

			})
		},
		//关注接口
		concern: function () {
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
				userId: this.info.userId
			}
			concern(prams).then(res => {
				uni.showToast({
					title: res.message,
					duration: 2000,
					icon: 'none'
				})
				if (res.code == 200) {
					this.info.concern = !this.info.concern
					uni.$emit('concern', prams)
				}
			}).catch(err => {
				console.log(err)
			})
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
				relatedId: this.info.articleId,
				type: this.info.type,
				createTime: this.info.createTime
			}
			thumbUp(prams).then(res => {
				uni.showToast({
					title: res.message,
					duration: 2000,
					icon: 'none'
				})
				if (res.code == 200) {
					this.info.thumbUp = 1
					this.info.thumbUpCount++
					this.info = Object.assign({}, this.info);
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//申请加精
		jiajin: function () {
			let prams = {
				articleId: this.info.articleId,
				createTime: this.info.createTime
			}
			applyRaise(prams).then(res => {
				this.$refs.jinPopup.close()
				if (res.code == 200) {
					pop(this.$t('pages.luntan.masterForum.detail.submitSuccess'), 2000)
					this.info.applyBestStatus = 1
				} else {
					pop(res.message, 2000)
				}
			})
		},
		openPopup: function () {
			if (this.$config.station === 'LUNTAN') {
				this.showLogin = true
				return
			}
			uni.$emit('showPop', {
				refName: 'AlertMessage'
			})
		},
		openJin: function () {
			this.$refs.jinPopup.open('bottom')
		},
		closeJin: function () {
			this.$refs.jinPopup.close()
		},
		//图片弹窗
		previewImg: function (imgList, url) { // 点击预览图片
			console.log(imgList)
			console.log(url)
			this.ImgList = imgList
			this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
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
			this.$refs.comentPopup.open('right')
		},
		//关闭评论
		closeComent: function (type = 1) {
			this.$refs.comentPopup.close()
			if (type == 2) {
				this.detail()
				this.$refs.comment.restComment()
			}
		},
		//轮播图加载报错
		onSwiperImageLoadingError() {

		}
	},
}
</script>

<style lang="scss"></style>
<style scoped>
.content {
	height: 0;
	flex: 1;
	margin-top: 20rpx;
	border-radius: 24rpx 24rpx 0 0;
	overflow: hidden;

}

::v-deep .lottery {
	margin-top: 0 !important;
}

.tab-div-radius {
	background-color: #fff;
	height: 20rpx;
	width: 100%;
	position: fixed;
	top: 100rpx;
	z-index: 2;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
}

::v-deep .tab-div-bg {
	border-radius: 0;
}

.mint-tab-container-item {
	background: var(--theme-auxiliary-color-default);
}

.header-box,
.header,
.box-bg {
	height: 46px;
}

.lottery {
	background: #fff;
	padding: 20rpx 28rpx 0 28rpx;
	margin-top: 20rpx;
	border-radius: 24rpx 24rpx 0 0;
}

.detail-body {
	background: var(--theme-auxiliary-color-default);
	margin-top: 0rpx;
}

.detail-body .hd-image {
	margin-bottom: 20rpx;
}

.detail-body .hd-image image {
	width: 100%;
}

.detail-body .detail-body-box {
	padding: 0 28rpx;
	background: #fff;

}

.detail-body .top {
	position: fixed;
	top: 100rpx;
	z-index: 99;
	width: 100%;
	max-width: 480px;
	box-sizing: border-box;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
}

.detail-body .downloadTop {
	position: fixed;
	top: 210rpx;
	z-index: 99;
	width: 100%;
	max-width: 480px;
	box-sizing: border-box;
}

.detail-body .top .detail-body-box {
	padding-top: 20rpx;
	border-radius: 24rpx;
}

.detail-body .detail-body-box .cell-top {
	position: relative;
	height: 96rpx;
	display: flex;
	align-items: center;
}

.detail-body .detail-body-box .cell-top .user-img {
	padding-left: 110rpx;
}

.user-img .left-image {
	position: absolute;
	left: 0;
	top: 0;
	width: 96rpx;
	height: 96rpx;
}

.detail-body .detail-body-box .cell-top .user-img .van-image {
	width: 96rpx;
	height: 96rpx;
}

.level {
	position: absolute;
	width: 88rpx;
	height: 32rpx;
	right: 0;
	bottom: 0;
	background: url('@/static/img/all/wallet/level-bg1.png');
	background-size: 100% 100%;
	color: #FFF;
	display: grid;
	align-content: center;
	text-align: right;
	padding-right: 6rpx;
	font-size: 24rpx;
	font-weight: 500;
	box-sizing: border-box;
	white-space: nowrap;
}

.van-image--round {
	overflow: hidden;
	border-radius: 24rpx;
}

.van-image {
	position: relative;
	display: inline-block;
}

.van-image--round img {
	border-radius: inherit;
}

.van-image__error,
.van-image__img,
.van-image__loading {
	display: block;
	width: 100%;
	height: 100%;
}

.detail-body .detail-body-box .cell-top .user-img .m-follow {
	position: absolute;
	left: 6rpx;
	bottom: 0;
}

.m-follow .add-follow {
	display: inline-block;
	width: 108rpx;
	height: 50rpx;
	background: var(--theme-color);
	color: #fff;
	border-radius: 30rpx;
	font-size: 28rpx;
	text-align: center;
	line-height: 50rpx;
}

.user-img .user-info .name {
	margin-right: 10rpx;
	font-style: normal;
	font-weight: 700;
	font-size: 30rpx;
	color: #404040;
	margin-top: 10rpx;
	overflow: hidden;
	width: 352rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.user-img .user-info .time {
	font-size: 26rpx;
	margin-top: 10rpx;
	color: #404040;
}

.detail-body .detail-body-box .cell-top .right-tool {
	position: absolute;
	right: 0;
	top: 0;
}

.right image {
	width: 15Px;
	height: 15Px;
}

.detail-body .detail-body-box .cell-top .right-tool image {
	width: 64rpx;
	height: 64rpx;
	float: left;
}

.detail-body .detail-body-box .cell-top .right-tool .editor-btn {
	float: left;
	background: var(--theme-color);
	color: #fff;
	height: 64rpx;
	line-height: 64rpx;
	width: 120rpx;
	text-align: center;
	border-radius: 30rpx;
	font-size: 24rpx;
	margin-left: 30rpx;
}

.interaction-info {
	text-align: center;
	padding: 20rpx 0;
	/*display: inline-block;*/
	width: 100%;
	display: flex;
	justify-items: start;
}

.interaction-info .num {
	font-size: 32rpx;
	line-height: 32rpx;
	height: 32rpx;
}

.detail-body .content-box {
	background: #fff;
	padding: 20rpx 28rpx;
	color: #404040;
	line-height: 44rpx;
	font-size: 32rpx;
	word-wrap: break-word;
	font-weight: 600;
}

.detail-body .desc-body-box {
	background: #fff;
	padding: 0 28rpx 20rpx;
	word-break: break-all;
	line-height: 48rpx;
	font-size: 28rpx;
	color: #404040;
	width: 100%;
	box-sizing: border-box;
	/* border-radius: 0px 0px 28rpx 28rpx; */
}

.detail-body .desc-body-box[data-infotype='2'] {
	/*border-radius:0px 0px 28rpx 28rpx;*/
}

.radius {
	border-radius: 0 0 24rpx 24rpx;
}

.images-box {
	display: inline-block;
	width: 100%;
	background: #fff;
	padding-top: 20rpx;
	border-radius: 0 0 24rpx 24rpx;
}

.images-box[name='info_type_2'] {
	border-radius: 0;
}

.images-box .images {
	padding-bottom: 10rpx;
	text-align: center;
}

.img-list {
	width: 100%;
	height: 180rpx;
	border-radius: 8rpx;
	margin-bottom: 10rpx;
	position: relative;
}

.v-interaction {
	margin-top: 20rpx;


}

::v-deep .vant-swiper-body-mini {
	border-radius: 24rpx 24rpx 0 0;
}

.detail-body .fans-top {
	height: 104rpx;
	background-color: #f3fcf7;
	border-top: 2rpx solid #eee;
	padding: 0 30rpx;
}

.detail-body .fans-top .title {
	height: 64rpx;
	float: left;
	margin-top: 16rpx;
}

.detail-body .fans-top .honghua,
.detail-body .fans-top .huanghua {
	float: left;
	font-size: 32rpx;
	color: #fdc72f;
	margin-top: 26rpx;
	margin-left: 30rpx;
}

.detail-body .fans-top .honghua img,
.detail-body .fans-top .huanghua img {
	height: 44rpx;
	float: left;
}

.detail-body .fans-top .honghua label,
.detail-body .fans-top .huanghua label {
	float: left;
	margin-top: 4rpx;
	margin-left: 10rpx;
	font-weight: 600;
}

.detail-body .fans-top .more {
	color: #999;
	float: right;
	margin-top: 36rpx;
	font-size: 24rpx;
}

.detail-body .gift {
	padding: 30rpx;
}

.detail-body .gift .liwu-list {
	text-align: center;
	margin-bottom: 4rpx;
	display: inline-block;
	width: 100%;
}

.detail-body .gift .liwu-list .user-img-box {
	height: 218rpx;
	position: relative;
}

.detail-body .gift .liwu-list .user-img-box .user-img-top {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
}

.user-img-top.top2,
.user-img-top.top3 {
	width: 136rpx;
	height: 136rpx;
}

.user-img-top.top1 {
	width: 182rpx;
	height: 182rpx;
}

.user-img-top {
	display: inline-block;
}

.user-img-top .userimg {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.user-img-top .userimgxs {
	width: 100%;
	position: absolute;
	left: 0;
	bottom: -4rpx;
}

.gift .liwu-list .name {
	font-size: 32rpx;
	padding-top: 20rpx;
}

.gift .liwu-list .liwuname {
	color: #ff5e4f;
	font-size: 24rpx;
	padding-top: 10rpx;
	display: flex;
	flex-direction: column;
	text-align: center;
	font-weight: 600;
}

.tool-bottom {
	position: fixed;
	bottom: 0;
	padding-bottom: var(--safe-area-inset-bottom);
	width: 100%;
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
	margin-top: 16rpx;
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

.action-button {
	font-size: 34rpx;
	background-color: unset;
	width: 100%;
	color: #404040;
	height: 88rpx;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	background: rgba(255, 255, 255, 0.80);
	backdrop-filter: blur(10px);
}

.red {
	color: #d1827d;
}

.action-button:after {
	content: " ";
	width: 200%;
	height: 200%;
	position: absolute;
	top: 0;
	left: 0;
	border: 0px solid rgba(0, 0, 0, .2);
	-webkit-transform: scale(.5);
	transform: scale(.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	box-sizing: border-box;
	/* border-radius: 10px; */
}

.current-text {
	position: absolute;
	bottom: 40rpx;
	right: 40rpx;
	background: rgb(79 79 79 / 70%);
	width: 70rpx;
	height: 70rpx;
	line-height: 70rpx;
	text-align: center;
	color: #fff;
	border-radius: 50%;
	font-size: 26rpx;
}

.lazy-image {
	/* max-width: 80rpx;
		max-height: 80rpx; */
	width: 100%;
	height: 100%;
}
</style>

<style lang="scss" scoped>
.uni-popup__wrapper {
	background-color: unset !important;
}

.right-tool {
	display: flex;
	align-items: center;

	.btn {
		height: 44rpx;
		padding: 6rpx 16rpx;
		box-sizing: border-box;
		color: #FFF;
		font-size: 24rpx;
		border-radius: 12rpx;

		&+.btn {
			margin-left: 20rpx;
		}
	}

	.follow {
		background: var(--theme-auxiliary-color-remind);
	}

	.editor {
		background: var(--theme-color);
	}
}

.interaction-info {

	.van-col {
		width: fit-content;

		.num {
			color: #404040;
			font-size: 30rpx;
		}

		.label {
			margin-top: 10rpx;
			color: #404040;
			font-size: 24rpx;
		}

		&+.van-col {
			margin-left: 20rpx;
		}
	}

	.right {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.text {
			margin-left: 20rpx;
		}
	}
}
</style>

<style lang="scss" scoped>
::v-deep .header {
	grid-template-columns: repeat(3, 20% 60% 20%);

	.center {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
