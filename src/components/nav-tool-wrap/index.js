import {cn as bem} from '@bem-react/classname';
import './style.css';

export function NavToolWrap({children}){

  const cn = bem('NavToolWrap');

  return (
    <div className={cn()}>
      {children}
    </div>
  )
}
