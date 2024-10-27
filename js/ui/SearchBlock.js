class SearchBlock {
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }

  registerEvents(){
    const replaceButton = this.element.querySelector('.replace');
    const addButton = this.element.querySelector('.add');
    const input = this.element.querySelector('input');

    replaceButton.addEventListener('click', () => {
      if(input.value.trim() === '') return;
      
      VK.get(input.value.trim(), (images) => {
        App.clearImages();
        App.renderImages(images);
      });
    });

    addButton.addEventListener('click', () => {
      if(input.value.trim() === '') return;

      VK.get(input.value.trim(), (images) => {
        App.renderImages(images);
      });
    });
  }
}