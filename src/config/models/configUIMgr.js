import enumConfig from './configEnum'
import { config } from '../config.js'

export default {
  memCheckPageElement: {},

  /**
   * Loading UI相配
   * ZPAGE 组件中全局配置文件
   */
  z_page_loading: {
    // 模板01 可以自行添加 避免后续不同页面使用不同加载样式
    t1: {
      'refresher-default-text': '继续下拉刷新',
      'show-refresher-update-time': false,
      'refresher-pulling-img': '/static/img/loading_v1.gif',
      'refresher-pulling-text': '加载中..',
      'refresher-title-style': {
        color: '#D8D8D8'
      },
      'refresher-refreshing-img': '/static/img/load.gif',
      'refresher-img-style': {
        width: '120rpx',
        height: '80rpx',
        transform: 'rotate(0deg)'
      },
      'refresher-refreshing-text': '加载中..',
      'loading-more-loading-icon-custom-image': '/static/img/loading_v1.gif',
      'loading-more-loading-icon-custom-style': {
        width: '120rpx',
        height: '80rpx'
      },
      'loading-more-no-more-text': '没有更多数据了',
      getloadingText: (status) => {
        const statusMap = {
          0: '继续下拉刷新',
          1: '松手立即刷新',
          2: '加载中',
          3: '刷新成功'
        }
        return statusMap[status]
      }
    }
  },
  // 页面中其它零散的loading 样式 图标与字并排
  page_loading_row: {
    t1: {
      img: '/static/img/loading_v1.gif',
      img_style: {
        width: '100rpx',
        height: '65rpx',
        transform: 'rotate(0deg)'
      },
      text: '加载中...',
      text_style: {
        fontSize: '20rpx',
        color: '#919191'
      }
    }
  },
  // 页面中其它零散loading 央视 ，图标与字并列
  page_loading_col: {
    t1: {}
  },
  colorPie: ['#0100F4', '#02F707', '#F5020A'],

  /**
   *
   * 版本组隐配
   */
  // 隐列config 对版隐元列在中的内
  PAGE_VERSION_HIDE_CONFIGS: {
    DEFAULT: [
      enumConfig.PAGE_VERSION_ELEMENT_HIDE_KEY.EL_LUNTAN_INDEX_02_CATEGORY_02
    ],
    BETA_LUNTAN_20230720: [
      enumConfig.PAGE_VERSION_ELEMENT_HIDE_KEY.EL_LUNTAN_INDEX_02_CATEGORY_01,
      enumConfig.PAGE_VERSION_ELEMENT_HIDE_KEY.EL_LUNTAN_INDEX_02_CATEGORY_02
    ]
  },

  themeColors: [
    {
      id: 1,
      name: 'green',
      themeColor: '#07C160',
      title: '绿色主题',
      showText: '绿色主题',
      activeColor: '#01B558',
      bgColor: '#9bf7c8',
      linearBeginColor: '#03A651',
      linearEndColor: '#07C160',
      svgStopColor1: '#10BA0D',
      svgStopColor2: '#80FF00',
      themeAuxiliaryColorDefault: '#F4F4F4',
      themeAuxiliaryColorRemind: '#EC3232',
      themeAuxiliaryColorDot: '#FFE500',
      themeDominantColorLinearGradientEnd: '#0B85EF',
      linearGradientStart: '#F9FFFC', // 渐色卡片渐变 开始
      linearGradientEnd: '#D7FFEA' // 渐色卡片渐变 开始
    },
    {
      id: 2,
      name: 'blue',
      themeColor: '#1592FF',
      title: '蓝色主题',
      showText: '蓝色主题',

      activeColor: '#1592FF',
      bgColor: 'rgba(23, 148, 255, 0.35)',
      linearBeginColor: '#1592FF',
      linearEndColor: '#0B85EF',
      svgStopColor1: '#0B85EF',
      svgStopColor2: 'blue',
      themeAuxiliaryColorDefault: '#F4F4F4',
      themeAuxiliaryColorRemind: '#EC3232',
      themeAuxiliaryColorDot: '#FFE500',
      themeDominantColorLinearGradientEnd: '#0B85EF',
      linearGradientStart: '#F6FBFF', // 渐色卡片渐变 开始
      linearGradientEnd: '#D7ECFF' // 渐色卡片渐变 开始
    },
    {
      id: 3,
      name: 'skyblue',
      themeColor: '#3E73FE',
      title: '蔚蓝色主题',
      showText: '蔚蓝主题',

      activeColor: '#3E73FE',
      bgColor: 'rgba(23, 148, 255, 0.35)',
      linearBeginColor: '#3E73FE',
      linearEndColor: '#0B85EF',
      svgStopColor1: '#0B85EF',
      svgStopColor2: 'skyblue',
      themeAuxiliaryColorDefault: '#F4F4F4',
      themeAuxiliaryColorRemind: '#EC3232',
      themeAuxiliaryColorDot: '#FFE500',
      themeDominantColorLinearGradientEnd: '#0B85EF',
      linearGradientStart: '#F6FBFF', // 渐色卡片渐变 开始
      linearGradientEnd: '#D7ECFF' // 渐色卡片渐变 开始
    },
    {
      id: 4,
      name: 'ChineseRed',
      themeColor: '#EF1811',
      title: '中国红主题',
      showText: '红色主题',

      activeColor: '#EF1811',
      bgColor: 'rgba(23, 148, 255, 0.35)',
      linearBeginColor: '#EF1811',
      linearEndColor: '#EB0405',
      svgStopColor1: '#EB0405',
      svgStopColor2: 'skyblue',
      themeAuxiliaryColorDefault: '#F4F4F4',
      themeAuxiliaryColorRemind: '#CD0001',
      themeAuxiliaryColorDot: '#FFE500',
      themeDominantColorLinearGradientEnd: '#EB0405',
      linearGradientStart: '#FFEDED', // 渐色卡片渐变 开始
      linearGradientEnd: '#D7FFEA' // 渐色卡片渐变 开始
    }
    // {
    // 	id: 5,
    // 	name: 'InternationalBlack',
    // 	themeColor: "#07C160",
    // 	title: "国际黑主题",
    // 	activeColor: "#01B558",
    // 	bgColor: "#9bf7c8",
    // 	linearBeginColor: '#03A651',
    // 	linearEndColor: '#07C160',
    // 	svgStopColor1: '#10BA0D',
    // 	svgStopColor2: '#80FF00',
    // 	themeAuxiliaryColorDefault: '#F4F4F4',
    // 	themeAuxiliaryColorRemind: '#EC3232',
    // 	themeAuxiliaryColorDot: '#FFE500',
    // 	themeDominantColorLinearGradientEnd: '#0B85EF',
    // 	linearGradientStart: '#F9FFFC', // 渐色卡片渐变 开始
    // 	linearGradientEnd: '#D7FFEA', // 渐色卡片渐变 开始
    // },
  ],

  /**
   * 判断当前版本此是需隐藏
   * @param elementKey 元素标识id
   * @returns {boolean|*}
   */
  checkPageElementIsHide(elementKey) {
    // TODO @mr 此处报错 我加了一个默认值
    // let stationVersionCode = configs.stationVersionCode;
    const stationVersionCode =
      config?.stationVersionCode || enumConfig.STATION_VERSION_CODE.DEFAULT_CODE
    const hideArray = this.PAGE_VERSION_HIDE_CONFIGS[stationVersionCode]
    if (!hideArray) {
      return false
    }
    !this.memCheckPageElement[stationVersionCode] &&
      (this.memCheckPageElement[stationVersionCode] = {})
    if (
      this.memCheckPageElement[stationVersionCode][elementKey] !== undefined
    ) {
      return this.memCheckPageElement[stationVersionCode][elementKey]
    }
    if (hideArray.indexOf(elementKey) != -1) {
      this.memCheckPageElement[stationVersionCode][elementKey] = true
      return true
    }
    this.memCheckPageElement[stationVersionCode][elementKey] = false
    return false
  }
}
