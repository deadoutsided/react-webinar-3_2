import { memo, useCallback, useMemo } from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLang from '../../hooks/use-lang';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function TopHead() {
  const {t} = useTranslate();
  const lang = useLang();
  console.log(t(lang,'session.signOut'))
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.actions.session.signOut();
    }, []),
/*
    t: useMemo((text, number) => i18n.t(text, number), [i18n.lang.value]), */
  };

  return (
    <SideLayout side="end" padding="small">
      {select.exists ? <Link to="/profile">{select.user.profile.name}</Link> : ''}
      {select.exists ? (
        <button onClick={callbacks.onSignOut}>{t(lang,'session.signOut')}</button>
      ) : (
        <button onClick={callbacks.onSignIn}>{t(lang,'session.signIn')}</button>
      )}
    </SideLayout>
  );
}

export default memo(TopHead);
