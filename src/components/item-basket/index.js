import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat, plural } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import useI18n from '../../store/language/use-i18n';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  const t = useI18n()

  return (
    <div className={cn()}>
        <Link
          onClick={props.onClick}
          to={props.linkTo ? props.linkTo : `/products/${props.item._id}`}
          className={cn("title")}
        >
          {props.item.title}
        </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {t.lang === 'ru-RU' ? t.t('productsCount') : plural(props.item.amount, t.t('productsCount'))}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{t.t('deleteButton')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
