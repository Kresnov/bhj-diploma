/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest;
    let formData = new FormData;
  
    xhr.withCredentials = true;
    xhr.responseType = options.responseType;
  
    xhr.addEventListener('readystatechange', callBack);
  
    function callBack() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        callback(err, xhr.response);
      } else {
        let err = this.responseType;
      }
    }
  
    options.data = {};
  
    if (options.method === 'GET') {
      let urlData = Object.entries(options.data);
  
      urlData.map(([key, value]) => `${key}=${value}`);
      urlData.join('&');
  
      if (urlData) {
        options.url += '?' + urlData;
      }
  
    } else {
      for (let element in options.data) {
        formData.append(element, options.data[element]);
      }
    }
  
    try {
      xhr.open(options.method, options.url);
      xhr.send(formdata);
    } catch (err) {
      options.callback(err);
    }
  
    return xhr;
  };
  