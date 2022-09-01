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

/**
 * 最大公约数
 * @param {*} a
 * @param {*} b
 * @returns
 */
export const gcd = (a, b) => {
  let remainder = a % b;
  while (remainder !== 0) {
    a = b;
    b = remainder;
    remainder = a % b;
  }
  return b;
};
/**
 * 判断类型
 * @param {*} obj 
 * @returns 
 */
export const typeOf = function(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}


// 水印功能
!(function () {
  // 一个配置
  const options = {
    id: 'globalWaterMark',
    fontSize: 10,
    color: 'rgba(128,128,128,.6)',
    rotate: '-30',
    userName: "lck 2022.08.25 03:11"
  };

  /**
   * 创建水印图片url
   */
  function createWaterMark() {
    const { fontSize, color, userName } = options;
    const user = /user_name=([^;]+)/.exec(document.cookie);
    const canvasObj = document.createElement('canvas');
    const canvas2d = canvasObj.getContext('2d');
    canvasObj.width = 200;
    canvasObj.height = 100;
    canvas2d.font = fontSize + 'px Arial';
    canvas2d.fillStyle = color;
    canvas2d.translate(canvasObj.width / 4, canvasObj.height / 2);
    canvas2d.rotate((-30 / 180) * Math.PI);
    canvas2d.fillText(userName, 0, canvasObj.height / 2);
    // 将canvas 转为 dataURL
    const base64Url = canvasObj.toDataURL('image/png');
    return base64Url;
  }

  function setWaterMark() {
    const { fontSize, color, id } = options;
    const url = createWaterMark();
    const target = document.getElementById(id);
    if(target){
      document.body.removeChild(target)
    }
    const divObj = document.createElement('div');
    divObj.id = options.id;
    const styleStr = `
                  position:fixed;
                  top:0;
                  left:0;
                  bottom:0;
                  right:0;
                  z-index:999999;
                  background-repeat:repeat;
                  pointer-events:none;
                  background-image:url('${url}')`;
    divObj.setAttribute('style', styleStr);
    document.body.appendChild(divObj);
    // 监听DOM变动
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
      let waterMarkOb = new MutationObserver(function () {
        const _globalWatermark = document.querySelector(`#${id}`);
        // 当样式或者水印元素dom节点有改动时会重新绘制
        if (
          (_globalWatermark && _globalWatermark.getAttribute('style') !== styleStr) ||
          !_globalWatermark
        ) {
          waterMarkOb.disconnect();
          waterMarkOb = null;
          setWaterMark();
        }
      });
      // 指定观察对象
      waterMarkOb.observe(document.body, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    setWaterMark();
  });
})();
