import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cart = this.state.list.map((item) => {
      return { ...item, count: 0 };
    });
    this.state.uniqueProductsCount = new Set();
    this.state.totalPrice = 0;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * добавление товара по коду
   * @param code
   */
  addToCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.map((el) => {if(el.code === code) el.count++; return {...el}}),
      totalPrice: this.state.cart.reduce((acc, el) => acc + (el.price * el.count), 0),
    });
    this.state.uniqueProductsCount.add(code);
    console.log(this.state);
  }

  deleteFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.map((el) => {if(el.code === code) el.count = 0; if(el.code === code && el.count === 0) this.state.uniqueProductsCount.delete(code); return el}),
      totalPrice: this.state.cart.reduce((acc, el) => acc + (el.price * el.count), 0),
    });
  }
}

export default Store;
