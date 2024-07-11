import ball1 from '../../static/img/liuhe/ball/1.svg'
import ball2 from '../../static/img/liuhe/ball/2.svg'
import ball3 from '../../static/img/liuhe/ball/3.png'
import { config } from '../../config/config'

export default class Playing {
  constructor() {
    this.bgImg = {
      // 1: ball1,
      // 2: ball2,
      // 3: ball3

      1: '../../static/img/liuhe/ball/1.svg',
      2: '../../static/img/liuhe/ball/2.svg',
      3: '../../static/img/liuhe/ball/3.png'
    }
    this.unitPrice = 1
    this.menuList = [
      {
        name: '最近开奖',
        code: 'recent',
        isSwitch: false,
        url: '/pages/liuhe/recent_draws',
        // imgPath: "/static/img/liuhe/menu/recent.png"
        svgs: [
          {
            path: 'M0 5.63574V9.18923C0 9.41485 0.0564047 9.58406 0.169214 9.69687C0.225619 9.75328 0.282023 9.78148 0.36663 9.80968L0.366656 9.80969C0.451254 9.83789 0.535856 9.86609 0.648654 9.89429C0.930677 9.9507 1.2127 10.1199 1.49472 10.4019C1.74855 10.684 1.86135 11.0788 1.86135 11.5864C1.86135 11.7556 1.86135 11.8967 1.83315 12.0377C1.80495 12.1787 1.77675 12.3197 1.69214 12.4325C1.60753 12.6581 1.46652 12.8555 1.32551 12.9965L1.2127 13.0812C1.1845 13.1376 1.1563 13.1658 1.09989 13.194C1.04349 13.2222 1.01528 13.2504 0.987082 13.2786L0.902475 13.3632C0.887374 13.3707 0.874294 13.3783 0.862153 13.3853L0.862121 13.3853C0.828931 13.4045 0.802753 13.4196 0.761463 13.4196C0.728422 13.4196 0.705059 13.4293 0.685704 13.4373C0.672017 13.4429 0.660336 13.4478 0.648654 13.4478C0.634553 13.4478 0.620452 13.4548 0.60635 13.4619C0.592249 13.4689 0.578148 13.476 0.564047 13.476C0.507642 13.476 0.451237 13.476 0.394833 13.5042C0.373293 13.515 0.355867 13.5216 0.340982 13.5273L0.340972 13.5273C0.316884 13.5365 0.299454 13.5432 0.282023 13.5606C0.264595 13.5606 0.247167 13.5714 0.223084 13.5862L0.223077 13.5863C0.20819 13.5955 0.190759 13.6062 0.169214 13.617C0.141012 13.6452 0.112809 13.6734 0.112809 13.7298C0.0564047 13.8144 0 14.0118 0 14.2374V18.355C0 19.5959 1.01528 20.6112 2.25619 20.6112H5.75328V4H1.80495C0.817868 4 0 4.73326 0 5.63574ZM22.828 9.71703L22.828 9.71708L22.828 9.71716C22.8126 9.73956 22.7982 9.76052 22.7877 9.78148C22.7595 9.83788 22.7313 9.92249 22.7313 9.993C22.7172 10.0353 22.7102 10.0706 22.7031 10.1058C22.6961 10.1411 22.689 10.1763 22.6749 10.2186C22.6749 10.3878 22.7313 10.5852 22.8441 10.7827C22.9569 10.9801 23.1262 11.1211 23.3518 11.2057C23.5492 11.2903 23.7184 11.4313 23.8312 11.6287C23.9158 11.7979 23.9722 11.9672 24.0004 12.1646C24.0004 12.1928 23.9934 12.221 23.9863 12.2492L23.9863 12.2492C23.9793 12.2774 23.9722 12.3056 23.9722 12.3338C23.944 12.3902 23.944 12.4184 23.944 12.4748C23.944 12.5312 23.944 12.5594 23.8594 12.6158C23.8594 12.6332 23.8486 12.6507 23.8338 12.6748L23.8337 12.6748L23.8337 12.6749C23.8245 12.6897 23.8138 12.7071 23.803 12.7286C23.7466 12.926 23.6338 13.0389 23.4646 13.1235C23.0707 13.3308 22.8292 13.5533 22.7177 13.8024C21.9353 13.2948 21.0021 13 20 13C19.648 13 19.3045 13.0364 18.9731 13.1056C18.9854 13.0528 18.9937 12.9954 18.9982 12.9334C18.9707 12.549 18.7922 12.3431 18.4626 12.3157H15.0019L15.0431 11.8215C17.4051 11.5195 18.6823 10.2977 18.8746 8.15627C18.9295 7.66208 18.6686 7.41499 18.0918 7.41499H15.9494C15.8945 7.14044 15.7023 7.00317 15.3727 7.00317C15.2079 6.97571 14.9744 7.12671 14.6723 7.45617C14.2328 7.89545 13.8071 8.25236 13.3951 8.52691V7.49735C13.3676 7.19535 13.1754 7.03062 12.8183 7.00317C12.4338 7.03062 12.2278 7.19535 12.2003 7.49735V9.84474C12.1729 9.68001 12.0493 9.58392 11.8296 9.55647C11.6922 9.55647 11.4588 9.65256 11.1292 9.84474C10.6348 10.1467 10.1953 10.3664 9.81081 10.5037C9.45375 10.6684 9.33016 10.9155 9.44002 11.2449C9.57735 11.5469 9.83828 11.643 10.2228 11.5332C10.882 11.3136 11.5412 10.9567 12.2003 10.4625V11.3273C12.2278 11.6293 12.4338 11.794 12.8183 11.8215C13.1754 11.794 13.3676 11.6293 13.3951 11.3273V9.18583C13.5599 9.54274 13.9444 9.51529 14.5487 9.10346C14.4114 9.26819 14.4114 9.46038 14.5487 9.68001C14.6585 9.84474 14.8371 10.0507 15.0843 10.2977C15.304 10.4899 15.5375 10.5448 15.7846 10.4625C15.4551 10.5723 15.0293 10.6547 14.5075 10.7096C14.2878 10.737 14.1367 10.7645 14.0543 10.7919C13.6148 11.0116 13.5324 11.2998 13.8071 11.6568C13.8071 11.9039 13.7796 12.1235 13.7247 12.3157H10.0168C9.68721 12.3431 9.50869 12.549 9.48122 12.9334C9.50869 13.3178 9.68721 13.5237 10.0168 13.5511H13.3127C12.6535 14.4297 11.5824 15.0474 10.0992 15.4043C9.98934 15.4318 9.92067 15.4455 9.89321 15.4455C9.53615 15.5279 9.38509 15.7613 9.44002 16.1456C9.54988 16.4751 9.81081 16.6124 10.2228 16.5575C12.0081 16.2005 13.3539 15.4318 14.2603 14.2512C14.685 14.75 15.1507 15.1729 15.6574 15.5199C15.2391 16.2509 15 17.0975 15 18C15 18.9511 15.2655 19.8401 15.7265 20.5971H7.20593V4H23.2954C23.3236 4 23.3447 4.00705 23.3659 4.0141L23.3659 4.0141L23.3659 4.0141C23.387 4.02115 23.4082 4.0282 23.4364 4.0282C23.4646 4.0423 23.4857 4.05641 23.5069 4.07051C23.528 4.08461 23.5492 4.09871 23.5774 4.11281C23.6338 4.14101 23.662 4.16921 23.6902 4.22562C23.7748 4.36663 23.8312 4.50764 23.8594 4.67686C23.8594 4.87427 23.803 5.04349 23.7466 5.2127C23.662 5.38192 23.521 5.52293 23.3518 5.57933C23.1826 5.63574 23.0415 5.74855 22.9287 5.91776C22.8723 5.97416 22.8159 6.05877 22.7877 6.14338C22.7595 6.22799 22.7313 6.34079 22.7313 6.4254C22.7313 6.62282 22.7595 6.79203 22.8441 6.96125C22.8723 6.98945 22.8935 7.01765 22.9146 7.04585C22.9358 7.07406 22.9569 7.10226 22.9851 7.13046C23.0133 7.15866 23.0415 7.17981 23.0698 7.20097C23.098 7.22212 23.1262 7.24327 23.1544 7.27147L23.38 7.38428C23.4646 7.41248 23.5492 7.44069 23.6338 7.52529C23.7184 7.6099 23.7748 7.69451 23.8312 7.77911C23.944 7.97653 24.0004 8.14574 24.0004 8.31496C24.0004 8.51237 23.9722 8.68159 23.8876 8.8508C23.803 9.02002 23.662 9.13283 23.4646 9.21743C23.2108 9.27384 23.0415 9.38665 22.9005 9.58406C22.8828 9.63717 22.854 9.67917 22.828 9.71703ZM16.3853 14.5454C16.7686 14.1445 17.2178 13.8073 17.7157 13.5511H15.2903C15.5499 13.92 15.9149 14.2514 16.3853 14.5454ZM17.3502 8.60928C17.4326 8.60928 17.4738 8.65046 17.4738 8.73282C17.3639 9.4741 16.8558 10.0369 15.9494 10.4213C16.1966 10.2291 16.2241 9.99575 16.0318 9.7212C15.9494 9.58392 15.8121 9.43292 15.6199 9.26819L15.4551 9.10346C15.1804 8.85637 14.9469 8.80146 14.7547 8.93873L15.2079 8.60928H17.3502ZM10.7584 9.06228C10.8957 9.14465 10.9918 9.21328 11.0468 9.26819C11.3214 9.43292 11.5686 9.37801 11.7884 9.10346C11.9532 8.85637 11.912 8.59555 11.6648 8.321C11.3352 7.96409 10.9094 7.66208 10.3876 7.41499C10.058 7.27772 9.79708 7.34635 9.60482 7.6209C9.41255 7.9229 9.45375 8.17 9.72841 8.36218C10.0305 8.55437 10.3739 8.78773 10.7584 9.06228Z'
          },
          {
            path: 'M20 22C22.2091 22 24 20.2091 24 18C24 15.7909 22.2091 14 20 14C17.7909 14 16 15.7909 16 18C16 20.2091 17.7909 22 20 22ZM19.2734 16C19.2734 15.6988 19.5176 15.4545 19.8189 15.4545C20.1201 15.4545 20.3643 15.6988 20.3643 16V18.2456L21.4667 18.882C21.7276 19.0326 21.8169 19.3662 21.6663 19.6271C21.5157 19.888 21.1821 19.9774 20.9212 19.8267L19.5511 19.0357C19.4203 18.9602 19.3326 18.8386 19.2966 18.7034C19.2815 18.6534 19.2734 18.6004 19.2734 18.5455V16Z'
          }
        ]
      },
      {
        name: '我的投注',
        code: 'myBetting',
        isSwitch: false,
        url: '/pages/liuhe/history/index',
        svgs: [
          {
            path: 'M18 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H10C10.5523 22 11 22.4477 11 23C11 23.5523 10.5523 24 10 24H6C3.79086 24 2 22.2091 2 20V6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55228 20 9V6C20 4.89543 19.1046 4 18 4ZM6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H6ZM6 16C5.44772 16 5 16.4477 5 17C5 17.5523 5.44772 18 6 18H10C10.5523 18 11 17.5523 11 17C11 16.4477 10.5523 16 10 16H6ZM5 13C5 12.4477 5.44772 12 6 12H12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14H6C5.44772 14 5 13.5523 5 13Z'
          },
          {
            path: 'M18.5 24C21.5376 24 24 21.5376 24 18.5C24 15.4624 21.5376 13 18.5 13C15.4624 13 13 15.4624 13 18.5C13 21.5376 15.4624 24 18.5 24ZM16.5007 19.9215L16.0118 19.9656C15.8895 19.9761 15.7886 19.8733 15.7995 19.7533L15.8436 19.2644C15.8613 19.0625 15.95 18.8747 16.0932 18.7314L19.7976 15.0274C20.0577 14.7687 20.4774 14.7687 20.7379 15.0274C20.9967 15.2876 20.9967 15.7073 20.7379 15.9661L17.0318 19.6719C16.8904 19.8133 16.7007 19.902 16.5007 19.9215ZM14.8337 20.9293C14.8337 20.7521 14.9773 20.6085 15.1545 20.6085H20.9295C21.1067 20.6085 21.2503 20.7521 21.2503 20.9293C21.2503 21.1065 21.1067 21.2501 20.9295 21.2501H15.1545C14.9773 21.2501 14.8337 21.1065 14.8337 20.9293Z'
          },
          {
            path: 'M8 0C7.44772 0 7 0.447715 7 1V5C7 5.55228 7.44772 6 8 6C8.55228 6 9 5.55228 9 5V1C9 0.447715 8.55228 0 8 0ZM16 0C15.4477 0 15 0.447715 15 1V5C15 5.55228 15.4477 6 16 6C16.5523 6 17 5.55228 17 5V1C17 0.447715 16.5523 0 16 0Z'
          }
        ]
      },
      {
        name: '玩法说明',
        code: 'explanation',
        isSwitch: false,
        url: '/pages/liuhe/how_to_play',
        svgs: [
          {
            path: 'M14.0507 0L22 7.9493V20C22 22.2091 20.2091 24 18 24H6C3.79086 24 2 22.2091 2 20V4C2 1.79086 3.79086 0 6 0H14.0507ZM13 2L20 9H13V2ZM4 12C4 11.4477 4.44772 11 5 11H14C14.5523 11 15 11.4477 15 12C15 12.5523 14.5523 13 14 13H5C4.44772 13 4 12.5523 4 12ZM4 20C4 19.4477 4.44772 19 5 19H9C9.55228 19 10 19.4477 10 20C10 20.5523 9.55228 21 9 21H5C4.44772 21 4 20.5523 4 20ZM5 15C4.44772 15 4 15.4477 4 16C4 16.5523 4.44772 17 5 17H11C11.5523 17 12 16.5523 12 16C12 15.4477 11.5523 15 11 15H5Z'
          }
        ]
      },
      {
        name: '走势图',
        code: 'chart',
        isSwitch: false,
        url: '/pages/liuhe/trendChart/index',
        svgs: [
          {
            path: 'M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V15C24 17.2091 22.2091 19 20 19H4C1.79086 19 0 17.2091 0 15V4ZM20.8809 4.80073V4.08071C20.836 4.03515 20.8081 3.98985 20.7842 3.9511C20.7448 3.8873 20.7165 3.84131 20.6415 3.84131H14.7607C14.1613 3.84131 13.8013 4.32012 13.8013 4.92134C13.8185 5.17011 13.9251 5.40427 14.1014 5.5806C14.2778 5.75693 14.5119 5.86354 14.7607 5.88076H17.4014L11.1606 12.1215L8.76116 9.72026C8.56174 9.54605 8.30593 9.45005 8.04114 9.45005C7.77635 9.45005 7.52054 9.54605 7.32112 9.72026L3.36102 13.6804C3.18682 13.8798 3.09082 14.1356 3.09082 14.4004C3.09082 14.6652 3.18682 14.921 3.36102 15.1204C3.45535 15.2119 3.56901 15.2811 3.69362 15.3228C3.81823 15.3646 3.95063 15.3778 4.08104 15.3616C4.21895 15.3524 4.35365 15.3159 4.47728 15.254C4.6009 15.1922 4.71097 15.1064 4.80106 15.0016L8.04114 11.7615L10.4406 14.161C10.64 14.3352 10.8958 14.4312 11.1606 14.4312C11.4254 14.4312 11.6812 14.3352 11.8806 14.161L18.8414 7.20019V9.84086C18.8414 10.4403 19.2014 10.9209 19.8008 10.9209C20.4002 10.9209 20.8809 10.5609 20.8809 9.96146V4.80073ZM7 22C6.44772 22 6 22.4477 6 23C6 23.5523 6.44772 24 7 24H18C18.5523 24 19 23.5523 19 23C19 22.4477 18.5523 22 18 22H7Z'
          }
        ]
      },
      {
        name: '购物车',
        code: 'cart',
        isOpen: true,
        isSwitch: true,
        svgs: [
          {
            path: 'M8.05242 17.3455C8.36057 17.3455 8.6525 17.4023 8.92821 17.5158C9.20393 17.6294 9.44315 17.7875 9.64587 17.9902C9.84861 18.193 10.0108 18.4322 10.1324 18.7079C10.2541 18.9836 10.3149 19.2755 10.3149 19.5837C10.3149 19.8918 10.2541 20.1838 10.1324 20.4595C10.0108 20.7352 9.84861 20.9744 9.64587 21.1771C9.44315 21.3799 9.20393 21.5421 8.92821 21.6637C8.6525 21.7853 8.36057 21.8461 8.05242 21.8461C7.72805 21.8461 7.42801 21.7853 7.1523 21.6637C6.87659 21.5421 6.63737 21.3799 6.43464 21.1771C6.23191 20.9744 6.06972 20.7352 5.94809 20.4595C5.82645 20.1838 5.76563 19.8918 5.76563 19.5837C5.76563 19.2755 5.82645 18.9836 5.94809 18.7079C6.06972 18.4322 6.23191 18.193 6.43464 17.9902C6.63737 17.7875 6.87659 17.6294 7.1523 17.5158C7.42801 17.4023 7.72805 17.3455 8.05242 17.3455ZM18.1727 17.3942C18.4808 17.3942 18.7768 17.451 19.0606 17.5645C19.3445 17.678 19.5877 17.8362 19.7905 18.0389C19.9932 18.2416 20.1554 18.4808 20.277 18.7565C20.3987 19.0323 20.4595 19.3242 20.4595 19.6323C20.4595 19.9405 20.3987 20.2324 20.277 20.5081C20.1554 20.7838 19.9932 21.0231 19.7905 21.2258C19.5877 21.4285 19.3445 21.5907 19.0606 21.7123C18.7768 21.834 18.4808 21.8948 18.1727 21.8948C17.8645 21.8948 17.5726 21.834 17.2969 21.7123C17.0212 21.5907 16.782 21.4285 16.5792 21.2258C16.3765 21.0231 16.2143 20.7838 16.0927 20.5081C15.971 20.2324 15.9102 19.9405 15.9102 19.6323C15.9102 19.3242 15.971 19.0323 16.0927 18.7565C16.2143 18.4808 16.3765 18.2416 16.5792 18.0389C16.782 17.8362 17.0212 17.678 17.2969 17.5645C17.5726 17.451 17.8645 17.3942 18.1727 17.3942ZM22.0121 3H5.53052C5.51158 2.88144 5.49264 2.76534 5.4737 2.6517C5.44126 2.40843 5.40883 2.16921 5.37639 1.93404C5.34395 1.69887 5.31152 1.51642 5.27908 1.38667C5.24664 1.27314 5.2061 1.13529 5.15744 0.973102C5.10879 0.810919 5.02769 0.656844 4.91417 0.510879C4.80064 0.364913 4.64656 0.243275 4.45194 0.145965C4.25732 0.048655 3.99783 0 3.67346 0H2.84632H2.23813H1.72726H1.21638C0.843355 0 0.54737 0.105419 0.328422 0.316258C0.109474 0.527097 0 0.7947 0 1.11907C0 1.28125 0.0202729 1.45965 0.0608189 1.65427C0.101365 1.84889 0.174347 2.03135 0.279767 2.20164C0.385186 2.37194 0.518988 2.5179 0.681172 2.63954C0.843355 2.76118 1.04608 2.822 1.28936 2.822H3.11393C3.50317 4.83307 3.85186 6.65764 4.16001 8.2957C4.28976 8.99309 4.41951 9.68642 4.54925 10.3757L4.902 12.2489C5.00742 12.8085 5.09662 13.2747 5.16961 13.6478C5.24259 14.0208 5.28719 14.2559 5.30341 14.3533C5.35206 14.5965 5.42099 14.856 5.51019 15.1317C5.59939 15.4075 5.71698 15.6629 5.86294 15.8981C6.00891 16.1332 6.19136 16.3238 6.41031 16.4698C6.62926 16.6157 6.90092 16.6887 7.22528 16.6887H8.53897H10.8987H13.7451H16.5671H18.8052H19.9729C20.427 16.6887 20.7311 16.5711 20.8852 16.336C21.0393 16.1008 21.1163 15.821 21.1163 15.4967C21.1163 14.8317 20.7271 14.4992 19.9486 14.4992H7.66318L7.42997 13H20.2121C21.0954 13 21.874 12.4207 22.1278 11.5747L23.9278 5.5747C24.01 5.30055 24.0308 5.02603 23.9997 4.76381C24.0045 4.56725 23.9557 4.38221 23.8532 4.20867C23.849 4.20161 23.8447 4.19459 23.8403 4.18762C23.5331 3.50035 22.846 3 22.0121 3ZM17.5996 8C17.5996 10.2091 15.8087 12 13.5996 12C11.3905 12 9.59961 10.2091 9.59961 8C9.59961 5.79086 11.3905 4 13.5996 4C15.8087 4 17.5996 5.79086 17.5996 8ZM11.1344 9.28652C11.1344 8.9393 11.2464 8.64529 11.4704 8.40447C11.7 8.16366 11.9968 7.98726 12.3609 7.87525C12.0472 7.75764 11.8008 7.58124 11.6216 7.34603C11.448 7.10521 11.3612 6.8364 11.3612 6.53959C11.3612 6.01876 11.5768 5.61554 12.008 5.32993C12.4393 5.04432 13.0105 4.90151 13.7217 4.90151C14.1865 4.90151 14.5898 4.97151 14.9314 5.11152C15.2786 5.25153 15.5418 5.44474 15.721 5.69115C15.9058 5.93756 15.9982 6.22037 15.9982 6.53959C15.9982 6.842 15.903 7.10801 15.7126 7.33762C15.5278 7.56724 15.2898 7.74644 14.9986 7.87525C15.3402 7.98166 15.6286 8.16086 15.8638 8.41287C16.1046 8.65929 16.225 8.9505 16.225 9.28652C16.225 9.65613 16.1214 9.97815 15.9142 10.2526C15.707 10.527 15.413 10.737 15.0322 10.8826C14.657 11.0282 14.2201 11.101 13.7217 11.101C13.1953 11.101 12.7361 11.0282 12.3441 10.8826C11.9576 10.737 11.658 10.527 11.4452 10.2526C11.238 9.97815 11.1344 9.65613 11.1344 9.28652ZM12.8313 6.63199C12.8313 6.8728 12.9125 7.05761 13.0749 7.18642C13.2373 7.31522 13.4389 7.37963 13.6797 7.37963C13.9261 7.37963 14.1305 7.31522 14.293 7.18642C14.4554 7.05761 14.5366 6.8728 14.5366 6.63199C14.5366 6.39118 14.4526 6.20917 14.2846 6.08597C14.1221 5.95716 13.9205 5.89276 13.6797 5.89276C13.4445 5.89276 13.2429 5.95996 13.0749 6.09437C12.9125 6.22317 12.8313 6.40238 12.8313 6.63199ZM12.6045 9.23611C12.6045 9.49932 12.6997 9.71214 12.8901 9.87454C13.0805 10.0314 13.3437 10.1098 13.6797 10.1098C14.0213 10.1098 14.2874 10.0314 14.4778 9.87454C14.6682 9.71214 14.7634 9.49932 14.7634 9.23611C14.7634 8.9729 14.6682 8.76289 14.4778 8.60608C14.2874 8.44928 14.0213 8.37087 13.6797 8.37087C13.3437 8.37087 13.0805 8.44928 12.8901 8.60608C12.6997 8.76289 12.6045 8.9729 12.6045 9.23611Z'
          }
        ]
      },
      {
        name: '快速投注',
        code: 'betting',
        isOpen: false,
        isSwitch: true,
        svgs: [
          {
            path: 'M18 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H10C10.5523 22 11 22.4477 11 23C11 23.5523 10.5523 24 10 24H6C3.79086 24 2 22.2091 2 20V6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55228 20 9V6C20 4.89543 19.1046 4 18 4ZM6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H6ZM6 16C5.44772 16 5 16.4477 5 17C5 17.5523 5.44772 18 6 18H10C10.5523 18 11 17.5523 11 17C11 16.4477 10.5523 16 10 16H6ZM5 13C5 12.4477 5.44772 12 6 12H12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14H6C5.44772 14 5 13.5523 5 13Z'
          },
          {
            path: 'M8 0C7.44772 0 7 0.447715 7 1V5C7 5.55228 7.44772 6 8 6C8.55228 6 9 5.55228 9 5V1C9 0.447715 8.55228 0 8 0ZM16 0C15.4477 0 15 0.447715 15 1V5C15 5.55228 15.4477 6 16 6C16.5523 6 17 5.55228 17 5V1C17 0.447715 16.5523 0 16 0Z'
          },
          {
            path: 'M18.5 24C21.5376 24 24 21.5376 24 18.5C24 15.4624 21.5376 13 18.5 13C15.4624 13 13 15.4624 13 18.5C13 21.5376 15.4624 24 18.5 24ZM17.501 15.75C17.501 15.3358 17.8368 15 18.251 15C18.6652 15 19.001 15.3358 19.001 15.75V18.8373L20.5172 19.7127C20.8759 19.9198 20.9989 20.3785 20.7917 20.7373C20.5846 21.096 20.1259 21.2189 19.7672 21.0118L17.8833 19.9241C17.7084 19.8231 17.5896 19.6623 17.5377 19.4825C17.5139 19.4093 17.501 19.3312 17.501 19.25V15.75Z'
          }
        ]
      },
      {
        name: '金额记忆',
        code: 'remenber',
        isOpen: true,
        isSwitch: true,
        amount: 0,
        svgs: [
          {
            path: 'M5 0C2.79086 0 1 1.79086 1 4V20C1 22.2091 2.79086 24 5 24H11.7084C10.0475 22.5341 9 20.3894 9 18C9 13.5817 12.5817 10 17 10C19.3894 10 21.5341 11.0475 23 12.7084V4C23 1.79086 21.2091 0 19 0H5ZM10.417 9.09182C10.8896 9.09182 11.2727 9.48025 11.2727 9.96028C11.2727 10.4395 10.8896 10.8288 10.417 10.8288H8.70582V11.9144C8.70582 12.514 8.22707 13 7.63629 13C7.04556 13 6.56679 12.514 6.56679 11.9144V10.8288H4.85558C4.38305 10.8288 4 10.4394 4 9.96028C4 9.48021 4.38307 9.09182 4.85558 9.09182H6.56679V8.22328H4.85558C4.38305 8.22328 4 7.83404 4 7.35485C4 6.87482 4.38307 6.48634 4.85558 6.48634H6.56679V6.42694L4.668 4.49997C4.3315 4.15816 4.3315 3.60436 4.668 3.26295C5.00451 2.92155 5.54993 2.92157 5.88646 3.26295L7.62192 5.02409L9.36411 3.25572C9.7006 2.91476 10.2461 2.91476 10.5825 3.25572C10.9191 3.5975 10.9191 4.15137 10.5825 4.49273L8.70589 6.39766V6.48631H10.4171C10.8896 6.48631 11.2727 6.8748 11.2727 7.35482C11.2727 7.83406 10.8896 8.22326 10.4171 8.22326H8.70589V9.09179L10.417 9.09182ZM23 18C23 21.3137 20.3137 24 17 24C13.6863 24 11 21.3137 11 18C11 14.6863 13.6863 12 17 12C20.3137 12 23 14.6863 23 18ZM15.8634 20.7082H18.4739V21.2421C18.4739 21.3078 18.4565 21.3723 18.4236 21.4291C18.3906 21.4859 18.3432 21.5329 18.2861 21.5655L17.8221 21.8307C17.6234 21.9446 17.3984 22.0044 17.1695 22.0044C16.9405 22.0044 16.7155 21.9446 16.5168 21.8307L16.0528 21.5655C15.9958 21.5329 15.9484 21.4859 15.9154 21.4291C15.8824 21.3723 15.865 21.3078 15.8651 21.2421L15.8634 20.7082ZM15.4903 19.5907H18.8453C18.944 19.5949 19.0371 19.638 19.1041 19.7106C19.1712 19.7832 19.2068 19.8793 19.2032 19.9781C19.1992 20.0718 19.1603 20.1605 19.094 20.2268C19.0277 20.2931 18.9389 20.3321 18.8453 20.336H15.4903C15.3916 20.3318 15.2985 20.2888 15.2314 20.2162C15.1644 20.1436 15.1288 20.0474 15.1324 19.9486C15.1364 19.855 15.1753 19.7662 15.2416 19.6999C15.3079 19.6336 15.3967 19.5947 15.4903 19.5907ZM17.1678 14C18.0079 14 18.8137 14.3336 19.4079 14.9275C20.0021 15.5214 20.3362 16.327 20.3366 17.1672C20.3367 17.8152 20.138 18.4477 19.7674 18.9794L19.6983 19.0737L14.5918 19.0114C14.3497 18.6731 14.1765 18.2905 14.0823 17.8853C13.9881 17.4801 13.9746 17.0603 14.0426 16.6499C14.1107 16.2395 14.2589 15.8466 14.4788 15.4935C14.6988 15.1404 14.9861 14.834 15.3244 14.592C15.8298 14.2302 16.4305 14.0251 17.0516 14.0025L17.1678 14ZM17.9568 14.6257L17.94 14.6493C17.9175 14.6866 17.9087 14.7306 17.9154 14.7737C17.922 14.8168 17.9435 14.8562 17.9762 14.8851L18.0032 14.9053L18.1362 14.9895L18.2078 15.0349C18.3941 15.1619 18.5485 15.3303 18.6588 15.527C18.7691 15.7237 18.8324 15.9432 18.8436 16.1684V16.2408C18.8446 16.2653 18.8503 16.2893 18.8606 16.3115C18.8709 16.3337 18.8854 16.3537 18.9034 16.3703C18.9214 16.3868 18.9425 16.3997 18.9655 16.4081C18.9884 16.4166 19.0128 16.4204 19.0373 16.4194C19.084 16.4175 19.1284 16.3981 19.1614 16.365C19.1945 16.3319 19.2139 16.2876 19.2158 16.2408C19.2159 15.9392 19.1415 15.6422 18.9993 15.3762C18.8571 15.1101 18.6515 14.8833 18.4006 14.7158L18.3265 14.6695L18.1935 14.5853L18.164 14.5709C18.1325 14.559 18.0983 14.5559 18.065 14.5618C18.0318 14.5677 18.0009 14.5825 17.9754 14.6046L17.9552 14.6257H17.9568Z'
          }
        ]
      },
      {
        name: '咪牌',
        code: 'mipai',
        isOpen: false,
        isSwitch: true,
        svgcode:
          '<rect x="7.47266" y="11.9175" width="1.75553" height="4.91733" rx="0.877767" transform="rotate(30 7.47266 11.9175)" fill="{color}"/>\n' +
          '<rect width="1.75553" height="4.91733" rx="0.877767" transform="matrix(0.866025 -0.5 -0.5 -0.866025 17.3086 16.9135)" fill="{color}"/>\n' +
          '<rect x="10.75" y="12.7371" width="1.75553" height="4.91733" rx="0.877767" fill="{color}"/>\n' +
          '<rect x="18.4336" y="10.4878" width="1.75553" height="5.41442" rx="0.877767" transform="rotate(-60 18.4336 10.4878)" fill="{color}"/>\n' +
          '<rect width="1.75553" height="5.41442" rx="0.877767" transform="matrix(0.5 0.866025 0.866025 -0.5 0 11.9175)" fill="{color}"/>\n' +
          '<path d="M1.73438 7C2.63743 8.17003 3.62925 9.25835 4.75349 10.2206C5.92634 11.2251 7.20203 12.0612 8.66158 12.5959C10.0415 13.1016 11.4581 13.2742 12.9162 13.0699C14.0933 12.9051 15.1894 12.5022 16.2242 11.9253C17.4386 11.249 18.5051 10.3826 19.468 9.38514C20.1766 8.65044 20.831 7.87066 21.4037 7.02325" stroke="{color}" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round"/>'
      },
      {
        name: '中奖动画',
        code: 'isWin',
        isOpen: true,
        isSwitch: true,
        svgs: [
          {
            path: 'M13.293 0H4.49297C3.90949 0 3.34991 0.231785 2.93733 0.644365C2.52475 1.05694 2.29297 1.61652 2.29297 2.2V19.8C2.29297 20.3835 2.52475 20.9431 2.93733 21.3556C3.34991 21.7682 3.90949 22 4.49297 22H17.693C18.2764 22 18.836 21.7682 19.2486 21.3556C19.6612 20.9431 19.893 20.3835 19.893 19.8V6.6L13.293 0ZM10.3593 17.3492C9.88026 17.5077 9.37988 17.5923 8.87537 17.6C8.06467 17.6 7.47727 17.3954 7.06697 16.9994C6.65887 16.6166 6.43447 16.0369 6.44107 15.3835C6.44767 13.9051 7.52237 13.0614 8.98097 13.0614C9.55407 13.0614 9.99737 13.1747 10.2141 13.2792L10.004 14.0833C9.75977 13.9777 9.45617 13.8919 8.96887 13.8919C8.13067 13.8919 7.49707 14.3671 7.49707 15.3307C7.49707 16.247 8.07127 16.7882 8.89517 16.7882C9.12617 16.7882 9.31097 16.7618 9.39017 16.7211V15.7905H8.70377V15.0062H10.3593V17.3492ZM12.1567 17.5538H11.1469V13.1076H12.1567V17.5538ZM15.7449 13.9326H14.0366V14.9479H15.6327V15.7663H14.0366V17.5538H13.0268V13.1076H15.7449V13.9326ZM13.293 7.7H12.193V2.2L17.693 7.7H13.293Z'
          }
        ]
      }
    ]
  }

