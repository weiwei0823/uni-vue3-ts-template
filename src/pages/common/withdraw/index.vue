<template>
	<view class="bank-box pc-max-width"
		:class="['theme-' + themeColor.name]">
		<Header :title="title">

			<block slot="center" v-if="webSiteConfig.website_gua_dan_ti_xian_switch==1">
				<u-subsection class="header-tab" :list="headerTab" font-size="28" button-color="#fff"
					inactive-color="#404040" :active-color="themeColor.themeColor" @change="onChangeTab"></u-subsection>
			</block>

			<!-- <block slot="center" v-if="false">
				<u-subsection class="header-tab" :list="headerTab" font-size="28" button-color="#fff"
					inactive-color="#404040" :active-color="themeColor.themeColor" @change="onChangeTab"></u-subsection>
			</block> -->
		</Header>
		<scroll-view scroll-y class="scroll-y"
			:style="{ height: `calc(${winHeight}px - 88rpx)`, marginTop: '20rpx', borderTopLeftRadius: '24rpx', borderTopRightRadius: '24rpx' }"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view v-show="current === '1'" v-if="bankList.length" class="bank-row" @click="onClick()">
				<image class="image" :src="info.logoMobile || '/static/img/user/bank/usdt.png'" mode="widthFix">
				</image>
				<view class="center">
					{{ info.bankName }}
					<view class="card" v-if="info.type == 1">
						<text style="margin-top: 20rpx;margin-right: 10rpx">**** **** ****</text>
						{{ " " + info.bankNumber.substr(-4) }}
					</view>
					<view class="card-bt" v-if="info.type == 2 || info.type == 4">
						{{ info.bankNumber }}
					</view>
				</view>
				<svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
					<path d="M1.5 1.5L7 7L1.5 12.5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</view>
      <view v-else class="bank-row"  @click="toPage('/pages/common/userCenter/bank/index')">
        <view class="center center-add">
          <imageSvgUrl style="margin-right:20rpx;" url="/static/img/user/bank/svgs/1.svg" :width="48"
                        :height="48" replaceThemeTargetColor="#07C160" />
          <view class="center-add-txt">{{ $t('pages.common.withdraw.index.WithdrawAmountAdd') }}</view>
        </view>

        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M1.5 1.5L7 7L1.5 12.5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
      </view>

			<view v-show="current === '2'">
				<view class="withdraw-box" :style="{marginTop: `${bankList&&bankList.length<1?10:0}px`}">
					<view class="title-t" style="color: #404040;font-size: 30rpx;">出售方式</view>

					<view class="type-method">
						<view class="type-item" :class="{ active: izSplit === '1' }" @click="izSplit = '1'">
							可拆分
						</view>
						<view class="type-item" :class="{ active: izSplit === '0' }" @click="izSplit = '0'">
							不拆分
						</view>
					</view>
					<view class="input-box" id="type-method-input-box">
						<template v-if="izSplit === '1'">
							<view class="input">
								<view class="title" style="font-size: 26rpx;">最小数量</view>
								<input class="uni-input" placeholder-class="input-placeholder-text"
									placeholder-style="font-size: 26rpx;" style="font-size: 26rpx;" type="text"
									v-model="minAmount" placeholder="输入数量" />

								<svg class="tips" style="width: 276rpx;height: 44rpx;" viewBox="0 0 138 22" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M8 4C8 1.79086 9.79086 0 12 0H134C136.209 0 138 1.79086 138 4V18C138 20.2091 136.209 22 134 22H12C9.79086 22 8 20.2091 8 18V14.5L0 11L8 7.5V4Z"
										fill="#EC3232" />
									<path
										d="M24.28 6.604V7.492H22.792V14.932C22.792 15.388 22.74 15.732 22.636 15.964C22.54 16.196 22.364 16.356 22.108 16.444C21.86 16.54 21.484 16.588 20.98 16.588H19.384L19.216 15.664H20.776C21.096 15.664 21.328 15.64 21.472 15.592C21.616 15.544 21.716 15.456 21.772 15.328C21.828 15.192 21.856 14.976 21.856 14.68V7.492H13.72V6.604H24.28ZM14.956 9.28H19.804V14.032H14.956V9.28ZM15.832 13.168H18.904V10.156H15.832V13.168ZM31.024 9.7L30.688 8.236L30.604 7.864H29.476V7.084H32.392C32.232 6.692 32.072 6.328 31.912 5.992L32.848 5.812C32.936 5.988 33.124 6.412 33.412 7.084H35.908V7.864H34.756C34.676 8.192 34.508 8.804 34.252 9.7H36.196V10.504H29.092V9.7H31.024ZM29.032 11.524L28.744 11.632L27.976 11.92V15.364C27.976 15.7 27.936 15.952 27.856 16.12C27.776 16.296 27.636 16.42 27.436 16.492C27.244 16.564 26.96 16.6 26.584 16.6H25.84L25.672 15.736H26.356C26.572 15.736 26.732 15.72 26.836 15.688C26.94 15.648 27.008 15.584 27.04 15.496C27.08 15.408 27.1 15.272 27.1 15.088V12.244L25.732 12.748L25.552 11.896C26 11.76 26.516 11.58 27.1 11.356V8.944H25.828V8.104H27.1V5.944H27.976V8.104H29.104V8.944H27.976V11.02C28.232 10.932 28.568 10.8 28.984 10.624L29.008 11.068L29.032 11.524ZM33.424 9.7C33.56 9.236 33.724 8.624 33.916 7.864H31.432C31.56 8.336 31.708 8.948 31.876 9.7H33.424ZM34.924 12.7C34.74 13.164 34.548 13.564 34.348 13.9C34.156 14.228 33.928 14.524 33.664 14.788C34.208 15.044 35.036 15.444 36.148 15.988L35.74 16.768C34.708 16.224 33.776 15.756 32.944 15.364C32.52 15.644 31.988 15.896 31.348 16.12C30.716 16.352 29.932 16.576 28.996 16.792L28.708 15.928C30.196 15.608 31.3 15.276 32.02 14.932C31.116 14.54 30.38 14.236 29.812 14.02C30.092 13.572 30.34 13.132 30.556 12.7H28.948V11.932H30.94C31.124 11.548 31.292 11.152 31.444 10.744L32.308 10.948C32.268 11.044 32.156 11.296 31.972 11.704C31.956 11.76 31.924 11.836 31.876 11.932H36.268V12.7H34.924ZM30.964 13.636C31.308 13.764 31.936 14.024 32.848 14.416C33.112 14.208 33.332 13.968 33.508 13.696C33.684 13.424 33.852 13.092 34.012 12.7H31.48C31.304 13.036 31.132 13.348 30.964 13.636ZM47.512 6.976C46.312 7.08 44.784 7.188 42.928 7.3C41.08 7.412 39.588 7.488 38.452 7.528L38.344 6.7C39.656 6.66 41.216 6.588 43.024 6.484C44.832 6.372 46.264 6.256 47.32 6.136L47.512 6.976ZM38.932 10.276V11.416H38.08V9.484H44.728C45.336 8.564 45.768 7.86 46.024 7.372L46.792 7.72C46.464 8.312 46.108 8.9 45.724 9.484H47.908V11.416H47.032V10.276H38.932ZM43.768 9.004L43.012 9.388L42.172 7.852L42.928 7.456L43.768 9.004ZM40.924 9.016L40.156 9.424L39.328 7.996L40.048 7.6L40.924 9.016ZM47.944 16.744C46.872 16.544 45.928 16.324 45.112 16.084C44.304 15.852 43.576 15.576 42.928 15.256C41.736 15.832 40.112 16.348 38.056 16.804L37.756 15.928C39.484 15.592 40.9 15.196 42.004 14.74C41.068 14.132 40.22 13.356 39.46 12.412V11.596H46.36V12.412C45.648 13.364 44.812 14.14 43.852 14.74C44.948 15.204 46.408 15.576 48.232 15.856L47.944 16.744ZM40.6 12.412C41.304 13.204 42.08 13.832 42.928 14.296C43.848 13.792 44.616 13.164 45.232 12.412H40.6ZM53.416 11.536C53.008 11.688 52.604 11.832 52.204 11.968V15.412C52.204 15.724 52.164 15.964 52.084 16.132C52.004 16.3 51.868 16.42 51.676 16.492C51.492 16.564 51.224 16.6 50.872 16.6H50.02L49.852 15.712H50.596C50.884 15.712 51.076 15.672 51.172 15.592C51.268 15.512 51.316 15.348 51.316 15.1V12.28C50.668 12.496 50.192 12.664 49.888 12.784L49.696 11.872L51.316 11.344V8.956H49.936V8.068H51.316V5.932H52.204V8.068H53.5V8.956H52.204V11.044L53.332 10.624L53.38 11.104L53.416 11.536ZM60.028 14.944C59.516 14.656 58.96 14.36 58.36 14.056V16.816H57.436V13.588C56.516 13.148 55.828 12.836 55.372 12.652L55.72 11.848C56.168 12.024 56.74 12.272 57.436 12.592V10.54H55.036V10.576C55.036 11.68 54.992 12.568 54.904 13.24C54.824 13.904 54.672 14.504 54.448 15.04C54.232 15.568 53.904 16.16 53.464 16.816L52.624 16.264C53.072 15.656 53.396 15.12 53.596 14.656C53.804 14.192 53.944 13.664 54.016 13.072C54.088 12.472 54.124 11.632 54.124 10.552V7C56.388 6.808 58.188 6.52 59.524 6.136L59.836 7.048C59.244 7.216 58.556 7.36 57.772 7.48C56.996 7.6 56.084 7.72 55.036 7.84V9.616H60.256V10.54H58.36V13.036L60.4 14.056L60.028 14.944ZM68.476 5.74C68.876 6.828 69.372 7.728 69.964 8.44C70.564 9.152 71.36 9.804 72.352 10.396L71.848 11.272C70.776 10.584 69.916 9.848 69.268 9.064C68.628 8.28 68.084 7.28 67.636 6.064L68.476 5.74ZM66.244 6.28C65.796 7.312 65.244 8.232 64.588 9.04C63.932 9.848 63.14 10.592 62.212 11.272L61.696 10.48C62.496 9.928 63.212 9.264 63.844 8.488C64.476 7.704 64.996 6.852 65.404 5.932L66.244 6.28ZM63.244 11.452V10.6H70.252C70.22 11.208 70.168 11.964 70.096 12.868C70.032 13.772 69.976 14.444 69.928 14.884C69.888 15.3 69.796 15.624 69.652 15.856C69.516 16.08 69.308 16.24 69.028 16.336C68.756 16.432 68.384 16.48 67.912 16.48H66.328L66.16 15.604H67.636C67.988 15.604 68.256 15.576 68.44 15.52C68.624 15.456 68.756 15.348 68.836 15.196C68.924 15.036 68.984 14.804 69.016 14.5C69.056 14.036 69.1 13.508 69.148 12.916C69.196 12.324 69.232 11.836 69.256 11.452H65.896C65.88 11.58 65.864 11.812 65.848 12.148C65.808 12.884 65.688 13.512 65.488 14.032C65.288 14.544 64.956 15.028 64.492 15.484C64.028 15.94 63.368 16.416 62.512 16.912L61.852 16.084C62.636 15.692 63.24 15.312 63.664 14.944C64.088 14.568 64.388 14.168 64.564 13.744C64.748 13.312 64.876 12.776 64.948 12.136L65.008 11.452H63.244ZM83.872 7.696C83.848 8.56 83.808 9.784 83.752 11.368C83.704 12.944 83.664 14.156 83.632 15.004C83.616 15.388 83.548 15.692 83.428 15.916C83.316 16.132 83.132 16.288 82.876 16.384C82.628 16.48 82.288 16.528 81.856 16.528H80.344L80.164 15.592H81.58C81.892 15.592 82.128 15.564 82.288 15.508C82.456 15.452 82.576 15.352 82.648 15.208C82.72 15.056 82.76 14.836 82.768 14.548L82.876 11.404L82.96 8.608H80.176C79.928 9.2 79.636 9.776 79.3 10.336L78.508 9.808C78.884 9.24 79.228 8.568 79.54 7.792C79.86 7.008 80.1 6.276 80.26 5.596L81.148 5.812C80.996 6.428 80.796 7.056 80.548 7.696H83.872ZM76.948 5.848C76.852 6.328 76.7 6.932 76.492 7.66H78.376V15.916H75.112V16.708H74.248V7.66H75.52C75.672 7.196 75.832 6.536 76 5.68L76.948 5.848ZM75.112 11.344H77.512V8.584H75.112V11.344ZM81.088 13.324C80.576 12.532 80.004 11.732 79.372 10.924L80.032 10.384C80.744 11.248 81.352 12.048 81.856 12.784L81.088 13.324ZM75.112 12.268V14.992H77.512V12.268H75.112ZM87.22 6.232H94.804V9.628H87.22V6.232ZM93.952 7.612V6.94H88.072V7.612H93.952ZM88.072 8.248V8.932H93.952V8.248H88.072ZM91.552 15.436C91.488 15.444 91.2 15.48 90.688 15.544V16.852H89.884V15.652C87.62 15.916 86.276 16.084 85.852 16.156L85.768 15.388L86.392 15.316L86.8 15.268V11.068H85.768V10.336H96.256V11.068H90.688V14.788L91.504 14.68L91.528 15.088L91.552 15.436ZM89.884 11.968V11.068H87.616V11.968H89.884ZM95.944 16.732C94.968 16.356 94.16 15.916 93.52 15.412C92.928 15.916 92.2 16.368 91.336 16.768L90.94 16C91.732 15.696 92.4 15.324 92.944 14.884C92.648 14.572 92.38 14.228 92.14 13.852C91.908 13.468 91.684 13.032 91.468 12.544V11.8H95.548V12.604C95.212 13.452 94.74 14.2 94.132 14.848C94.676 15.248 95.396 15.604 96.292 15.916L95.944 16.732ZM92.344 12.544C92.656 13.264 93.052 13.864 93.532 14.344C94.02 13.816 94.388 13.216 94.636 12.544H92.344ZM89.884 12.604H87.616V13.504H89.884V12.604ZM87.616 15.172L89.884 14.896V14.14H87.616V15.172ZM101.608 15.568C101.896 15.568 102.108 15.544 102.244 15.496C102.38 15.44 102.472 15.344 102.52 15.208C102.568 15.072 102.592 14.86 102.592 14.572V6.016H103.612V14.872C103.612 15.312 103.556 15.652 103.444 15.892C103.332 16.132 103.148 16.3 102.892 16.396C102.644 16.492 102.288 16.54 101.824 16.54H100.324L100.132 15.568H101.608ZM105.748 8.08C106.108 8.808 106.564 9.84 107.116 11.176C107.668 12.512 108.088 13.592 108.376 14.416L107.404 14.836C107.108 13.948 106.704 12.864 106.192 11.584C105.68 10.296 105.236 9.248 104.86 8.44L105.748 8.08ZM97.6 14.308C98.056 13.476 98.48 12.5 98.872 11.38C99.272 10.252 99.584 9.2 99.808 8.224L100.792 8.428C100.528 9.5 100.192 10.604 99.784 11.74C99.384 12.876 98.956 13.876 98.5 14.74L97.6 14.308ZM115.48 12.616V15.532H120.16V16.36H109.876V15.532H114.556V12.616H110.524V11.752H114.556V10.288H111.88V9.448C111.288 9.8 110.692 10.104 110.092 10.36L109.684 9.508C111.828 8.636 113.476 7.46 114.628 5.98H115.456C116.024 6.724 116.724 7.396 117.556 7.996C118.388 8.588 119.316 9.072 120.34 9.448L119.956 10.312C118.996 9.936 118.08 9.444 117.208 8.836C116.336 8.22 115.612 7.556 115.036 6.844C114.26 7.788 113.216 8.652 111.904 9.436H118.144V10.288H115.48V11.752H119.512V12.616H115.48ZM116.524 14.716C117.052 14.14 117.572 13.492 118.084 12.772L118.792 13.288C118.016 14.28 117.464 14.956 117.136 15.316L116.524 14.716ZM111.868 12.808C112.284 13.264 112.824 13.904 113.488 14.728L112.84 15.292C112.112 14.356 111.588 13.716 111.268 13.372L111.868 12.808ZM122.62 7.552V8.584H121.9V6.844H124.06C123.956 6.428 123.86 6.112 123.772 5.896L124.612 5.728L124.96 6.844H126.76V8.524H126.052V7.552H122.62ZM128.872 8.608L129.16 7.18H127.06V6.4H132.22V7.18H130C129.936 7.532 129.868 7.852 129.796 8.14C129.78 8.212 129.764 8.288 129.748 8.368C129.732 8.448 129.716 8.528 129.7 8.608H131.788V14.02H131.02V9.364H128.128V14.008H127.348V8.608H128.872ZM126.532 12.94C126.14 12.644 125.512 12.228 124.648 11.692C123.976 12.236 123.076 12.752 121.948 13.24L121.624 12.508C122.512 12.14 123.288 11.72 123.952 11.248C123.504 10.968 123.264 10.82 123.232 10.804C122.952 10.636 122.788 10.536 122.74 10.504C122.548 10.72 122.336 10.932 122.104 11.14L121.636 10.516C122.028 10.204 122.4 9.816 122.752 9.352C123.104 8.88 123.36 8.46 123.52 8.092L124.324 8.26C124.284 8.348 124.16 8.568 123.952 8.92H126.376V9.652C126.024 10.252 125.632 10.764 125.2 11.188C125.952 11.636 126.512 11.988 126.88 12.244L126.532 12.94ZM124.528 10.78C124.928 10.42 125.264 10.024 125.536 9.592H123.496L123.196 9.988L124.528 10.78ZM129.784 13.78C130.528 14.396 131.38 15.16 132.34 16.072L131.788 16.72C131.108 16.016 130.352 15.292 129.52 14.548C129.312 14.972 129.012 15.364 128.62 15.724C128.228 16.084 127.696 16.448 127.024 16.816L126.532 16.108C127.316 15.7 127.892 15.3 128.26 14.908C128.636 14.516 128.88 14.096 128.992 13.648C129.112 13.2 129.172 12.608 129.172 11.872V10.06H129.952V11.992C129.952 12.736 129.896 13.332 129.784 13.78ZM123.256 16.6H122.548V13.024H126.172V16H123.256V16.6ZM125.464 15.316V13.744H123.256V15.316H125.464Z"
										fill="white" />
								</svg>
							</view>
							<view class="line"></view>
						</template>
						<view class="input">
							<view class="title" style="font-size: 26rpx;">备注</view>
							<input class="uni-input" placeholder-class="input-placeholder-text"
								placeholder-style="font-size: 26rpx;" style="font-size: 26rpx;" type="text"
								v-model="remark" placeholder="请输入备注内容" />
						</view>
					</view>
				</view>
				<view class="withdraw-box">
					<view class="title-t" style="color: #404040;font-size: 30rpx;">选择收款方式</view>
					<LHRadioGroup class="way-item-group" :options="radioOptions" v-model="selectedValue">
						<template #default="option">
							<view class="way-item">
								<view class="left">
									<image class="logo" :src="option.logoMobile || '/static/img/user/bank/usdt.png'">
									</image>
									<view class="groupName">{{ option.type === 1 ? '银行卡' : option.type ===
										3 ? option.bankName.split('-')[0] : option.bankName }}</view>
								</view>
								<view class="right">
									<template v-if="option.type === 3">
										<image class="qr-code" :src="option.bankNumber"></image>
									</template>
									<template v-else-if="option.type === 4">
										<view class="text">
											<view>{{ option.bankName }}
												{{ option.realName.charAt(0) + '*'.repeat(option.realName.length - 1) }}
											</view>
											<view>{{ "**** **** **** " + option.bankNumber.substr(-4) }}</view>
										</view>
									</template>
									<template v-else>
										<view class="text" @click.stop="onClick2()">
											<view>{{ option.bankName }}
												{{ option.realName.charAt(0) + '*'.repeat(option.realName.length - 1) }}
											</view>
											<view>{{ "**** **** **** " + option.bankNumber.substr(-4) }}</view>
										</view>
										<svg v-if="BankList2.length > 1" xmlns="http://www.w3.org/2000/svg" width="8"
											height="14" viewBox="0 0 8 14" fill="none">
											<path d="M1.5 1.5L7 7L1.5 12.5" stroke="#AFAFAF" stroke-width="2"
												stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</template>
								</view>
							</view>
						</template>
					</LHRadioGroup>
				</view>
			</view>
			<view class="withdraw-box">
				<view class="title-t">{{ $t('pages.common.withdraw.index.WithdrawAmount') }}</view>
				<view class="input-box" :class="{
					focus: isFocus
				}">
					<input class="uni-input" placeholder-class="input-placeholder-text" type="number" v-model="money"
						:placeholder="'单笔可提' + init.minAmount + '-' + init.maxAmount + ''" @focus="isFocus = true"
						@blur="isFocus = false" @input="getRightVal" />
					<text class="label-text" @click="allBtn">{{ $t('pages.common.withdraw.index.AllWithdraw') }}</text>
				</view>
				<view class="notice">
					{{ $t('pages.common.withdraw.index.AvailableAmount') }}
					<text>
						{{ init.drawAmount > 0 ? parseInt(init.drawAmount) : init.drawAmount }}.00
					</text>
				</view>
				<template v-if="info.type == 4">
					<view class="notice">
						兑换比例（USDT/RMB）
						<text style="color: #D3D3D3;">
							{{ parseFloat(info.exchangeRatio).toFixed(2) }}
						</text>
					</view>
					<view class="notice">
						到账USDT：
						<text style="color: #404040;">
							{{ dzUSDT.toFixed(2) }}
						</text>
					</view>
				</template>
			</view>
			<view class="detail">
				<view class="title-t" style="margin: 0;padding-left: 0;">
					{{ $t('pages.common.withdraw.index.ReceiverInformation') }}
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.withdraw.index.ReceiverName') }}</view>
					<view class="desc">{{ init.realName || '****' }}</view>
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.withdraw.index.AccountBalance') }}</view>
					<view class="desc">{{ init.balance }}</view>
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.withdraw.index.UnavailableAmount') }}</view>
					<view class="desc">{{ init.noDrawAmount }}</view>
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.withdraw.index.WithdrawLimit') }}</view>
					<view class="desc">{{ init.bettingAmount }}</view>
				</view>
				<view class="item">
					<view class="title" v-if="current === '1'">{{ $t('pages.common.withdraw.index.WithdrawFrequency') }}
					</view>
					<view class="title" v-if="current === '2'">剩余挂单提现次数</view>
					<view class="desc">{{ init.drawCount }}</view>
				</view>
				<view class="item">
					<view class="title" v-if="current === '1'">{{ $t('pages.common.withdraw.index.FreeWithdrawTimes') }}
					</view>
					<view class="title" v-if="current === '2'">免挂单提现次数</view>
					<view class="desc">{{ init.feeDrawCount }}</view>
				</view>
				<view class="item">
					<view class="title" v-if="current === '1'">{{ $t('pages.common.withdraw.index.WithdrawFee') }}
					</view>
					<view class="title" v-if="current === '2'">挂单提现手续费</view>
					<view class="desc">{{ commissionRatio }}</view>
				</view>
			</view>
			<view v-if="current === '1'">
				<view class="next">
					<view class="next-btn" :class="{ disable: !bankList.length || Number(money) < Number(init.minAmount)||!money }" @click="actBtn">下一步</view>
				</view>

				<view class="hint">
					<view class="hint-box">
						<view class="hint-title">
							<view class="text">{{ $t('pages.common.withdraw.index.Note') }}</view>
						</view>
						<view class="content">
							<view class="label">
								1.{{ $t('pages.common.withdraw.index.AvailableAmountExplanation') }}
							</view>
							<view class="label">
								2.{{ $t('pages.common.withdraw.index.AutoUpdateAvailableAmount') }}
							</view>
							<view class="label">
								3.{{ formartStrs($t('pages.common.withdraw.index.WithdrawLimitExplanation'),this.init?this.init.totalDrawCount:0) }}
							</view>
