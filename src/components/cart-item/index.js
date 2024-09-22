import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatPrice, plural } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem(props) {
  const { action = () => {}, ...restProps } = props;

  const cn = bem('CartItem');

  const callbacks = {
    action: e => {
      e.stopPropagation();
      props.action(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatPrice(props.item.price)}</div>
      <div className={cn('price')}>{`${props.item.count} шт`}</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.action}>{'Удалить'}</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  action: PropTypes.func,
};

export default React.memo(CartItem);
