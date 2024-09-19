import React, { memo } from "react";
import { formatPrice, plural } from "../../utils";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartStats({totalPrice = 0, uniqueItems = 0}){
  const cn = bem('CartStats')
  return (
  <div className={cn()}>
    В корзине:
    <span className={cn('values')}>
      {`${uniqueItems} ${plural(uniqueItems, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatPrice(totalPrice)}`}
    </span>
  </div>
  )
}

CartStats.propTypes = {
  totalPrice: PropTypes.number,
  uniqueItems: PropTypes.number
}

export default memo(CartStats)
