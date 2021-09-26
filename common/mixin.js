const myMixin = {
  methods: {
    formatCode: function (value) {
      let str = ''
      const reg = /^[0-9]+$/
      if (reg.test(value)) {
        str = value
      } else {
        str = value.substring(2)
      }
      return str
    },
    getCurrentDate: function () {
      const date = new Date()
      const year = date.getFullYear()
      let mounth = date.getMonth() + 1
      let day = date.getDate()
      if (mounth < 10) {
        mounth = '0' + mounth
      }
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + mounth + '-' + day
    }
  },
  filters: {
    formatNum2percent: function (value) {
      return value + '%'
    }
  }
}
export default myMixin
