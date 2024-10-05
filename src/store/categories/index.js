import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: [{
        _id: "",
        title: "Все",
        parent: null,
        name: ""
      }],
      waiting: false,
    };
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setCategories() {

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Установлены категории',
    );

    const categoriesResponse = await fetch(`/api/v1/categories?fields=items(_id, title, name, parent)&limit=*`);
    const categoriesJson = await categoriesResponse.json();
    this.setState(
      {
        ...this.getState(),
        waiting: false,
        data: categoriesJson.result.items.concat(this.initState().data),
      },
      'Загружен список категорий',
    );
  }
}

export default CategoriesState;
