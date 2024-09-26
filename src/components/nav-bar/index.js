import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";
import useI18n from '../../store/language/use-i18n';

export function NavBar({links, translate}){

  const cn = bem('NavBar');

  const t = useI18n();

  return (
    <div className={cn()}>
      {
        links.map((e, i) => {
          return <Link className={cn('link')} key={i} to={e.link}>{t.t(e.title)}</Link>
        })
      }
    </div>
  )
}
