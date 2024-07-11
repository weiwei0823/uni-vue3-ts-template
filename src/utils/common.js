function getTime(value, type = 1) {
  if (value == undefined) {
    return
  }
  // let date = new Date(value * 1000);
  const date = new Date(value)
  // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? `0${MM}` : MM // 月补0
  let d = date.getDate()
  d = d < 10 ? `0${d}` : d // 天补0
  let h = date.getHours()
  h = h < 10 ? `0${h}` : h // 小时补0
  let m = date.getMinutes()
  m = m < 10 ? `0${m}` : m // 分钟补0
  let s = date.getSeconds()
  s = s < 10 ? `0${s}` : s // 秒补0
  // return y + '-' + MM + '-' + d; //年月日
  if (type == 1) {
    return `${y}-${MM}-${d} ${h}:${m}:${s}` // 年月日时分秒
  }
  if (type == 2) {
    return `${y}年${MM}月${d}日${h}时${m}分${s}秒` // 年月日时分秒
  }
  if (type == 3) {
    return `${MM}月${d}日` // 年月日时分秒
  }
  if (type == 4) {
    return `${MM}-${d}`
  }
  if (type == 5) {
    return `${y}-${MM}-${d}`
  }
}

function checkPhone(phone) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (phone == '' || !reg.test(phone)) {
    pop('请检查手机格式', 2000)
    return false
  }
  return true
}

function codeCheck(code) {
  if (!code) {
    uni.showToast({
      title: '请输入验证码',
      duration: 2000,
      icon: 'none'
    })
    return false
  }
  return true
}

function setPickerStyle(themeColor) {
  console.log('themeColor', themeColor)
  document.querySelectorAll('.uni-picker-action-confirm').forEach((dom) => {
    dom.style.color = themeColor
  })
  document.querySelectorAll('.uni-picker-custom').forEach((dom) => {
    dom.style.borderTopLeftRadius = '12px'
  })
  document.querySelectorAll('.uni-picker-custom').forEach((dom) => {
    dom.style.borderTopRightRadius = '12px'
  })
  document.querySelectorAll('.uni-picker-custom').forEach((dom) => {
    dom.style.overflow = 'hidden'
  })
  console.log(document.querySelectorAll('.uni-picker-header'))
  document.querySelectorAll('.uni-picker-header').forEach((dom) => {
    dom.style.backgroundColor = '#f4f4f4'
  })
  document.querySelectorAll('.uni-picker-action-cancel').innerHTML =
    '<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\' fill=\'none\'><path fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M1.0649 13.7924C0.674377 14.1829 0.674376 14.8161 1.0649 15.2066C1.45543 15.5971 2.08859 15.5971 2.47911 15.2066L7.85795 9.82776L13.3788 15.3486C13.7694 15.7392 14.4025 15.7392 14.793 15.3486C15.1836 14.9581 15.1836 14.325 14.793 13.9344L9.27216 8.41355L15.207 2.47867C15.5976 2.08815 15.5976 1.45498 15.207 1.06446C14.8165 0.673933 14.1833 0.673933 13.7928 1.06446L7.85795 6.99933L2.06513 1.20651C1.6746 0.815985 1.04144 0.815985 0.650912 1.20651C0.260388 1.59703 0.260388 2.2302 0.650912 2.62072L6.44373 8.41355L1.0649 13.7924Z\' fill=\'#A1A1A1\'/></svg>'
  document.querySelectorAll('.uni-picker-mask').forEach((dom) => {
    dom.style.backgroundColor = 'rgba(0,0,0,.3)'
  })
  document.querySelectorAll('.uni-picker-action-confirm').forEach((dom) => {
    dom.innerHTML = '确认'
  })
  document.querySelectorAll('.uni-picker-action-confirm').forEach((dom) => {
    dom.style.fontFamily = 'MiSans'
  })
  document.querySelectorAll('.uni-picker-action-confirm').forEach((dom) => {
    dom.style.fontSize = '15px'
  })
  setTimeout(() => {
    // document.querySelector('.uni-picker-view-content').style.zIndex = "5";
    const pickerContent = document.querySelectorAll('.uni-picker-view-content')
    pickerContent.forEach((item, key) => {
      item.style.zIndex = '5'
    })
    // document.querySelector('.uni-picker-view-indicator').style.backgroundColor = "#F4F4F4";
    // document.querySelector('.uni-picker-view-indicator').style.borderRadius = "8px";
    const allIndicator = document.querySelectorAll('.uni-picker-view-indicator')
    if (allIndicator.length > 1) {
      allIndicator.forEach((item, key) => {
        item.classList.add('pickerStyleMany')
        if (key == 0) {
          item.style.borderTopLeftRadius = '8px'
          item.style.borderBottomLeftRadius = '8px'
          item.style.left = '14px'
          item.style.width = 'calc(100% - 14px)'
        }
        if (key === allIndicator.length - 1) {
          item.style.borderTopRightRadius = '8px'
          item.style.borderBottomRightRadius = '8px'
          item.style.right = '14px'
          item.style.width = 'calc(100% - 14px)'
        }
      })
    } else {
      allIndicator.forEach((item, key) => {
        item.classList.add('pickerStyle')
      })
    }
    // document.querySelector('.uni-picker-view-indicator').classList.add("pickerStyle");
  }, 200)
}

