import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { formatPrice } from "../../utils";

function Result({ totalPrice = 0 }) {
  const cn = bem('Result')
  return (
    <div className={cn()}>
      <span className={cn('bold')}>Итого</span>
      <span className={cn('bold')}>{formatPrice(totalPrice)}</span>
    </div>
  )
}

Result.propTypes = {
  totalPrice: PropTypes.number
}

export default React.memo(Result);
