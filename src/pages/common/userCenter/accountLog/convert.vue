<template>
	<view class="log-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="menu-box">
			<view class="menu-item" v-for="(item, index) in menu" :class="{ active: type == index }"
				@click="selectType(index)">
				{{ item.name }}
			</view>
		</view>
		<view class="date-box">
			<view class="pre" @click="pre()">
				<view class="pre-item" v-show="isShowPre">
					<view class="text">
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
							<rect x="0.5" y="18" width="18" height="18" rx="9" transform="rotate(-90 0.5 18)"
								:fill="themeColor.themeAuxiliaryColorDefault" />
							<path d="M11 13L7 9L11 5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
						<view class="t">{{ $t('pages.common.userCenter.accountLog.PreviousDay') }}</view>
					</view>
					<view class="coin-box">
						{{ $t('pages.common.userCenter.accountLog.profitreport.profit') }}<text class="coin"
							:class="lastAmount > 0 ? 'red' : lastAmount < 0 ? 'green' : ''">{{ lastAmount }}</text>
					</view>
				</view>
			</view>
			<view class="time-item">
				<view class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
						<g clip-path="url(#clip0_17707_135480)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M9.5 1.5C9.5 0.670313 8.82969 0 8 0C7.17031 0 6.5 0.670313 6.5 1.5V3H4.25C3.00781 3 2 4.00781 2 5.25V7.5H23V5.25C23 4.00781 21.9922 3 20.75 3H18.5V1.5C18.5 0.670313 17.8297 0 17 0C16.1703 0 15.5 0.670313 15.5 1.5V3H9.5V1.5ZM23 9H2V21.75C2 22.9922 3.00781 24 4.25 24H20.75C21.9922 24 23 22.9922 23 21.75V9ZM8.16669 12.002C8.44283 12.002 8.66669 12.2258 8.66669 12.502V15.502C8.66669 15.7781 8.44283 16.002 8.16669 16.002H5.16669C4.89054 16.002 4.66669 15.7781 4.66669 15.502V12.502C4.66669 12.2258 4.89054 12.002 5.16669 12.002H8.16669ZM8.16675 17.3359C8.44289 17.3359 8.66675 17.5598 8.66675 17.8359V20.8359C8.66675 21.1121 8.44289 21.3359 8.16675 21.3359H5.16675C4.89061 21.3359 4.66675 21.1121 4.66675 20.8359V17.8359C4.66675 17.5598 4.89061 17.3359 5.16675 17.3359H8.16675ZM11.1667 12.002C10.8906 12.002 10.6667 12.2258 10.6667 12.502V15.502C10.6667 15.7781 10.8906 16.002 11.1667 16.002H14.1667C14.4429 16.002 14.6667 15.7781 14.6667 15.502V12.502C14.6667 12.2258 14.4429 12.002 14.1667 12.002H11.1667ZM14.1667 17.3359C14.4428 17.3359 14.6667 17.5598 14.6667 17.8359V20.8359C14.6667 21.1121 14.4428 21.3359 14.1667 21.3359H11.1667C10.8905 21.3359 10.6667 21.1121 10.6667 20.8359V17.8359C10.6667 17.5598 10.8905 17.3359 11.1667 17.3359H14.1667ZM17.1667 12.002C16.8906 12.002 16.6667 12.2258 16.6667 12.502V15.502C16.6667 15.7781 16.8906 16.002 17.1667 16.002H20.1667C20.4429 16.002 20.6667 15.7781 20.6667 15.502V12.502C20.6667 12.2258 20.4429 12.002 20.1667 12.002H17.1667ZM20.1667 17.3359C20.4429 17.3359 20.6667 17.5598 20.6667 17.8359V20.8359C20.6667 21.1121 20.4429 21.3359 20.1667 21.3359H17.1667C16.8906 21.3359 16.6667 21.1121 16.6667 20.8359V17.8359C16.6667 17.5598 16.8906 17.3359 17.1667 17.3359H20.1667Z"
								:fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_17707_135480">
								<rect width="24" height="24" fill="white" transform="translate(0.5)" />
							</clipPath>
						</defs>
					</svg>
				</view>
				<view class="time" @click="openTime">
					<view class="time-text" v-html="showTime"></view>
					<view class="coin-text">
						{{ $t('pages.common.userCenter.accountLog.profitreport.profit') }}<text class="num-text"
							:class="todayAmount > 0 ? 'red' : todayAmount < 0 ? 'green' : ''">
							{{ todayAmount || '0.00' }}
						</text>
					</view>
				</view>
			</view>
			<view class="next" @click="next()">
				<view class="next-item" v-show="isShowNext">
					<view class="text">
						<view class="t">{{ $t('pages.common.userCenter.accountLog.NextDay') }}</view>
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
							<rect x="18.5" width="18" height="18" rx="9" transform="rotate(90 18.5 0)"
								:fill="themeColor.themeAuxiliaryColorDefault" />
							<path d="M8 5L12 9L8 13" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</view>
					<view class="coin-box">
						{{ $t('pages.common.userCenter.accountLog.profitreport.profit') }}<text class="coin"
							:class="nextAmount > 0 ? 'red' : nextAmount < 0 ? 'green' : ''">{{ nextAmount || '0.00'
            }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="type-box">
			<z-paging :style="`height: calc(var(--vh) - 430rpx);background: var(--theme-auxiliary-color-default);`"
				class="paging" ref="paging" v-model="list" @query="getList" :lower-threshold="10"
				:refresher-enabled="true" :refresherAnimated="false" :auto-hide-loading-after-first-loaded="false"
				:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
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
				:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': themeColor.themeAuxiliaryColorDefault }"
				:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
				:show-loading-more-no-more-view="true" :loading-more-no-more-text="'没有更多数据了'" :hide-empty-view="false"
				:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '100px' }"
				:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
				:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<!--        <scroll-view :scroll-top="scrollTop"
                             scroll-y="true" class="scroll-Y"
                             @scrolltoupper="upper"
                             @scrolltolower="lower"
                             @scroll="scroll">-->
				<view class="list-item-box">
					<view class="list-item" v-for="(item, index) in list">
						<view class="left">
							<svg v-if="item.status == 1" xmlns="http://www.w3.org/2000/svg" width="38" height="14"
								viewBox="0 0 38 14" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M0 12.65C0 11.1175 0 10.3513 0.076247 9.70709C0.674037 4.65639 4.65639 0.674037 9.70709 0.076247C10.3513 0 11.1175 0 12.65 0H38C31.934 0 29.1414 3.6469 27.9267 8.86778C27.6936 9.86938 27.5771 10.3702 27.5029 10.5874C26.8569 12.4778 25.6363 13.4471 23.6487 13.6478C23.4203 13.6709 23.0722 13.6709 22.376 13.6709H0V12.65Z"
									fill="url(#paint0_linear_17707_135517)" />
								<path
									d="M14.648 8.908C14.5733 9.31333 14.504 9.66533 14.44 9.964C14.3493 10.3533 14.224 10.6227 14.064 10.772C13.9093 10.9213 13.7173 10.996 13.488 10.996C13.2853 10.996 13.0987 10.924 12.928 10.78C12.7573 10.636 12.5653 10.3933 12.352 10.052L12.184 9.748C11.8373 10.1267 11.424 10.508 10.944 10.892L10.416 10.308C11.0187 9.844 11.5067 9.39333 11.88 8.956C11.656 8.204 11.472 7.12133 11.328 5.708H8.824V6.74H10.808C10.808 6.89467 10.792 7.292 10.76 7.932C10.7333 8.572 10.712 8.97467 10.696 9.14C10.6747 9.40133 10.6267 9.60667 10.552 9.756C10.4773 9.9 10.3573 10.0067 10.192 10.076C10.032 10.1453 9.80533 10.18 9.512 10.18H8.96L8.808 9.444H9.328C9.52533 9.444 9.664 9.43333 9.744 9.412C9.82933 9.38533 9.88533 9.34 9.912 9.276C9.944 9.20667 9.968 9.09467 9.984 8.94C9.99467 8.82267 10.0053 8.596 10.016 8.26C10.032 7.91867 10.0427 7.65467 10.048 7.468H8.824C8.81333 8.27333 8.75467 8.94 8.648 9.468C8.54667 9.99067 8.368 10.5213 8.112 11.06L7.376 10.716C7.57333 10.348 7.72267 10.0067 7.824 9.692C7.92533 9.372 7.99467 9.01467 8.032 8.62C8.06933 8.22533 8.088 7.71333 8.088 7.084V4.972H11.264L11.176 3.724H11.904L11.992 4.972H13.368C13 4.58267 12.7067 4.292 12.488 4.1L12.976 3.612C13.296 3.90533 13.624 4.22533 13.96 4.572L13.544 4.972H14.48V5.708H12.056C12.1467 6.72667 12.272 7.56667 12.432 8.228C12.784 7.684 13.1013 6.99333 13.384 6.156L14.064 6.436C13.872 6.97467 13.6693 7.46 13.456 7.892C13.2427 8.31867 12.9947 8.724 12.712 9.108C12.824 9.38533 12.9387 9.61467 13.056 9.796C13.232 10.0467 13.3867 10.172 13.52 10.172C13.5893 10.172 13.648 10.1347 13.696 10.06C13.7493 9.98 13.8 9.83067 13.848 9.612C13.9067 9.31867 13.96 9.012 14.008 8.692L14.648 8.908ZM22.208 5.292C22.192 5.85733 22.168 6.57467 22.136 7.444C22.1093 8.308 22.0827 9.02 22.056 9.58C22.04 9.932 21.9867 10.1987 21.896 10.38C21.8107 10.5613 21.672 10.6867 21.48 10.756C21.288 10.8253 21.0107 10.86 20.648 10.86H19.784L19.632 10.124H20.376C20.648 10.124 20.8427 10.1053 20.96 10.068C21.0827 10.0307 21.1653 9.956 21.208 9.844C21.256 9.732 21.288 9.548 21.304 9.292C21.3253 8.84933 21.3467 8.31333 21.368 7.684C21.3947 7.05467 21.4133 6.51333 21.424 6.06H19.992C19.96 7.01467 19.8907 7.76133 19.784 8.3C19.6827 8.83333 19.504 9.308 19.248 9.724C18.9973 10.14 18.608 10.6093 18.08 11.132L17.416 10.604C17.9547 10.0973 18.3413 9.66 18.576 9.292C18.816 8.924 18.976 8.516 19.056 8.068C19.136 7.62 19.1893 6.95067 19.216 6.06H18.376V5.292H19.24L19.28 3.7H20.04L20.016 5.292H22.208ZM18.376 9.244C18.0293 9.324 17.5067 9.44667 16.808 9.612C16.1093 9.77733 15.6933 9.87867 15.56 9.916L15.392 9.14L16.504 8.884V5.292H15.528V4.524H18.2V5.292H17.28V8.7C17.8293 8.572 18.168 8.48667 18.296 8.444L18.376 9.244Z"
									fill="white" />
								<defs>
									<linearGradient id="paint0_linear_17707_135517" x1="38" y1="10" x2="2.89784e-08"
										y2="10" gradientUnits="userSpaceOnUse">
										<stop :stop-color="themeColor.themeColor" />
										<stop offset="1" :stop-color="themeColor.themeColor" />
									</linearGradient>
								</defs>
							</svg>
							<svg v-else-if="item.status == 2" xmlns="http://www.w3.org/2000/svg" width="38" height="14"
								viewBox="0 0 38 14" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M0 12.65C0 11.1175 0 10.3513 0.076247 9.70709C0.674037 4.65639 4.65639 0.674037 9.70709 0.076247C10.3513 0 11.1175 0 12.65 0H38C31.934 0 29.1414 3.6469 27.9267 8.86778C27.6936 9.86938 27.5771 10.3702 27.5029 10.5874C26.8569 12.4778 25.6363 13.4471 23.6487 13.6478C23.4203 13.6709 23.0722 13.6709 22.376 13.6709H0V12.65Z"
									fill="url(#paint0_linear_17707_135536)" />
								<path
									d="M11.544 7.916C11.7787 8.46533 12.1333 8.92933 12.608 9.308C13.0827 9.68133 13.7253 10.012 14.536 10.3L14.104 11.06C13.3627 10.756 12.744 10.412 12.248 10.028C11.752 9.63867 11.3627 9.17733 11.08 8.644C10.824 9.124 10.44 9.57467 9.928 9.996C9.42133 10.412 8.77867 10.7827 8 11.108L7.552 10.372C8.38933 10.0307 9.05067 9.66 9.536 9.26C10.0267 8.85467 10.3573 8.40667 10.528 7.916H7.624V7.156H10.672C10.6773 7.04933 10.6853 6.60933 10.696 5.836H9.024C8.86933 6.19867 8.69867 6.548 8.512 6.884L7.832 6.5C8.03467 6.18 8.22667 5.796 8.408 5.348C8.59467 4.89467 8.74933 4.44133 8.872 3.988L9.608 4.172C9.53867 4.43333 9.44533 4.732 9.328 5.068H10.704L10.72 3.732H11.504L11.496 5.068H14.016V5.836H11.488L11.472 7.116V7.156H14.368V7.916H11.544ZM20.968 8.94C21.3787 9.44133 21.9387 9.94267 22.648 10.444L22.216 11.1C21.5227 10.5987 20.9627 10.0813 20.536 9.548C20.1093 10.0653 19.52 10.5933 18.768 11.132L18.296 10.516C19.0747 10.004 19.6773 9.476 20.104 8.932C19.7307 8.32933 19.4613 7.66267 19.296 6.932C19.1573 7.156 19.048 7.32133 18.968 7.428L18.584 6.972V8.82H17.968V4.868H16.376V8.852H15.76V4.148H18.584V6.628C18.8667 6.23333 19.1147 5.77733 19.328 5.26C19.5467 4.73733 19.7093 4.236 19.816 3.756L20.56 3.836C20.464 4.22 20.352 4.596 20.224 4.964H22.504V5.692H21.96C21.88 6.38 21.76 6.98533 21.6 7.508C21.4453 8.03067 21.2347 8.508 20.968 8.94ZM18.12 10.428C17.7413 10.0067 17.4373 9.67333 17.208 9.428C17.0853 9.69467 16.9093 9.956 16.68 10.212C16.4507 10.4627 16.1467 10.7373 15.768 11.036L15.328 10.452C15.7653 10.1427 16.0933 9.85467 16.312 9.588C16.536 9.316 16.6853 9.04667 16.76 8.78C16.8347 8.508 16.872 8.188 16.872 7.82V5.348H17.496V7.796C17.496 8.14267 17.472 8.46 17.424 8.748C17.8667 9.18 18.2667 9.58533 18.624 9.964L18.12 10.428ZM19.784 6.044C19.912 6.91867 20.1573 7.668 20.52 8.292C20.7173 7.94 20.872 7.556 20.984 7.14C21.096 6.71867 21.184 6.236 21.248 5.692H19.944C19.9013 5.79867 19.848 5.916 19.784 6.044Z"
									fill="white" />
								<defs>
									<linearGradient id="paint0_linear_17707_135536" x1="38" y1="10" x2="2.89784e-08"
										y2="10" gradientUnits="userSpaceOnUse">
										<stop stop-color="#B6B6B6" />
										<stop offset="1" stop-color="#959595" />
									</linearGradient>
								</defs>
							</svg>
							<svg v-else xmlns="http://www.w3.org/2000/svg" width="42" height="14" viewBox="0 0 42 14"
								fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M0 12.65C0 11.1175 0 10.3513 0.076247 9.70709C0.674037 4.65639 4.65639 0.674037 9.70709 0.076247C10.3513 0 11.1175 0 12.65 0H42C35.934 0 33.1414 3.6469 31.9267 8.86778C31.6936 9.86938 31.5771 10.3702 31.5029 10.5874C30.8569 12.4778 29.6363 13.4471 27.6487 13.6478C27.4203 13.6709 27.0722 13.6709 26.376 13.6709H0V12.65Z"
									fill="url(#paint0_linear_17707_135555)" />
								<path
									d="M12.584 10.084L12.392 10.868H10.704C9.99467 10.868 9.376 10.7773 8.848 10.596C8.32533 10.4147 7.86933 10.1027 7.48 9.66C7.08533 10.1507 6.58133 10.636 5.968 11.116L5.416 10.492C6.056 10.028 6.58667 9.532 7.008 9.004C6.736 8.56133 6.49867 7.99067 6.296 7.292C6.11467 7.63867 5.94933 7.92667 5.8 8.156L5.36 7.5C5.65333 7.03067 5.92267 6.46267 6.168 5.796C6.41867 5.124 6.616 4.43067 6.76 3.716L7.488 3.844C7.41333 4.228 7.32533 4.588 7.224 4.924H9.08V5.724C8.98933 6.38 8.85067 6.98 8.664 7.524C8.48267 8.06267 8.23733 8.56933 7.928 9.044L8.144 9.26C8.48 9.55867 8.86667 9.772 9.304 9.9C9.74133 10.0227 10.2587 10.084 10.856 10.084H12.584ZM10.616 9.716H9.872V3.732H10.616V5.628C11.5227 6.34267 12.1627 6.83333 12.536 7.1L12.192 7.852C11.888 7.58533 11.3627 7.15867 10.616 6.572V9.716ZM6.76 6.284C6.93067 7.132 7.16267 7.82267 7.456 8.356C7.904 7.604 8.19733 6.72667 8.336 5.724H6.968C6.92533 5.852 6.856 6.03867 6.76 6.284ZM18.528 9.3V10.084H20.544V10.772H15.68V10.084H17.8V9.3H16.072V8.62H17.8V7.868H16.16V4.092H20.168V7.868H18.528V8.62H20.312V9.3H18.528ZM15.896 9.596L15.928 9.964C15.72 10.0013 15.3467 10.084 14.808 10.212C14.2747 10.34 13.8507 10.444 13.536 10.524L13.432 9.78C13.656 9.73733 13.968 9.668 14.368 9.572V7.484H13.552V6.764H14.368V5.036H13.504V4.316H15.872V5.036H15.064V6.764H15.816V7.484H15.064V9.404C15.4587 9.30267 15.728 9.23067 15.872 9.188L15.896 9.596ZM17.8 5.652V4.772H16.888V5.652H17.8ZM18.528 5.652H19.456V4.772H18.528V5.652ZM16.888 6.3V7.188H17.8V6.3H16.888ZM18.528 6.3V7.188H19.456V6.3H18.528ZM25.392 3.732V5.204H28.112V8.684H25.392V11.076H24.592V8.684H21.888V5.204H24.592V3.732H25.392ZM22.672 5.98V7.916H24.592V5.98H22.672ZM25.392 5.98V7.916H27.328V5.98H25.392Z"
									fill="white" />
								<defs>
									<linearGradient id="paint0_linear_17707_135555" x1="42" y1="7" x2="-4.3816e-08"
										y2="7" gradientUnits="userSpaceOnUse">
										<stop :stop-color="themeColor.themeColor" />
										<stop offset="1" :stop-color="themeColor.themeDominantColorLinearGradientEnd" />
									</linearGradient>
								</defs>
							</svg>
						</view>
						<view class="center-box">
							<view class="top-title">
								<view class="out" v-if="item.type == 2">
									{{ item.outPlatformName }}
								</view>
								<view class="out" v-else>
									{{ item.inPlatformName }}
								</view>
								<view class="type-img">
									<svg style="transform: rotate(180deg);" v-if="item.type == 2"
										xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12"
										fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M9.5 12L-1.90735e-06 6L9.5 0V3H22V9H9.5V12Z"
											:fill="themeColor.themeAuxiliaryColorRemind" />
									</svg>
									<svg style="transform: rotate(180deg);" v-else xmlns="http://www.w3.org/2000/svg"
										width="22" height="12" viewBox="0 0 22 12" fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M12.5 12L22 6L12.5 0V3H0V9H12.5V12Z" :fill="themeColor.themeColor" />
									</svg>
								</view>
								<view class="in" v-if="item.type == 2">
									{{ item.inPlatformName }}
								</view>
								<view class="in" v-else>
									{{ item.outPlatformName }}
								</view>
								<view class="right" :class="item.type == 1 ? 'green' : 'red'">
									{{ item.amount }}
								</view>
							</view>
							<view class="botton-box">
								<view class="orderid">
									{{ $t('pages.common.userCenter.accountLog.convert.OrderNumber') + item.orderNo }}
								</view>
								<view class="timestr">{{ $u.timeFormat(item.createTime, 'yyyy.mm.dd hh:MM:ss')}}</view>
							</view>
						</view>
					</view>
				</view>
				<!--      </scroll-view>-->
			</z-paging>
			<view v-if="loading" class="loading">
				<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>
				<view :style="pageLoadingConfig['text_style']">{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}
				</view>
			</view>
			<view style="height: 120rpx">
				<Common :total="total" />
			</view>
		</view>
		<uni-drawer ref="pay" mode="right" :width="100">
			<time-picker @closePay="closePay" @changeTime="changeTime" :line="'.'" :dayStatMap="dayStatMap"
				:startTimes="startTime" :endTimes="endTime">
			</time-picker>
		</uni-drawer>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import Common from "./common/common";
	import TimePicker from "@/components/common/time-picker";
	import {
		getTime
	} from "@/utils/function"
	import {
		switchRecord
	} from "@/utils/lottery/mine";
	import defaultTemplate from "@/utils/defaultTemplate";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import systemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "convert",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			Common,
			TimePicker
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.accountLog.menu.title2'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				type: 0,
				menu: [{
					name: this.$t('pages.common.userCenter.accountLog.index.All')
				}, {
					name: this.$t('pages.common.userCenter.accountLog.convert.transferIn')
				}, {
					name: this.$t('pages.common.userCenter.accountLog.convert.transferOut')
				}],
				start: '',
				end: '',
				startTime: '',
				endTime: '',
				time: '',
				timeStr: '',
				today: '',
				order: '',
				orderBy: '',
				pageNo: 1,
				pageSize: 15,
				list: [],
				dayStatMap: {},
				total: [],
				lastAmount: 0.00,
				nextAmount: 0.00,
				todayAmount: 0.00,
				loading: false,
				loadingTimes: 0,
				isApp: false
			}
		},
		mounted() {
			let date = new Date();
			this.today = getTime(date)
			this.startTime = this.today
			this.endTime = this.today
			this.start = this.getDay(-30)
			this.end = this.today
			/*this.getList();*/

			uni.$emit("on_page_mounted", this)
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			if (this.isApp) {
				this.$nativeBridge.setSafeAreaColor('#f3f9f6')
			}
		},
		computed: {
			...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(systemInfoStore, ["uWindowHeight"]),
			showTime() {
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let startTime = getTime(start, '/', 2, 'date')
				let endTime = getTime(end, '/', 2, 'date')
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
				let start = new Date(this.start)
				if (this.startTime == this.start) {
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
				if (this.endTime == this.end) {
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
		methods: {
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
			detail(item) {
				uni.navigateTo({
					url: 'detail?createTime=' + item.createTime + "&id=" + item.id + "&source=" + item.source,
					success: function(res) {
						res.eventChannel.emit('argParams', item)
					}
				})
			},
			selectType(index) {
				this.type = index
				this.loadingTimes = 0;
				this.$refs.paging.reload()
			},
			openTime() {
				this.$refs.pay.open()
			},
			closePay() {
				this.$refs.pay.close()
			},
			changeTime(time) {
				this.startTime = time.start
				this.endTime = time.end
				this.loadingTimes = 0;
				this.$refs.paging.reload()
			},
			pre() {
				if (!this.isShowPre) return
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let date = start.getTime() - 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.endTime = getTime(date)
				}
				this.startTime = getTime(date)
				this.loadingTimes = 0;
				this.$refs.paging.reload()
			},
			next() {
				if (!this.isShowNext) return
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let date = end.getTime() + 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.startTime = getTime(date)
				}
				this.endTime = getTime(date)
				this.loadingTimes = 0;
				this.$refs.paging.reload()
			},
			setSort(orderBy) {
				this.orderBy = orderBy
				if (this.order == 'asc') {
					this.order = 'desc'
				} else {
					this.order = 'asc'
				}
				this.loadingTimes = 0;
				this.$refs.paging.reload()
			},
			getList(pageNo, pageSize = 10) {
				this.loadingTimes++;
				if (this.loadingTimes <= 1) this.loading = true;
				this.pageNo = pageNo
				let prams = {
					'beginTime': this.startTime,
					'endTime': this.endTime,
					'type': this.type,
					'pageNo': this.pageNo,
					'pageSize': this.pageSize,
				}
				switchRecord(prams).then(res => {
					const {
						list,
						dayStatMap,
						statList,
						lastAmount,
						nextAmount,
						todayAmount,
						totalAmount
					} = defaultTemplate({
						lastAmount: 0,
						nextAmount: 0,
						totalAmount: 0,
						list: [{
							id: "",
							type: 2,
							orderNo: "",
							amount: 0,
							outPlatform: 0,
							inPlatform: 11,
							status: 2,
							createTime: "",
							inPlatformName: "",
							outPlatformName: ""
						}, ],
						statList: [{
							title: "",
							amount: 0
						}, ],
						dayStatMap: {}
					}, res.result)
					this.dayStatMap = dayStatMap
					this.total = statList
					this.lastAmount = lastAmount
					this.nextAmount = nextAmount
					this.todayAmount = todayAmount || totalAmount;
					this.$refs.paging.complete(list);
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.log-box {

		position: fixed;
		background: var(--theme-auxiliary-color-default);
		width: 100%;
		max-width: 480px;

		.menu-box {
			height: 88rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;
			border-radius: 24rpx 24rpx 0 0;
			padding: 0 60rpx;

			.menu-item {
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-weight: 400;
				font-size: 34rpx;
				text-align: center;
				color: #404040;
				height: 100%;
			}

			.active {
				color: var(--theme-color);
				position: relative;

				&::after {
					position: absolute;
					bottom: 0px;
					content: '';
					width: 36rpx;
					height: 6rpx;
					margin: 0 auto;
					border-radius: 6rpx 6rpx 0 0;
					background: var(--theme-color);
				}
			}
		}

		.date-box {
			display: flex;
			border-top: 1px solid var(--theme-auxiliary-color-default);
			border-bottom: 1px solid var(--theme-auxiliary-color-default);

			.pre,
			.next {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 186rpx;
				height: 116rpx;
				background: #fff;
				font-weight: 400;
				font-size: 28rpx;
				color: #404040;
				flex: 1;

				.pre-item,
				.next-item {
					display: flex;
					align-items: center;
					flex-direction: column;

					.text {
						display: flex;
						align-items: center;

						.t {
							margin: 0 10rpx;
						}
					}

					.coin-box {
						width: 186rpx;
						font-size: 24rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 10rpx;
					}

					.coin {
						font-size: 28rpx;
						color: #404040;
						max-width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.red {
						color: var(--theme-auxiliary-color-remind);
					}

					.green {
						color: var(--theme-color);
					}
				}
			}

			.time-item {
				width: 328rpx;
				height: 116rpx;
				background: var(--theme-color-bg);
				border-bottom: 0;
				display: flex;
				align-items: center;
				justify-content: center;

				.icon {
					width: 20%;

					image {
						margin-left: 24rpx;
						height: 55rpx;
						width: 55rpx;
					}
				}

				.time {
					text-align: center;
					font-weight: 400;
					font-size: 28rpx;
					color: #404040;

					.coin-text {
						font-weight: 400;
						font-size: 24rpx;
						color: #404040;

						.num-text {
							font-size: 24rpx;
							color: var(--theme-color);
						}

						.red {
							color: #CC3333;
						}

						.coin {
							font-weight: 400;
							font-size: 24rpx;
							color: #404040;

						}
					}
				}
			}
		}

		.type-box {
			.row-box {
				background: #FFFFFF;
				height: 50rpx;
				border-bottom: 1px solid #DDDDDD;

				.row-col {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;

					.title {
						/* font-weight: 400;*/
						font-size: 22rpx;
						text-align: center;
						color: #666666;

						.type-text {
							font-size: 22rpx;
							color: #444444;
						}

						.bank,
						.money-text {
							font-size: 22rpx;
							color: #444444;
						}

						.fq {
							font-size: 22rpx;
							color: #0099CC;
						}

						.sl {
							font-size: 22rpx;
							color: #666666;
						}

						.ok {
							font-size: 22rpx;
							color: #CC3333;
						}

						.err {
							font-size: 22rpx;
							color: #34B822;
						}

						.time {
							font-size: 20rpx;
							text-align: center;
							color: #999999;
						}

						.time-text {
							font-size: 20rpx;
							text-align: center;
							color: #CC3333;
						}
					}

					.icon-box {
						display: flex;

						.sort-box {
							display: flex;
							flex-direction: column;
							justify-content: center;
							margin-left: 6rpx;

							.asc {
								border-bottom: 10rpx solid #CECECD;
								border-left: 10rpx solid transparent;
								border-right: 10rpx solid transparent;
							}

							.desc {
								margin-top: 4rpx;
								border-top: 10rpx solid #CECECD;
								border-left: 10rpx solid transparent;
								border-right: 10rpx solid transparent;
							}

							.act-asc {
								border-bottom: 10rpx solid #858583;
							}

							.act-desc {
								border-top: 10rpx solid #858583;
							}
						}
					}
				}
			}

			.list-item-box {
				border-radius: 0 0 24rpx 24rpx;
				overflow: hidden;
			}

			.list-item {
				position: relative;
				display: flex;
				height: 182rpx;
				background: #FFFFFF;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);
				position: relative;

				.left {
					position: absolute;
					left: 0;
					top: 0;

					image {
						width: 55rpx;
						height: 55rpx;
					}
				}

				.center-box {
					width: 100%;

					.top-title {
						display: flex;
						line-height: 50rpx;
						padding: 20rpx 28rpx;

						.out {
							font-weight: 400;
							font-size: 28rpx;
							color: #404040;
							min-width: 112rpx;
						}

						.type-img {
							margin: 0 72rpx;

							image {
								height: 24rpx;
								width: 48rpx;
							}
						}

						.in {
							font-weight: 400;
							font-size: 28rpx;
							color: #404040;
							min-width: 112rpx;
						}
					}

					.botton-box {
						margin: 0 28rpx;
						padding: 20rpx 0;
						border-top: 1px dashed var(--theme-auxiliary-color-default);

						.orderid {
							font-weight: 400;
							font-size: 24rpx;
							color: #404040;
							word-break: break-all;
						}

						.timestr {
							font-weight: 400;
							font-size: 24rpx;
							color: #404040;
						}
					}
				}

				.right {
					flex: 1;
					text-align: right;
				}
			}
		}
	}

	.red {
		color: var(--theme-auxiliary-color-remind);
	}

	.green {
		color: var(--theme-color);
	}
</style>
