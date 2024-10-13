import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-lang';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import Articles from '../../containers/articles';
import Comments from '../../containers/comments';
import useLang from '../../hooks/use-lang';

function ArticlePage() {
  const oldStore = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  const lang = useLang();

  useInit(() => {
    oldStore.actions.session.remind();
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
    oldStore.actions.profile.load();
  }, [params.id, lang]);

  return (
    <PageLayout>
      <TopHead />
      <Articles/>
      <Comments/>
    </PageLayout>
  );
}

export default memo(ArticlePage);
