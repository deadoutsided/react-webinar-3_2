import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useI18n from '../../store/language/use-i18n';

function BasketTotal({ sum }) {
  const cn = bem('BasketTotal');
  const t = useI18n()
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t.t('basketResult')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