<!--							<view class="label">-->
<!--								4.{{ $t('pages.common.withdraw.index.RestTime') }}-->
<!--							</view>-->
							<view class="label">
								4.{{ formartStrs($t('pages.common.withdraw.index.WithdrawMethods'),this.init&&this.init.drawStyleStr?this.init.drawStyleStr.replaceAll(",","、"):"") }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fabu-box" v-if="current === '2'">
				<view class="discountRatio" v-if="init.discountRatio">
					挂单提现享
					<view class="ratio">送{{ init.discountRatio }}%</view>
					优惠
				</view>
				<!-- :class="{ disable: !bankList.length || Number(money) < Number(init.minAmount)||!money }" -->
				<view class="fabu" :style="{ marginTop: init.discountRatio ? '40rpx' : 0

				}" :class="{disable:Number(money) < Number(init.minAmount)
				||	(izSplit === '1' && !minAmount)
				|| !remark
				}" @click="actBtn">发布</view>
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="pwd-box">
				<view class="top-box">
					<view class="title">{{ $t('pages.common.withdraw.index.EnterPaymentPassword') }}</view>
					<svg class="close" @click="closePopup" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
						viewBox="0 0 16 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M1.0649 13.9916C0.674377 14.3821 0.674376 15.0153 1.0649 15.4058C1.45543 15.7963 2.08859 15.7963 2.47911 15.4058L7.85795 10.027L13.3788 15.5479C13.7694 15.9384 14.4025 15.9384 14.793 15.5479C15.1836 15.1573 15.1836 14.5242 14.793 14.1337L9.27216 8.61276L15.207 2.67789C15.5976 2.28736 15.5976 1.6542 15.207 1.26368C14.8165 0.873151 14.1833 0.873151 13.7928 1.26368L7.85795 7.19855L2.06513 1.40573C1.6746 1.0152 1.04144 1.0152 0.650912 1.40573C0.260388 1.79625 0.260388 2.42942 0.650912 2.81994L6.44373 8.61276L1.0649 13.9916Z"
							fill="#A1A1A1" />
					</svg>
				</view>
				<one-input v-model="pwd" :maxlength="6" :isPwd="true" @finish="finishedOne" ref="hi" type="xin">
				</one-input>
				<view class="forget" @click="toUrl('/pages/common/userCenter/service/index')">
					{{ $t('pages.common.withdraw.index.ForgotPassword') }}
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="err" type="center" :mask-click="false">
			<PopItem @close="close" :msg="msg"></PopItem>
		</uni-popup>
		<uni-popup ref="pay" type="right">
			<List :bankList="bankList" @closePay="closePay" @setBank="setBank" @refresh="getBankCardList" :izBindMk="init.izBindMk"/>
		</uni-popup>
		<u-popup v-model="showPop" mode="bottom" border-radius="40">
			<view class="bank-title">收款卡选择</view>
			<view class="bank-list">
				<view class="item" v-for="item in BankList2" @click="handleChangeBank(item)">
					<image class="image" :src="item.logoPc || '/static/img/user/bank/usdt.png'" mode="widthFix"></image>
					<view class="right">
						<view class="card-title">{{ item.bankName + ' ' + item.realName }}</view>
						<view class="card-id">
							<text style="margin-right: 10rpx">**** **** ****</text>
							{{ " " + item.bankNumber.substr(-4) }}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<uni-popup ref="ok" type="right">
			<Success />
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import PopItem from "@/components/common/PopItem/PopItem";
	import List from "./common/list";
	import Success from "./common/success";
	import oneInput from '@/components/myp-one/myp-one'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import LHRadioGroup from '@/components/common/LHRadioGroup/index.vue';
  import imageSvgUrl from '@/components/common/imageSvgUrl'

  import {
		mapGetters
	} from 'pinia';
	import {
		bankCardList,
		init,
		draw
	} from "@/utils/lottery/mine";
	import Playing from '@/utils/common/playing';

	export default {
		name: "index",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			List,
			oneInput,
			Success,
			PopItem,
			LHRadioGroup,
      imageSvgUrl
		},
		data() {
			return {
				selectedValue: '',
				minAmount: '',
				remark: '',
				showPop: false,
				rememberPassword: false,
				izSplit: '1',
				current: '1',
				headerTab: [{
						key: 1,
						name: '普通提现',
					},
					{
						key: 2,
						name: '挂单提现',
					},
				],
				isFocus: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.withdraw.index.WithdrawButton'),
				headerStyle: {
					backgroundColor: "#fff",
					'border-radius': '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040",
					'font-weight': 600
				},
				info: {},
				bankList: [],
				init: {
					minAmount: '0.00',
					maxAmount: '0.00',
					drawAmount: '0.00',
					drawStyleStr: '',
				},
				money: '',
				pwd: '',
				msg: '',
				playing: new Playing(),
				winHeight: 0
			}
		},
		watch: {
			selectedValue(val) {
				const data = this.init?.userBankList?.find(item => item.id === val)
				if (data) {
					this.info = data
				}
			},
			money(val){
				if (parseFloat(val) > this.init.drawAmount) {
					setTimeout(() => {
						this.money = parseInt(this.init.drawAmount)
					});
				}
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor", "webSiteConfig"]),
			dzUSDT() {
				if (!this.money || !this.info.exchangeRatio) {
					return 0
				}
				return this.money / this.info.exchangeRatio
			},
			commissionRatio() {
				const num = this.init.feeDrawCount <= 0 ? this.init.commissionRatio * this.money / 100 : 0
				return this.playing.setAmount(num, 2, '.', ',')
			},
			radioOptions() {
				if (!this.init?.userBankList?.length) {
					return []
				}
				const data = this.init?.userBankList.filter(item => [3, 4].includes(item.type))
				let bankData = this.init?.userBankList?.find(item => item.id === this.info.id && ![3, 4].includes(item
					.type))
				if (!bankData) {
					bankData = this.init?.userBankList?.find(item => item.type === 1)
				}
				if (bankData) {
					data.unshift(bankData)
				}
				return data
			},
			BankList2() {
				if (!this.init?.userBankList?.length) {
					return []
				}
				return this.init.userBankList.filter(item => ![3, 4].includes(item.type))
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			//this.getBankCardList()
			this.getInit()
		},
		onLoad() {

		},
		methods: {
			getRightVal(e) {
				this.$nextTick(() => {
					this.money = parseInt(e.detail.value)
				})
			},
			handleChangeBank(bank) {
				this.selectedValue = bank.id
				this.info = bank
				this.showPop = false
			},
			fabu() {
				uni.$emit("showPop", {
					refName: "AlertMsg",
					data: {
						title: '挂单提现',
						content: '<view style="color: #404040;">您挂单提现<text style="color:#EC3232">300.00</text>已<br/>付款，请确认！</view>',
						confirmText: '已到账',
						closeText: '未到账',
					},
					close: () => {},
					confirm: () => {}
				});
			},
			onChangeTab(index) {
				this.current = index + 1 + ''
				this.getInit()
			},
			backPage() {
				backPage()
			},
			toUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			onClick() {
				this.$refs.pay.open()
			},
			onClick2() {
				if (this.BankList2.length <= 1) {
					return
				}
				this.showPop = true
			},
			closePay() {
				this.$refs.pay.close()
			},
			setBank(item) {
				this.selectedValue = item.id
				this.info = item
			},
			allBtn() {
				this.money = parseInt(this.init.drawAmount)
			},
			getInit() {
				init({
					drawStyle: this.current
				}).then(res => {
					if (res.code == 200) {
						this.init = res.result
						this.bankList = res.result.userBankList||[];
						this.info = this.bankList[0] || {}
						this.selectedValue = this.info.id
						if (!this.bankList.length) {
							//this.backPage()
						}
						this.selectedValue = this.init.userBankList.length ? this.init.userBankList[0].id : ''
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取银行卡列表
			getBankCardList() {
				/**
				 *  2024-03-20  废弃  提现页面直接从init里面获取列表
				 * **/


				// bankCardList().then(res => {
				// 	if (res.code == 200) {
				// 		this.bankList = res.result
				// 		this.info = this.bankList[0] || {}
				// 		this.selectedValue = this.info.id
				// 		if (!res.result.length) {
				// 			this.backPage()
				// 		}
				// 	} else {
				// 		pop(this.$t('pages.common.withdraw.index.ServerError'))
				// 	}
				//
				// }).catch(err => {
				// 	console.log(err)
				// })
			},
			closePopup() {
				this.pwd = ''
				this.$refs.popup.close();
			},
			//提现
			actBtn() {
				if (!this.bankList.length) {
					return
				}
				// console.log(this.money, this.init.minAmount);
				if (Number(this.money) < Number(this.init.minAmount)) {
					// pop(this.$t('pages.common.withdraw.index.AmountTooSmall') + this.init.minAmount, 2000)
					return false
				}
				if (this.current === '2') {
					if (this.izSplit === '1' && !this.minAmount) {
						pop('请输入最小数量', 2000)
						return
					}
					if (!this.remark) {
						pop('请填写备注', 2000)
						return
					}
				}
				/*if(this.money > this.init.maxAmount){
				  pop("提现金额不能大于" + this.init.maxAmount,2000)
				  return false
				}*/
				this.$refs.popup.open();
			},
			finishedOne() {
				let prams = {
					drawStyle: this.current,
					amount: this.money,
					userBankId: this.info.id,
					pinCode: this.pwd
				};
				if (this.current === '2') {
					prams.izSplit = this.izSplit
					prams.minAmount = this.minAmount
					prams.remark = this.remark
				}
				draw(prams).then(res => {
					this.pwd = '';
					if (res.code == 200) {
						this.$refs.popup.close()
						this.$refs.ok.open()
					} else if (res.code == 600) {
						this.msg = res.message
						this.$refs.popup.close()
						this.$refs.err.open()
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			close() {
				this.$refs.err.close()
			},
			formartStrs(str,...args){
				for (let i=0;i<args.length;i++){
					let v=args[i];
					let k=`{$${i}}`;
					str = str.replaceAll(k,v);
				}
				return str;
			},
      toPage(url) {
        uni.navigateTo({
          url: url
        })
      },
		}
	}
</script>

<style lang="scss" scoped>

	.scroll-y {
		flex: 1;
		height: 0;
		box-sizing: border-box;
		margin-top: 20rpx;
		overflow: hidden;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
	}

	::v-deep .uni-popup {
		z-index: 999;
	}

	::v-deep .header {
		grid-template-columns: repeat(3, 20% 60% 20%);

		.u-item-bg {
			border-radius: 12rpx !important;
			height: 56rpx !important;
		}
	}

	.type-method {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		.type-item {
			width: 336rpx;
			height: 80rpx;
			display: grid;
			place-content: center;
			border: 1px solid #F4F4F4;
			border-radius: 12rpx;
			color: #404040;
			font-size: 30rpx;

			&+.type-item {
				margin-left: 20rpx;
			}
		}

		.active {
			background: var(--theme-auxiliary-bg-color);
			color: var(--theme-color);
		}
	}
.disable {
		background: #c0c0c0!important;
	}
	.bank-box {
		display: flex;
		flex-direction: column;
		height: var(--vh);
		.header-tab {
			width: 316rpx;
			height: 68rpx !important;
			box-sizing: border-box;
			margin: 0 auto;
			border-radius: 16rpx !important;
		}

		.bank-row {
			// margin-top: 20rpx;
			height: 148rpx;
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 24rpx;
			overflow: hidden;
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;

			.image {
				width: 68rpx;
				height: 68rpx;
				background: var(--theme-auxiliary-color-default);
				border-radius: 24rpx;
				margin-right: 20rpx;
			}

			.center {
				flex: 1;
			}

      .center-add{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .center-add-txt{
        color: var(--theme-font-default-deep-color);
      }

			.card {
				color: #404040;
				font-size: 28rpx;
			}

			.card-bt {
				color: #3E4347;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}

		.withdraw-box {
			margin-top: 20rpx;
			background: #FFFFFF;
			padding: 20rpx 28rpx;
			box-sizing: border-box;
			border-radius: 24rpx;

			.input-box {
				display: flex;
				align-items: center;
				height: 96rpx;
				border: 1px solid var(--theme-auxiliary-color-default);
				border-radius: 24rpx;
				padding: 0 20rpx;

				.uni-input {
					width: 80%;
					height: 80rpx;
					border: 0;
					background: #fff;
					text-align: left;
				}

				.label-text {
					width: 20%;
					font-weight: 400;
					font-size: 30rpx;
					text-align: right;
					color: var(--theme-auxiliary-color-remind);
				}

				.input-placeholder-text {
					font-weight: 400;
					font-size: 28rpx;
					color: #CCCCCC;
				}
			}

			.focus {
				border: 1px solid var(--theme-color);
			}

			.notice {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				font-size: 28rpx;
				color: var(--theme-font-default-deep-color);

				text {
					color: var(--theme-auxiliary-color-remind);
				}
			}
		}

		.detail {
			padding-top: 20rpx;
			background: #FFFFFF;
			margin-top: 20rpx;
			box-sizing: border-box;
			border-radius: 24rpx;
			// padding: 0 28rpx;
			padding-left: 28rpx;
			padding-right: 28rpx;

			.item {
				display: flex;
				justify-content: space-between;
				font-weight: 400;
				font-size: 30rpx;
				color: var(--theme-font-default-deep-color);;
				// padding: 20rpx 28rpx;
				padding: 20rpx 0;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				.title {
					color: var(--theme-font-default-shallow-color);
				}
			}

			.item:last-child {
				border: none;
			}
		}

		.title-t {
			font-weight: 400;
			font-size: 34rpx;
			color: var(--theme-color);
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			&::before {
				content: '';
				width: 6rpx;
				height: 24rpx;
				border-radius: 6rpx;
				background: var(--theme-color);
				display: block;
				margin-right: 20rpx;
			}
		}

		.next {
			margin-top: 40rpx;
			display: flex;
			justify-content: center;

			.next-btn {
				margin: 0 28rpx;
				width: 100%;
				height: 88rpx;
				display: grid;
				place-content: center;
				border-radius: 16rpx;
				background: var(--theme-color);
				color: #FFF;
				font-size: 34rpx;
			}


		}

		.hint {
			display: flex;
			justify-content: center;

			.hint-box {
				width: 705rpx;
				margin-top: 42rpx;
				padding-bottom: 30rpx;

				.hint-title {
					font-weight: 500;
					font-size: 26rpx;
					color: var(--theme-auxiliary-color-remind);
					display: flex;
					align-items: center;


				}

				.content {
					font-size: 26rpx;
					color: var(--theme-auxiliary-color-remind);

					.label {
						display: flex;
						align-items: center;
						color: var(--theme-font-default-shallow-color);
					}
				}
			}
		}

		.pwd-box {
			height: 262rpx;
			width: 684rpx;
			border-radius: 24rpx;
			background: #FFFFFF;
			padding: 20rpx 28rpx;
			box-sizing: border-box;

			.top-box {
				margin-bottom: 20rpx;

				.title {
					font-size: 30rpx;
					text-align: center;
					color: #404040;
					text-align: center;
				}

				.close {
					position: absolute;
					right: 20rpx;
					top: 20rpx;
					width: 34rpx;
					height: 34rpx;
				}
			}

			::v-deep .code-box {
				.item {
					border-radius: 24rpx;

					.dot-xin {
						font-size: 24rpx;
					}
				}
			}

			.forget {
				margin-top: 20rpx;
				font-weight: 400;
				font-size: 28rpx;
				text-align: center;
				color: var(--theme-color);
			}
		}
	}


	#type-method-input-box {
		flex-direction: column;
		height: fit-content;
		border: none;
		padding: 0;

		.title {
			color: #404040;
			font-family: MiSans;
			font-size: 30rpx;
			margin-right: 20rpx;
			white-space: nowrap;
		}

		.input {
			display: flex;
			align-items: center;
			width: 100%;
			position: relative;

			.tips {
				position: absolute;
				right: 0;
			}

			.uni-input {
				height: 34rpx;
			}
		}

		.line {
			width: 100%;
			height: 1px;
			margin: 20rpx 0;
			background: var(--theme-auxiliary-color-default);
		}
	}

	::v-deep .way-item-group {
		.lh-radio {
			border-top: 1px solid var(--theme-auxiliary-color-default);

			&:first-child {
				border: none;
			}
		}
	}

	.way-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 22rpx 0;
		width: 100%;

		.left {
			display: flex;
			align-items: center;

			.logo {
				width: 68rpx;
				height: 68rpx;
			}

			.groupName {
				margin-left: 20rpx;
				font-size: 30rpx;
			}
		}

		.right {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 340rpx;

			.text {
				color: #404040;
				font-size: 28rpx;
			}

			.qr-code {
				width: 88rpx;
				height: 88rpx;
			}
		}
	}

	.fabu-box {
		padding: 40rpx 0;

		.discountRatio {
			display: flex;
			align-items: center;
			padding: 20rpx 28rpx;
			color: #EC3232;
			font-size: 28rpx;

			.ratio {
				background: url('/static/img/index/Vector.png');
				color: #fff;
				background-size: 100% 100%;
				padding: 4rpx 10rpx 4rpx 16rpx;
				font-size: 24rpx;
				margin: 0 10rpx;
			}
		}
	}

	.fabu {
		width: 694rpx;
		height: 88rpx;
		display: grid;
		place-content: center;
		margin: 0 auto;
		margin-top: 40rpx;
		color: #fff;
		font-size: 34rpx;
		background: var(--theme-color);
		border-radius: 16rpx;
	}

	.bank-title {
		height: 88rpx;
		display: grid;
		place-content: center;
		color: #3E4347;
		font-size: 34rpx;
		background: #F4F4F4;
	}

	.bank-list {
		background: #fff;

		.item {
			display: flex;
			align-items: center;
			height: 148rpx;
			margin: 0 28rpx;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);

			.image {
				width: 68rpx;
				height: 68rpx;
				margin-right: 20rpx;
			}

			.right {
				.card-title {
					color: #404040;
					font-size: 30rpx;
				}

				.card-id {
					color: #3E4347;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
