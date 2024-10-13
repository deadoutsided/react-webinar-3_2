import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useStore as useStoreRedux } from 'react-redux';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import modalsActions from '../../store-redux/modals/actions';
import useLang from '../../hooks/use-lang';

function Basket() {
  const store = useStore();
  const dispatch = useDispatch();

  const { t } = useTranslate();
  const lang = useLang();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      //store.actions.modals.close();
      dispatch(modalsActions.close());
    }, [store]),
    t: useCallback((text, num) => t(lang, text, num), [t,lang]),
  };

  const renders = {
    itemBasket: useCallback(
      item => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={callbacks.closeModal}
          labelUnit={callbacks.t('basket.unit')}
          labelDelete={callbacks.t('basket.delete')}
        />
      ),
      [callbacks.removeFromBasket, callbacks.t],
    ),
  };

  return (
    <ModalLayout
      title={callbacks.t('basket.title')}
      labelClose={t('basket.close')}
      onClose={callbacks.closeModal}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={callbacks.t} />
    </ModalLayout>
  );
}

export default memo(Basket);
