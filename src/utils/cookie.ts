export default {
  /**
   * 设置cookie
   * @param name *
   * @param value *
   * @param time 可选 默认为30天
   */
  set(name: string, value, time?: number) {
    time = time || 30;
    const Days = time * 24 * 60 * 60 * 1000;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days);
    document.cookie =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(value) +
      ";expires=" +
      exp.toUTCString();
  },
  /**
   * 获取cookie
   * @param name *
   */
  get( name: string) {
    let arr;
    const reg = new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2]);
    else return null;
  }
};

