import {memo, useCallback, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';
import SideLayout from '../side-layout';
import convertDate from '../../utils/convert-date';

function CommentItem(props) {

  const cn = bem('CommentItem');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
    onClick: useCallback((level, id) => props.onClick(level, id))
  }
  console.log(props)
  return (
    <div style={{marginLeft: (30 * (props.item.level > 10 ? 10 : props.item.level)) + 'px'}} className={cn()}>
      <SideLayout side={'start'} itemType='commentHeader'>
        <span className={props?.profile?.profile.name === props.item.author.profile.name ? cn('usernameSelf') : cn('username')}>{props.item.author.profile.name}</span>
        <p className={cn('date')}>{convertDate({locale: props.lang, date: new Date(props.item.dateCreate), dateStyle: 'long', timeStyle: 'short'})}</p>
      </SideLayout>
      <p className={cn('text')}>{props.item.text}</p>
      <Link onClick={() => callbacks.onClick(props.item.level, props.item._id)} className={cn('link')} to={props.link}>{props.t('comment.answer')}</Link> {/* todo: осознать зачем тут линк и не забыть прикрутить функционал */}
    </div>
  );
}

export default memo(CommentItem);
