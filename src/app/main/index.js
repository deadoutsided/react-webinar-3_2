import { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ArticlesNav from '../../components/articles-nav';
import { useParams } from 'react-router-dom';
import LangOptions from '../../components/lang-options';
import useI18n from '../../store/language/use-i18n';


function Main() {
  const store = useStore();

  const params = useParams();

  const t = useI18n()

  useEffect(() => {
    const query = params.current
      ? {
          limit: 1,
          skip: params.current,
          fields: 'items(_id, title, price),count',
        }
      : null;
    store.actions.catalog.load(query);
  }, [params.current]);

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    productsCount: state.catalog.productsCount,
    langCode: state.language.currentLanguage,
  }));

  const calculations = {
    pages: useMemo(() => Math.ceil(select.productsCount / 10), [select.productsCount]),
  };

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeLang: useCallback(lang => store.actions.language.changeLanguage(lang), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} linkTo={item._id} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={t.t('mainTitle')}>
        <LangOptions lang={select.langCode} changeLang={callbacks.changeLang} />
      </Head>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <ArticlesNav pages={calculations.pages} current={params.current ? +params.current : 1} />
    </PageLayout>
  );
}

export default memo(Main);
