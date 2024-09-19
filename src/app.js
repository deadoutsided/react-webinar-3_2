import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';

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
  };

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Controls totalPrice={totalPrice} uniqueItems={uniqueItems} action={() => setModalOpen(prev => !prev)} />
      <List
        list={list}
        action={callbacks.addToCart}
      />
      <Cart
        modalOpen={modalOpen}
        setModalOpen={() => {setModalOpen(prev => !prev); console.log(modalOpen)}}
        title={"Корзина"}
        list={cart}
        type={'cart'}
        totalPrice={totalPrice}
        uniqueItems={uniqueItems}
        action={callbacks.deleteFromCart}
      />
    </PageLayout>
  );
}

export default App;
