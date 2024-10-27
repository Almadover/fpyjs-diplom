class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback) {
    const uploadUrl = `${this.HOST}/resources/upload`;

    createRequest({
      method: 'POST',
      url: uploadUrl,
      data: {
        path: path,
        url: url
      },
      callback: callback
    });
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback) {
    const removeUrl = `${this.HOST}/resources` + encodeURI(path);

    createRequest({
      method: 'DELETE',
      url: removeUrl,
      callback: callback
    });
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback) {
    const filesUrl = `${this.HOST}/resources/files`;

    createRequest({
      method: 'GET',
      url: filesUrl,
      callback: callback
    });
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = ''; // Устанавливаем имя файла
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Удаляем ссылку после скачивания
  }
}