import { memo, useCallback, useRef } from "react";
import { useDispatch, useStore as useStoreRedux } from "react-redux";
import { useSelector as useSelectorRedux } from "react-redux";
import useTranslate from "../../hooks/use-translate";
import CommentsList from "../../components/comments-list";
import Spinner from "../../components/spinner";
import CommentItem from "../../components/comment-item";
import CommentFrom from "../../components/comment-form";
import useSelector from "../../hooks/use-selector";
import UnathorizedComment from "../../components/unathorized-comment";
import commentsActions from "../../store-redux/comments/actions";
import { useLocation } from "react-router-dom";
function Comments() {
  const store = useStoreRedux();
  const location = useLocation();
  const ref = useRef(null);

  const select = useSelectorRedux((state) => ({
    data: state.comments?.data,
    count: state.comments?.count,
    article: state.article?.data,
    currentItem: state.comments?.currentItem,
    waiting: state.comments.waiting,
  }));

  const oldSelect = useSelector((state) => ({
    sessionStatus: state.session.exists,
    profile: state.profile.data,
  }));

  const callbacks = {
    onItemClick: useCallback(
      (level, id) => {
        dispatch(commentsActions.addForm(level, id));
        console.log(ref.current);
        setTimeout(() => ref.current.scrollIntoView({behavior: 'smooth', block: 'center'}), 0);
      },
      [commentsActions.addForm, oldSelect.sessionStatus]
    ),
    onFormCancel: useCallback(() => {
      dispatch(commentsActions.cancelForm());
    }, [commentsActions.cancelForm]),
    onFormSubmit: useCallback(
      (
        newCommentData,
        level = list.find((el) => el._id === currItem).level,
        list,
        article,
        currItem,
        profile
      ) => {
        dispatch(
          commentsActions.submit(
            newCommentData,
            level,
            list,
            article,
            currItem,
            profile
          )
        );
      },
      [commentsActions.submit]
    ),
  };
  const dispatch = useDispatch();
  const { t } = useTranslate();
  console.log(ref);
  const renders = {
    item: useCallback(
      (item) => {
        if (item._id === "form" && oldSelect.sessionStatus) {
          return (
            <CommentFrom
              level={item.level}
              currItem={select.currentItem}
              cancel={item.cancel}
              onCancel={callbacks.onFormCancel}
              onSubmit={callbacks.onFormSubmit}
              article={select.article}
              list={select.data}
              ref={ref}
              profile={oldSelect.profile}
              t={t}
            />
          );
        }
        if (item._id === "form") {
          return (
            <UnathorizedComment
              t={t}
              link={"/login"}
              ref={ref}
              state={{ back: location }}
              level={item.level}
              onCancel={callbacks.onFormCancel}
            />
          );
        }
        return (
          <CommentItem
            item={item}
            t={t}
            onClick={(level, id) => {
              callbacks.onItemClick(level, id);
            }}
          />
        );
      },
      [t, oldSelect.sessionStatus, select.article, select.currentItem, oldSelect.profile, select.data]
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsList
        list={select.data}
        count={select.count}
        renderItem={renders.item}
        t={t}
      />
    </Spinner>
  );
}

export default memo(Comments);
