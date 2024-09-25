import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.initQuery = {limit: 1, skip: 0, fields: 'items(_id, title, price),count'};
  }

  initState() {
    return {
      list: [],
    };
  }

  /**
   * Загрузка товара в корзину
   * @param limit количество товаров в запросе
   * @param skip количество пропущенных записей в запросе
   * @param fields поля товаров в запросе
   */
  async load(params) {
    const query = params ? params : this.initQuery;
    const response = await fetch(`/api/v1/articles?limit=${10 * query.limit}&skip=${10 * (query.skip !== 0 ? query.skip - 1 : query.skip)}${query.fields ? '&fields=' + query.fields : ''}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        productsCount: json.result.count ? json.result.count : this.store.state.catalog.productsCount,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
