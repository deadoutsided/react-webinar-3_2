import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import useI18n from '../../store/language/use-i18n';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const t = useI18n();
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t.t('basketToolBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, t.t('basketToolProductVariants'), t.lang)} / ${numberFormat(sum)} ₽`
          : t.t('basketToolEmpty')}
      </span>
      <button onClick={onOpen}>{t.t('basketToolButton')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
