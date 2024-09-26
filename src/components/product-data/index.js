import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { useCallback } from "react";
import { numberFormat } from "../../utils";
import useI18n from "../../store/language/use-i18n";

export function ProductData(props) {

  const cn = bem('ProductData')

  const t = useI18n();

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd])
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}>{props.item.description}</p>
      <p className={cn('text')}>{t.t('basketMadeIn')} <span className={cn('text', {highlighted: true})}>{`${props.item.madeIn.title} (${props.item.madeIn.code})`}</span></p>
      <p className={cn('text')}>{t.t('basketCategory')} <span className={cn('text', {highlighted: true})}>{`${props.item.category.title}`}</span></p>
      <p className={cn('text')}>{t.t('basketedition')} <span className={cn('text', {highlighted: true})}>{`${props.item.edition}`}</span></p>
      <p className={cn('price')}>{t.t('basketPrice')} {numberFormat(props.item.price, 'ru-RU', { style: 'currency', currency: 'RUB'})}</p>
      <button onClick={callbacks.onAdd}>{t.t('addButton')}</button>
    </div>
  )
}
