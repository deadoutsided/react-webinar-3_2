import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";

export function NavBar({links, translate}){

  const cn = bem('NavBar');

  return (
    <div className={cn()}>
      {
        links.map((e, i) => {
          return <Link className={cn('link')} key={i} to={e.link}>{e.title/* translate(e.title) */}</Link>
        })
      }
    </div>
  )
}
