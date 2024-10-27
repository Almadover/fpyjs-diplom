class VK {
  static ACCESS_TOKEN = 'vk1.a.sEhF0a9T7ivSQT9oGwxpjRsFuEYvCziDjRnhJhS7AqxUjzAvf2gqJfn4fRroJY1NdmXcLr2C0ZSOuAPvUwv0w2EH6nTYH_d1ZJYCaHjwXiKnzF3P9kZI98V9lF_f7d9tCHfOflqc_h6isQ64sk_9RODgOoEyXH5mac-ilDbS8wcb6prfb5gyXiI5Ttsb3P3y';
  static lastCallback;

  static get(id = '', callback) {
    this.lastCallback = callback;

    const url = `https://api.vk.com/method/users.get?user_ids=${id}&fields=photo_50,photo_100,photo_200&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.processData`;

    const script = document.createElement('script');
    script.src = url;

    script.onerror = (error) => {
      alert('Ошибка при выполнении запроса: ' + error.message);
      this.lastCallback = () => {};
    };

    document.body.appendChild(script);
  }

  static processData(result) {
    const photos = result.response;
    const largestImages = photos.map(user => {
      return user.photo_200;
    }).filter(url => url);

    if (this.lastCallback) {
      this.lastCallback(largestImages);
    }
    this.lastCallback = () => {};
  }
}

// Пример использования
VK.get('26435816', (images) => {
  console.log('Полученные изображения:', images);
});