function formatDate(currentDate) {
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

function caculationRpxToPx(rpxsize) {
  const systemInfo = uni.getSystemInfoSync()
  const caculationScreenWidth =
    systemInfo.screenWidth >= 480 ? 480 : systemInfo.screenWidth
  const px = (rpxsize * caculationScreenWidth) / 750
  return px
}

/**
 按参数名的ascii码从小到大排序
 如age在city前
 */
function paramKeySort(array) {
  if (!array || array === undefined) return ''
  // 先用Object内置类的keys方法获取要排序对象的属性名数组，
  // 再利用Array的sort方法进行排序
  const newKey = Object.keys(array).sort()
  // 创建一个新的对象，用于存放排好序的键值对
  let newObj = ''
  for (let i = 0; i < newKey.length; i++) {
    if (
      isNil(`${array[newKey[i]]}`) &&
      Object.prototype.toString.call(array[newKey[i]]) != '[object Object]' &&
      Object.prototype.toString.call(array[newKey[i]]) != '[object Array]'
    ) {
      continue
    }
    if (
      Object.prototype.toString.call(array[newKey[i]]) == '[object Object]' ||
      Object.prototype.toString.call(array[newKey[i]]) == '[object Array]'
    ) {
      newObj += JSON.stringify(array[newKey[i]])
    } else newObj += array[newKey[i]]
  }
  return newObj
}

function isNil(s) {
  return (
    undefined == s ||
    s == 'undefined' ||
    s == null ||
    s == '' ||
    s == 'null' ||
    NaN == s
  )
}

export function setNavigationBarColor(color) {
  const colorUtil = plus.android.newObject('android.graphics.Color')
  const activity = plus.android.runtimeMainActivity()
  const colorInt = plus.android.invoke(colorUtil, 'parseColor', color)
  const window = plus.android.invoke(activity, 'getWindow')
  plus.android.invoke(window, 'setNavigationBarColor', colorInt)
}

export function hideTabBar() {
  uni.hideTabBar()
}

export function lockOrientation() {
  plus.screen.lockOrientation('portrait-primary')
}

/*
 * 判断两个对象等值是否相等
 * @param x {Object} 对象1
 * @param y {Object} 对象2
 * @return  {Boolean} true 为相等，false 为不等
 */
export function deepEqual(x, y) {
  // 指向同一内存时
  if (x === y) {
    return true
  }
  if (
    typeof x === 'object' &&
    x != null &&
    typeof y === 'object' &&
    y != null
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false
    }
    for (const prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false
      } else {
        return false
      }
    }
    return true
  }
  return false
}

module.exports = {
  getTime,
  checkPhone,
  codeCheck,
  setPickerStyle,
  formatDate,
  caculationRpxToPx,
  paramKeySort,
  deepEqual
}
