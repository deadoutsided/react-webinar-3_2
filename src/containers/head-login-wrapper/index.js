import { memo, useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import HeadLogin from '../../components/head-login';

function headLoginWrapper() {
  const store = useStore();

  const select = useSelector(state => ({
    auth: state.session.auth,
    username: state.profile.user.name,
  }));

  const { t } = useTranslate();

  const callbacks = {
    onLoguot: useCallback(async() => {
      await store.actions.session.logout();
      await store.actions.session.checkAuth();
    }, [store]),
  };

  useEffect(() => {
    if(select.auth === true) store.actions.profile.getUserData();
  }, [select.auth])

  return (
      <HeadLogin
        auth={select.auth}
        onClick={callbacks.onLoguot}
        username={select.username}
        t={t}
      />
  );
}

export default memo(headLoginWrapper);
