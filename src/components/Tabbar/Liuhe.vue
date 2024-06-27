<template>
  <view class="tab-bar-box">
    <view id="tab-bar" :style="{ '--theme-color': themeColor.themeColor }">
      <view class="tab-item" v-for="(item, key) in bar" @click="itemClick(item, key)">
        <!-- :class="{ 'item-center': key === 2 }" -->
        <view class="item-box">
          <!-- :class="{ center: key === 2, 'center-bg': key === 2 }" -->
          <view class="img-box">
            <sheet-animation :ref="`sheetAnimation_${key}`" :id="key" v-if="item.sheetImage" :width-rpx="48"
              :height-rpx="48" :sheetImage="item.sheetImage" v-on:onReady="onAnimationReady"></sheet-animation>
            <template v-else>
              {{
                void (barImage = current == key ? item.selectedImg : item.img)
              }}
              <view class="img" v-if="isSvg(barImage)">
                <view v-html="rewriteThemeColor(barImage)"></view>
              </view>
              <image v-else class="img" :src="barImage"></image>
            </template>
          </view>
          <!--  'center-text': key === 2, -->
          <view class="item-text" :class="{
            'item-text-color': key == current,

          }">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
    <view class="safe-area-inset-bottom"></view>
  </view>
</template>

<script>
import sheetAnimation from "@/components/common/sheetAnimation/SheetAnimation.vue";
import { mapGetters } from 'pinia';
export default {
  name: "TabBar",
  components: {
    sheetAnimation,
  },
  computed: {
    ...mapState(AppInfoStore, ['themeColor']),
    bar() {
      return [
        {
          code: "liuhe_home",
          path: "/pages/liuhe/indexNew",
          component: "Home",
          name: "主页",
          img: "@/static/imgs-liuhe/tabbar/Home.png",
          selectedImg:
            '<svg width="48rpx" height="48rpx" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M9.38177 1.06213C10.8973 -0.285019 13.1811 -0.285017 14.6967 1.06213L22.0367 7.58658C22.8906 8.34565 23.3792 9.43366 23.3792 10.5762V19.9C23.3792 22.1091 21.5884 23.9 19.3792 23.9H4.69922C2.49008 23.9 0.699219 22.1091 0.699219 19.9V10.5762C0.699219 9.43367 1.18781 8.34565 2.04176 7.58658L9.38177 1.06213Z" fill="url(#paint0_linear_23745_39070)"/>\n' +
            '<mask id="mask0_23745_39070" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">\n' +
            '<path d="M9.54786 1.24898C10.9687 -0.0139699 13.1098 -0.0139675 14.5306 1.24899L21.8706 7.77343C22.6712 8.48506 23.1292 9.50507 23.1292 10.5762V19.9C23.1292 21.971 21.4503 23.65 19.3792 23.65H4.69922C2.62815 23.65 0.949219 21.971 0.949219 19.9V10.5762C0.949219 9.50508 1.40727 8.48506 2.20785 7.77343L9.54786 1.24898Z" fill="url(#paint1_linear_23745_39070)" stroke="url(#paint2_linear_23745_39070)" stroke-width="0.5"/>\n' +
            "</mask>\n" +
            '<g mask="url(#mask0_23745_39070)">\n' +
            '<path d="M9.54786 1.24898C10.9687 -0.0139699 13.1098 -0.0139675 14.5306 1.24899L21.8706 7.77343C22.6712 8.48506 23.1292 9.50507 23.1292 10.5762V19.9C23.1292 21.971 21.4503 23.65 19.3792 23.65H4.69922C2.62815 23.65 0.949219 21.971 0.949219 19.9V10.5762C0.949219 9.50508 1.40727 8.48506 2.20785 7.77343L9.54786 1.24898Z" stroke="url(#paint3_linear_23745_39070)" stroke-width="0.5"/>\n' +
            "</g>\n" +
            '<path d="M16.5 14.75C16.5 17.0972 14.5972 19 12.25 19C9.90279 19 8 17.0972 8 14.75C8 12.4028 9.90279 10.5 12.25 10.5C14.5972 10.5 16.5 12.4028 16.5 14.75Z" stroke="url(#paint4_linear_23745_39070)" stroke-width="2"/>\n' +
            '<circle cx="1.5" cy="1.5" r="1.5" transform="matrix(1 0 0 -1 3 22)" fill="white"/>\n' +
            '<ellipse cx="1" cy="1" rx="1" ry="1" transform="matrix(1 0 0 -1 14.3984 8.35999)" fill="white"/>\n' +
            '<ellipse cx="0.5" cy="0.5" rx="0.5" ry="0.5" transform="matrix(1 0 0 -1 17 6)" fill="white"/>\n' +
            "<defs>\n" +
            '<linearGradient id="paint0_linear_23745_39070" x1="12.0392" y1="-1.30005" x2="12.0392" y2="23.9" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="{color}"/>\n' +
            '<stop offset="1" stop-color="{color}"/>\n' +
            "</linearGradient>\n" +
            '<linearGradient id="paint1_linear_23745_39070" x1="12.0392" y1="-1.30005" x2="12.0392" y2="23.9" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="{color}"/>\n' +
            '<stop offset="1" stop-color="{color}"/>\n' +
            "</linearGradient>\n" +
            '<linearGradient id="paint2_linear_23745_39070" x1="12.0392" y1="-1.30005" x2="12.0392" y2="23.9" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="{color}"/>\n' +
            '<stop offset="1" stop-color="{color}"/>\n' +
            "</linearGradient>\n" +
            '<linearGradient id="paint3_linear_23745_39070" x1="12.0392" y1="-1.30005" x2="12.0392" y2="23.9" gradientUnits="userSpaceOnUse">\n' +
            '<stop offset="0.0001" stop-color="{color}"/>\n' +
            '<stop offset="1" stop-color="{color}"/>\n' +
            "</linearGradient>\n" +
            '<linearGradient id="paint4_linear_23745_39070" x1="12.25" y1="9.5" x2="12.25" y2="20" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="#FFFFFF"/>\n' +
            '<stop offset="1" stop-color="#FFFFFF"/>\n' +
            "</linearGradient>\n" +
            "</defs>\n" +
            "</svg>\n",
        },
        {
          code: "promoteEarnNew",
          path: "/pages/common/promoteEarnNew/index",
          component: "promoteEarnNew",
          name: this.$t("components.Tabbar.Liuhe.text3"),
          img: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="10" fill="white"/>
<path d="M11.985 2.34922e-06C10.4104 -0.000983739 8.85115 0.308473 7.39633 0.910669C5.94151 1.51286 4.6197 2.39598 3.50654 3.50949C2.39338 4.623 1.5107 5.94506 0.909013 7.40001C0.307324 8.85497 -0.00156893 10.4143 5.99216e-06 11.9887C5.99216e-06 13.7046 0.369008 15.341 1.00202 16.8184C1.02902 16.8454 1.02902 16.8724 1.05601 16.8994V16.9249C1.37103 17.6119 1.71602 18.2448 2.13752 18.8523V22.3636H5.94C7.77287 23.4386 9.86006 24.0036 11.985 24C16.95 24 21.2265 20.9642 23.049 16.6609C23.6565 15.236 24 13.6521 24 11.9887C23.973 5.36064 18.6135 2.34922e-06 11.985 2.34922e-06ZM17.505 5.75661C17.874 6.52156 18.111 7.28651 18.27 8.13244H16.131C15.921 7.26102 15.7095 6.46907 15.471 5.75661H17.5035H17.505ZM9.08252 19.1148H6.60001V11.0903C6.20402 11.2208 5.781 11.3273 5.30552 11.4593V9.98035C6.44101 9.32041 7.23301 7.81598 7.68301 5.51814H10.3485C10.0783 6.69212 9.66157 7.82746 9.108 8.89742C9.0825 8.89742 9.08252 19.1148 9.08252 19.1148ZM16.8435 19.1148C14.679 19.1417 13.254 17.4784 12.6195 14.0721C12.4398 12.8716 12.2993 11.6655 12.198 10.4558H9.55801V8.68444H12.171C12.1185 8.05147 12.1185 6.99555 12.1185 5.48965H14.838V8.68444H18.9825V10.4543H14.8905C14.9175 11.4053 15.0225 12.5662 15.1815 13.9641C15.4965 16.2619 16.026 17.4244 16.791 17.4769C17.214 17.4769 17.451 17.2129 17.451 16.6324H19.299C19.326 18.3213 18.507 19.1403 16.8435 19.1133V19.1148Z" fill="#A0ABA5"/>
</svg>
`,
          selectedImg:
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.985 2.34922e-06C10.4104 -0.000983739 8.85115 0.308473 7.39633 0.910669C5.94151 1.51286 4.6197 2.39598 3.50654 3.50949C2.39338 4.623 1.5107 5.94506 0.909013 7.40001C0.307324 8.85497 -0.00156893 10.4143 5.99216e-06 11.9887C5.99216e-06 13.7046 0.369008 15.341 1.00202 16.8184C1.02902 16.8454 1.02902 16.8724 1.05601 16.8994V16.9249C1.37103 17.6119 1.71602 18.2448 2.13752 18.8523V22.3636H5.94C7.77287 23.4386 9.86006 24.0036 11.985 24C16.95 24 21.2265 20.9642 23.049 16.6609C23.6565 15.236 24 13.6521 24 11.9887C23.973 5.36064 18.6135 2.34922e-06 11.985 2.34922e-06ZM17.505 5.75661C17.874 6.52156 18.111 7.28651 18.27 8.13244H16.131C15.921 7.26102 15.7095 6.46907 15.471 5.75661H17.5035H17.505ZM9.08252 19.1148H6.60001V11.0903C6.20402 11.2208 5.781 11.3273 5.30552 11.4593V9.98035C6.44101 9.32041 7.23301 7.81598 7.68301 5.51814H10.3485C10.0783 6.69212 9.66157 7.82746 9.108 8.89742C9.0825 8.89742 9.08252 19.1148 9.08252 19.1148ZM16.8435 19.1148C14.679 19.1417 13.254 17.4784 12.6195 14.0721C12.4398 12.8716 12.2993 11.6655 12.198 10.4558H9.55801V8.68444H12.171C12.1185 8.05147 12.1185 6.99555 12.1185 5.48965H14.838V8.68444H18.9825V10.4543H14.8905C14.9175 11.4053 15.0225 12.5662 15.1815 13.9641C15.4965 16.2619 16.026 17.4244 16.791 17.4769C17.214 17.4769 17.451 17.2129 17.451 16.6324H19.299C19.326 18.3213 18.507 19.1403 16.8435 19.1133V19.1148Z" fill="${this.themeColor.themeColor}"/></svg>`
        },
        {
          code: "game_hall",
          path: "/pages/liuhe/game_hall",
          component: "GameHall",
          name: "购彩大厅",
          img: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.92435 3.00699C9.5111 2.96186 10.3435 3.12501 10.9436 3.69535C11.2477 3.98448 11.548 4.43238 11.7078 5.13068H5.33333C2.38781 5.13068 0 7.51849 0 10.464V19.2511C0 22.0165 2.47598 24.1245 5.20595 23.6833C5.73114 23.5984 6.23706 23.4208 6.70011 23.1589L9.37415 21.6463C11.0034 20.7247 12.9966 20.7247 14.6259 21.6463L17.2999 23.1589C17.7629 23.4208 18.2689 23.5984 18.7941 23.6833C21.524 24.1245 24 22.0165 24 19.2511V10.464C24 7.51849 21.6122 5.13068 18.6667 5.13068H13.7414C13.5506 3.88329 13.0429 2.93148 12.3215 2.24574C11.2063 1.18578 9.75997 0.936808 8.77096 1.01289C8.2203 1.05524 7.80824 1.53598 7.8506 2.08664C7.89296 2.63729 8.37369 3.04935 8.92435 3.00699Z" fill="#A0ABA5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4843 11.1913C16.4843 10.6557 16.9185 10.2216 17.454 10.2216C17.9896 10.2216 18.4237 10.6557 18.4237 11.1913V12.161H19.3934C19.929 12.161 20.3631 12.5951 20.3631 13.1307C20.3631 13.6662 19.929 14.1004 19.3934 14.1004H18.4237V15.0701C18.4237 15.6056 17.9896 16.0398 17.454 16.0398C16.9185 16.0398 16.4843 15.6056 16.4843 15.0701V14.1004H15.5146C14.9791 14.1004 14.5449 13.6662 14.5449 13.1307C14.5449 12.5951 14.9791 12.161 15.5146 12.161L16.4843 12.161V11.1913ZM6.54581 16.0398C8.15246 16.0398 9.4549 14.7373 9.4549 13.1307C9.4549 11.524 8.15246 10.2216 6.54581 10.2216C4.93916 10.2216 3.63672 11.524 3.63672 13.1307C3.63672 14.7373 4.93916 16.0398 6.54581 16.0398Z" fill="white"/>
</svg>
`,
          selectedImg:
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.92435 3.00699C9.5111 2.96186 10.3435 3.12501 10.9436 3.69535C11.2477 3.98448 11.548 4.43238 11.7078 5.13068H5.33333C2.38781 5.13068 0 7.51849 0 10.464V19.2511C0 22.0165 2.47598 24.1245 5.20595 23.6833C5.73114 23.5984 6.23706 23.4208 6.70011 23.1589L9.37415 21.6463C11.0034 20.7247 12.9966 20.7247 14.6259 21.6463L17.2999 23.1589C17.7629 23.4208 18.2689 23.5984 18.7941 23.6833C21.524 24.1245 24 22.0165 24 19.2511V10.464C24 7.51849 21.6122 5.13068 18.6667 5.13068H13.7414C13.5506 3.88329 13.0429 2.93148 12.3215 2.24574C11.2063 1.18578 9.75997 0.936808 8.77096 1.01289C8.2203 1.05524 7.80824 1.53598 7.8506 2.08664C7.89296 2.63729 8.37369 3.04935 8.92435 3.00699Z" fill="${this.themeColor.themeColor}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4843 11.1913C16.4843 10.6557 16.9185 10.2216 17.454 10.2216C17.9896 10.2216 18.4237 10.6557 18.4237 11.1913V12.161H19.3934C19.929 12.161 20.3631 12.5951 20.3631 13.1307C20.3631 13.6662 19.929 14.1004 19.3934 14.1004H18.4237V15.0701C18.4237 15.6056 17.9896 16.0398 17.454 16.0398C16.9185 16.0398 16.4843 15.6056 16.4843 15.0701V14.1004H15.5146C14.9791 14.1004 14.5449 13.6662 14.5449 13.1307C14.5449 12.5951 14.9791 12.161 15.5146 12.161L16.4843 12.161V11.1913ZM6.54581 16.0398C8.15246 16.0398 9.4549 14.7373 9.4549 13.1307C9.4549 11.524 8.15246 10.2216 6.54581 10.2216C4.93916 10.2216 3.63672 11.524 3.63672 13.1307C3.63672 14.7373 4.93916 16.0398 6.54581 16.0398Z" fill="white"/>
</svg>
`,
        },
        {
          code: "profitreport",
          path: "/pages/common/userCenter/profitreportTab/profitreport",
          component: "profitreport",
          name: this.$t("components.Tabbar.Liuhe.text5"),
          img: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 2H5C3.34315 2 2 3.34315 2 5V21C2 22.6569 3.34315 24 5 24H19C20.6569 24 22 22.6569 22 21V5C22 3.34315 20.6569 2 19 2H18V4C18 5.10457 17.1046 6 16 6C14.8954 6 14 5.10457 14 4V2H10V4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4V2Z" fill="#A0ABA5"/><rect x="14.6992" width="2.66667" height="5" rx="1.33333" fill="#A0ABA5"/><rect x="6.69922" width="2.66667" height="5" rx="1.33333" fill="#A0ABA5"/><path d="M6 10C6 9.44772 6.44772 9 7 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H7C6.44772 11 6 10.5523 6 10Z" fill="white"/><path d="M6 14.2C6 13.6477 6.44772 13.2 7 13.2H17C17.5523 13.2 18 13.6477 18 14.2C18 14.7522 17.5523 15.2 17 15.2H7C6.44772 15.2 6 14.7522 6 14.2Z" fill="white"/><path d="M6 18.3999C6 17.8476 6.44772 17.3999 7 17.3999H14C14.5523 17.3999 15 17.8476 15 18.3999C15 18.9522 14.5523 19.3999 14 19.3999H7C6.44772 19.3999 6 18.9522 6 18.3999Z" fill="white"/></svg>',
          selectedImg:
            `<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H3C1.34315 2 0 3.34315 0 5V21C0 22.6569 1.34315 24 3 24H17C18.6569 24 20 22.6569 20 21V5C20 3.34315 18.6569 2 17 2H16V4C16 5.10457 15.1046 6 14 6C12.8954 6 12 5.10457 12 4V2H8V4C8 5.10457 7.10457 6 6 6C4.89543 6 4 5.10457 4 4V2Z" fill="${this.themeColor.themeColor}"/>
<rect x="12.6992" width="2.66667" height="5" rx="1.33333" fill="${this.themeColor.themeColor}"/>
<rect x="4.69922" width="2.66667" height="5" rx="1.33333" fill="${this.themeColor.themeColor}"/>
<path d="M4 10C4 9.44772 4.44772 9 5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H5C4.44772 11 4 10.5523 4 10Z" fill="white"/>
<path d="M4 14.2C4 13.6477 4.44772 13.2 5 13.2H15C15.5523 13.2 16 13.6477 16 14.2C16 14.7522 15.5523 15.2 15 15.2H5C4.44772 15.2 4 14.7522 4 14.2Z" fill="white"/>
<path d="M4 18.3999C4 17.8476 4.44772 17.3999 5 17.3999H12C12.5523 17.3999 13 17.8476 13 18.3999C13 18.9522 12.5523 19.3999 12 19.3999H5C4.44772 19.3999 4 18.9522 4 18.3999Z" fill="white"/>
</svg>
`,
          login: true,
        },
        {
          code: "my",
          path: "/pages/liuhe/my",
          component: "My",
          name: this.$t("components.Tabbar.Liuhe.text4"),
          img: "@/static/imgs-liuhe/tabbar/My.png",
          selectedImg:
            '<svg width="48rpx" height="48rpx" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9494 11.8033C18.4039 10.5764 19.3278 8.74033 19.3278 6.68852C19.3278 2.99455 16.3332 0 12.6392 0C8.94526 0 5.9507 2.99455 5.9507 6.68852C5.9507 8.74033 6.87459 10.5764 8.32905 11.8033H7.47572C5.65154 11.8033 4.05844 13.0375 3.60261 14.8038L2.51959 19.0005C1.86621 21.5323 3.7779 24 6.3927 24H18.4923C21.1071 24 23.0188 21.5323 22.3654 19.0005L21.2824 14.8038C20.8266 13.0375 19.2335 11.8033 17.4093 11.8033H16.9494Z" fill="url(#paint0_linear_22292_73191)"/>\n' +
            '<mask id="mask0_22292_73191" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="0" width="21" height="24">\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9494 11.8033C18.4039 10.5764 19.3278 8.74033 19.3278 6.68852C19.3278 2.99455 16.3332 0 12.6392 0C8.94526 0 5.9507 2.99455 5.9507 6.68852C5.9507 8.74033 6.87459 10.5764 8.32905 11.8033H7.47572C5.65154 11.8033 4.05844 13.0375 3.60261 14.8038L2.51959 19.0005C1.86621 21.5323 3.7779 24 6.3927 24H18.4923C21.1071 24 23.0188 21.5323 22.3654 19.0005L21.2824 14.8038C20.8266 13.0375 19.2335 11.8033 17.4093 11.8033H16.9494Z" fill="url(#paint1_linear_22292_73191)"/>\n' +
            "</mask>\n" +
            '<g mask="url(#mask0_22292_73191)">\n' +
            '<mask id="path-3-inside-1_22292_73191" fill="white">\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9494 11.8033C18.4039 10.5764 19.3278 8.74033 19.3278 6.68852C19.3278 2.99455 16.3332 0 12.6392 0C8.94526 0 5.9507 2.99455 5.9507 6.68852C5.9507 8.74033 6.87459 10.5764 8.32905 11.8033H7.47572C5.65154 11.8033 4.05844 13.0375 3.60261 14.8038L2.51959 19.0005C1.86621 21.5323 3.7779 24 6.3927 24H18.4923C21.1071 24 23.0188 21.5323 22.3654 19.0005L21.2824 14.8038C20.8266 13.0375 19.2335 11.8033 17.4093 11.8033H16.9494Z"/>\n' +
            "</mask>\n" +
            '<path d="M16.9494 11.8033L16.627 11.4211L15.5812 12.3033H16.9494V11.8033ZM8.32905 11.8033V12.3033H9.69723L8.65144 11.4211L8.32905 11.8033ZM3.60261 14.8038L4.08675 14.9287L3.60261 14.8038ZM2.51959 19.0005L2.03545 18.8755L2.51959 19.0005ZM22.3654 19.0005L22.8496 18.8755L22.3654 19.0005ZM21.2824 14.8038L20.7983 14.9287L21.2824 14.8038ZM18.8278 6.68852C18.8278 8.58681 17.9737 10.2851 16.627 11.4211L17.2718 12.1855C18.8341 10.8676 19.8278 8.89386 19.8278 6.68852H18.8278ZM12.6392 0.5C16.0571 0.5 18.8278 3.2707 18.8278 6.68852H19.8278C19.8278 2.71841 16.6093 -0.5 12.6392 -0.5V0.5ZM6.4507 6.68852C6.4507 3.2707 9.2214 0.5 12.6392 0.5V-0.5C8.66912 -0.5 5.4507 2.71841 5.4507 6.68852H6.4507ZM8.65144 11.4211C7.30479 10.2851 6.4507 8.58681 6.4507 6.68852H5.4507C5.4507 8.89386 6.44439 10.8676 8.00666 12.1855L8.65144 11.4211ZM7.47572 12.3033H8.32905V11.3033H7.47572V12.3033ZM4.08675 14.9287C4.4856 13.3832 5.87956 12.3033 7.47572 12.3033V11.3033C5.42352 11.3033 3.63128 12.6917 3.11848 14.6788L4.08675 14.9287ZM3.00373 19.1254L4.08675 14.9287L3.11848 14.6788L2.03545 18.8755L3.00373 19.1254ZM6.3927 23.5C4.10475 23.5 2.43202 21.3408 3.00373 19.1254L2.03545 18.8755C1.3004 21.7239 3.45105 24.5 6.3927 24.5V23.5ZM18.4923 23.5H6.3927V24.5H18.4923V23.5ZM21.8813 19.1254C22.453 21.3408 20.7803 23.5 18.4923 23.5V24.5C21.434 24.5 23.5846 21.7239 22.8496 18.8755L21.8813 19.1254ZM20.7983 14.9287L21.8813 19.1254L22.8496 18.8755L21.7665 14.6788L20.7983 14.9287ZM17.4093 12.3033C19.0054 12.3033 20.3994 13.3832 20.7983 14.9287L21.7665 14.6788C21.2537 12.6917 19.4615 11.3033 17.4093 11.3033V12.3033ZM16.9494 12.3033H17.4093V11.3033H16.9494V12.3033Z" fill="url(#paint2_linear_22292_73191)" mask="url(#path-3-inside-1_22292_73191)"/>\n' +
            "</g>\n" +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4982 14.9137L15.2851 13.1268H10.2773L11.9939 14.8434L10.6708 20.8086L12.6277 22.1469H12.8488L14.8057 20.8086L13.4982 14.9137Z" fill="url(#paint3_linear_22292_73191)"/>\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M9.34016 7.65576C8.90214 7.65576 8.59519 8.08674 8.81517 8.46551C9.56439 9.75555 10.961 10.623 12.5603 10.623C14.1596 10.623 15.5562 9.75555 16.3054 8.46551C16.5254 8.08674 16.2185 7.65576 15.7805 7.65576C15.5341 7.65576 15.3141 7.80002 15.1791 8.00618C14.6205 8.85937 13.6562 9.42299 12.5603 9.42299C11.4644 9.42299 10.5001 8.85937 9.94151 8.00618C9.80654 7.80002 9.58656 7.65576 9.34016 7.65576Z" fill="url(#paint4_linear_22292_73191)"/>\n' +
            "<defs>\n" +
            '<linearGradient id="paint0_linear_22292_73191" x1="12.4425" y1="0" x2="12.4425" y2="24" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="{color}"/>\n' +
            '<stop offset="1" stop-color="{color}"/>\n' +
            "</linearGradient>\n" +
            '<linearGradient id="paint1_linear_22292_73191" x1="12.4425" y1="0" x2="12.4425" y2="24" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="' +
            this.themeColor.themeColor +
            '"/>\n' +
            '<stop offset="1" stop-color="#FFFFFF"/>\n' +
            "</linearGradient>\n" +
            '<linearGradient id="paint2_linear_22292_73191" x1="12.4425" y1="0" x2="12.4425" y2="24" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="#FFFFFF"/>\n' +
            '<stop offset="1" stop-color="#FFFFFF"/>\n' +
            "</linearGradient>\n" +
            '<linearGradient id="paint3_linear_22292_73191" x1="12.7812" y1="13.1268" x2="12.7812" y2="22.1468" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="#FFFFFF"/>\n' +
            '<stop offset="1" stop-color="#FFFFFF"/>\n' +
            "</linearGradient>\n" +
            '<linearGradient id="paint4_linear_22292_73191" x1="12.5603" y1="7.65576" x2="12.5603" y2="10.623" gradientUnits="userSpaceOnUse">\n' +
            '<stop stop-color="#FFFFFF"/>\n' +
            '<stop offset="1" stop-color="#FFFFFF"/>\n' +
            "</linearGradient>\n" +
            "</defs>\n" +
            "</svg>\n",
          login: true,
        },
      ];
    },
  },
  props: {
    current: String | Number,
  },
  data() {
    return {
      enumer: {
        item1: [],
        item2: ["taoliao", "found"],
        item3: ["my"],
      },
    };
  },
  mounted() {
    uni.hideTabBar();
  },
  methods: {
    //页面首次加载由动画出事成功后 自动调用
    onAnimationReady(tabIndex) {
      let ref = this.$refs[`sheetAnimation_${tabIndex}`]
        ? this.$refs[`sheetAnimation_${tabIndex}`][0]
        : null;
      if (tabIndex == this.current) {
        ref &&
          ref.startAnimationBetween instanceof Function &&
          ref.startAnimationBetween(0, -2, false, -2); // 倒数第二帧完结
      } else {
        ref && ref.stopAnimation instanceof Function && ref.stopAnimation(-1); //倒数第一帧为未选中状态
      }
    },
    isSvg(item) {
      let isSvg = false;
      if (item.indexOf("<svg") != -1) isSvg = true;
      return isSvg;
    },

    rewriteThemeColor(svgCode) {
      let afterSvg = svgCode.replaceAll("{color}", this.themeColor.themeColor);
      return afterSvg;
    },

    itemClick(item, key) {
      if (this.enumer.item1.includes(item.code)) {
        pop("敬请期待", 2000);
        return false;
      }
      if (this.$config.is_230720) {
        if (this.enumer.item2.includes(item.code)) {
          pop("敬请期待", 2000);
          return false;
        }
      }
      if (
        (item.login && !isLogin())
      ) {
        uni.$emit("showPop", {
          refName: "AlertMessage",
        });
        return false;
      }
      if (item.path == "") {
        pop("敬请期待", 2000);
        return false;
      }
      if (item.code === "chatRoom") {
        this.$store.dispatch("initOrGetChatRoomInfo").then((charRoomUrl) => {
          if (!charRoomUrl) return console.warn("chatRoom config is null");
          if (charRoomUrl.indexOf("http") != -1) {
            uni.navigateTo({
              url: item.path,
            });
          } else {
            pop("聊天室关闭", 2000);
          }
        });
        return;
      }
      if (item.code == 'profitreport') {
        uni.navigateTo({
          url: item.path,
        });
      }
      uni.switchTab({
        url: item.path,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-bar-box {
  width: 100%;
  max-width: 480px;
  position: fixed;
  z-index: 98;
  bottom: 0px;

  .safe-area-inset-bottom {
    height: var(--safe-area-inset-bottom);
    background: #f4f9f6;
  }
}

#tab-bar {
  z-index: 12;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  height: var(--tabBarHeight);
  height: 104rpx;
  width: 100%;
  background-size: 100% 100%;
  background-color: #F3F9F6;
  border-top-left-radius: 34rpx;
  border-top-right-radius: 34rpx;
  .tab-item {
    height: 100%;
    color: #646566;
    cursor: pointer;
    display: grid;
    place-content: center;
    position: relative;
    height: 82rpx;

    .item-box {
      display: flex;
      flex-direction: column;
      height: 80rpx !important;
      align-items: center;
      position: relative;
      justify-content: end;
    }

    .item-center {
      z-index: 1;
      color: #646566;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      justify-content: end;
    }

    .item-text {
      font-size: 28rpx;
      height: 24rpx;
      line-height: 24rpx;
      margin-top: 8rpx;
      /*font-weight: 600;*/
      color: #404040;
    }

    .item-text-color {
      color: var(--theme-color);

      font-weight: bold;
    }

    .img-box {
      display: grid;
      place-content: center;
      position: relative;

      .img {
        width: 24px;
        height: 24px;
      }

      .hot {
        position: absolute;
        top: -16rpx;
        right: -20rpx;
        width: 32rpx;
        height: 32rpx;
      }

      .hot-point {
        position: absolute;
        top: -6rpx;
        right: -20rpx;
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        background: var(--theme-auxiliary-color-remind);
      }

      .dot {
        position: absolute;
        top: -8rpx;
        right: -12rpx;
        display: block;
        width: 16rpx;
        height: 16rpx;
        border-radius: 6px;
        background-color: red;
      }
    }

    .center {
      flex-shrink: 0;
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      background: rgba(160, 171, 165, 1);
      margin-bottom: 10rpx;
      position: absolute;
      bottom: 30rpx;
    }

    .center-bg {
      background: var(--theme-color);
    }

    .center-text {
      margin-top: 58rpx;
    }
  }
}
</style>
