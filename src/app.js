import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Modal from './components/modal';
import Item from './components/item';
import CartItem from './components/cart-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getState().totalPrice;
  const uniqueItems = store.getState().uniqueProductsCount.size;

  const [modalOpen, setModalOpen] = useState(false);

  const callbacks = {
    addToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    deleteFromCart: useCallback(
      code => {
        store.deleteFromCart(code);
      },
      [store],
    ),
    renderListItems: useCallback(
      (item, cn) => {
        return (
          <div key={item.code} className={cn('item')}>
            <Item item={item} action={callbacks.addToCart} />
          </div>
        );
      },
      [store],
    ),
    renderCartItems: useCallback(
      (item, cn) => {
        if (item.count)
          return (
            <div key={item.code} className={cn('item')}>
              <CartItem item={store.findCartItem(item)} action={callbacks.deleteFromCart} />
            </div>
          );
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        totalPrice={totalPrice}
        uniqueItems={uniqueItems}
        action={() => setModalOpen(prev => !prev)}
      />
      <List list={list} action={callbacks.addToCart} renderFunc={callbacks.renderListItems} />
      <Modal
        active={modalOpen}
        setModalOpen={() => {
          setModalOpen(prev => !prev);
          console.log(modalOpen);
        }}
      >
        <Cart
          title={'Корзина'}
          list={cart}
          totalPrice={totalPrice}
          uniqueItems={uniqueItems}
          action={callbacks.deleteFromCart}
          renderFunc={callbacks.renderCartItems}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
