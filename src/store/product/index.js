import { getProductById } from '../../utils';
import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      item: {},
      error: 'none',
    };
  }

  /**
   * Добавление товара в корзину
   * @param productId айдишник товара в запросе
   * @param fields поля запроса, строка должна начинаться 'fields=', по умолчанию - 'fields=title,description,madeIn(title,code),category(title),edition,price'
   */
  // fields=title,description,madeIn(title,code),category(title),edition,price
  async load(productId, fields) {
    const response = await getProductById(productId, fields);
    if (response.error) {
      this.setState({ ...this.getState(), error: response.error });
    } else
      this.setState(
        {
          ...this.getState(),
          item: response,
          error: 'none',
        },
        'Загружен товар из АПИ',
      );
  }
}

export default Product;
