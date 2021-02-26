
// 深克隆
export const deepClone = (oldObj: object)  => {
  // return JSON.parse(JSON.stringify(obj))
    let result;
    const isType= (arg: any, type: string) =>  {
      const typeString: string = Object.prototype.toString.call(arg)
      let flag
      switch (type) {
        case "Array":
          flag = typeString === "[object Array]";
          break;
        case "Date":
          flag = typeString === "[object Date]";
          break;
        case "RegExp":
          flag = typeString === "[object RegExp]";
          break;
        case "Object":
          flag = typeString === "[object Object]";
          break;
        default:
          flag = false;
      }
      return flag
    }
    if (isType(oldObj, 'Array')) {
      result = []
      for (const i in oldObj) {
        result.push(deepClone(oldObj[i]))
      }

    } else if (isType(oldObj, 'Object')) {
      result = {}
      for (const i in oldObj) {
        result[i] = deepClone(oldObj[i])
      }
    }
    else {
      result = oldObj  //引用类型的值转换成基本数据类型
    }
    return result
}