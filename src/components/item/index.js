import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatPrice, plural } from '../../utils';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Item(props) {
  const { action = () => {}, ...restProps } = props;

  const cn = bem('Item')

  const callbacks = {
    action: e => {
      e.stopPropagation();
      props.action(props.item.code);
    },
  };

  return (
    <div
      className={cn()}
    >
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {formatPrice(props.item.price)}
      </div>
      {props.item.count && (
        <div className={cn("price")}>{`${props.item.count} шт`}</div>
      )}
      <div className={cn('actions')}>
        <button onClick={callbacks.action}>{props.item.count ? "Удалить" : "Добавить"}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  action: PropTypes.func,
};

export default React.memo(Item);
