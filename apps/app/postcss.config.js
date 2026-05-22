export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度，转换时以此为标准计算 vw 值
      unitPrecision: 5, // px 转 vw 后的小数点位数
      viewportUnit: 'vw', // 转换单位
      selectorBlackList: [], // 选择器黑名单，匹配的类名不转换
      minPixelValue: 1, // 小于该值的 px 不转换
      mediaQuery: false // 是否转换 @media 中的 px
    }
  }
}
