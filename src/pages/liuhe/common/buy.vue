<template>
  <view class="buy">
    <view class="top">
      <view class="expand" @click="onExpandChange">
        <image class="cart" src="@/static/img/liuhe/cart.png"></image>
        <text class="sum">{{ setSum() }}</text>
        <image class="arrow" :src="isExpand ? down : up"></image>
      </view>
      <view class="price">
        {{ $t('pages.liuhe.common.buy.totalText') }}{{ setPrice()
        }}{{ $t('pages.liuhe.common.buy.moneyText') }}
      </view>
      <view class="right-part" v-if="isExpand">
        <image
          v-if="isOpened === 'right'"
          src="@/static/img/liuhe/finish.png"
          @click="toFinish"
        >
        </image>
        <image
          v-else
          src="@/static/img/liuhe/edit.png"
          @click="closeBuy"
        ></image>
        <text
          v-if="isOpened === 'right'"
          style="color: #fff"
          @click="toFinish"
          >{{ $t('pages.liuhe.common.buy.finish') }}</text
        >
        <text v-else style="color: #fff" @click="closeBuy">{{
          $t('pages.liuhe.common.buy.edit')
        }}</text>
      </view>
      <view class="right-part" v-else>
        <text
          >{{ $t('pages.liuhe.common.buy.topRewards')
          }}{{
            setAmount(
              orderList.length *
                amount *
                (ballItem.odds * ((100 - lotteryPercentValue) / 100))
            )
          }}元</text
        >
        <image src="@/static/img/liuhe/delete.png" @click="closeBuy"></image>
      </view>
    </view>
    <scroll-view
      scroll-y
      :class="isExpand ? 'content-list active' : 'content-list'"
    >
      <uni-swipe-action v-if="orderList.length > 0">
        <uni-swipe-action-item
          ref="swipe"
          :show="isOpened"
          v-for="(item, index) in orderList"
          :key="index"
          :right-options="options"
          @click="(e) => bindClick(e)"
          @change="swipeChange($event, index)"
        >
          <view class="content-list-item">
            <uni-row>
              <uni-col :span="8">
                <view class="left">
                  <view class="amount">
                    {{ amount === '' ? 1 : amount }}
                  </view>
                </view>
              </uni-col>
              <uni-col :span="8">
                <view class="center">
                  {{ item.methodName }}
                  <text>@[{{ item.name }}]</text>
                </view>
              </uni-col>
              <uni-col :span="8">
                <view class="right">{{ item.stakeCount }}注</view>
              </uni-col>
            </uni-row>
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </scroll-view>
    <view class="bottom" :class="{ onHideRebeta: isHideUserRebetaNum }">
      <view class="close-bottom" v-if="stampType === 3 || stampType === 1">
        <view class="close-mask">
          {{ $t('pages.liuhe.common.buy.closeBuy') }}
        </view>
      </view>
      <uni-row>
        <uni-col :span="18">
          <view class="coins">
            <view
              :class="`${
                coinCurrent === index ? 'coin-item active' : 'coin-item'
              } ${getCoinFontSizeClasss(item)}`"
              v-for="(item, index) in coins"
              @click="setCustomAmount(item, index)"
            >
              <text class="num-text">{{ item }}</text>
            </view>
          </view>
        </uni-col>
        <uni-col :span="6">
          <view class="edit">
            <view class="btn" @click="setEdit">{{
              $t('pages.liuhe.common.buy.edit')
            }}</view>
          </view>
        </uni-col>
      </uni-row>
      <view class="input-text">
        <view class="times" @click="times(baseFormData.multiple1)">{{
          `x${baseFormData.multiple1}`
        }}</view>
        <view class="times" @click="times(baseFormData.multiple2)">{{
          `x${baseFormData.multiple2}`
        }}</view>
        <view class="text">
          <input
            maxlength="7"
            v-model="amount"
            type="number"
            placeholder="输入下注金额"
            @input="onChangeAmount"
          />
          <view class="clear" @click="clearAmount">清</view>
        </view>
        <uni-badge
          size="small"
          :text="carts.length"
          absolute="rightTop"
          type="error"
        >
          <view class="btn" @click="toBuy">
            {{
              isCart && carts.length > 0
                ? $t('pages.liuhe.common.buy.cart')
                : $t('pages.liuhe.common.buy.confirm')
            }}
          </view>
        </uni-badge>
      </view>
    </view>
    <view class="bet-return" v-if="!isHideUserRebetaNum">
      <view class="bet-return-ctrlbox">
        <view class="percent">{{ buyReturnPercent }}%</view>
        <view class="line"></view>
        <view class="ctrl">
          <view class="percent-sub" @click="onClickChangeNumber(-0.1)">-</view>
          <view class="percent-slider-box">
            <u-slider
              class="percent-slider"
              :min="0"
              :max="100"
              :step="lotterySliderStep"
              active-color="#F03636"
              inactive-color="#F03636"
              v-model="lotterySliderValue"
              @moving="onLotterySliderMove"
            ></u-slider>
            <view class="slider-line"></view>
          </view>

          <view class="percent-add" @click="onClickChangeNumber(+0.1)">+</view>
        </view>
      </view>

      <view class="close-bet-return" v-if="stampType === 3 || stampType === 1">
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'pinia'
import USlider from 'vk-uview-ui/components/u-slider/u-slider.vue'
import UniRow from '@/uni_modules/uni-row/components/uni-row/uni-row'
import UniCol from '@/uni_modules/uni-row/components/uni-col/uni-col'
import Playing from '@/utils/common/playing'
import { getLotteryType } from '@/utils/lottery/betting'

export default {
  name: 'buy',
  components: {
    USlider,
    UniCol,
    UniRow
  },
  props: {
    ballItem: {},
    orders: {},
    stampType: {},
    total: {},
    isCart: {},
    coins: {},
    carts: {},
    lotteryId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['orderList', 'themeColor', 'isHideUserRebetaNum']),
    menuListStoregeKey() {
      return `menuList:${this.lotteryId}`
    },
    userReturnPercentBase() {
      if (!this.lotteryTypeInfo) return 0
      return this.lotteryTypeInfo.userRebate || 0
    },

    buyReturnPercent() {
      return intFixed(Number(this.lotteryPercentValue), 2)
    }
  },
  watch: {
    orders(newV, oldV) {},
    total(newV, oldV) {},
    buyReturnPercent(newV, oldV) {
      this.$store.dispatch('setLotteryUserRebateMum', {
        id: this.lotteryId,
        num: newV
      })
    },
    ballItem(nv, ov) {
      console.log('ballItem', nv)
    }
  },

  data() {
    return {
      price: '0.00',
      sum: 0,
      isExpand: false,
      coinCurrent: null,
      up: require('@/static/img/liuhe/up.png'),
      down: require('@/static/img/liuhe/down.png'),
      coin: require('@/static/img/liuhe/coin.png'),
      coinSelect: require('@/static/img/liuhe/coin-select.png'),
      // coins: [5, 10, 50, 100, 500],
      // 基础表单数据
      baseFormData: {
        amount1: 5,
        amount2: 10,
        amount3: 50,
        amount4: 100,
        amount5: 500,
        multiple1: 2,
        multiple2: 3
      },
      amount: '',
      playing: new Playing(),
      options: [
        {
          text: this.$t('pages.liuhe.common.buy.remove'),
          style: {
            backgroundColor: '#CC6666'
          }
        }
      ],
      isOpened: 'none',
      menuObj: {},
      lotteryTypeInfo: null,
      // 用作slider默认值

      lotterySliderValue: 0,
      lotterySliderStep: 1,
      lotteryPercentValue: 0
    }
  },
  mounted() {
    const _this = this
    uni.$emit('on_page_mounted', this)
    uni.$off(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LIUHE_BUY_REBATE_INIT)
    uni.$on(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LIUHE_BUY_REBATE_INIT, () => {
      this.lotterySliderValue = 0
      this.lotteryPercentValue = 0
    })

    this.$store.dispatch('setLotteryUserRebateMum', {
      id: this.lotteryId,
      num: this.lotteryPercentValue
    })
    this.getHistoryAmount()
    this.initLotteryIdType()
    this.initLotteryValue()
  },
  methods: {
    initLotteryValue() {
      //  this.lotterySliderValue = this.lastLotteryLotteryPercent;
    },

    initLotteryIdType() {
      const _this = this
      this.$nextTick(() => {
        getLotteryType({
          lotteryId: _this.lotteryId
        }).then((res) => {
          _this.$requestCache.bindLastCacheUpdateApiCallBack(
            res,
            _this.bindLotteryTypeResponse,
            _this
          )
          _this.bindLotteryTypeResponse(res)
        })
      })
    },

    bindLotteryTypeResponse(res) {
      if (res.code != this.$config.enumMgr.RESPONSE_CODE.SUCCESS) {
        setTimeout(() => {
          this.initLotteryIdType()
        }, 3000)
        return
      }
      this.lotteryTypeInfo = res.result
      this.$store.dispatch('setLotteryRebateInfos', {
        id: this.lotteryId,
        rabateInfo: this.lotteryTypeInfo
      })
    },

    /**
     * 根据不同数值获取不同字体大小配置
     * @param {Object} coinMsg
     */
    getCoinFontSizeClasss(coinMsg) {
      let cssClassName = 'big'
      if (!coinMsg) {
        console.warn('coinMsg is undefined')
        return cssClassName
      }
      if (coinMsg < 1000) {
        cssClassName = 'big'
      } else if (coinMsg < 100000) {
        cssClassName = 'medium'
      } else if (coinMsg < 1000000) {
        cssClassName = 'small'
      }
      return cssClassName
    },
    setImputStyle() {
      return {
        backgroundColor: this.themeColor.themeAuxiliaryColorDefault
      }
    },
    setStyle() {
      return {
        color: this.themeColor.themeColor
      }
    },
    getHistoryAmount() {
      this.menuObj = this.playing.getStorage(this.menuListStoregeKey)[
        this.lotteryId
      ]
        ? this.playing.getStorage(this.menuListStoregeKey)[this.lotteryId]
        : {}
      if (this.menuObj.remenber && this.menuObj.remenber.isOpen) {
        if (this.menuObj.remenber.amount) {
          this.amount = this.menuObj.remenber.amount
        }
      }
    },
    setSum() {
      if (this.total.stakeCount > 0) {
        return this.total.stakeCount
      }
      return 0
    },
    setPrice() {
      if (this.orderList.length > 0) {
        return this.orderList[0].content === ''
          ? this.setAmount(this.orderList.length * this.amount)
          : this.setAmount(this.orderList[0].stakeCount * this.amount)
      }
      return 0
    },
    bindClick(e) {
      const _this = this
      // this.$nextTick(function () {
      // 	_this.$emit('removeOrder', e.index)
      // })
      setTimeout(function () {
        _this.$emit('removeOrder', e.index)
      }, 100)
    },
    swipeChange(e, index) {},
    setAmount(val) {
      let money = this.playing.setAmount(val, 2, '.', ',')
      if (money.length > 9) {
        money = `${money.substring(0, 9)}..`
      }
      // return this.playing.setAmount(val, 2, '.', ',');
      return money
    },
    onExpandChange() {
      this.isExpand = !this.isExpand
    },
    clearAmount() {
      this.coinCurrent = null
      this.amount = ''
      this.total.totalPrice = 0
      this.$emit('clearAmount')
    },
    setAmountToStorage() {
      if (this.menuObj.remenber && this.menuObj.remenber.isOpen) {
        this.menuObj.remenber.amount = this.amount
        this.playing.saveMenuList(
          this.menuListStoregeKey,
          this.lotteryId,
          this.menuObj
        )
      }
    },

    // 打开金额记忆时，长龙使用此方法回显金额
    setChanglongAmount(value) {
      this.amount = value
    },
    setCustomAmount(item, index) {
      this.coinCurrent = index
      this.amount = Number(this.amount) + Number(item)
      this.total.totalPrice = this.total.stakeCount * this.amount
      this.setAmountToStorage()
      const _this = this
      setTimeout(function () {
        _this.onTouchend()
      }, 100)
      this.$emit('setCustomAmount', this.amount)
    },
    onChangeAmount(event) {
      // console.log(event.detail.value);
      // @mrz 限制输入负数
      let memAmount = Number(event.detail.value)
      if (memAmount < 0) memAmount = 0
      this.amount = memAmount
      this.total.totalPrice = this.total.stakeCount * this.amount

      this.setAmountToStorage()
      this.$emit('setAmount', memAmount)
    },
    times(num) {
      // @mrz 限制翻倍导致超出输入限制
      let caculationAmount = this.amount * num
      if (caculationAmount > 9999999) caculationAmount = 99999999
      if (caculationAmount < 0) caculationAmount = 0
      this.amount = caculationAmount

      this.total.totalPrice = this.total.stakeCount * this.amount
      this.setAmountToStorage()
    },
    onTouchend() {
      this.coinCurrent = null
    },
    setBgColor(isClick) {
      if (isClick) {
        return {
          backgroundImage: `url(${this.coinSelect})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }
      }
      return {
        backgroundImage: `url(${this.coin})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
    },
    setEdit() {
      this.$emit('setEdit')
      // this.$refs.popup.open()
    },
    toFinish() {
      this.isOpened = 'none'
    },
    closeBuy() {
      // 清空返点
      uni.$emit(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LIUHE_BUY_REBATE_INIT)
      if (this.isExpand) {
        this.isOpened = 'right'
        // this.$refs.swipe.resize()
      } else {
        this.$emit('closeBuy')
      }
    },
    // close() {
    // 	this.$refs.popup.close()
    // },
    // setValue() {
    // 	this.coins = [this.baseFormData.amount1, this.baseFormData.amount2, this.baseFormData.amount3, this
    // 		.baseFormData.amount4, this.baseFormData.amount5,
    // 	];
    // 	this.close()
    // },

    toBuy() {
      this.setAmountToStorage()
      const obj = {
        unitPrice: this.amount,
        stakeCount: this.total.stakeCount,
        totalPrice: this.total.totalPrice,
        userRebate: this.buyReturnPercent
      }
      this.$emit('toBuy', obj)
    },

    onClickChangeNumber(num) {
      num = parseInt(num * 10) / 10
      if (this.lotteryPercentValue + num < 0) this.lotteryPercentValue = 0
      else if (this.lotteryPercentValue + num > this.userReturnPercentBase)
        this.lotteryPercentValue = this.userReturnPercentBase
      else {
        this.lotteryPercentValue += num
      }
      this.lotterySliderValue =
        (this.lotteryPercentValue / this.userReturnPercentBase) * 100
    },

    onLotterySliderMove(e) {
      const _this = this
      this.$nextTick(() => {
        if (!_this.lotteryTypeInfo) return 0
        let { userRebate } = _this.lotteryTypeInfo
        userRebate = parseFloat(userRebate)
        _this.lotteryPercentValue =
          Math.round((userRebate * _this.lotterySliderValue) / 10) / 10
        if (this.lotteryPercentValue < 0) this.lotteryPercentValue = 0
        else if (this.lotteryPercentValue > this.userReturnPercentBase)
          this.lotteryPercentValue = this.userReturnPercentBase
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .uni-popup .content-box {
  background-color: transparent !important;
  z-index: 10;

  .uni-popup__wrapper {
    border-radius: 40rpx 40rpx 0 0 !important;
  }
}

::v-deep .msg-box .uni-easyinput .uni-easyinput__content {
  border: none;
  background-color: var(--theme-auxiliary-color-default) !important;
  border-radius: 16rpx;
  height: 80rpx;
  width: 536rpx;
  text-align: center;
}

::v-deep .msg-box .uni-easyinput .uni-easyinput__content .uni-input-input {
  color: #404040;
  font-weight: 500;
  font-size: 34rpx;
}

.buy {
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  .top {
    padding: 5rpx 10rpx;
    height: 60rpx;
    background: #0099cc;
    position: relative;

    .expand {
      background: #dde5f0;
      border-radius: 5px;
      width: 154rpx;
      height: 38rpx;
      position: absolute;
      padding: 10rpx;
      text-align: center;
      line-height: 38rpx;

      .cart {
        width: 27rpx;
        height: 27rpx;
        float: left;
        margin-top: 8rpx;
      }

      .sum {
        font-weight: 600;
        font-size: 25rpx;
        line-height: 35rpx;
        text-align: center;
        color: #3881a8;
        flex: none;
        order: 1;
        flex-grow: 0;
      }

      .arrow {
        width: 20rpx;
        height: 10rpx;
        float: right;
        margin-top: 16rpx;
      }
    }

    .price {
      position: absolute;
      font-weight: 400;
      font-size: 25rpx;
      line-height: 35rpx;
      text-align: center;
      color: #ffffff;
      flex: none;
      order: 1;
      flex-grow: 0;
      left: 200rpx;
      top: 16rpx;
    }

    .right-part {
      line-height: 60rpx;
      float: right;
      display: flex;
      justify-content: space-around;
      align-items: center;

      text {
        color: #a3c6dc;
        font-size: 25rpx;
        margin-right: 9rpx;
      }

      image {
        width: 31rpx;
        height: 33rpx;
      }
    }
  }

  .content-list {
    background: #deeafa;
    height: 0;
    transition: 0.3s;

    .content-list-item {
      background: #deeafa;
      border-bottom: 2rpx solid #b5d4e6;
      height: 80rpx;

      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80rpx;

        .amount {
          padding: 8.5rpx 27rpx;
          background: #ffffff;
          border: 2rpx solid #e7e7e7;
          border-radius: 5rpx;
        }
      }

      .center {
        text-align: center;
        line-height: 80rpx;
        color: #353535;
        font-size: 25rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        text {
          color: #3489b7;
        }
      }

      .right {
        text-align: center;
        line-height: 80rpx;
        color: #353535;
        font-size: 25rpx;
      }
    }
  }

  .content-list.active {
    height: 240rpx;
    transition: 0.3s;
  }

  .bottom {
    background: #ffffff;
    height: 175rpx;
    padding: 12rpx 20rpx;
    padding-bottom: 0rpx;
    position: relative;

    .close-bottom {
      height: 100%;
      width: 100%;
      z-index: 1;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;

      .close-mask {
        width: 100%;
        height: 100%;
        background: rgba(78, 108, 145, 0.7);
        font-weight: 500;
        font-size: 40rpx;
        line-height: 252rpx;
        text-align: center;
        color: #ffffff;
      }
    }

    .coins {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .coin-item {
        width: 94rpx;
        height: 99rpx;
        text-align: center;
        line-height: 88rpx;
        //font-size: clamp(24rpx, 10vw, 38rpx);
        color: #000000;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('@/static/img/liuhe/coin.png');
      }

      .coin-item .num-text {
        user-select: none;
      }

      .coin-item.big .num-text {
        font-size: 18px;
      }

      .coin-item.medium .num-text {
        font-size: 12px;
        transform: scale(0.9);
        display: block;
        text-align: center;
      }

      .coin-item.small .num-text {
        font-size: 12px;
        transform: scale(0.7);
        display: block;
        text-align: center;
        font-weight: bold;
      }

      .coin-item.active {
        background-image: url('@/static/img/liuhe/coin-select.png');
      }

      .coin-item:first-child {
        font-size: 38rpx;
      }

      .coin-item:nth-child(2) {
        font-size: 34rpx;
      }

      .coin-item:nth-child(3) {
        font-size: 34rpx;
      }
    }

    .edit {
      position: relative;

      .msg-box {
        background: #ffffff;
        width: 100%;
        //height: 464rpx;
        border-radius: 10rpx;
        box-sizing: border-box;
        border-radius: 40rpx 40rpx 0px 0px;

        .header {
          width: 100%;
          height: 88rpx;
          padding: 20rpx 28rpx;
          box-sizing: border-box;
          border-radius: 40rpx 40rpx 0 0;
          background: var(--theme-auxiliary-color-default);
          display: flex;
          justify-content: space-between;
          align-items: center;

          .cancel {
            flex: 1;
          }

          .title {
            flex: 1;
            color: #404040;
            text-align: center;

            font-size: 34rpx;
            font-weight: 500;
          }

          .submit {
            flex: 1;
            text-align: center;

            font-size: 30rpx;
            font-weight: 400;
            text-align: right;
          }
        }

        .content {
          padding: 20rpx 28rpx;
          box-sizing: border-box;
          font-size: 29rpx;
          line-height: 41rpx;
          letter-spacing: -0.01em;
          color: #404040;
          flex: none;
          order: 0;
          flex-grow: 0;
          text-align: left;

          .pre-amount {
            color: #404040;

            font-size: 30rpx;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20rpx;
          }

          .dividing-line {
            background-color: #e6e6e6;
            height: 2rpx;
            margin: 30rpx 0 30rpx 0;
            display: none;
          }
        }

        .footer {
          height: 60rpx;

          .btn-group {
            display: flex;
            justify-content: center;
            align-items: center;

            .btn-group-btn {
              width: 200rpx;
              height: 60rpx;
              border-radius: 264rpx;
              color: #ffffff;
              text-align: center;
              line-height: 60rpx;
              font-size: 26rpx;
              letter-spacing: -1rpx;
            }

            .cancel {
              background: #8cb2c9;
            }

            .confirm {
              background: #ff9900;
            }
          }
        }
      }

      .btn {
        position: absolute;
        width: 106rpx;
        height: 55rpx;
        left: 59rpx;
        top: 18rpx;
        background: #8cb2c9;
        border-radius: 10rpx;
        font-size: 28rpx;
        line-height: 55rpx;
        text-align: center;
        color: #ffffff;
        flex: none;
        order: 0;
        flex-grow: 0;
      }
    }

    .input-text {
      display: flex;
      justify-content: space-around;
      padding: 12rpx 0rpx 0rpx;

      .times {
        width: 88rpx;
        height: 60rpx;
        background: linear-gradient(180deg, #feffff 0%, #dfebfa 100%);
        border-radius: 5rpx;
        text-align: center;
        line-height: 60rpx;
        color: #3881a8;
        border: 2rpx solid;
        box-sizing: border-box;
      }

      .text {
        width: 250rpx;
        height: 44rpx;
        background: #ffffff;
        border: 1rpx solid #ccdbee;
        border-radius: 5rpx;
        padding: 8rpx 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
          width: 144rpx;
          font-size: 24rpx;
        }

        .clear {
          background: #b8cfdd;
          border-radius: 5px;
          width: 54rpx;
          height: 44rpx;
          text-align: center;
          line-height: 44rpx;
          color: #f4ffff;
          font-size: 28rpx;
          margin-left: 46rpx;
        }
      }

      .btn {
        width: 190rpx;
        height: 60rpx;
        background: #3881a8;
        border-radius: 5rpx;
        text-align: center;
        line-height: 60rpx;
        color: #ffffff;
        font-size: 32rpx;
      }
    }
  }
  .bottom.onHideRebeta {
    height: 195rpx;
  }
  .bet-return {
    height: 100rpx;
    background: #ffffff;
    overflow: auto;
    position: relative;
    .bet-return-ctrlbox {
      margin: 20rpx 20rpx;
      //border: 1px solid #F4F4F4;
      height: 60rpx;
      border-radius: 8rpx;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .percent {
        width: 160rpx;
        height: 40rpx;
        line-height: 40rpx;
        padding: 10rpx 0rpx;
        border-radius: 4rpx;
        background: #8ab4cd;
        text-align: center;
        vertical-align: center;
        color: white;
        font-size: 34rpx;
        font-family: Roboto;
        font-weight: 400;
      }
      .line {
        width: 36rpx;
        height: 0rpx;
        opacity: 0rpx;
        transform: rotate(90deg);
        border: 2rpx solid #f4f4f4;
      }
      .ctrl {
        width: 400rpx;
        display: flex;
        align-items: center;
        .percent-sub,
        .percent-add {
          width: 60rpx;
          height: 60rpx;
          line-height: 55rpx;
          border-radius: 50%;
          border: 2rpx solid #f03636;
          font-size: 50rpx;
          font-weight: bold;
          text-align: center;
          color: #f03636;
        }
        .percent-slider-box {
          width: 276rpx;
          position: relative;
          .slider-line {
            position: absolute;
            top: calc(50% - 3rpx);
            width: 100%;
            height: 6rpx;
            background: linear-gradient(180deg, #ff5757 0%, #f03636 100%);
          }
        }

        .percent-slider {
          width: 116rpx;
          position: relative;
          left: 120rpx;
          z-index: 3;
          ::v-deep .uni-slider {
            margin: 0px !important;
          }

          ::v-deep .uni-slider-value {
            display: none;
          }

          ::v-deep .u-slider__button {
            width: 160rpx !important;
            height: 60rpx !important;
            margin-left: -80rpx !important;
            margin-top: -0rpx !important;
            background: #f03636 !important;
            border-radius: 30rpx;
            text-align: center;
            line-height: 60rpx;
            color: white;
            font-size: 24rpx;
            font-weight: 500;
            font-family: MiSans;
          }
          ::v-deep .u-slider__button:after {
            content: '收单返点';
          }
        }
      }
    }

    .close-bet-return {
      width: 100%;
      height: 100%;
      background: rgba(78, 108, 145, 0.7);
      font-weight: 500;
      font-size: 40rpx;
      line-height: 202rpx;
      text-align: center;
      color: #ffffff;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 9;
    }
  }
}
</style>
