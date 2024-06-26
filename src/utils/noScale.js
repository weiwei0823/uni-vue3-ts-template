// #ifdef H5
window.onload = function () {
  setTimeout(function () {
    if (browserPlatform() == browserPlatform.FLUTTER_App) {
    } else {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          console.log('touchStart cut', event.touches.length)
          event.preventDefault()
        }
      })
      let lastTouchEnd = 0
      document.addEventListener(
        'touchend',
        function (event) {
          const now = new Date().getTime()
          if (now - lastTouchEnd <= 300) {
            event.preventDefault()
          }
          lastTouchEnd = now
        },
        false
      )
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault()
      })
      if (
        window.GestureEvent &&
        !('touchAction' in document.documentElement.style)
      ) {
        document.documentElement.addEventListener(
          'gesturestart',
          (e) => {
            e.preventDefault()
          },
          {
            passive: false,
            capture: true
          }
        )
      }
    }
  }, 0)
}

document.addEventListener(
  'DOMContentLoaded',
  function () {
    document.removeEventListener('DOMContentLoaded', arguments.callee, false)
    try {
      const configDataStr = localStorage.getItem('config')
      const configData = JSON.parse(configDataStr)
      if (!configData) return console.warn('config data is not loaded')
      configData.data?.forEach((item, index) => {
        if (item.type == 21) {
          const title = item.url
          document.title = title
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  false
)
// #endif
