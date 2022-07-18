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

/**
 * 最长递增序列
 * @param {*} arr 
 * @returns 最长递增序列下标index
 */
export const getSequence = (arr) => {
  const p = arr.slice(); //  保存原始数据
  const result = [0]; //  存储最长增长子序列的索引数组
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1]; //  j是子序列索引最后一项
      if (arr[j] < arrI) {
        //  如果arr[i] > arr[j], 当前值比最后一项还大，可以直接push到索引数组(result)中去
        p[i] = j; //  p记录第i个位置的索引变为j
        result.push(i);
        continue;
      }
      u = 0; //  数组的第一项
      v = result.length - 1; //  数组的最后一项
      while (u < v) {
        //  如果arrI <= arr[j] 通过二分查找，将i插入到result对应位置；u和v相等时循环停止
        c = (u + v) >> 1; //  二分查找
        if (arr[result[c]] < arrI) {
          u = c + 1; //  移动u
        } else {
          v = c; //  中间的位置大于等于i,v=c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]; //  记录修改的索引
        }
        result[u] = i; //  更新索引数组(result)
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  //把u值赋给result
  while (u-- > 0) {
    //  最后通过p数组对result数组进行进行修订，取得正确的索引
    result[u] = v;
    v = p[v];
  }
  return result;
};
