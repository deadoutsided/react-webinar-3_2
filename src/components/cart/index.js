import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import List from '../list';
import Result from '../result';

function Cart(props) {
  const {
    action = () => {},
    title = 'modal',
    list = [],
    uniqueItems = 0,
    totalPrice = 0,
    renderFunc = () => {},
    ...resProps
  } = props;
  const cn = bem('Cart');

  return (
    <div className={cn()}>
        <Head title={props.title} />
        <List
          list={props.list}
          action={props.action}
          renderFunc={renderFunc}
          extraCn={'scrollable'}
        />
        {(!!props.uniqueItems && <Result totalPrice={props.totalPrice} />) ||
          (props.type !== 'list' && <div className={cn({ empty: true })}>Пусто</div>)}
    </div>
  );
}

Cart.propTypes = {
  action: PropTypes.func,
  title: PropTypes.string,
  list: PropTypes.array,
  uniqueProductsCount: PropTypes.number,
  totalPrice: PropTypes.number,
  renderFunc: PropTypes.func,
};

export default Cart;
