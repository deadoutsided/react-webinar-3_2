import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartStats from '../cart-stats';

function Controls({ action = () => {}, totalPrice = 0, uniqueItems = 0 }) {
  return (
    <div className="Controls">
      <CartStats totalPrice={totalPrice} uniqueItems={uniqueItems}/>
      <button onClick={action}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  action: PropTypes.func,
  totalPrice: PropTypes.number,
  uniqueItems: PropTypes.number
};

export default React.memo(Controls);
