<template>
	<view class="history-records" :style="{ height: `${uWindowHeight}px`  }" :class="['theme-' + themeColor.name]">
		<view class="nav">
			<Header :title="''">
				<block slot="center">
					<!-- <view class="nav-title">
						<view v-for="(item, index) in headerTab" :key="item.key"
							:class="{ 'nav-tabs-item': true, 'active': param.dataType === item.key, 'first': index == 0, 'last': index == headerTab.length - 1 }"
							@click="onChangeTab(item.key)">
							{{ item.value }}
						</view>
					</view> -->
					<u-subsection class="header-tab" :list="headerTab" :current="current" font-size="28"
						button-color="#fff" inactive-color="#404040" :active-color="themeColor.themeColor"
						@change="onChangeTab"></u-subsection>
				</block>
			</Header>
		</view>
		<view class="calendar-content" :style="{ height: `${uWindowHeight}px` , zIndex: 999 }" v-if="showCalendar">
			<time-picker :dayStatMap="dayStatMap" @closePay="back" @changeTime="changeTime" :line="'.'" :diff="15"
				:startTimes="startTime" :endTimes="endTime" rangeOutTips="最大15天数据查询"
				:rangeTodayBeforeDays="15"></time-picker>
		</view>
		<view class="record-content">
			<view class="record-tab" v-if="param.dataType === 1">
				<view :class="param.detailStatus === item.value ? 'record-tab-item selected' : 'record-tab-item'"
					@click="onSelectStatus(item.value)" v-for="(item, index) in recordTypes" :key="index">
					{{ item.label }}
					<view class="line"></view>
				</view>
			</view>
			<view class="record-tab" v-if="param.dataType === 2">
				<view :class="param.detailStatus === item.value ? 'record-tab-item selected' : 'record-tab-item'"
					@click="onSelectStatus(item.value)" v-for="(item, index) in numRecords" :key="index">
					{{ item.label }}
					<view class="line"></view>
				</view>
			</view>
			<view class="record-tab" v-if="param.dataType === 3">
				<view :class="param.detailStatus === item.value ? 'record-tab-item selected' : 'record-tab-item'"
					@click="onSelectStatus(item.value)" v-for="(item, index) in cancelRecords" :key="index">
					{{ item.label }}
					<view class="line"></view>
				</view>
			</view>

			<view class="date-box">
				<view class="pre" @click="setBefore">
					<view class="pre-item" v-show="isShowPre">
						<view class="text">
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18"
								fill="none">
								<rect x="0.5" y="18" width="18" height="18" rx="9" transform="rotate(-90 0.5 18)"
									:fill="themeColor.themeAuxiliaryColorDefault" />
								<path d="M11 13L7 9L11 5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
							<view class="te">{{$t("pages.liuhe.history.detail.index.text1")}}</view>
						</view>
						<view class="coin-box">

							{{$t("pages.liuhe.history.detail.index.text2")}}
							<text class="coin" :style="setFontColor(currentDetail.lastAmount)">
								{{ setAmount(currentDetail.lastAmount) }}
							</text>
						</view>
					</view>
				</view>
				<view class="time-item">
					<view class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
							<g clip-path="url(#clip0_17702_98016)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M9.5 1.5C9.5 0.670313 8.82969 0 8 0C7.17031 0 6.5 0.670313 6.5 1.5V3H4.25C3.00781 3 2 4.00781 2 5.25V7.5H23V5.25C23 4.00781 21.9922 3 20.75 3H18.5V1.5C18.5 0.670313 17.8297 0 17 0C16.1703 0 15.5 0.670313 15.5 1.5V3H9.5V1.5ZM23 9H2V21.75C2 22.9922 3.00781 24 4.25 24H20.75C21.9922 24 23 22.9922 23 21.75V9ZM8.16669 12.002C8.44283 12.002 8.66669 12.2258 8.66669 12.502V15.502C8.66669 15.7781 8.44283 16.002 8.16669 16.002H5.16669C4.89054 16.002 4.66669 15.7781 4.66669 15.502V12.502C4.66669 12.2258 4.89054 12.002 5.16669 12.002H8.16669ZM8.16675 17.3359C8.44289 17.3359 8.66675 17.5598 8.66675 17.8359V20.8359C8.66675 21.1121 8.44289 21.3359 8.16675 21.3359H5.16675C4.89061 21.3359 4.66675 21.1121 4.66675 20.8359V17.8359C4.66675 17.5598 4.89061 17.3359 5.16675 17.3359H8.16675ZM11.1667 12.002C10.8906 12.002 10.6667 12.2258 10.6667 12.502V15.502C10.6667 15.7781 10.8906 16.002 11.1667 16.002H14.1667C14.4429 16.002 14.6667 15.7781 14.6667 15.502V12.502C14.6667 12.2258 14.4429 12.002 14.1667 12.002H11.1667ZM14.1667 17.3359C14.4428 17.3359 14.6667 17.5598 14.6667 17.8359V20.8359C14.6667 21.1121 14.4428 21.3359 14.1667 21.3359H11.1667C10.8905 21.3359 10.6667 21.1121 10.6667 20.8359V17.8359C10.6667 17.5598 10.8905 17.3359 11.1667 17.3359H14.1667ZM17.1667 12.002C16.8906 12.002 16.6667 12.2258 16.6667 12.502V15.502C16.6667 15.7781 16.8906 16.002 17.1667 16.002H20.1667C20.4429 16.002 20.6667 15.7781 20.6667 15.502V12.502C20.6667 12.2258 20.4429 12.002 20.1667 12.002H17.1667ZM20.1667 17.3359C20.4429 17.3359 20.6667 17.5598 20.6667 17.8359V20.8359C20.6667 21.1121 20.4429 21.3359 20.1667 21.3359H17.1667C16.8906 21.3359 16.6667 21.1121 16.6667 20.8359V17.8359C16.6667 17.5598 16.8906 17.3359 17.1667 17.3359H20.1667Z"
									:fill="themeColor.themeColor" />
							</g>
							<defs>
								<clipPath id="clip0_17702_98016">
									<rect width="24" height="24" fill="white" transform="translate(0.5)" />
								</clipPath>
							</defs>
						</svg>
					</view>
					<view class="time" @click="toCalendar">
						<view class="time-text">{{ showTime }}</view>
						<view class="coin-text">
							{{$t("pages.liuhe.history.detail.index.text2")}}
							<text class="coin" :style="setFontColor(currentDetail.profitAmount)">
								{{ setAmount(currentDetail.profitAmount) }}
							</text>
						</view>

					</view>
				</view>
				<view class="next" @click="setAfter">
					<view class="next-item" v-show="isShowNext">
						<view class="text">
							<view class="te">{{$t("pages.liuhe.history.detail.index.text3")}}</view>
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18"
								fill="none">
								<rect x="18.5" width="18" height="18" rx="9" transform="rotate(90 18.5 0)"
									:fill="themeColor.themeAuxiliaryColorDefault" />
								<path d="M8 5L12 9L8 13" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</view>
						<view class="coin-box">
							{{$t("pages.liuhe.history.detail.index.text2")}}<text class="coin"
								:style="setFontColor(currentDetail.nextAmount)">
								{{ setAmount(currentDetail.nextAmount) }}
							</text>
						</view>
					</view>
				</view>
			</view>

			<view class="content-list-header">
				<view class="header-item" @click="onSelectFilter(0)">
					<view class="text">{{ lotteryTypeName }}</view>
					<svg :style="{
						transition: 'all .3s',
						transform: isShowType ? 'rotate(180deg)' : '',
					}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<rect width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
						<path
							d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
							fill="#A1A1A1" />
					</svg>
				</view>
				<view v-for="(item, index) in sortList" :key="index" class="header-item" @click="sortData(index)">
					<view class="text">{{ item.title }}</view>
					<!-- <view :class="['sort', { up: item.isUp, down: item.isDown }]"></view> -->
					<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
						<path
							d="M9.05293 15.2512C9.44633 15.66 10.1007 15.66 10.4941 15.2512L13.9176 11.6934C14.5289 11.0581 14.0786 10 13.197 10H6.35003C5.46837 10 5.01813 11.0581 5.62945 11.6934L9.05293 15.2512Z"
							:fill="item.isUp ? '#969897' : '#A1A1A1'" />
						<path
							d="M9.05293 2.74885C9.44633 2.34001 10.1007 2.34001 10.4941 2.74885L13.9176 6.30662C14.5289 6.94193 14.0786 8 13.197 8H6.35003C5.46837 8 5.01813 6.94193 5.62945 6.30662L9.05293 2.74885Z"
							:fill="item.isDown ? '#969897' : '#A1A1A1'" />
					</svg>
				</view>
			</view>
			<view class="lottery-type-box" :class="{ 'lottery-show': isShowType }" @click="onSelectFilter(0)">
				<view class="lottery-type">
					<view class="type-item" :class="{ active: currentType === item.id }"
						v-for="(item, index) in lotteryType" :key="index" @click.stop="onSelectType(item.id)">{{ item.name
						}}
					</view>
				</view>
			</view>
			<view class="list-content">
				<z-paging :style="{height: `calc(${uWindowHeight}px - 410rpx - 70rpx)`}" ref="paging"
					v-model="recordList" @query="loadingList" :class="isExpand ? 'content-list active' : 'content-list'"
					v-show="recordList.length > 0" :lower-threshold="10" :refresher-enabled="true"
					:refresherAnimated="false" :show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
					:refresher-default-text="zpageUIConfig['refresher-default-text']"
					:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
					:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
					:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
					:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']"
					:refresher-default-style="themeColor.themeAuxiliaryColorDefault"
					:refresher-img-style="zpageUIConfig['refresher-img-style']"
					:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
					:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
					:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
					:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': themeColor.themeAuxiliaryColorDefault,'padding-bottom':'20rpx' }"
					:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
					:show-loading-more-no-more-view="true"
					:loading-more-no-more-text="$t('pages.liuhe.history.detail.index.text4')" :hide-empty-view="false"
					:empty-view-center="true" :empty-view-text="$t('pages.liuhe.history.detail.index.text5')"
					:empty-view-img="'@/static/img/empty.png'" :fixed="false"
					:empty-view-style="{ 'margin-bottom': '170px' }"
					:empty-view-img-style="{ 'width': '260rpx', 'height': '260rpx' }"
					:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
					<view :class="index % 2 === 0 ? 'content-list-item item' : 'content-list-item'"
						v-for="(item, index) in recordList" :key="index" @click="detail(item)">
						<svg v-if="item.shortCreateTimeStr === '刚刚'"
							style="position: absolute;left: 0; right: 0; top: 0;" xmlns="http://www.w3.org/2000/svg"
							width="27" height="14" viewBox="0 0 27 14" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M0 12.65C0 11.1175 0 10.3513 0.076247 9.70709C0.674037 4.65639 4.65639 0.674037 9.70709 0.076247C10.3513 0 11.1175 0 12.65 0H27C20.934 0 18.1414 3.6469 16.9267 8.86778C16.6936 9.86938 16.5771 10.3702 16.5029 10.5874C15.8569 12.4778 14.6363 13.4471 12.6487 13.6478C12.4203 13.6709 12.0722 13.6709 11.376 13.6709H0V12.65Z"
								fill="url(#paint0_linear_17702_96658)" />
							<path
								d="M9.096 8.348H7.744V10.18C7.744 10.388 7.71733 10.548 7.664 10.66C7.616 10.772 7.528 10.8493 7.4 10.892C7.272 10.94 7.088 10.964 6.848 10.964H6.352L6.216 10.252H6.648C6.792 10.252 6.89067 10.244 6.944 10.228C6.99733 10.2067 7.02933 10.172 7.04 10.124C7.056 10.076 7.064 9.98533 7.064 9.852V8.348H5.6V7.676H7.064V6.932H5.448V6.276H6.4L6.144 5.124H5.672V4.476H7.048C6.936 4.14 6.86133 3.908 6.824 3.78L7.568 3.652C7.664 3.92933 7.752 4.204 7.832 4.476H9.056V5.124H8.648C8.52533 5.62 8.424 6.004 8.344 6.276H9.216V6.932H7.744V7.676H9.096V8.348ZM12.568 6.428V7.148H11.776V10.996H11.08V7.148H10.232C10.232 7.82 10.208 8.37467 10.16 8.812C10.1173 9.244 10.0373 9.63333 9.92 9.98C9.80267 10.3213 9.63467 10.684 9.416 11.068L8.68 10.708C8.90933 10.3613 9.08 10.028 9.192 9.708C9.30933 9.388 9.38933 9.02267 9.432 8.612C9.47467 8.20133 9.496 7.65733 9.496 6.98V4.476C9.97067 4.43333 10.4533 4.36133 10.944 4.26C11.4347 4.15333 11.848 4.036 12.184 3.908L12.416 4.62C12.1387 4.732 11.8 4.836 11.4 4.932C11 5.028 10.6107 5.1 10.232 5.148V6.428H12.568ZM6.776 5.124L6.848 5.42C6.93867 5.77733 7.00533 6.06267 7.048 6.276H7.68C7.76 6.02533 7.864 5.64133 7.992 5.124H6.776ZM6.736 8.796C6.496 9.43067 6.224 9.99333 5.92 10.484L5.376 10.148C5.52533 9.92933 5.65867 9.69467 5.776 9.444C5.89867 9.19333 6.024 8.89733 6.152 8.556L6.736 8.796ZM8.392 8.564C8.52 8.73467 8.73333 9.036 9.032 9.468L9.144 9.628L8.632 10.012C8.48267 9.76667 8.24 9.40133 7.904 8.916L8.392 8.564Z"
								fill="white" />
							<defs>
								<linearGradient id="paint0_linear_17702_96658" x1="0" y1="13.6709" x2="28" y2="13.6709"
									gradientUnits="userSpaceOnUse">
									<stop stop-color="#10BA0D" />
									<stop offset="1" stop-color="#80FF00" />
								</linearGradient>
							</defs>
						</svg>
						<view class="item-card all">
							<view class="name">{{ item.lotteryName }}</view>
							<view class="num">{{ item.lotteryNo }}</view>
						</view>
						<view class="item-card betting">
							<view class="play-name">{{ item.secondPlayName }}@{{ item.betValue }}</view>
							<view class="amount">{{ setAmount(item.betAmount * item.baseAmount * item.betNum) }}</view>
						</view>
						<view class="item-card un-open">
							<view class="status" :style="setStyle(item.status)">{{ item.statusName }}</view>
							<view class="win" :style="setStyle(item.status)">{{ showPrice(item) }}</view>
						</view>
						<view class="item-card time-m">
							<view class="date">{{ item.otherCreateTime }}</view>
							<view class="current">{{ item.shortCreateTimeStr }}</view>
						</view>
					</view>
				</z-paging>

				<view v-if="loading && recordList.length < 1" class="loading">
					<image src="@/static/img/loading_v1.gif" style="width:100rpx;height:65rpx;"></image>

					<!-- <image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image> -->
					<view :style="pageLoadingConfig['text_style']">
						{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}
					</view>
				</view>

				<view class="list-empty" v-else-if="!loading && recordList.length == 0">
					<image src="@/static/imgs-liuhe/activity/empty.png"></image>
					<view class="text">{{ $t('pages.luntan.masterForum.noData') }}</view>
				</view>
				<view class="bottom-box" :style="currentStyle">
					<view class="bottom-info" :style="{...currentStyle}" v-if="param.dataType === 1">
						<view class="left">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none">
								<g clip-path="url(#clip0_17702_96762)">
									<path
										d="M10.9999 11.9999V12.9999H11.9999H22.8936C22.661 15.5345 21.5497 17.9208 19.7353 19.7353C17.6837 21.7868 14.9012 22.9393 11.9999 22.9393C9.09863 22.9393 6.31615 21.7868 4.26462 19.7353C2.21309 17.6837 1.06055 14.9012 1.06055 11.9999C1.06055 9.09863 2.21309 6.31616 4.26462 4.26462C6.07911 2.45013 8.46538 1.33889 10.9999 1.10632V11.9999Z"
										:stroke="themeColor.themeColor" stroke-width="2" stroke-miterlimit="10" />
									<path
										d="M14.0312 0.0605469V9.96843H23.9391C23.9393 8.66726 23.6831 7.37881 23.1853 6.17666C22.6874 4.9745 21.9576 3.88221 21.0375 2.96214C20.1175 2.04208 19.0252 1.31228 17.823 0.814415C16.6209 0.316554 15.3324 0.0603877 14.0312 0.0605469Z"
										:fill="themeColor.themeColor" />
								</g>
								<defs>
									<clipPath id="clip0_17702_96762">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<view>

								{{$t('pages.liuhe.history.detail.index.text6')}}
							</view>
						</view>
						<view class="mid">
							<view class="line">

								{{$t('pages.liuhe.history.detail.index.text7')}}<text
									:style="'color:#DF2939'">{{ $store.state.appInfoStore.userInfo.userBalance || 0 }}</text>
							</view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text8')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.betAmount) }}</text>
							</view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text9')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.effectiveAmount) }}</text>
							</view>
							<view style="height: var(--safe-area-inset-bottom);" v-if="isApp&&!isExpand"></view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text10')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.unOpenAmount) }}</text>
							</view>
						</view>
						<view class="right">
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text11')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.winAmount) }}</text>
							</view>
							<view class="line" v-if="currentDetail.profitAmount < 0">
								{{$t('pages.liuhe.history.detail.index.text12')}}<text :style="'color:#9ACD32'">{{
								setAmount(currentDetail.profitAmount) }}</text>
							</view>
							<view class="line" v-else>{{$t('pages.liuhe.history.detail.index.text12')}}<text
									:style="'color:#DF2939'">{{
								setAmount(currentDetail.profitAmount)
							}}</text></view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text13')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.rebateAmount) }}</text>
							</view>
							<view style="height: var(--safe-area-inset-bottom);" v-if="isApp&&!isExpand"></view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text14')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.cancelAmount) }}</text>
							</view>
						</view>
						<view class="expand-arrow" @click="setMore">
							<svg :class="{ show: isExpand }" xmlns="http://www.w3.org/2000/svg" width="25" height="24"
								viewBox="0 0 25 24" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M24.5607 11.5534C25.1464 12.1392 25.1464 13.0889 24.5607 13.6747C23.9749 14.2605 23.0251 14.2605 22.4393 13.6747L12.8859 4.12132L3.33255 13.6747C2.74676 14.2605 1.79701 14.2605 1.21123 13.6747C0.625439 13.0889 0.625439 12.1392 1.21123 11.5534L11.8253 0.939339C12.4111 0.353554 13.3608 0.353554 13.9466 0.939339L24.5607 11.5534ZM22.2862 20.2722C22.872 20.858 22.872 21.8078 22.2862 22.3936C21.7004 22.9794 20.7506 22.9794 20.1649 22.3936L13.265 15.4937L6.36509 22.3936C5.7793 22.9794 4.82955 22.9794 4.24376 22.3936C3.65798 21.8078 3.65798 20.858 4.24376 20.2722L12.2043 12.3117C12.7901 11.7259 13.7398 11.7259 14.3256 12.3117L22.2862 20.2722Z"
									fill="#A1A1A1" />
							</svg>
						</view>
					</view>
					<view class="bottom-info" :style="{...currentStyle}" v-else-if="param.dataType === 2">
						<view class="left">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none">
								<g clip-path="url(#clip0_17702_96762)">
									<path
										d="M10.9999 11.9999V12.9999H11.9999H22.8936C22.661 15.5345 21.5497 17.9208 19.7353 19.7353C17.6837 21.7868 14.9012 22.9393 11.9999 22.9393C9.09863 22.9393 6.31615 21.7868 4.26462 19.7353C2.21309 17.6837 1.06055 14.9012 1.06055 11.9999C1.06055 9.09863 2.21309 6.31616 4.26462 4.26462C6.07911 2.45013 8.46538 1.33889 10.9999 1.10632V11.9999Z"
										:stroke="themeColor.themeColor" stroke-width="2" stroke-miterlimit="10" />
									<path
										d="M14.0312 0.0605469V9.96843H23.9391C23.9393 8.66726 23.6831 7.37881 23.1853 6.17666C22.6874 4.9745 21.9576 3.88221 21.0375 2.96214C20.1175 2.04208 19.0252 1.31228 17.823 0.814415C16.6209 0.316554 15.3324 0.0603877 14.0312 0.0605469Z"
										:fill="themeColor.themeColor" />
								</g>
								<defs>
									<clipPath id="clip0_17702_96762">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<view>
								{{$t('pages.liuhe.history.detail.index.text6')}}
							</view>
						</view>
						<view class="mid">
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text7')}}<text
									:style="'color:#DF2939'">{{ $store.state.appInfoStore.userInfo.userBalance || 0 }}</text>
							</view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text8')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.betAmount) }}</text>
							</view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text9')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.effectiveAmount) }}</text>
							</view>
							<view style="height: var(--safe-area-inset-bottom);" v-if="isApp&&!isExpand"></view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text10')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.unOpenAmount) }}</text>
							</view>
						</view>
						<view class="right">
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text11')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.winAmount) }}</text>
							</view>
							<view class="line" v-if="currentDetail.profitAmount < 0">
								{{$t('pages.liuhe.history.detail.index.text12')}}<text :style="'color:#9ACD32'">{{
								setAmount(currentDetail.profitAmount) }}</text>
							</view>
							<view class="line" v-else>{{$t('pages.liuhe.history.detail.index.text12')}}<text
									:style="'color:#DF2939'">{{
								setAmount(currentDetail.profitAmount)
							}}</text></view>
							<view style="height: var(--safe-area-inset-bottom);" v-if="isApp&&!isExpand"></view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text13')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.rebateAmount) }}</text>
							</view>
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text14')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.cancelAmount) }}</text>
							</view>
						</view>
						<view class="expand-arrow" @click="setMore">
							<svg :class="{ show: isExpand }" xmlns="http://www.w3.org/2000/svg" width="25" height="24"
								viewBox="0 0 25 24" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M24.5607 11.5534C25.1464 12.1392 25.1464 13.0889 24.5607 13.6747C23.9749 14.2605 23.0251 14.2605 22.4393 13.6747L12.8859 4.12132L3.33255 13.6747C2.74676 14.2605 1.79701 14.2605 1.21123 13.6747C0.625439 13.0889 0.625439 12.1392 1.21123 11.5534L11.8253 0.939339C12.4111 0.353554 13.3608 0.353554 13.9466 0.939339L24.5607 11.5534ZM22.2862 20.2722C22.872 20.858 22.872 21.8078 22.2862 22.3936C21.7004 22.9794 20.7506 22.9794 20.1649 22.3936L13.265 15.4937L6.36509 22.3936C5.7793 22.9794 4.82955 22.9794 4.24376 22.3936C3.65798 21.8078 3.65798 20.858 4.24376 20.2722L12.2043 12.3117C12.7901 11.7259 13.7398 11.7259 14.3256 12.3117L22.2862 20.2722Z"
									fill="#A1A1A1" />
							</svg>
						</view>
					</view>
					<view class="bottom-info-2" :style="{...currentStyle}" v-else>
						<view class="left">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none">
								<g clip-path="url(#clip0_17702_96762)">
									<path
										d="M10.9999 11.9999V12.9999H11.9999H22.8936C22.661 15.5345 21.5497 17.9208 19.7353 19.7353C17.6837 21.7868 14.9012 22.9393 11.9999 22.9393C9.09863 22.9393 6.31615 21.7868 4.26462 19.7353C2.21309 17.6837 1.06055 14.9012 1.06055 11.9999C1.06055 9.09863 2.21309 6.31616 4.26462 4.26462C6.07911 2.45013 8.46538 1.33889 10.9999 1.10632V11.9999Z"
										:stroke="themeColor.themeColor" stroke-width="2" stroke-miterlimit="10" />
									<path
										d="M14.0312 0.0605469V9.96843H23.9391C23.9393 8.66726 23.6831 7.37881 23.1853 6.17666C22.6874 4.9745 21.9576 3.88221 21.0375 2.96214C20.1175 2.04208 19.0252 1.31228 17.823 0.814415C16.6209 0.316554 15.3324 0.0603877 14.0312 0.0605469Z"
										:fill="themeColor.themeColor" />
								</g>
								<defs>
									<clipPath id="clip0_17702_96762">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<view>

								{{$t('pages.liuhe.history.detail.index.text6')}}
							</view>
						</view>
						<view class="mid">
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text7')}}<text
									:style="'color:#DF2939'">{{ $store.state.appInfoStore.userInfo.userBalance || 0 }}</text>
							</view>
						</view>
						<view class="right">
							<view class="line">
								{{$t('pages.liuhe.history.detail.index.text14')}}<text
									:style="'color:#DF2939'">{{ setAmount(currentDetail.cancelAmount) }}</text>
							</view>
						</view>
					</view>

				</view>
			</view>

		</view>
		<AlertInjectLayer />
	</view>
