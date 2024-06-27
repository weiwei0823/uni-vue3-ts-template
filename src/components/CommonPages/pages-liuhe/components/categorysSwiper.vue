<template>
  <view
      class="category-swiper"
      :class="['theme-' + themeColor.name]"
      :data-status-isTop="isTop"
      :style="{ marginTop: `${isTop ? categorySwiperMarginTopRpxInIsTop : categorySwiperMarginTopRpx}rpx` }"
      @touchmove="onTouchMove"
      @touchstart="onTouchBegin"
      @touchend="onTouchEnd"
      @mousemove="onMouseMove"
      @mousedown="onMouseDown"
      @mouseup="onMouseEnd"
  >
    <view class="tabs_block">
      <view class="tabs"></view>
      <view :class="{ tabsa: true }">
        <u-tabs-swiper
            :key="swiperKey"
            ref="tabs"
            inactive-color="#A1A1A1"
            active-color="#404040"
            swiperWidth="750"
            :show-bar="false"
            :list="tabsList"
            :current="current"
            :is-scroll="false"
            :scrollWithAnimation="false"
            @scroll="handleScroll"
            @change="handleTabsChange"
        >
          <template #tab="{ item, index }">
            <view class="tab">
              <view class="img-box" :style="[item.tab.style, index === current ? item.tab._style : '']">
                <!-- <image class="img" :src="item.tab.img"></image> -->
                <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_25392_88764)">
                    <path
                        d="M5.69332 10.8715C5.76235 11.6058 6.93148 14.4317 9.83668 14.4317C11.0572 14.4317 12.6728 14.6814 12.9431 16.2119C13.0782 16.98 12.2939 18.885 9.66484 18.885C4.64757 18.885 5.69332 10.8715 5.69332 10.8715ZM12.852 8.33786C10.6944 8.33639 8.94662 5.50169 8.94662 2.00605C8.94662 1.63299 8.98627 1.1997 9.06705 0.707669C9.11553 0.413642 9.07342 0.111825 8.94631 -0.157705C8.81921 -0.427236 8.61313 -0.651728 8.35543 -0.801374C8.09773 -0.95102 7.80061 -1.01874 7.50352 -0.995542C7.20643 -0.972344 6.92342 -0.859325 6.69207 -0.671492C2.07871 3.0753 -0.149391 7.58292 0.00776591 12.8543C0.139954 17.3501 5.37901 21 10.621 21C15.8615 21 20.1106 17.3531 20.1106 12.8543C20.1106 10.776 19.3777 8.55964 17.9119 6.20082C17.7806 5.98967 17.5978 5.81531 17.3808 5.69408C17.1637 5.57285 16.9194 5.50872 16.6707 5.50769C16.4221 5.50666 16.1772 5.56877 15.9591 5.68821C15.7411 5.80764 15.5569 5.98048 15.4238 6.19054C14.5176 7.6211 13.6613 8.33786 12.8535 8.33786H12.852Z"
                        fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_25392_88764">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.0003 5.1504C11.9014 3.79508 13.2902 2.79192 14.9161 2.39134C14.1862 0.971383 12.7067 0 11.0003 0C9.29385 0 7.81433 0.971383 7.08447 2.39134C8.71039 2.79192 10.0992 3.79508 11.0003 5.1504ZM9.9467 5.56233C5.92854 6.04165 2.74174 9.22847 2.26242 13.2465C0.891082 12.2463 0 10.6271 0 8.79991C0 5.76236 2.46245 3.29994 5.50003 3.29994C7.32731 3.29994 8.94646 4.19101 9.9467 5.56233ZM19.7376 13.2465C21.1089 12.2463 22 10.6271 22 8.79991C22 5.76236 19.5376 3.29994 16.5 3.29994C14.6728 3.29994 13.0536 4.19101 12.0533 5.56233C16.0714 6.04165 19.2583 9.22847 19.7376 13.2465ZM11.0003 21.9998C15.2529 21.9998 18.7003 18.5524 18.7003 14.2998C18.7003 10.0473 15.2529 6.59988 11.0003 6.59988C6.74767 6.59988 3.30024 10.0473 3.30024 14.2998C3.30024 18.5524 6.74767 21.9998 11.0003 21.9998ZM8.25013 12.3748C8.25013 11.9192 8.6195 11.5498 9.07514 11.5498H13.7502C14.0939 11.5498 14.4016 11.7629 14.5225 12.0846C14.6431 12.4058 14.5524 12.7682 14.2947 12.9946L14.2938 12.9954L14.2804 13.0075C14.268 13.0187 14.2481 13.037 14.2215 13.0622C14.1683 13.1127 14.0882 13.1908 13.988 13.2949C13.7873 13.5034 13.5082 13.8143 13.2039 14.2147C12.5922 15.0194 11.8974 16.1621 11.5211 17.5418C11.4012 17.9815 10.9477 18.2407 10.5081 18.1208C10.0684 18.0009 9.80928 17.5473 9.92918 17.1078C10.3779 15.4625 11.1956 14.1302 11.8902 13.2162L11.9027 13.1998H9.07514C8.6195 13.1998 8.25013 12.8304 8.25013 12.3748Z"
                      fill="white"
                  />
                </svg>
                <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.14179 3.53399C6.11661 3.51574 6.09719 3.50577 6.083 3.49089C5.80878 3.20402 5.5182 3.1415 5.2588 3.31432C5.00233 3.48506 4.93882 3.79173 5.10047 4.15535C5.30493 4.61542 5.63282 4.97606 6.03023 5.2716C6.07802 5.3072 6.19085 5.31768 6.23392 5.28545C6.68832 4.9459 7.07308 4.54279 7.26066 3.98784C7.36992 3.66448 7.22987 3.38771 6.91373 3.26914C6.58941 3.14758 6.33742 3.26266 6.14179 3.53399ZM16.5401 18.5106C16.5227 18.4831 16.5321 18.5032 16.5459 18.5191C16.7886 18.7971 17.107 18.8519 17.3928 18.6657C17.6565 18.4936 17.7228 18.2233 17.5687 17.8745C17.3592 17.4004 17.0181 17.0327 16.6125 16.7257C16.5651 16.69 16.4525 16.6793 16.4093 16.7112C15.9465 17.0535 15.5569 17.4628 15.3883 18.035C15.2719 18.4307 15.5483 18.8038 15.9433 18.7613C16.1359 18.7407 16.3168 18.6086 16.5401 18.5106ZM11.224 7.32912C11.1418 7.2152 11.0747 7.11604 11.0016 7.02154C10.1542 5.92627 9.08552 5.37404 7.69062 5.67798C6.4676 5.94426 5.57349 7.00355 5.47689 8.25921C5.41989 9.00031 5.60186 9.6952 5.89921 10.3571C6.93567 12.6649 8.55393 14.4984 10.531 16.0078C11.3863 16.6608 11.151 16.6384 12.0476 15.9831C13.1415 15.1835 14.0728 14.2019 14.9276 13.1485C15.7419 12.145 16.4642 11.0808 16.9049 9.84769C17.1478 9.16769 17.2921 8.47565 17.0709 7.75229C16.4933 5.86193 13.9342 4.9875 12.2773 6.11565C11.8275 6.42206 11.4981 6.83488 11.224 7.32912ZM4.5463 0H18.117C18.1495 0.0132039 18.1808 0.0328803 18.2144 0.0384466C19.74 0.293463 20.8281 1.55793 20.8291 3.10214C20.8327 8.36984 20.8334 13.6378 20.8288 18.9055C20.8273 20.6041 19.4589 21.9915 17.7819 21.9937C13.4792 21.9992 9.17644 22.0067 4.87381 21.9883C3.62945 21.983 2.7108 21.3588 2.1483 20.2378C1.99496 19.9322 1.9349 19.5784 1.83203 19.2467V2.74951C1.84583 2.70964 1.86526 2.67068 1.87241 2.62964C2.05821 1.5534 2.63605 0.769579 3.60747 0.30343C3.90175 0.162201 4.23233 0.0990291 4.5463 0Z"
                      fill="white"
                  />
                </svg>
                <svg v-else-if="index === 3" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 13.379 0.755187 15.5815 2.03891 17.3811C2.82849 18.184 3.77252 18.9285 4.48296 18.9079C5.91504 18.8664 6.49617 18.4513 7.18107 17.7249C5.87353 17.5173 5.45843 17.372 4.69051 16.5211C5.68673 17.1645 7.32636 18.2022 9.09051 16.0022C8.30183 16.0022 7.34711 15.7532 6.35088 14.757C7.34711 15.3588 8.65466 16.023 10.4396 14.6117C9.79617 14.3211 8.4056 13.5947 8.53013 12.3287C8.61089 11.5076 9.10192 10.7738 9.72017 9.84995C10.0552 9.34925 10.4277 8.79272 10.7924 8.1362C11.8301 6.26827 13.0131 3.88148 13.1169 3.48714C13.1377 4.67016 13.449 8.1362 14.3207 8.86261C14.6022 9.09721 14.8383 9.26038 15.0317 9.39405L15.0317 9.39406C15.4371 9.67429 15.6551 9.82493 15.7113 10.2324C15.7882 10.7903 15.4194 10.9202 14.952 11.085L14.9515 11.0851C14.9147 11.0981 14.8774 11.1113 14.8396 11.1249C14.3207 11.3117 14.0301 11.6853 14.3207 12.3287C14.6113 12.972 14.7981 13.5532 14.3207 13.823C13.9388 14.0388 13.5943 14.1897 13.4698 14.2381C13.6289 14.3557 13.9762 14.6283 14.0924 14.7777C14.2377 14.9645 14.2169 15.2551 13.8018 15.5871C13.3867 15.9192 13.2622 16.1475 13.366 17.1437C13.4698 18.14 12.9301 18.7419 12.0792 18.7211C11.9575 18.7181 11.8299 18.7092 11.6963 18.6999C10.8954 18.644 9.87898 18.573 8.6339 19.6758C8.11985 20.1311 7.61391 20.7277 7.17356 21.3162C8.36527 21.7584 9.65442 22 11 22ZM11.0207 8.19849C12.0335 8.68 13.1999 8.39912 13.6566 8.19849C13.0339 8.82113 12.349 8.84188 12.2037 8.84188C12.183 8.98717 12.0584 9.25698 11.8924 9.42302C11.9754 9.29018 11.9685 8.98025 11.9547 8.84188C11.9062 8.8488 11.7762 8.85849 11.6433 8.84188C11.6022 8.98578 11.4389 9.23148 11.2342 9.41766C11.3459 9.31119 11.3875 8.96356 11.3943 8.80037C11.2905 8.77962 11.2282 8.75886 11.1245 8.6966C10.9584 8.99618 10.6817 9.26419 10.5641 9.36075C10.8708 9.09017 10.9579 8.56872 11.0027 8.30062C11.0095 8.26026 11.0153 8.22564 11.0207 8.19849Z"
                      fill="white"
                  />
                </svg>
                <svg v-else-if="index === 4" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.836 16.2885L11 19.6731C11.737 19.6731 12.463 19.6731 13.387 18.9172C14.146 18.2967 15.037 17.1459 15.95 15.9049C19.25 15.1603 22 13.3326 22 11.2115C22 9.13564 19.371 7.35308 16.159 6.56333C15.521 5.31103 14.806 4.13769 13.563 3.5059C12.1 2.75 9.9 2.75 7.7 2.75L9.526 6.49564C6.952 7.09359 4.84 8.39103 4.125 9.99308C4.026 9.45154 3.883 8.95513 3.663 8.58282C2.937 7.26282 1.463 7.26282 0 7.26282C1.21 7.26282 1.65 9.0341 1.65 11.2115C1.65 13.389 1.21 15.1603 0 15.1603C1.463 15.1603 2.937 15.1603 3.663 13.8403C3.883 13.4679 4.026 12.9715 4.125 12.43C5.049 14.4833 8.25 16.0515 11.836 16.2885ZM15.4001 10.6475C15.4001 10.0244 15.8926 9.51927 16.5001 9.51927C17.1076 9.51927 17.6001 10.0244 17.6001 10.6475C17.6001 11.2706 17.1076 11.7757 16.5001 11.7757C15.8926 11.7757 15.4001 11.2706 15.4001 10.6475Z"
                      fill="white"
                  />
                </svg>
                <svg v-else-if="index === 5" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <g clip-path="url(#clip0_23875_77890)">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.882 2.19995C19.9 2.19995 21.166 6.72367 21.8816 13.0347C22.2118 16.3856 21.9366 19.1781 19.9552 19.1222C18.2003 19.1222 17.48 18.1355 16.7159 17.0888C16.2338 16.4283 15.7342 15.744 14.9463 15.2686C14.1757 14.8776 12.4695 14.7102 11.0384 14.6543C9.60731 14.7102 7.90111 14.8776 7.13053 15.2686C6.34263 15.744 5.84307 16.4283 5.36094 17.0888C4.59685 18.1355 3.87654 19.1222 2.12168 19.1222C0.0852334 19.1222 -0.245042 16.3298 0.140248 12.9789C0.80069 6.72367 2.06667 2.19995 6.08469 2.19995C7.15674 2.19995 7.93899 2.78802 8.71246 3.36949C9.40834 3.89263 10.0971 4.41043 10.9834 4.48979C11.8357 4.41116 12.5183 3.90215 13.2132 3.38398C13.9993 2.79783 14.8011 2.19995 15.882 2.19995ZM3.2775 9.57196C3.2775 11.1357 4.5435 12.4761 6.13965 12.4761C7.68081 12.4761 9.0018 11.1915 9.0018 9.57196C9.0018 7.95236 7.73593 6.66781 6.13965 6.66781C4.5435 6.66781 3.2775 8.00818 3.2775 9.57196ZM16.7076 10.1306H18.9643V9.01354H16.7076V6.77963H15.6068V9.01354H13.3501V10.1306H15.6068V12.4204H16.7076V10.1306ZM4.98388 10.7448C4.65371 10.4097 4.48858 10.0188 4.48858 9.57201C4.48858 9.12524 4.65371 8.67837 4.98388 8.39918C5.31415 8.06405 5.69944 7.89648 6.13974 7.89648C6.58015 7.89648 7.02046 8.11998 7.29561 8.39918C7.62589 8.7343 7.79104 9.12524 7.79104 9.57201C7.79104 10.0188 7.57087 10.4656 7.29561 10.7448C6.96544 11.08 6.58015 11.2475 6.13974 11.2475C5.69944 11.2475 5.25916 11.0241 4.98388 10.7448Z"
                        fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_23875_77890">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg v-else-if="index === 6" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.78562 16.319L8.5853 13.7511L8.1472 12.375L7.65948 10.8432L4.8232 9.92687L4.01155 10.7671L2.79071 12.0308L1.77658 11.0572L1.61114 10.8984C1.6102 10.9538 1.60962 11.0093 1.60962 11.0651C1.60962 13.385 2.41704 15.5123 3.76063 17.1708L4.00661 15.8491L5.7221 16.1392L6.78562 16.319ZM14.2198 17.0377L12.3353 14.4879H10.8843H9.28827L7.51245 16.968L8.05086 18.0048L8.87034 19.5831L7.81735 20.16C8.78067 20.4834 9.81188 20.6586 10.8843 20.6586C11.9565 20.6586 12.9878 20.4834 13.9512 20.16L12.8982 19.5831L13.7177 18.0048L14.2198 17.0377ZM17.4241 9.92687L14.3576 10.9489L13.9122 12.3201L13.4147 13.8511L15.2384 16.3223L16.4148 16.1274L18.185 15.8339L18.4388 17.1708C19.8254 15.4933 20.6587 13.3417 20.6587 10.9953C20.6587 10.9388 20.658 10.8827 20.657 10.8266L20.4864 10.9873L19.4398 11.9719L18.1799 10.6938L17.4241 9.92687ZM10.4636 7.8453L10.4355 4.52288L9.31324 3.95358L7.676 3.12295L8.30131 1.77898L8.38012 1.60989C6.77018 2.06362 5.33104 2.93298 4.18257 4.09694C3.60384 4.68347 3.09889 5.34502 2.68306 6.06556L3.13327 6.00754L4.54032 5.82619L4.80477 7.6012L4.96634 8.68468L8.00105 9.65867L9.15072 8.81201L10.4636 7.8453ZM11.8051 4.69345L11.8344 8.1516L12.9566 8.98016L14.2388 9.92675L17.0543 8.97322L17.2308 7.78615L17.4909 6.03577L18.8747 6.2146L19.3174 6.27182C18.9084 5.56128 18.4119 4.90891 17.8428 4.33052C16.7133 3.18271 15.2978 2.32542 13.7146 1.87798L13.792 2.04472L14.4071 3.37004L12.7969 4.18915L11.8051 4.69345ZM11.0001 0C14.0377 0 16.7877 1.23115 18.7784 3.22187C20.769 5.21235 22.0002 7.9624 22.0002 11.0001C22.0002 14.0375 20.769 16.7875 18.7784 18.7781C16.7877 20.7687 14.0377 22 11.0001 22C7.96256 22 5.2125 20.7687 3.22189 18.7781C1.23116 16.7875 0 14.0375 0 11.0001C0 7.9624 1.23116 5.21235 3.22189 3.22187C5.2125 1.23115 7.96256 0 11.0001 0Z"
                      fill="white"
                  />
                </svg>
                <svg v-else-if="index === 7" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <g clip-path="url(#clip0_104_36990)">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.6484 1.3441C13.6705 1.31444 13.6932 1.28503 13.7164 1.25588C14.8638 -0.183749 16.9611 -0.420636 18.4007 0.726783C19.8403 1.8742 20.0772 3.97142 18.9298 5.41106C18.9066 5.4402 18.883 5.46884 18.859 5.497L13.6484 1.3441ZM6.50814 1.34421C6.48604 1.31455 6.46338 1.28514 6.44016 1.256C5.29274 -0.183637 3.19552 -0.420524 1.75588 0.726895C0.316251 1.87431 0.0793642 3.97153 1.22678 5.41117C1.25001 5.44031 1.27362 5.46896 1.29762 5.49711L6.50814 1.34421ZM17.374 16.0901C18.2962 14.7039 18.8335 13.0397 18.8335 11.25C18.8335 6.41746 14.9159 2.49994 10.0834 2.49994C5.25093 2.49994 1.33341 6.41746 1.33341 11.25C1.33341 13.059 1.88241 14.7399 2.8229 16.135L1.5088 18.4111C1.21635 18.9176 1.3899 19.5653 1.89645 19.8578C2.403 20.1502 3.05073 19.9767 3.34318 19.4701L4.29869 17.8151C5.8408 19.175 7.86577 20 10.0834 20C12.3189 20 14.3586 19.1617 15.9052 17.7823L16.8796 19.47C17.1721 19.9766 17.8198 20.1501 18.3264 19.8577C18.8329 19.5652 19.0065 18.9175 18.714 18.411L17.374 16.0901ZM9.20029 6.30427C8.68465 6.30427 8.26663 6.72228 8.26663 7.23793V11.595C8.26663 11.5992 8.26666 11.6034 8.26671 11.6076C8.26677 11.6119 8.26685 11.6161 8.26697 11.6203C8.26988 11.9399 8.43702 12.2498 8.73391 12.4212L10.9126 13.6791C11.3591 13.9369 11.9302 13.7839 12.188 13.3373C12.4458 12.8907 12.2928 12.3197 11.8462 12.0619L10.134 11.0733V7.23793C10.134 6.72228 9.71594 6.30427 9.20029 6.30427Z"
                        fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_104_36990">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg v-else-if="index === 8" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <g clip-path="url(#clip0_104_36998)">
                    <path
                        d="M11.8845 19.5523L15.386 21.3911C15.7383 21.5755 16.1351 21.6576 16.5316 21.6283C16.9281 21.599 17.3085 21.4594 17.6298 21.2252C17.9512 20.9911 18.2006 20.6718 18.35 20.3033C18.4995 19.9349 18.5429 19.532 18.4753 19.1402L17.8081 15.2455C17.7493 14.9046 17.7745 14.5547 17.8813 14.2257C17.9882 13.8968 18.1735 13.5989 18.4213 13.3576L21.2506 10.5994C21.5355 10.3218 21.737 9.96991 21.8324 9.58368C21.9277 9.19744 21.9131 8.79223 21.7902 8.41386C21.6673 8.0355 21.4409 7.69908 21.1368 7.44265C20.8326 7.18622 20.4627 7.02002 20.069 6.96283L16.1583 6.39458C15.8171 6.344 15.4932 6.21145 15.2144 6.00829C14.9357 5.80513 14.7103 5.53741 14.5576 5.22807L12.8039 1.68852C12.6278 1.33177 12.3555 1.03139 12.0176 0.82135C11.6797 0.611313 11.2899 0.5 10.892 0.5C10.4942 0.5 10.1043 0.611313 9.76645 0.82135C9.42859 1.03139 9.15624 1.33177 8.98019 1.68852L7.23143 5.23407C7.07877 5.54341 6.8534 5.81113 6.57462 6.01429C6.29583 6.21746 5.97196 6.35 5.63073 6.40059L1.72002 6.96883C1.32632 7.02602 0.956469 7.19222 0.652304 7.44865C0.348138 7.70508 0.121792 8.0415 -0.00113802 8.41987C-0.124068 8.79823 -0.138676 9.20344 -0.0433095 9.58968C0.0520567 9.97591 0.253592 10.3278 0.538503 10.6054L3.36774 13.3636C3.61554 13.6049 3.80088 13.9028 3.90773 14.2317C4.01458 14.5607 4.03973 14.9106 3.98101 15.2515L3.30871 19.1402C3.24067 19.5325 3.28387 19.9361 3.43342 20.3051C3.58297 20.6742 3.8329 20.994 4.15488 21.2283C4.47687 21.4626 4.85804 21.602 5.25521 21.6308C5.65238 21.6596 6.04967 21.5766 6.40207 21.3911L9.9036 19.5523C10.2092 19.3924 10.5491 19.3088 10.894 19.3088C11.239 19.3088 11.5788 19.3924 11.8845 19.5523Z"
                        fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_104_36998">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </view>
              <view class="name" :class="{ currentName: index === current }">{{ item.name }}</view>
            </view>
            <image class="bottom-img" :data-isTop="isTop ? 'true' : 'false'" :src="`/static/imgs-liuhe/index_02/Back.png`" v-if="index === current"></image>
          </template>
        </u-tabs-swiper>
        <view class="loading" v-if="tabsList.length === 0">
          <image src="@/static/img/loading_v2.gif" mode=""></image>
          <view class="">加载中...</view>
        </view>
        <view v-show="tabsList.length > 0" class="tbas-bar" :style="`--left: ${barLeft}`">
          <view class="bar"></view>
        </view>
      </view>
    </view>
    <view class="swiper-item"
          :style="{ minHeight: caculationMinHeight(false) }">
      <view class="swiper-item-content">
        <scroll-view
            :scroll-y="fatherScroll"
            :ref="`paging${swiperCurrent}`"
            :style="{ height: useAllItemsScroll ? caculationMinHeight(true) : 'auto' }"
            @scrolltolower="getList({}, tabsList[swiperCurrent])"
            @scroll="scrollTest"
        >
          <template v-if="!getDataLoading">
            <category v-if="tabsList[swiperCurrent] && +tabsList[swiperCurrent].dataType === 2"
                      v-bind="$attrs"
                      :key="`${swiperCurrent}`"
                      :data="currentCategoryData"
                      :categoryGameData="categoryGameData"
                      :swiperCurrent="swiperCurrent"
                      :height="categoryStyle['min-height'] || categoryStyle['height']"
                      :isTop="isTop"
                      :scrolltolower="isTop"
                      :scrollTop="scrollTop"
                      v-on:drageTop="onCategoryDrageTop"
                      @getCurrentSwiperHeight="getCurrentSwiperHeight"
            />
            <categoryOther v-else
                           class="category-other"
                           v-bind="$attrs"
                           :key="`${swiperCurrent}`"
                           :clearPlayShow="current === 7"
                           :isGameHall="isGameHall"
                           :data="currentCategoryData"
                           :categoryGameData="categoryGameData"
                           :swiperCurrent="swiperCurrent"
                           :height="categoryStyle['min-height'] || categoryStyle['height']"
                           :isTop="isTop"
                           :dataType="tabsList[swiperCurrent] ? tabsList[swiperCurrent].dataType : 0"
                           :scrolltolower="isTop"
                           :tabsIsChange="tabsIsChange"
                           :scrollTop="scrollTop"
                           v-on:drageTop="onCategoryDrageTop"
                           @newGetList="newGetList"
                           @getCurrentSwiperHeight="getCurrentSwiperHeight"
            />
          </template>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import {categoryData} from '@/utils/lottery/betting';
import zPaging from './zPaging.vue';
import OneItem from '@/pages/liuhe/common/OneItem';
import styleType1 from './styleType1.vue';
import styleType2 from './styleType2.vue';
import lottery from './lottery.vue';
import category from './category.vue';
import categoryOther from './categoryOther.vue';
import categoryItem from './categoryItem.vue';
import collectionItem from './collectionItem.vue';
import categoryOtherHot from './categoryOtherHot.vue';
import {userNewlyPlay} from '@/utils/lottery/mine';
import {style2GameCollectList} from '@/utils/lottery/list';
import {mapGetters, mapState} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
import useSystemInfoStore from "@/store/modules/systemInfoStore";

export default {
  props: {
    optionId: null,
    fatherScroll: true,
    isGameHall: false,
    /**
     * 直接在大厅容器中使用 有标题栏会导致计算最低高度错误 添加容错差量
     **/
    offSetHeightRpx: {
      type: Number,
      default: 0
    },

    parentEmitScrollEventName: {
      type: String,
      default: 'on_liuhe_page_02_scroll'
    },
    /**
     * TOP状态下Y位置
     */
    fillPageTopY: {
      type: Number,
      default: 0
    },

    lockedTopY: {
      type: Boolean,
      default: false
    },

    fixedTabsY: {
      type: Number,
      default: 0
    },
    categoryList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    categoryDataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    categoryGameData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    categorySwiperMarginTopRpx: {
      type: Number,
      default: 20
    },
    categorySwiperMarginTopRpxInIsTop: {
      type: Number,
      default: 20
    },
    /**
     * 页面锁定不适用外层父容器滚动来带动 组件自身的scroll设置高顿滚动 查看那大厅布局即可
     */
    useAllItemsScroll: {
      type: Boolean,
      default: false
    },

    useTabsFollowPageScrollElemetSelector: {
      type: String,
      default: null
    },
    scrollTop: Number,
  },

  components: {
    zPaging,
    OneItem,
    styleType1,
    styleType2,
    lottery,
    category,
    categoryItem,
    collectionItem,
    categoryOther,
    categoryOtherHot
  },
  computed: {
    ...mapState(useAppInfoStore, ["themeColor"]),
    ...mapState(useSystemInfoStore, ["uWindowHeight"]),
    //数据类型 热门 以及彩票 滚动容器似乎与其它游戏类型不一致 所以特殊处理
    isLockedHeight() {
      return true;
    },

    nowCurrentDataType() {
      if (this.tabsList && this.tabsList.length > this.swiperCurrent && this.tabsList[this.swiperCurrent]) {
        return this.tabsList[this.swiperCurrent].dataType;
      }
      return '-1';
    },

    nowCurrentRendderSize() {
      if (this.tabsList && this.tabsList.length > this.swiperCurrent && this.tabsList[this.swiperCurrent] && this.tabsList[this.swiperCurrent]['list']) {
        return this.tabsList[this.swiperCurrent].list.length;
      }
      return 0;
    },

    //在置顶 情况以及 不锁定高度的情况  锁定容器高度 避免撑大页面导致可以拉动
    categoryStyle() {
      let add = 0;
      let styles = {};
      let _sysInfo = uni.getSystemInfoSync();

      let renderSize = this.nowCurrentRendderSize;
      if (this.zpageResizeTime) add = 0;
      if (!this.isLockedHeight) {
        if (!this.isTop) {
          styles['height'] = this.swiperBoxHeight + 'px';
        } else {
          if (renderSize == 0 || this.swiperBoxHeight < (this.uWindowHeight || _sysInfo.windowHeight - this.tabHeight)) {
            styles['min-height'] = `calc( ${this.uWindowHeight || _sysInfo.windowHeight}px - ${this.tabHeight}px - 20rpx )`;
          } else {
            styles['height'] = this.swiperBoxHeight + add + 'px';
          }
        }
      } else {
        styles['height'] = this.caculationMinHeight(true, true);
      }
      styles['width'] = '100%';
      return styles;
    },
  },
  data() {
    return {
      swiperKey: 1,
      tabsMap: {
        0: {
          img: '@/static/imgs-liuhe/index_02/categorys/hot.png',

          style: {
            background: '#f4897e'
          },
          _style: {
            background: 'linear-gradient(180deg, #F86758 0%, #E44332 65.63%, #F86758 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(255, 132, 43, 0.25), 0px 0px 4px 0px #F8A558 inset'
          }
        },
        2: {
          img: '@/static/imgs-liuhe/index_02/categorys/lottery.png',
          style: {
            background: '#f5d17c'
          },
          _style: {
            background: 'linear-gradient(180deg, #F4CF4B 0%, #EDA73D 65.63%, #F4CF4B 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(237, 169, 62, 0.25), 0px 0px 4px 0px #FFDD2B inset'
          }
        },
        3: {
          img: '@/static/imgs-liuhe/index_02/categorys/chess.png',
          style: {
            background: '#f989c6'
          },
          _style: {
            background: 'linear-gradient(180deg, #F860B2 0%, #EC399A 65.63%, #F860B2 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(255, 63, 166, 0.25), 0px 0px 4px 0px #FF48CC inset'
          }
        },
        4: {
          img: '@/static/imgs-liuhe/index_02/categorys/beauty.png',
          style: {
            background: '#f8829e'
          },
          _style: {
            background: 'linear-gradient(180deg, #FB597F 0%, #EB3963 65.63%, #FB597F 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(240, 62, 105, 0.25), 0px 0px 4px 0px #FF3666 inset'
          }
        },
        6: {
          img: '@/static/imgs-liuhe/index_02/categorys/fishing.png',
          style: {
            background: '#80acf9'
          },
          _style: {
            background: 'linear-gradient(180deg, #4C92FC 0%, #486BE9 65.63%, #4C92FC 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(55, 135, 255, 0.25), 0px 0px 4px 0px #37C3FF inset'
          }
        },
        5: {
          img: '@/static/imgs-liuhe/index_02/categorys/game.png',
          style: {
            background: '#f9a07a'
          },
          _style: {
            background: 'linear-gradient(180deg, #FA8544 0%, #F1683C 65.63%, #FA8544 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(242, 107, 61, 0.25), 0px 0px 4px 0px #FFA337 inset'
          }
        },
        7: {
          img: '@/static/imgs-liuhe/index_02/categorys/sports.png',
          style: {
            background: '#60bef6'
          },
          _style: {
            background: 'linear-gradient(180deg, #02B9F2 0%, #3D85F2 65.63%, #02B9F2 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(46, 147, 242, 0.25), 0px 0px 4px 0px #14BDF2 inset'
          }
        },
        8: {
          img: '@/static/imgs-liuhe/index_02/categorys/clark.png',
          style: {
            background: '#5ff2a3'
          },
          _style: {
            background: 'linear-gradient(180deg, #14F287 0%, #20DC55 65.63%, #14F287 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(30, 223, 92, 0.25), 0px 0px 4px 0px #8AFFEA inset'
          }
        },
        9: {
          img: '@/static/imgs-liuhe/index_02/categorys/colection.png',
          style: {
            background: '#f5a56b'
          },
          _style: {
            background: 'linear-gradient(180deg, #FF8C39 0%, #ED7A27 65.63%, #FF8C39 100%)',
            'box-shadow': '0px 4px 4px 0px rgba(240, 125, 42, 0.25), 0px 0px 4px 0px #FF8C39 inset'
          }
        }
      },
      tabsList: [],
      barLeft: '',
      current: 0,
      swiperCurrent: 0,
      swiperCurrentType: 0,
      dx: 0,
      loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
      swiperBoxHeight: 0,
      offsetSizeHeight: 0,
      isTop: false,
      tabHeight: 0,
      tabSeed: -1,
      showList: [],
      antiShakeTimmer: -1,
      zpageResizeTime: 0,
      // 当前左侧tab的list数据
      currentCategoryData: [],
      touchStartInTab: false,
      lastTouchPointY: -1,
      touchBeginX: -1,

      mouseDowned: false,
      pageY: 0,
      isLoading: false,
      tabsLeft: 0,
      tabsTop: -1,
      tabsIsChange: false,
      tabsKey: 0,
      debugMsg: 'none',
      clearPlayShow: false,
      winHeight: 0,
      ouInner: false,
      isApp: false,
      isIOS: false,
      // 获取数据的loading状态
      getDataLoading: false
    };
  },
  watch: {
    // 进入收藏手动加载数据
    "swiperCurrent": {
      handler(val, oldv) {
        this.showList = [val, oldv];
        //切换到彩票也开始加载
        if (this.tabsList.length > val) {
          this.swiperCurrentType = this.tabsList[val].dataType;
          if (+this.swiperCurrentType === 1) {
            //20230721 测试新增 。六合环境下队列式预加载彩票页 开测试效果 加载延迟大移除
            this.$config.stationHasLotteryGames() && this.$store.dispatch('preloadPagesByPathsQueue', this.$config.gameRouterMgr.getAllGamePaths());
          }
        }
      },
      immediate: true
    },
    categoryList(newVal, oldVal) {
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
      this.tabsList = newVal.map((item) => {
        return {
          id: item.id,
          name: item.name,
          tab: this.tabsMap[item.id],
          dataType: item.dataType,
          styleType: item.styleType,
          list: []
        };
      });
      this.newGetList(0);
      if (this.optionId) {
        uni.$emit('update_hall_selector', this.optionId);
      }
    },

    tabsTop(top) {
      if (this.useTabsFollowPageScrollElemetSelector) {
        let element = document.querySelector('.tabsa');
        element.style.top = `${top}px`;
      }
    },

    isTop(istop) {
      if (!istop && this.useTabsFollowPageScrollElemetSelector) {
        let element = document.querySelector('.tabsa');
        element.style.top = `${this.tabsTop}px`;
      }
    }
  },
  mounted() {
    this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
    this.isIOS = uni.getSystemInfoSync().platform === 'ios';

    let that = this;
    uni.$on('update_hall_selector', this.onSelectorUpdate);
    /**
     * 不同頁面配置不同時間 gameHall
     */
    uni.$off(this.parentEmitScrollEventName, this.ListernParentScroll);
    uni.$on(this.parentEmitScrollEventName, this.ListernParentScroll);
    this.$nextTick(function () {
      let ticker = setInterval(function () {
        if (that.$refs.tabs) {
          uni.createSelectorQuery()
              .in(this)
              .select('.tabs')
              .boundingClientRect((res) => {
                that.tabHeight = res.height;
                that.tabsTop = res.top;
                clearInterval(ticker);
              })
              .exec();
        }
      }, 100);
      uni.createSelectorQuery()
          .in(this)
          .select('.tabs')
          .boundingClientRect((res) => {
            that.tabHeight = res.height;
            that.tabsTop = res.top;
            clearInterval(ticker);
          })
          .exec();
      if (that.lockedTopY) that.isTop = true;
      if (that.useTabsFollowPageScrollElemetSelector) {
        if (!document.querySelector(that.useTabsFollowPageScrollElemetSelector)) {
          console.error('useTabsFollowPageScrollElemetSelector cant find');
          return;
        }
        let element = document.querySelector('.tabsa');
        element.style.position = 'fixed';
        if (document.querySelector('.tabs_block') == element.parentNode) {
          document.querySelector('.tabs_block').removeChild(element);
          document.querySelector(that.useTabsFollowPageScrollElemetSelector).appendChild(element);
        }
      }
    });
  },
  beforeDestroy() {
    uni.$off('update_hall_selector', this.onSelectorUpdate);
  },
  methods: {
    scrollTest(event) {
    },
    caculationMinHeight(subBottom, subContentPanding = false) {
      let _sysInfo = uni.getSystemInfoSync();
      const marginTop = 0;
      const marginBottom = 0;

      //tabs 高度
      const pageOtherDomHeight = 178 + 'rpx';

      //下部分菜单高度(高度要覆盖菜单)
      let parentBottom = 0;
      // let parentBottom = this.$config.station == this.$config.enumMgr.STATION.ALL ? 140 : 110;
      //游戏大厅
      const gameHallHeight = 20;

      let height = `calc(${this.uWindowHeight || _sysInfo.windowHeight}px - var(--safe-area-inset-bottom) - ${pageOtherDomHeight} - ${subBottom ? parentBottom : 0}rpx - ${
          subContentPanding ? marginTop + marginBottom : 0
      }rpx + ${this.offSetHeightRpx || 0}rpx - ${this.isGameHall ? gameHallHeight : 0}rpx - ${this.isApp && this.isIOS ? 60 : 0}rpx)`;
      return height;
    },
    openLoginPop() {
      uni.$emit('showPop', {
        refName: 'AlertMessage'
      });
    },
    async newGetList(index) {
      this.changeLoadingStatus(true);
      const tabList = this.tabsList;
      const item = tabList[index];
      let result = [];
      if (item.id === this.categoryList[0]?.id) {
        result = this.categoryDataList || [];
      } else {
        if (item.styleType === '4') {
          if (item.dataType === '3') {
            //获取历史玩的
            const res = await userNewlyPlay();
            item.list = res.result?.map((item) => {
              return {
                ...item,
                id: item.data?.gameId,
                logo: item.icon,
                platformId: item.data?.platformId,
                code: item.data?.code,
                platformCateId: item.data?.platformCateId
              };
            }) || [];
          } else if (item.dataType === '4') {
            //获取收藏
            const res = await style2GameCollectList();
            const list = res.result;
            item.list = list.map((item) => {
              return {
                ...item,
                type: 2
              };
            });
          }
          this.currentCategoryData = item?.list || [];
          this.changeLoadingStatus(false);
          return;
        }
        const res = await categoryData({
          categoryId: item.id
        });
        this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netResp) => {
          this.handleGetListResult(res?.result, item);
        }, this);
        result = res?.result;
      }
      this.handleGetListResult(result, item);
    },
    // 处理数据返回结果
    handleGetListResult(result, item) {
      item.list = result?.map((item, index, arr) => {
        if (arr[index - 1] && arr[index + 1]) {
          if (arr[index - 1].styleType !== 2 && item.styleType === 2) {
            item.class = 'first-style-type-2';
          }
          if (arr[index + 1].styleType !== 2 && item.styleType === 2) {
            item.class = 'last-style-type-2';
          }
        }
        return item;
      }) || [];
      this.currentCategoryData = item?.list || [];
      this.changeLoadingStatus(false);
      this.getCurrentSwiperHeight();
    },
    async getList({ pageNo = 1, ref }, item) {
      this.changeLoadingStatus(true);

      let result = [];
      if (item.id === this.categoryList[0]?.id) {
        result = this.categoryDataList || [];
      } else {
        if (item.styleType === '4') {
          if (item.dataType === '3') {
            //获取历史玩的
            const res = await userNewlyPlay();
            const list = res.result.map((item) => {
              return {
                ...item,
                id: item.data?.gameId,
                logo: item.icon,
                platformId: item.data?.platformId,
                code: item.data?.code,
                platformCateId: item.data?.platformCateId
              };
            });
            item.list = list;
            ref.complete(list);
          }
          if (item.dataType === '4') {
            //获取收藏
            const res = await style2GameCollectList();
            const list = res.result;
            item.list = list.map((item) => {
              return {
                ...item,
                type: 2
              };
            });
            ref.complete(list);
          }
          this.getCurrentSwiperHeight();
          return this.changeLoadingStatus(false);
        }
        const res = await categoryData({
          categoryId: item.id
        });
        result = res.result || [];
      }
      this.changeLoadingStatus(false);
      item.list = result?.map((item, index, arr) => {
        if (arr[index - 1] && arr[index + 1]) {
          if (arr[index - 1].styleType !== 2 && item.styleType === 2) {
            item.class = 'first-style-type-2';
          }
          if (arr[index + 1].styleType !== 2 && item.styleType === 2) {
            item.class = 'last-style-type-2';
          }
        }
        return item;
      }) || [];
      ref.complete(result);
      this.getCurrentSwiperHeight();
    },
    handleScroll({ detail: { scrollLeft, scrollWidth } }) {
      const query = uni.createSelectorQuery().in(this);
      let _this = this;
      const width = document.querySelector('.tbas-bar').getBoundingClientRect().width;
      const ratio = (scrollLeft / (scrollWidth - width)) * 100;
      const ratioBar = 174; //* ratio / 100
      let left = ((width - ratioBar) * ratio) / 100;
      _this.barLeft = left + 'px'; //`calc(${ratio + '%'} - ${ratioBar}px)`

      if (_this.antiShakeTimmer == -1) {
        _this.barLeft = left + 'px'; //`calc(${ratio + '%'} - ${ratioBar}px)`
      } else {
        clearTimeout(_this.antiShakeTimmer);
        _this.antiShakeTimmer = setTimeout(function () {
          _this.barLeft = left + 'px'; // `calc(${ratio + '%'} - ${ratioBar}px)`
          _this.antiShakeTimmer = -1;
        }, 30);
      }
      this.tabsLeft = scrollLeft;
      this.$refs.tabs.scrollLeft = scrollLeft;
    },
    getTabItemByIndex(index) {
      if (this.tabsList && this.tabsList.length > index && this.tabsList[index]) {
        return this.tabsList[index];
      }
      return null;
    },
    /**
     * 检测当前菜单某个节点是否可以切换
     * @param index
     * @returns {boolean}
     */
    checkTabCanClick(index) {
      let tabItem = this.getTabItemByIndex(index);
      if (!tabItem) {
        pop('选中无效');
        return false;
      }
      //收藏未登录状态下不能点击
      if (!isLogin() && (tabItem.dataType == '4' || tabItem.dataType == '3')) {
        uni.$emit('showPop', {
          refName: 'AlertMessage'
        });
        return false;
      }
      return true;
    },
    /**
     * 组件源码逻辑得知 手动切换需要手动更新最后最后一次播放动画的current
     **/
    freshTabsAnimationCurrent(index) {
      let _this = this;
      var drageTab = function () {
        if (_this.$refs.tabs) {
          _this.$refs.tabs.setFinishCurrent(index);
          return true;
        }
        return false;
      };
      if (!drageTab()) {
        this.$nextTick(function () {
          drageTab();
        });
      }
    },
    openDialog(res) {
      uni.$emit('showPop', {
        refName: 'Maintain',
        data: res
      });
      _this.$emit('onOpenDialog', res);
    },
    positionLeft() {
      const _this = this;
      _this.swiperKey = _this.swiperKey + 1;
    },
    /**
     * 切换内容点击
     * @param _index
     * @param out
     */
    handleTabsChange(_index, out) {
      let index = _index;
      this.ouInner = out;
      this.clearPlayShow = index === 7;
      this.tabsIsChange = true;
      this.tabsKey = index;
      let _this = this;
      if (!this.checkTabCanClick(index)) return;
      this.freshTabsAnimationCurrent(index);
      _this.swiperCurrent = index;
      _this.current = index;
      _this.tabSeed = index;
      this.$emit('beforeTabChange', {
        isTop: this.isTop,
        old: this.current,
        currentDataType: this.nowCurrentDataType
      });
      _this.$nextTick(() => {
        _this.$emit('afterTabChange', _this.isTop, _this.nowCurrentDataType);
      });
      this.newGetList(index);
    },
    handleSwiperTransition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    /**
     *  动画播放完成
     * @param index
     */
    handleSwiperAnimationfinish({ detail: { current } }) {
      let _this = this;
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
      // 进入购彩下单页时停止 防止底部高度获取错误
      if (this.$route.path === '/pages/liuhe/liuhePlaying') {
        return;
      }
      _this.$emit('afterTabAnimationFinished', _this.isTop, _this.nowCurrentDataType, this.tabSeed);
      this.tabSeed = -1;
    },
    getCurrentSwiperHeight(cb, region, current = null) {
      this.$nextTick(() => {
        let query = uni.createSelectorQuery().in(this);
        query.selectAll('.swiper-item-content').boundingClientRect();
        query.exec(([swiperItems]) => {
          let selectedCurrent = current ? current : this.current;
          const swiperBoxHeight = swiperItems[selectedCurrent]?.height;
          this.swiperBoxHeight = swiperBoxHeight > 259 ? swiperBoxHeight : 259;
          if (cb && region) cb.call(region);
        });
      });
    },
    //收藏数据更新 强制更新zpage
    doColloctStatusUpdate() {
      let val = this.swiperCurrent;
      if (this.swiperCurrent == 8 && this.tabsList[val] && this.tabsList[val].list && this.tabsList[val].list.length < 1) {
        this.$refs.paging8 && this.$refs.paging8[0] && this.$refs.paging8[0].$refs.paging.complete([]);
      }
    },
    ListernParentScroll(top) {
      let _this = this;
      if (this.$refs.tabs) {
        if (top && +this.tabsTop !== -1) {
          if (this.getUseTabsFollowPageScrollElemetSelector()) {
            let element = document.querySelector('.tabsa');
            let caculationY = this.tabsTop - top;
            if (caculationY < 0) caculationY = 0;
            // if(caculationY>this.tabsTop) caculationY = this.tabsTop;
            element.style.top = `${caculationY}px`;
          }
          this.updateCatagorysTopStatus(top >= this.tabsTop);
        } else
          uni.createSelectorQuery()
              .in(this)
              .select('.tabs')
              .boundingClientRect((res) => {
                _this.tabHeight = res.height;
                this.updateCatagorysTopStatus(res.top <= 0);
              })
              .exec();
      }
    },
    onContentHeightChanged(e) {},
    onMouseDown(e) {
      this.mouseDowned = true;
      this.onTouchBegin({
        touches: [
          {
            clientX: e.clientX,
            clientY: e.clientY
          }
        ]
      });
    },
    onTouchBegin(e) {
      this.pageY = e?.changedTouches?.[0]?.pageY ?? 0;
      if (!this.isTop) return;
      let touch = e.touches[0];
      if (!touch) return console.warn('touch lose');
      let touchY = touch.clientY;
      this.lastTouchPointY = touchY;

      this.touchStartInTab = touchY <= this.tabHeight;
    },
    onMouseMove(e) {
      if (!this.mouseDowned) return;
      this.onTouchMove({
        touches: [
          {
            clientX: e.clientX,
            clientY: e.clientY
          }
        ]
      });
    },
    onTouchMove(e) {
      if (!this.isTop) return;
      let breakTabUnTop = false;
      let touchY = e.touches[0].clientY;
      if (this.touchStartInTab && touchY > this.tabHeight && touchY > this.lastTouchPointY + 10) {
        breakTabUnTop = true;
      }
      if (breakTabUnTop) {
        this.updateCatagorysTopStatus(false, true);
      }
    },
    onMouseEnd(e) {
      this.mouseDowned = false;
      this.onTouchEnd({
        touches: [
          {
            clientX: e.clientX,
            clientY: e.clientY
          }
        ]
      });
    },
    onTouchEnd(e) {
      this.lastTouchPointY = -1;
      this.touchStartInTab = false;
    },
    onCategoryDrageTop(event) {
      this.updateCatagorysTopStatus(false);
    },
    updateCatagorysTopStatus(isTop, forceZero = false) {
      this.isTop = this.lockedTopY ? true : isTop;
      this.$emit('onIsTopChange', this.isTop, this.nowCurrentDataType, forceZero);
    },
    getUseTabsFollowPageScrollElemetSelector() {
      return this.useTabsFollowPageScrollElemetSelector;
    },
    onEmit(event, ...args) {
      if (this.parentEmitScrollEventName == event) {
        this.ListernParentScroll(...args);
      }
    },
    onSelectorUpdate(id) {
      let that = this;
      let memIdToTabDictions = null;
      if (that.tabsList) {
        memIdToTabDictions = {};
        for (let tabIndex in that.tabsList) {
          let tab = that.tabsList[tabIndex];
          memIdToTabDictions[tab.id] = tab;
        }
      }
      if (!memIdToTabDictions) return pop(this.$t('components.CommonPages.pages-liuhe.components.categorysSwiper.text1'));
      let jumpTab = memIdToTabDictions[id];
      let index = that.tabsList.indexOf(jumpTab);
      if (+index === -1) return pop(this.$t('components.CommonPages.pages-liuhe.components.categorysSwiper.text2'));
      this.handleTabsChange(+index);
    },
    changeLoadingStatus(status) {
      this.getDataLoading = !!status;
      this.$loading(!!status);
    },
  }
};
</script>

