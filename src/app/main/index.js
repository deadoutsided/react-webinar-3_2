import { memo, useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import HeadLogin from '../../components/head-login';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    auth: state.profile.auth,
    error: state.session.error,
    username: state.profile.user.name,
  }));

  const callbacks = {
    onLoguot: useCallback(async () => {
      await store.actions.session.logout();
      await store.actions.profile.getUserData();
    }, [store]),
    clearError: useCallback(() => {
      store.actions.session.clearErrorMessage();
    }, [store]),
  };

  useEffect(() => {
    callbacks.clearError();
  }, []);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <HeadLogin
        auth={select.auth}
        onClick={callbacks.onLoguot}
        username={select.username}
        logoutButtonLabel={t('profile.logoutButton')}
        loginButtonLabel={t('profile.loginButton')}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
