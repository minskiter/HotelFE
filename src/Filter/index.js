const Filters = {
  dateFormat: function(value, pattern) {
    var o = {
      "M+": value.getMonth() + 1, // 月份
      "d+": value.getDate(), // 日
      "h+": value.getHours() % 12 === 0 ? 12 : value.getHours() % 12, // 小时
      "H+": value.getHours(), // 小时
      "m+": value.getMinutes(), // 分
      "s+": value.getSeconds(), // 秒
      "q+": Math.floor((value.getMonth() + 3) / 3), // 季度
      S: value.getMilliseconds() // 毫秒
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        (value.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    if (/(E+)/.test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        (RegExp.$1.length > 1
          ? RegExp.$1.length > 2
            ? "/u661f/u671f"
            : "/u5468"
          : "") + week[value.getDay() + ""]
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(pattern)) {
        pattern = pattern.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return pattern;
  },
  prefixZero(value, totalBits) {
    let bits = 0;
    let str = "" + value;
    if (value === 0) bits = 1;
    while (value > 0) {
      value = Math.floor(value / 10);
      ++bits;
    }
    while (totalBits - bits > 0) {
      str = "0" + str;
      ++bits;
    }
    return str;
  }
};

export default {
  install: function(Vue) {
    for (let key in Filters) {
      Vue.filter(key, Filters[key]);
    }
  },
  Filters
};
