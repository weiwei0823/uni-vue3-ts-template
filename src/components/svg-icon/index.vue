<template>
  <img v-if="imgSrc" :src="imgSrc" />
  <view v-else v-html="svg"></view>
</template>

<script>
import svgIconsList from "./index.js";

function isImageUrl(str) {
  const regImg = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
  const regBase64 = /^data:image\/(jpeg|jpg|gif|png|bmp|webp);base64,/;
  return regImg.test(str) || regBase64.test(str);
}
export default {
  props: {
    /**
     * 图标名称
     * @type {string}
     */
    icon: {
      type: String,
      default: "",
    },
    /**
     * 是否替换svg中的颜色属性
     * @type {boolean}
     */
    replaceSise: {
      type: Boolean,
      default: true,
    },
    replaceColor: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      svg: "",
      imgSrc: "",
    };
  },
  mounted() {
    /**
     * 组件挂载后初始化svg图标
     */
    this.initSvgIcon();
  },
  methods: {
    /**
     * 替换svg中的颜色属性
     * @param {string} svgContent - svg内容
     * @param {string[]} attrs - 需要替换的颜色属性
     * @returns {string} - 替换后的svg内容
     */
    replaceColorAttributes(svgContent, attrs) {
      attrs.forEach((attr) => {
        svgContent = svgContent.replace(
          new RegExp(`${attr}="([^"]+)"`, "g"),
          (match, p1) => {
            /**
             * 检查颜色属性是否为六位十六进制表示形式
             * @type {RegExpMatchArray}
             */
            const isHexColor = /^#[0-9A-Fa-f]{6}$/.test(p1.trim());
            return isHexColor ? `${attr}="currentColor"` : match;
          }
        );
      });
      return svgContent;
    },

    /**
     * 异步获取SVG内容，并根据需求处理SVG的属性。
     * @param {string} src - SVG资源的URL地址。
     * @returns {Promise<void>} 不返回任何内容，但会在内部更新svg.value为处理后的SVG内容。
     */
    async getSvgContent(src) {
      uni.request({
        url: src,
        success: (res) => {
          // 使用axios获取SVG资源内容
          // 如果响应数据不存在，则直接返回
          if (!res.data) {
            return;
          }
          // 替换SVG颜色属性
          let svgContent = this.replaceColorAttributes(res.data, [
            "fill",
            "stroke",
            ...this.replaceColor,
          ]);
          // 如果props.replaceSise为true，则移除SVG的width和height属性
          if (this.replaceSise) {
            svgContent = svgContent
              .replace(/<svg([^>]*)\swidth="[^"]*"/, "<svg$1")
              .replace(/<svg([^>]*)\sheight="[^"]*"/, "<svg$1");
          }
          // 更新svg.value为处理后的SVG内容
          this.svg = svgContent;
        },
      });
    },

    /**
     * 初始化SVG图标
     */
    initSvgIcon() {
      // 若icon属性为空，则打印警告信息。
      if (!this.icon) return console.warn("MKSvgIcon icon属性为空");

      let icon = this.icon;

      // 若icon为图片URL，则直接设置imgSrc的值为该URL。
      if (isImageUrl(icon)) {
        // 将@符号替换为/src，以修正图标路径
        icon = icon.replace("@", "/src");
        this.svg = icon;
        return;
      }

      icon = svgIconsList[this.icon];
      if (/^https?:\/\//.test(this.icon)) {
        icon = this.icon;
      } else if (!icon)
        return console.warn("MKSvgIcon svg图标库中没有icon:", this.icon);

      // 再次判断icon为图片URL，则直接设置imgSrc的值为该URL。
      if (isImageUrl(icon)) {
        this.svg = icon;
        return;
      }

      return this.getSvgContent(icon);
    },
  },
};
</script>
