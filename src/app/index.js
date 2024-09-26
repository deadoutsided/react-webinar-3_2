import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { Routes, Route } from 'react-router-dom';
import { ProductPage } from './product-page';
import { I18nContext } from '../store/language/context';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  console.log(store);


const lang = useSelector((state) => state.language.currentLanguage);

const translate = {t: (phrase) => store.actions.language.translate(phrase), lang: lang}; // если использовать данные из useSelector, то перевод не обновляется в компонентах ниже

  return (
    <>
      <I18nContext.Provider value={translate}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:current" element={<Main />} />
          <Route path="/products/:productId" element={<ProductPage />} />
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </I18nContext.Provider>
    </>
  );
}

export default App;
