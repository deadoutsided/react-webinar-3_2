import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import HeadLogin from '../../components/head-login';
import LoginForm from '../../components/login-form';
import useSelector from '../../hooks/use-selector';
import Profile from '../../components/profile';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';
import HeadLoginWrapper from '../../containers/head-login-wrapper';

/**
 * страница входа в профиль
 */
function Login() {
  const store = useStore();

  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    auth: state.session.auth,
    error: state.session.error,
    user: state.profile.user,
    userDataLoading: state.profile.userDataLoading,
    sessionDataLoading: state.session.sessionDataLoading,
  }));

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    loginOnChange: useCallback(log => {
      setLogin(log);
    }, []),
    passwordOnChange: useCallback(pass => {
      setPassword(pass);
    }, []),
    onSubmit: useCallback(
      async (log, pass) => {
        await store.actions.session.signin(log, pass);
      },
      [store],
    ),
    onLoguot: useCallback(async() => {
      await store.actions.session.logout();
    }, [store]),
    checkAuth: useCallback(
      async () => {
        await store.actions.session.checkAuth();
      },
      [store],
    ),
    clearError: useCallback(() => {
      store.actions.session.clearErrorMessage();
    }, [store]),
  };

  useEffect(() => {
    callbacks.checkAuth();
    callbacks.clearError();
  }, []);
  useEffect(() => {
    if(select.auth && location.state) {navigate(-1);
    console.log('back')}
  }, [select.auth])
  const { t } = useTranslate();

  return (
    <PageLayout>
      <HeadLoginWrapper />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.auth && location.state === null && <Navigate to="/profile" />} {/* <Navigate to="/profile" /> */}
      {select.auth !== true ? (
        <Spinner active={select.sessionDataLoading}>
          <LoginForm
            setLogin={setLogin}
            setPassword={setPassword}
            onSubmit={callbacks.onSubmit}
            t={t}
            error={select.error}
            auth={select.auth}
            login={login}
            password={password}
          />
        </Spinner>
      ) : (
        <Profile t={t} user={select.user} />
      )}
    </PageLayout>
  );
}

export default memo(Login);
