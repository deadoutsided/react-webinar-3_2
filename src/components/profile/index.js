import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Profile(props) {
  const {
    user = {
      name: '',
      phone: '',
      email: '',
    },
    ...resProps
  } = props;
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <p className={cn('title')}>{props.t('profile.title')}</p>
      <p className={cn('text')}>
        {props.t('profile.name')}
        <span className={cn('text', { bold: true })}>{props.user.name}</span>
      </p>
      <p className={cn('text')}>
        {props.t('profile.number')}
        <span className={cn('text', { bold: true })}>{props.user.phone}</span>
      </p>
      <p className={cn('text')}>
        {props.t('profile.email')}
        <span className={cn('text', { bold: true })}>{props.user.email}</span>
      </p>
    </div>
  );
}

export default memo(Profile);