<style>
/* #ifndef H5 */
page {
  height: 100%;
  background-color: #f2f2f2;
}

/* #endif */
.px {
  padding-left: 28rpx;
  padding-right: 28rpx;
}
</style>

<style lang="scss" scoped>
.category-other {
  ::v-deep .category-item {
    padding: 0 28rpx;
  }
}

.tbas-bar {
  padding: 0 28rpx;

  .bar {
    width: 100%;
    height: 6rpx;
    flex-shrink: 0;
    border-radius: 4rpx;
    background: #ebf1ee;
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      display: block;
      border-radius: 4rpx;
      width: 348rpx;
      height: 100%;
      background: var(--theme-color);
      position: absolute;
      left: var(--left);
      transition: left 0.3s;
    }
  }
}

::v-deep .zp-container {
  margin-bottom: 0 !important;

  .zp-empty-view {
    flex: none;
  }

  .zp-main {
    padding: 0 !important;

    .zp-main-title {
      // display: none;
    }
  }

  .zp-main-title {
    height: 0 !important;
    min-height: 0 !important;
  }
}

.swiper-item {
  padding-top: 20rpx;
  position: relative;
  z-index: 1;
  width: 100vw;
  max-width: 480px;
  background: #ffffff;

  .touch-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 12;
  }

  .swiper-item-content {
    // padding-bottom: var(--tabBarHeight);
    background: #ffffff;

    .data-item {
      padding: 10rpx 28rpx 10rpx;

      &:last-child {
        padding-bottom: 0;
      }
    }

    .first-style-type-2 {
      border-radius: 20rpx 20rpx 0 0;
      padding-top: 10rpx;
    }

    .last-style-type-2 {
      border-radius: 0 0 20rpx 20rpx;
      /*margin-bottom: 10rpx;*/
    }
  }

  .swiper-item-content.swiper-item-content-top {
    position: fixed;
    // top: 190rpx;
    top: 178rpx !important;
    padding-top: 12rpx;
    width: 100vw;
    max-width: 480px;
    overflow: hidden;
  }
}