</template>
<script>
	import Header from '@/components/common/header/index.vue';
	import {
		getLotteryList,
		list
	} from "@/utils/lottery/betting";
	import Playing from "@/utils/common/playing";
	import TimePicker from "@/components/common/time-picker";
	import {
		getTime
	} from "@/utils/function"
	import defaultTemplate from "@/utils/defaultTemplate";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		components: {
			Header,
			AlertInjectLayer,
			TimePicker
		},
		data() {
			return {
				playing: new Playing(),
				isExpand: false,
				sortText: 'default',
				isSort: false,
				sortList: [{
					title: this.$t("pages.liuhe.history.detail.index.text15"),
					isUp: false,
					isDown: false,
				}, {
					title: this.$t("pages.liuhe.history.detail.index.text16"),
					isUp: false,
					isDown: false,
				}, {
					title: this.$t("pages.liuhe.history.detail.index.text17"),
					isUp: false,
					isDown: false,
				}],
				showCalendar: false,
				// contentText: { contentdown: "上拉加载更多", contentrefresh: "正在加载...", contentnomore: "没有更多数据了" },
				loadStatus: "more",
				headerStyle: {
					backgroundColor: '#1794FF',
					color: '#fff',
					height: 47
				},
				current: 0,
				navWidth: {
					left: 50,
					right: 50
				},
				currentStyle: {
					height: `calc(120rpx + var(--safe-area-inset-bottom) + ${isApp?'var(--safe-area-inset-bottom)':'0rpx'})`,
					paddingBottom: 'var(--safe-area-inset-bottom)',
					transition: '.3s'
				},
				headerTab: [{
						key: 1,
						name: this.$t("pages.liuhe.history.detail.index.text18"),
						short: this.$t("pages.liuhe.history.detail.index.text19"),
					},
					// {
					//   key: 2,
					//   name: '追号记录',
					//   short: '追号',
					// },
					{
						key: 3,
						name: this.$t("pages.liuhe.history.detail.index.text20"),
						short: this.$t("pages.liuhe.history.detail.index.text21"),
					},
				],
				cancelRecords: [{
						label: this.$t("pages.liuhe.history.detail.index.text22"),
						value: null
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text23"),
						value: 1
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text24"),
						value: 2
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text25"),
						value: 3
					}
				],
				numRecords: [{
						label: this.$t("pages.liuhe.history.detail.index.text26"),
						value: null
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text27"),
						value: 0
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text28"),
						value: 1
					}
				],
				recordTypes: [{
						label: this.$t("pages.liuhe.history.detail.index.text29"),
						value: null
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text30"),
						value: 0
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text31"),
						value: 2
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text32"),
						value: 1
					},
					{
						label: this.$t("pages.liuhe.history.detail.index.text33"),
						value: 3
					},
				],
				lotteryType: [],
				currentType: 0,
				isShowType: false,
				recordList: [],
				current: 0,
				param: {
					type: 1,
					date: '',
					detailStatus: null,
					dataType: 1,
					lotteryId: "",
					pageNo: 1,
					pageSize: 15,
					status: null,
					sort: ""
				},
				dateObj: {
					date: null,
					text: ""
				},
				start: '',
				end: '',
				startTime: '',
				endTime: '',
				dayStatMap: null,
				currentDetail: {
					profitAmount: '',
				},
				recordImg: require('@/static/img/liuhe/record.png'),
				loading: false,
				isApp: false
			}
		},
		onShow() {

		},
		onLoad(option) {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			if (option.startTime && option.endTime) {
				//IOS 用 20xx.xx.xx 格式进行new Date处理 会返回invite Date。 注意
				option.startTime = option.startTime.replace(/\./g, '/');
				option.endTime = option.endTime.replace(/\./g, '/');

				const daysDiff = Math.ceil(Math.abs(new Date().getTime() - new Date(option.startTime).getTime()) / (1000 *
					3600 * 24)) - 1;
				let date = new Date();
				this.today = getTime(date)
				this.startTime = daysDiff <= 15 ? option.startTime : this.getDay(-15)
				this.endTime = option.endTime
				this.start = this.getDay(-15)
				this.end = this.today
				if (this.start == this.end) {
					this.param.type = 1
				} else {
					this.param.type = 5
				}
			} else {
				let date = new Date();
				this.today = getTime(date)
				this.startTime = this.today
				this.endTime = this.today
				this.start = this.getDay(-15)
				this.end = this.today
			}
			this.loadLotteryList()
			this.$store.dispatch("updateUserBalanceFromServer")
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight"]),
			lotteryTypeName() {
				return this.lotteryType.find(item => item.id === this.currentType)?.name
			},
			emptyDateText() {
				const {
					startTime,
					endTime
				} = this
				if (!startTime && !endTime) {
					return
				}
				if (startTime === endTime) {
					return this.$u.timeFormat(startTime, 'yyyy年mm月dd日')
				}
				return this.$u.timeFormat(startTime, 'yyyy年mm月dd日') + '至' + this.$u.timeFormat(endTime, 'yyyy年mm月dd日')
			},
			showTime() {
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let startTime = getTime(start, '.', 2, 'date')
				let endTime = getTime(end, '.', 2, 'date')
				if (startTime == endTime) {
					startTime.indexOf(".") != -1 && (startTime = startTime.replace(/\./g, "/"));
					return this.$u.timeFormat(new Date(startTime), 'yyyy年mm月dd日'); //;
				} else {
					startTime.indexOf(".") != -1 && (startTime = startTime.replace(/\./g, "/"));
					endTime.indexOf(".") != -1 && (endTime = endTime.replace(/\./g, "/"));
					return this.$u.timeFormat(new Date(startTime), 'yyyy年mm.dd') + "-" + this.$u.timeFormat(new Date(
						endTime), 'mm.dd')
				}
			},
			isShowPre() {
				let startTime = new Date(this.startTime.replace(/\./g, '/'))
				let start = new Date(this.start.replace(/\./g, '/'))
				let startStr = new Date(this.startTime)
				startStr = this.formatDate(startStr.setDate(startStr.getDate()), '-')
				if (startStr == this.start) {
					return false
				} else if (startTime <= start) {
					return false
				} else {
					return true
				}
			},
			isShowNext() {
				let endTime = new Date(this.endTime.replace(/\./g, '/'))
				let end = new Date(this.end.replace(/\./g, '/'))

				let endStr = new Date(this.endTime)
				endStr = this.formatDate(endStr.setDate(endStr.getDate()), '-')
				if (endStr == this.end) {
					return false
				} else if (endTime >= end) {
					return false
				} else {
					return true
				}
			},
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {

			detail(item) {
				uni.navigateTo({
					url: '/pages/liuhe/bet_details',
					success: function(res) {
						res.eventChannel.emit('argParams', item)
					}
				})
			},
			showPrice(item) {
				if (item.status === 1) {
					return '-' + this.setAmount(item.betAmount * item.betNum)
				} else if (item.status === 2) {
					return this.setAmount(item.winAmount)
				} else {
					return "--"
				}
			},
			toCalendar() {
				this.showCalendar = true;
			},
			back() {
				this.showCalendar = false;
			},
			sortData(key) {
				this.recordList = [];
				this.isSort = !this.isSort;

				switch (key) {
					case 0:
						this.sortList[1].isDown = false;
						this.sortList[1].isUp = false;
						this.sortList[2].isDown = false;
						this.sortList[2].isUp = false;
						if (this.isSort) {
							this.sortList[key].isDown = true;
							this.sortList[key].isUp = false;
						} else {
							this.sortList[key].isUp = true
							this.sortList[key].isDown = false;
						}
						if (this.sortList[key].isDown) {
							this.param.sort = 1;
						} else {
							this.param.sort = 2;
						}
						break;
					case 1:
						this.sortList[0].isDown = false;
						this.sortList[0].isUp = false;
						this.sortList[2].isDown = false;
						this.sortList[2].isUp = false;
						if (this.isSort) {
							this.sortList[key].isDown = true;
							this.sortList[key].isUp = false;
						} else {
							this.sortList[key].isUp = true
							this.sortList[key].isDown = false;
						}
						if (this.sortList[key].isDown) {
							this.param.sort = 3;
						} else {
							this.param.sort = 4;
						}
						break;
					case 2:
						this.sortList[0].isDown = false;
						this.sortList[0].isUp = false;
						this.sortList[1].isDown = false;
						this.sortList[1].isUp = false;
						if (this.isSort) {
							this.sortList[key].isDown = true;
							this.sortList[key].isUp = false;
						} else {
							this.sortList[key].isUp = true
							this.sortList[key].isDown = false;
						}
						if (this.sortList[key].isDown) {
							this.param.sort = 5;
						} else {
							this.param.sort = 6;
						}
						break;
				}
				this.$refs.paging.reload()
			},
			changeTime(obj) {
				if (obj.start == obj.end) {
					this.param.type = 1
				} else {
					this.param.type = 5
				}
				this.startTime = obj.start
				this.endTime = obj.end
				this.$refs.paging.reload()
			},
			setMore() {
				this.isExpand = !this.isExpand;
				if (this.isExpand) {
					this.currentStyle.height = 'auto'
				} else {
					this.currentStyle.height =
						`calc(120rpx + var(--safe-area-inset-bottom) + ${isApp?'var(--safe-area-inset-bottom)':'0rpx'})`
				}
			},
			setFontColor(num) {
				if (num === 0) {
					return {
						color: "#404040"
					}
				} else if (num > 0) {
					return {
						color: "#DF2939"
					}
				} else {
					return {
						color: this.themeColor.themeColor
					}
				}
			},
			getDay(day) {
				var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds);

				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				return tYear + "." + tMonth + "." + tDate;
			},
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},
			getDate() {
				let dateTime = new Date();
				this.dateObj.date = dateTime;
				this.dateObj.text = this.formatDate(dateTime, '.');
				this.startTime = this.formatDate(dateTime, '-');
				this.endTime = this.startTime
				this.getEmptyDateText(this.formatDate(dateTime, '-'));
				this.start = this.getDay(-30)
				this.end = this.endTime
			},
			formatDate(date, cut, h) {
				let myDate = new Date(date);
				let YY = myDate.getFullYear() + cut;
				let MM =
					(myDate.getMonth() + 1 < 10 ?
						"0" + (myDate.getMonth() + 1) :
						myDate.getMonth() + 1) + cut;
				let DD = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
				if (h) {
					let hh =
						(myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()) + ":";
					let mm =
						(myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes()) +
						":";
					let ss =
						myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
					return YY + MM + DD + " " + hh + mm + ss;

				} else {
					return YY + MM + DD;
				}


			},
			getEmptyDateText(dateText) {
				let reg = /(\d{4})\-(\d{2})\-(\d{2})/;
				this.emptyDateText = dateText.replace(reg, "$1年$2月$3日");
			},
			setBefore() {
				if (!this.isShowPre) return
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let date = start.getTime() - 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.endTime = getTime(date)
				}
				this.startTime = getTime(date)
				this.$refs.paging.reload()
			},
			setAfter() {
				if (!this.isShowNext) return
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let date = end.getTime() + 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.startTime = getTime(date)
				}
				this.endTime = getTime(date)
				this.$refs.paging.reload()
			},
			setAmount(num) {
				return this.playing.setAmount(num, 2, '.', ',', 'ceil', true)
			},
			setStyle(status) {
				switch (status) {
					case 0:
						return {
							color: '#A1A1A1'
						}
					case 1:
						return {
							color: this.themeColor.themeColor
						}
					case 2:
						return {
							color: '#DF2939'
						}
					case 3:
						return {
							color: this.themeColor.themeAuxiliaryColorRemind
						}
					case 4:
						return {
							color: '#6BB3CE'
						}
					case 5:
						return {
							color: '#d43658'
						}
					case 6:
						return {
							color: '#d43658'
						}
					case 7:
						return {
							color: '#6b853f'
						}
					case 8:
						return {
							color: '#43AFD8'
						}
					case 9:
						return {
							color: '#AAAAAA'
						}
					case 11:
						return {
							color: '#fef5a5'
						}
				}
			},
			onChangeTab(index) {
				this.param.dataType = this.headerTab[index].key;
				this.$refs.paging.reload()
			},
			onSelectStatus(val) {
				this.param.detailStatus = val;
				this.$refs.paging.reload()
			},
			loadingList(pageNo, pageSize = 15) {
				this.loading = true
				this.param.pageNo = pageNo
				this.param.pageSize = 15
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let end = new Date(this.endTime.replace(/\./g, '/'))
				if (this.param.type == 1) {
					this.param.date = this.formatDate(start, '-');
				} else {
					this.param.date = this.formatDate(start, '-');
					this.param.endDate = this.formatDate(end, '-');
					this.param.startDate = this.formatDate(start, '-');
				}
				if (!this.param.lotteryId) {
					delete this.param.lotteryId
				}
				list(this.param).then(res => {
					if (res.code === 200) {
						const result = defaultTemplate({
							page: {
								pageIndex: 1,
								pageSize: 15,
								pages: 0,
								records: [],
								total: 0
							},
							dayStatMap: {},
							betAmount: 0,
							winAmount: 0,
							profitAmount: 0,
							effectiveAmount: 0,
							rebateAmount: 0,
							unOpenAmount: 0,
							unWinAmount: 0,
							cancelAmount: 0,
							lastAmount: 0,
							nextAmount: 0
						}, res.result)
						this.currentDetail = result;
						this.dayStatMap = result.dayStatMap
						this.recordList = this.recordList.concat(result.page.records);
						this.$refs.paging.complete(result.page.records);

					} else {
						pop(res.message)
					}
					this.loading = false
				})
			},
			scrollToLower() {
				if (this.loadStatus === 'noMore') {
					return
				}
				this.param.pageNo += 1;
				this.loadStatus = 'loading';
				this.loadingList();
			},
			//获取彩种列表
			loadLotteryList() {
				getLotteryList().then(res => {
					if (res.code === 200) {
						let obj = {
							name: "全部",
							id: 0
						}
						res.result.unshift(obj);
						this.lotteryType = res.result
					}
				})
			},
			onSelectFilter(index) {
				switch (index) {
					case 0:
						this.isShowType = !this.isShowType
						break;
				}
			},
			onSelectType(id) {
				this.recordList = [];
				this.isShowType = false;
				this.currentType = id;
				this.param.lotteryId = id;
				this.$refs.paging.reload()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.history-records {
		display: flex;
		position: relative;
		flex-direction: column;
		overflow: hidden;
		box-sizing: border-box;
		background: var(--theme-auxiliary-color-default);

		.nav {
			height: fit-content;

			::v-deep .header {
				grid-template-columns: repeat(3, 20% 60% 20%);

				.u-item-bg {
					border-radius: 12rpx !important;
					height: 56rpx !important;
				}
			}

			.header-tab {
				width: 316rpx;
				height: 68rpx !important;
				box-sizing: border-box;
				margin: 0 auto;
				border-radius: 16rpx !important;
			}
		}

		.calendar-content {
			width: 100%;
			position: absolute;
			background: #FFFFFF;
			z-index: 11;
		}

		.calendar-content.active {
			right: 0;
			transition: all .3s linear;
		}

		.nav-title {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 56rpx;
			padding: 10rpx 4rpx;
			box-sizing: border-box;
			border-radius: 16rpx;
			/*background: var(--theme-auxiliary-color-default);*/

			.nav-tabs-item {
				color: #404040;
				font-size: 28rpx;
				transition: .3s;
				padding: 7rpx 20rpx;
				white-space: nowrap;
				background: var(--theme-auxiliary-color-default);
			}

			.first {
				/*border-top-left-radius: ;*/
				border-top-left-radius: 12rpx;
				border-bottom-left-radius: 12rpx;
			}

			.last {
				border-top-right-radius: 12rpx;
				border-bottom-right-radius: 12rpx;
			}

			.nav-tabs-item.active {
				background-color: var(--theme-color);
				border-radius: 12rpx;
				color: #fff;
			}
		}

		.record-content {
			position: relative;
			height: 100%;
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;

			.record-tab {
				height: 88rpx;
				padding: 0 40rpx;
				background-color: #fff;
				border-radius: 24rpx 24rpx 0 0;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.record-tab-item {
					font-size: 30rpx;
					line-height: 60rpx;
					color: #404040;
					transition: .3s;
					width: 120rpx;
					text-align: center;
				}

				.record-tab-item.selected {
					transition: .3s;
					color: var(--theme-color);
					position: relative;

					.line {
						position: absolute;
						bottom: -8rpx;
						left: 50%;
						transform: translateX(-50%);
						width: 28rpx;
						height: 4rpx;
						border-radius: 3px 3px 0px 0px;
						background-color: var(--theme-color);
						transition: .3s;
					}
				}
			}


			.date-box {
				display: flex;
				background: #fff;
				padding: 0 24rpx;
				border-top: 1px solid var(--theme-auxiliary-color-default);
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				.pre,
				.next {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 184rpx;
					height: 116rpx;
					font-weight: 400;
					font-size: 28rpx;
					color: #404040;

					.pre-item,
					.next-item {
						display: flex;
						align-items: center;
						flex-direction: column;

						.text {
							display: flex;
							align-items: center;
						}

						.te {
							margin: 0 20rpx;
							white-space: nowrap;
						}

						.coin-box {
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
							margin-top: 10rpx;
							white-space: nowrap;
						}

						.coin {
							display: inline-block;
							font-size: 24rpx;
							max-width: 50%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.green {
							color: var(--theme-color);
						}

						.red {
							color: var(--theme-auxiliary-color-remind);
						}
					}
				}

				.pre {
					.pre-item {
						align-items: flex-start;
					}
				}

				.next {
					.pre-item {
						align-items: flex-end;
					}
				}

				.time-item {
					width: 378rpx;
					background: var(--theme-color-bg);
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 20rpx;

					.icon {
						width: 48rpx;
						height: 48rpx;
						margin-right: 20rpx;
					}

					.time {
						text-align: center;
						font-weight: 400;
						text-align: center;
						color: #404040;

						.time-text {
							font-size: 28rpx;
						}

						.coin-text {
							font-size: 24rpx;

							.green {
								color: var(--theme-color);
							}

							.red {
								color: var(--theme-auxiliary-color-remind);
							}
						}
					}
				}
			}

			.content-list-header {
				display: flex;
				justify-content: space-between;
				padding: 0 28rpx;
				background-color: #FFFFFF;
				height: 76rpx;
				border-bottom: 1rpx solid var(--theme-auxiliary-color-default);

				.header-item {
					color: #404040;
					font-size: 26rpx;
					display: flex;
					align-items: center;

					.text {
						margin-right: 10rpx;
					}

					.all {
						width: 30rpx;
						height: 30rpx;
						background-repeat: no-repeat;
						background-image: url("@/static/img/liuhe/Ellipse.png");
						background-size: 100% 100%;
						margin-left: 4rpx;
					}

					.all.show {
						transform: rotate(-180deg);
					}

					.sort {
						width: 17rpx;
						height: 17rpx;
						background-repeat: no-repeat;
						background-image: url("@/static/img/liuhe/sort.png");
						background-size: 100% 100%;
						margin-left: 4rpx;

						&.down {
							width: 17rpx;
							height: 17rpx;
							background-repeat: no-repeat;
							background-image: url("@/static/img/liuhe/sort-down.png");
							background-size: 100% 100%;
							margin-left: 4rpx;
						}

						&.up {
							width: 17rpx;
							height: 17rpx;
							background-repeat: no-repeat;
							background-image: url("@/static/img/liuhe/sort-down.png");
							background-size: 100% 100%;
							margin-left: 4rpx;
							transform: rotate(-180deg);
						}
					}
				}
			}

			.lottery-type-box {
				width: 100%;
				height: 0;
				overflow: hidden;
				background: rgba(0, 0, 0, 0.30);
				position: absolute;
				z-index: 99;
				top: 250rpx;
				transition: all .3s linear;
			}

			.lottery-show {
				height: 100%;
			}

			.lottery-type {
				padding: 15rpx;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 20rpx 28rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 0 0 24rpx 24rpx;

				.type-item {
					font-size: 26rpx;
					height: 48rpx;
					box-sizing: border-box;
					border-radius: 60rpx;
					color: #404040;
					display: grid;
					place-content: center;
					background: var(--theme-auxiliary-color-default);
				}

				.active {
					background: var(--theme-color);
					color: #FFFFFF;
				}
			}

			.list-empty {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100%;

				image {
					width: 398rpx;
					height: 398rpx;
				}

				.text {
					font-size: 26rpx;
					color: #aaaaaa;
					text-align: center;
				}

				.list-empty-content {
					text-align: center;


					.empty-msg {
						font-weight: 400;
						font-size: 30rpx;
						line-height: 40rpx;
						/* identical to box height, or 133% */
						text-align: center;
						color: #999999;
						margin-bottom: 15rpx;
					}

					.empty-tip {
						font-weight: 400;
						font-size: 24rpx;
						line-height: 34rpx;
						/* identical to box height */
						text-align: center;
						color: #999999;
					}
				}
			}

			.bottom-info {
				width: 100%;
				max-width: 480px;
				background-color: var(--theme-color-bg);
				display: flex;
				padding: 20rpx 28rpx;
				box-sizing: border-box;
				border-top-left-radius: 24rpx;
				border-top-right-radius: 24rpx;

				.line {
					font-size: 26rpx;
					margin-bottom: 20rpx;
					color: #404040;
				}

				.left {
					font-size: 25rpx;
					width: 60rpx;
					margin-right: 40rpx;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.mid {
					font-size: 26rpx;
					width: 297rpx;
					height: 100%;
					margin-right: 20rpx;

					text {
						float: right;
					}
				}

				.right {
					position: relative;
					width: 297rpx;
					height: 100%;

					text {
						float: right;
					}
				}
			}

			.bottom-info-2 {
				width: 100%;
				max-width: 480px;
				background-color: var(--theme-color-bg);
				position: fixed;
				bottom: 0;
				z-index: 10;
				display: flex;
				padding: 20rpx 28rpx;
				box-sizing: border-box;
				border-top-left-radius: 24rpx;
				border-top-right-radius: 24rpx;
				overflow: hidden;

				.line {
					font-size: 26rpx;
					width: 100%;
					margin-bottom: 20rpx;
					color: #404040;
				}

				.left {
					font-size: 25rpx;
					width: 60rpx;
					margin-right: 40rpx;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.mid {
					font-size: 26rpx;
					width: 297rpx;
					height: 100%;
					margin-right: 20rpx;
					display: flex;
					align-items: center;

					text {
						float: right;
						color: #666633;
					}
				}

				.right {
					position: relative;
					width: 297rpx;
					height: 100%;
					display: flex;
					align-items: center;

					text {
						float: right;
						color: #666633;
					}
				}
			}

			.list-content {
				height: 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				background-color: var(--theme-auxiliary-color-default);

				.loading {
					display: flex;
					align-items: center;
					justify-content: center;
					margin: auto;

					image {
						width: 100rpx;
						height: 100rpx;
					}
				}

				.bottom-info {
					width: 100%;
					background-color: var(--theme-color-bg);
					position: fixed;
					bottom: 0;
					z-index: 10;
					display: flex;
					padding: 20rpx 28rpx;
					box-sizing: border-box;

					.line {
						font-size: 26rpx;
						margin-bottom: 20rpx;
						color: #404040;
					}

					.left {
						font-size: 25rpx;
						width: 60rpx;
						margin-right: 40rpx;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						/*font-size: 30rpx;*/

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}

					.mid {
						font-size: 26rpx;
						width: 297rpx;
						height: 100%;
						margin-right: 20rpx;

						text {
							float: right;
							color: #666633;
						}
					}

					.right {
						position: relative;
						width: 297rpx;
						height: 100%;

						text {
							float: right;
							color: #666633;
						}
					}
				}

				.content-list.active {
					transition: .3s;
				}

				.content-list {
					height: 100%;
					transition: .3s;
					display: flex;
					flex-direction: column;

					.content-list-item {
						// height: 130rpx;
						height: 146rpx;
						box-sizing: border-box;
						background: #FFFFFF;
						padding: 20rpx 28rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid var(--theme-auxiliary-color-default);
						position: relative;

						.time-m {
							text-align: right;
							width: 176rpx;
						}

						.un-open {
							width: 140rpx;
						}

						.betting {
							width: 25%;
							overflow: hidden;
						}

						.all {
							width: 18%;
						}

						.item-card {}

						.name {
							color: #404040;
							font-size: 24rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.num {
							color: #404040;
							font-size: 24rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.play-name {
							color: #404040;
							font-size: 24rpx;
							text-align: center;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						.amount {
							color: #404040;
							font-size: 24rpx;
							text-align: center;
						}

						.status {
							font-size: 24rpx;
							text-align: center;
						}

						.win {
							font-size: 24rpx;
							text-align: center;
						}

						.date {
							color: #404040;
							font-size: 24rpx;
						}

						.current {
							font-size: 24rpx;
							color: var(--theme-color);
						}
					}
				}
			}

		}
	}

	.expand-arrow {
		position: absolute;
		right: 50%;
		top: -58rpx;
		transform: translateX(50%);

		.show {
			transform: rotate(180deg);
		}
	}

	::v-deep.z-paging-content .zp-l-text{
		color: var(--theme-font-default-shallow-color) !important;
	}

</style>
