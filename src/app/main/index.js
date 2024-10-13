import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import useLang from '../../hooks/use-lang';

function Main() {
  const store = useStore();

  const { t } = useTranslate();
  const lang = useLang();

  useInit(
    async () => {
      await Promise.all([store.actions.catalog.initParams(), store.actions.categories.load()]);
    },
    [lang, t],
    true,
  );

  const callbacks = {
    t: useCallback((text, num) => t(lang, text, num), [t, lang]),
  }

  return (
    <PageLayout>
      <TopHead />
      <Head title={callbacks.t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
