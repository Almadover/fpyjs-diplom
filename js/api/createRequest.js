const createRequest = options => {
    const xhr = new XMLHttpRequest();
  
    // Формирование URL с параметрами, если они указаны
    let url = options.url;
    if (options.data && options.method === 'GET') {
      const params = new URLSearchParams(options.data).toString();
      url += '?' + params;
    }
  
    // Установка типа ответа
    xhr.responseType = 'json';
  
    try {
      // Открытие запроса
      xhr.open(options.method, url);
  
      // Установка заголовков
      if (options.headers) {
        Object.keys(options.headers).forEach((key) => {
          xhr.setRequestHeader(key, options.headers[key]);
        });
      }
  
      // Обработка ответа
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // Успех - вызываем callback с данными
          options.callback(null, xhr.response);
        } else {
          // Ошибка - вызываем callback с ошибкой
          options.callback(`Error: ${xhr.status}`, null);
        }
      };
  
      // Обработка ошибок сети
      xhr.onerror = () => {
        options.callback('Network Error', null);
      };
  
      // Отправка запроса (для POST, PUT и других методов, если нужно передать данные)
      if (options.method !== 'GET') {
        xhr.send(JSON.stringify(options.data));
      } else {
        xhr.send();
      }
  
    } catch (err) {
      // Перехват сетевых ошибок
      console.error(err);
      options.callback(err, null);
    }
  };
  
  // Пример вызова
  createRequest({
    method: 'GET',
    url: 'https://cloud-api.yandex.net/v1/disk/resources/files',
    headers: {
      'Authorization': 'y0_AgAAAAABAWzGAAymvQAAAAEVhZuqAAAa9YGN_JdB-rdsaJNWEZLkXB0RmQ',
    },
    callback: (err, response) => {
      if (err) {
        console.error(err);
      } else {
        console.log(response);
      }
    }
  });  