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
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/spinner';

/**
 * страница входа в профиль
 */
function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    auth: state.user.auth,
    error: state.user.error,
    user: state.user.user,
    userDataLoading: state.user.userDataLoading,
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
      (log, pass) => {
        store.actions.user.signin(log, pass);
      },
      [store],
    ),
    onLoguot: useCallback(() => {
      store.actions.user.logout();
    }, [store]),
    checkAuth: useCallback(
      mode => {
        store.actions.user.getUserData(mode);
      },
      [store],
    ),
    clearError: useCallback(() => {
      store.actions.user.clearErrorMessage();
    }, [store]),
  };

  useEffect(() => {
    callbacks.checkAuth();
    callbacks.clearError();
  }, []);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <HeadLogin
        auth={select.auth}
        onClick={callbacks.onLoguot}
        username={select.user.name}
        logoutButtonLabel={t('profile.logoutButton')}
        loginButtonLabel={t('profile.loginButton')}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.auth && <Navigate to="/profile" />}
      {select.auth !== true ? (
        <Spinner active={select.userDataLoading}>
          <LoginForm
            setLogin={setLogin}
            setPassword={setPassword}
            onSubmit={callbacks.onSubmit}
            loginButtonLabel={t("login.button")}
            title={t("login.title")}
            loginInputLabel={t("login.input.label")}
            passwordInputLabel={t("login.password.label")}
            error={select.error}
            auth={select.userDataLoading}
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
