const onPageMounted = () => {
  uni.$on('on_page_mounted', (pageInstance) => {
    // OPPPO 机型下 此属性三指触摸会导致三指触摸出现触摸无法滚动问题
    try {
      if (browserPlatform() == browserPlatform.FLUTTER_App) {
        pageInstance.$parent.$parent.disableScroll = false
      }
    } catch (e) {
      console.error(e)
    }
  })
}

/**
 * @sanm 实现
 * @MR: 采用监听器 手动给页面添加监听生命周期事件
 * 用户在不同页面停留时间统计等可能出现的功能需求扩展 当前管理类APP.vue中预留一个监听入口
 */

export const initListen = () => {
  onPageMounted()
}
