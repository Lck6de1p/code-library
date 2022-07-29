/**
 * script文件引入
 * @param {String} url
 * @returns
 */
 const scriptLoad = function (url) {
  return new Promise((resolve, reject) => {
    const scriptDom = document.createElement("script");
    scriptDom.src = url;
    if (window.fileListMap[url]) {
      return resolve();
    }
    window.fileListMap[url] = true;
    document.body.append(scriptDom);
    scriptDom.onload = () => {
      resolve();
    };
    scriptDom.onerror = () => {
      reject();
    };
  });
};
/**
 * script文件移除
 * @param {String} url
 * @returns
 */
const scriptUnload = function (url) {
  if (!window.fileListMap[url]) return;
  const doms = document.body.getElementsByTagName("script");
  const dom = Array.from(doms).find((item) => item.getAttribute("src") === url);
  document.body.removeChild(dom);
  window.fileListMap[url] = false;
};

/**
 * 批量加载js文件或请求其他接口，采用并发请求处理
 * @param {Array} urls
 * @param {Number} max
 * @param {Promise} customReq 自定义请求方法，需要返回promise
 * @returns {Promise} promise返回值是请求结果数组
 */
const batchLoad = function (urls, max = 5, customReq) {
  const sequence = [].concat(urls);
  let promises = [];
  let order = 0;
  let result = [];
  return new Promise((resolve) => {
    function requestHandler(url, index) {
      return (customReq ? customReq(url) : scriptLoad(url))
        .then((res) => {
          result.push(res);
          if (++order == urls.length) {
            resolve && resolve(result);
          }
          return index;
        })
        .catch(() => {
          return Promise.reject({ url, index });
        });
    }

    function loop() {
      let p = Promise.race(promises);
      for (let i = 0; i < sequence.length; i++) {
        p = p
          .then((res) => {
            promises[res] = requestHandler(sequence[i], res);
            return Promise.race(promises);
          })
          .catch(({ url, index }) => {
            promises[index] = requestHandler(sequence[i], index);
            // 未加载成功的js文件，加入最后的队列中再给它一次机会
            p = p.then((res) => {
              scriptUnload(url);
              promises[res] = requestHandler(url, res);
            });
            return Promise.race(promises);
          });
      }
    }
    promises = sequence.splice(0, max).map((url, index) => {
      return requestHandler(url, index);
    });

    if (promises.length === 0) resolve();
    else loop();
  });
};

export default {
  batchLoad,
  scriptUnload,
};
