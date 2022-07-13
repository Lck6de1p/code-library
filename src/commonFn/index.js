export const add = (a, b) => {
  return a + b;
};

/**
 *
 * @param {*} formData 操作对象
 * @param {*} key 操作对象key值当key中存在“.”，需要将value赋给底层 如：key为"key1,0,key2",将会把值赋给formData["key1"]["0"]["key2"]
 * @param {*} value key对应的value值
 * @returns
 */
export const updateFormDataByKey = (formData, key, value) => {
  /**
   *  当key中存在“.”，需要将value赋给底层
   * 如：key为"key1,0,key2",将会把值赋给formData["key1"]["0"]["key2"]
   * 浅拷贝解决
   */
  if (key.indexOf(".") !== -1) {
    const keys = key.split(".");
    const k = keys.shift();
    formData[k] = formData[k] || (isNaN(Number(keys[0])) ? {} : []);
    let temp = formData[k];
    while (keys.length) {
      const k = keys.shift();
      if (!keys.length) {
        temp[k] = value;
      } else {
        if (!temp[k]) {
          temp[k] = isNaN(Number(keys[0])) ? {} : [];
        }
        temp = temp[k];
      }
    }
  } else {
    formData[key] = value;
  }
  return formData;
};
