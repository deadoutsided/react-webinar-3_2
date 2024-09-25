import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';
import { ProductData } from '../../components/product-data';
import Basket from '../basket';
import { NavToolWrap } from '../../components/nav-tool-wrap';
import { NavBar } from '../../components/nav-bar';
import { links } from '../../constants.js'; /*
import LangOptions from "../../components/lang-options"; */

export function ProductPage() {
  const store = useStore();

  const params = useParams();

  useEffect(() => {
    if (params.productId) store.actions.product.load(params.productId);
  }, [params]);

  const select = useSelector(state => ({
    product: state.product.item,
    error: state.product.error,
    productsCount: state.catalog.productsCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name /*
    langCode: state.language.currentLanguage, */,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]) /*
    //взятие фразы текущего языка
    translate: useCallback(
      (phrase) => store.actions.language.translate(phrase),
      [store]
    ),
    //Смена языка
    changeLang: useCallback(
      (lang) => store.actions.language.changeLanguage(lang),
      [store]
    ) */,
  };

  return (
    <>
      {select.product.title && select.error === 'none' ? (
        <PageLayout>
          <Head title={select.product.title}>
            {/*
            <LangOptions changeLang={callbacks.changeLang} lang={select.langCode}/> */}
          </Head>
          <NavToolWrap>
            <NavBar links={links} /* translate={callbacks.translate} */ />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
              /* translate={callbacks.translate}
              lang={select.langCode} */
            />
          </NavToolWrap>
          <ProductData
            item={select.product}
            onAdd={
              callbacks.addToBasket
            } /* translate={callbacks.translate} lang={select.langCode} */
          />
        </PageLayout>
      ) : select.error !== 'none' ? (
        <PageLayout>
          <Head title={Math.ceil(+select.error.id) + ' ' + select.error.message} >{/*
            <LangOptions changeLang={callbacks.changeLang} lang={select.langCode}/> */}
          </Head>
          <NavToolWrap>
            <NavBar links={links} /* translate={callbacks.translate} *//>
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
              /* translate={callbacks.translate}
              lang={select.langCode} */
            />
          </NavToolWrap>
        </PageLayout>
      ) : (
        <p>loading</p>
      )}

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}