.tabsa {
  padding: 20rpx 8rpx 0;
  position: absolute;
  top: 0;
  z-index: 5;
  background: #fff;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  height: 178rpx;

  width: 100vw;
  max-width: 480px;
  box-sizing: border-box;
}

.tabsShow {
  padding: 20rpx 8rpx 0;
  position: fixed;
  top: -1000px;
  z-index: 15;
  background: #fff;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  min-height: 150rpx;
  width: 100vw;
  max-width: 480px;
  box-sizing: border-box;
  // display: none;
}

::v-deep .u-tabs {
  background: unset !important;

  .u-tabs-item {
    height: 152rpx !important;
    line-height: 1 !important;

    .tab {
      height: 106rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .img-box {
        width: 68rpx;
        height: 68rpx;
        display: grid;
        place-items: center;
        border-radius: 20rpx;

        .img {
          width: 40rpx;
          height: 40rpx;
        }

        .name {
          color: #404040;
          font-weight: 400;
        }
      }

      .name {
        font-size: 26rpx;
        font-weight: 400;
        color: #404040;
      }

      .currentName {
        font-weight: 600;
      }
    }

    .bottom-img {
      width: 12rpx;
      height: 8rpx;
      transform: rotate(0deg);
      transition-duration: 0.3s;
    }

    .bottom-img[data-istop='true'] {
      transform: rotate(180deg);
      transition-duration: 0.3s;
    }
  }
}

.category-swiper {
  background: #fff;
  margin-top: 20rpx;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  // overflow: hidden;

  /*position: relative;*/
  .tabs {
    padding: 20rpx 8rpx 0;
    position: sticky;
    top: 0;
    height: 100%;
    // z-index: 2;
    z-index: 1;
    background: white;
    /*background: red;*/
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    min-height: 150rpx;
  }

  .tabs_block {
    position: relative;
  }

  .tabs-top {
    // position: absolute;
    width: 100%;
    max-width: 480px;
    top: 0px;
  }

  .topFly {
    background: red;
  }
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 180rpx;
  font-size: 24rpx;
  image {
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