  setBallColorConfig() {
    return {
      1: '01,02,07,08,12,13,18,19,23,24,29,30,34,35,40,45,46,51,52,57,58,63,64,69,70,75,76',
      2: '03,04,09,10,14,15,20,25,26,31,36,37,41,42,47,48,53,54,59,60,65,66,71,72,77,78',
      3: '05,06,11,16,17,21,22,27,28,32,33,38,39,43,44,49,50,55,56,61,62,67,68,73,74,79,80'
    }
  }

  setBg(color) {
    // 设置球颜色
    return {
      backgroundImage: `url(${this.bgImg[color]})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  }

  setBallItemStyle(index, len) {
    // 设置球布局
    if (index > len - 5) {
      return {
        width: '50%'
      }
    }
    return {
      width: '33.3%'
    }
  }

  setCurrentHeight() {
    return {
      height: 'calc(var(--vh) - 214px)'
    }
  }

  setUnitPrice(price) {
    this.unitPrice = price
  }

  setOrders(ball, selectedIds) {
    let orderList = []
    if (ball.minNum === 1) {
      orderList = selectedIds.map((id) => {
        return {
          content: '',
          methodName: ball.name,
          mode: 1,
          isMultiple: false,
          chaseNum: 3,
          chaseStop: 0,
          playId: id,
          rebatePoint: 0,
          stakeCount: 1,
          totalPrice: 0,
          unitPrice: 0,
          code: ball.code
        }
      })
    } else {
      orderList.push({
        content: selectedIds.join(','),
        methodName: ball.name,
        isMultiple: true,
        mode: 1,
        chaseNum: 0,
        chaseStop: 1,
        playId: selectedIds[0],
        rebatePoint: 0,
        stakeCount: this.setNum(selectedIds.length, ball.minNum),
        totalPrice: 0,
        unitPrice: 0,
        code: ball.code
      })
    }
    return orderList
  }

  setNum(n, m) {
    return this.factorial(n) / this.factorial(n - m) / this.factorial(m)
  }

  // 常规玩法注数计算
  factorial(n) {
    // 阶乘
    if (isNaN(n)) return 0
    if (n < 0) {
      return 1
    }
    if (n === 1 || n === 0) {
      return 1
    }
    return this.factorial(n - 1) * n
  }

  // 设置浏览器存储
  setStorage(name, data) {
    uni.setStorageSync(name, data)
  }

  setLongStorage(name, data) {
    const JSONString = JSON.stringify(data)
  }

  // 获取storage
  getStorage(name) {
    const data = uni.getStorageSync(name)
    if (['isWin', 'isShare'].includes(name)) {
      return data !== false
    }
    return data
  }

  // 清除storage
  removeStorage(name) {
    uni.removeStorageSync(name)
  }

  // 获取已选球（数组）并去重
  setSelectedArr(arr, item) {
    arr.some((i) => i === item.id)
      ? arr.forEach((i, index) => {
          i === item.id ? arr.splice(index, 1) : null
        })
      : arr.push(item.id)
    return arr
  }

  /**
   *
   * * */
  showMsg(obj) {
    uni.showToast(obj)
  }

  // 把多少秒 转化为 时分秒
  timestampToDate(ctime) {
    let returnStr = ''
    // 天数位
    // let day = Math.floor(ctime / 3600 / 24);
    // let dayStr = day.toString();
    // if (dayStr.length == 1) dayStr = '0' + dayStr;
    if (ctime > 3600) {
      // 小时位
      const hr = Math.floor(ctime / 3600)
      let hrStr = hr.toString()
      if (hrStr.length == 1) hrStr = `0${hrStr}`
      returnStr = `${hrStr}:`
    }

    // 分钟位
    const min = Math.floor((ctime / 60) % 60)
    let minStr = min.toString()
    if (minStr.length == 1) minStr = `0${minStr}`
    returnStr += minStr
    // 秒位
    const sec = Math.floor(ctime % 60)
    let secStr = sec.toString()
    if (secStr.length == 1) secStr = `0${secStr}`
    returnStr += `:${secStr}`
    return returnStr
  }

  // 金额转换
  setAmount(
    number,
    decimals,
    dec_point,
    thousands_sep,
    roundtag,
    formatAmount
  ) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
     * formatAmount:是否小于万时全部显示，大于万时显示*.**万
     * */
    number = `${number}`.replace(/[^0-9+-Ee.]/g, '')
    roundtag = roundtag || 'ceil' // "ceil","floor","round"
    const n = !isFinite(+number) ? 0 : +number
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
    const dec = typeof dec_point === 'undefined' ? '.' : dec_point
    let s = ''
    const toFixedFix = function (n, prec) {
      const k = 10 ** prec

      return `${
        parseFloat(
          Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
            prec * 2
          )
        ) / k
      }`
    }
    if (formatAmount && n > 10000) {
      const formattedAmount = (n / 10000).toFixed(2)
      return `${formattedAmount} 万`
    }
    s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split('.')
    const re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`)
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  }

  // 数组对象去重
  setArrObj(arr) {
    const map = new Map()
    for (const item of arr) {
      map.set(item.id, item)
    }
    return [...map.values()]
  }

  saveMenuList(key, typeId, menuList) {
    // let allGameConfig = {};
    // if (uni.getStorageSync(key)) {
    //     allGameConfig = uni.getStorageSync(key);
    // }
    // let gameTypeId = typeId;//获取当前彩票类型id
    // let gameTypeConfig = {};
    //
    // for (let i in menuList) {
    //     let menuItem = menuList[i];
    //     let menuCode = menuItem['code'];
    //     if(menuCode===undefined) menuCode=i;
    //
    //     // 如果咪牌全局处理 否则直接不需要判断直接存
    //     if (menuCode == "mipai") {
    //         //如果全局配置没有 则初始化
    //         !allGameConfig['global'] && (allGameConfig['global'] = {});
    //         allGameConfig["global"]['mipai'] = menuItem.isOpen;
    //     } else {
    //         !gameTypeConfig[menuCode] && (gameTypeConfig[menuCode] = {});
    //         gameTypeConfig[menuCode]['isOpen'] = menuItem.isOpen;
    //         gameTypeConfig[menuCode]['isSwitch'] = menuItem.isSwitch;
    //         menuItem.amount!==undefined&& (gameTypeConfig[menuCode]['amount'] = menuItem.amount);
    //     }
    // }
    // allGameConfig[gameTypeId] = gameTypeConfig;
    uni.setStorageSync('menuList', menuList)
  }

  /**
   *
   * @param key 浏览器储存的key
   * @param typeId 彩票id
   * @param menuList 初始菜单列表
   * @returns {*}
   */
  readMenuList(key, typeId, menuList) {
    const allGameConfig = uni.getStorageSync(key)
    const gameTypeId = typeId // 获取当前彩票类型id
    const gameConfig = allGameConfig[gameTypeId] || {}
    const globalConfig = allGameConfig.global || {}
    for (const i in menuList) {
      const menuItem = menuList[i]
      const menuCode = menuItem.code
      // 如果咪牌全局处理 否则直接不需要判断直接存
      if (menuCode == 'mipai') {
        // 如果全局配置没有 则初始化
        menuItem.isOpen = globalConfig.mipai || false
      } else {
        menuItem.isOpen = gameConfig[menuCode]
          ? gameConfig[menuCode].isOpen
          : false
      }
    }
    return menuList
  }

  formatDate(currentDate) {
    // 定义日期格式化函数
    let date // new Date(currentDate);
    date = new Date(currentDate)
    /**
     * 兼容IOS
     */
    if (isNaN(date.getTime())) {
      try {
        date = new Date(currentDate.replace(/\./g, '/').replace(/\-/g, '/'))
      } catch (e) {
        alert(e.message)
      }
    }
    const year = date.getFullYear() // 获取年份
    let month = date.getMonth() + 1 // 获取月份，从0开始计数，所以要加1
    let day = date.getDate() // 获取日期
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    month = month < 10 ? `0${month}` : month // 如果月份小于10，前面补0
    day = day < 10 ? `0${day}` : day // 如果日期小于10，前面补0
    h = h < 10 ? `0${h}` : h
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    return `${year}.${month}.${day} ${h}:${m}:${s}` // 拼接成yyyymmdd形式字符串
  }
}
