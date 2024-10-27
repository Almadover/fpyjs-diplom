class ImageViewer {
  constructor(element) {
    // Сохраняем элемент контейнера, куда будет добавляться изображение
    this.imagesContainer = element.querySelector('.images-list');

    // Сохраняем блок предпросмотра
    this.previewBlock = element.querySelector('.column.six.wide img');

    // Выбор кнопок
    this.selectAllButton = element.querySelector('.select-all');
    this.showUploadedButton = element.querySelector('.show-uploaded-files');
    this.sendButton = element.querySelector('.send');

    this.registerEvents();
  }

  registerEvents() {
    // Обработчик двойного клика на блоке изображений
    this.imagesContainer.addEventListener('dblclick', (event) => {
      const image = event.target.closest('img');
      if (image) {
        const src = image.getAttribute('src');
        this.previewBlock.setAttribute('src', src); // Обновляем источник изображения для предпросмотра
      }
    });

    // Обработчик клика на изображениях
    this.imagesContainer.addEventListener('click', (event) => {
      const image = event.target.closest('img');
      if (image) {
        image.classList.toggle('selected'); // Инвертируем класс selected
        this.checkButtonText(); // Проверяем состояние кнопок
      }
    });

    // Обработчик клика на кнопке "Выбрать всё"/"Снять выделение"
    this.selectAllButton.addEventListener('click', () => {
      const images = this.imagesContainer.querySelectorAll('img');
      const hasSelected = Array.from(images).some(image => image.classList.contains('selected'));

      images.forEach(image => {
        image.classList.toggle('selected', !hasSelected); // Инвертируем класс
      });

      this.checkButtonText(); // Проверяем состояние кнопок
    });

    // Обработчик клика на кнопке "Посмотреть загруженные файлы"
    this.showUploadedButton.addEventListener('click', () => {
      const modal = App.getModal('uploaded-previewer-modal');
      modal.setContent('<i class="asterisk loading icon massive"></i>');
      modal.open();

      Yandex.getUploadedFiles((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        modal.showImages(data); // Отображаем загруженные изображения
      });
    });

    // Обработчик клика на кнопке "Отправить на диск"
    this.sendButton.addEventListener('click', () => {
      const modal = App.getModal('file-uploader-modal');
      const selectedImages = this.imagesContainer.querySelectorAll('img.selected');

      modal.open(); // Открываем модальное окно
      modal.showImages(selectedImages); // Отображаем выбранные изображения в модальном окне
    });
  }

  checkButtonText() {
    const hasSelected = this.imagesContainer.querySelectorAll('img.selected').length > 0;
    this.selectAllButton.innerText = hasSelected ? 'Снять выделение' : 'Выбрать всё';
    this.sendButton.classList.toggle('disabled', !hasSelected); // Деактивируем кнопку, если ничего не выбрано
  }

  clear() {
    // Очищаем контейнер с изображениями
    this.imagesContainer.innerHTML = '';
  }

  drawImages(images) {
    this.clear(); // Сначала очищаем

    images.forEach(imageSrc => {
      const imgElement = document.createElement('img');
      imgElement.setAttribute('src', imageSrc); // Устанавливаем путь к изображению
      imgElement.className = 'ui fluid image'; // Класс для стилизации (Semantic UI)
      this.imagesContainer.appendChild(imgElement); // Добавляем изображение в контейнер
    });
  }
}
