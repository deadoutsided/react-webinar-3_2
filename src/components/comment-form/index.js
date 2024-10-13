import { forwardRef, memo, useCallback, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Textarea from "../textarea";
import SideLayout from "../side-layout";

const CommentForm = forwardRef((props, ref) => {
  const cn = bem("CommentForm");

  const [text, setText] = useState("");

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value) => {
      setText(value);
    }, []), // potentially state can be higher in component tree

    // Отправка данных формы для авторизации
    onSubmit: useCallback(
      (e, text, level, list, article, currItem, profile) => {
        e.preventDefault();
        props.onSubmit(text, level, list, article, currItem, profile);
      },
      [text]
    ),
  };

  return (
    <form
    className={cn()}
      style={{ marginLeft: 30 * (props.level > 10 ? 10 : props.level ) + "px" }}
      onSubmit={(e) => callbacks.onSubmit(e, {text}, props.level, props.list, props.article, props.currItem, props.profile.profile)}
      ref={ref}
    >
      <h2 className={cn("title")}>{props.t("add.comment.title")}</h2>
      <Textarea
        name="message"
        value={text}
        onChange={callbacks.onChange}
        placeholder={props.t("add.comment.placeholder")}
      />
      {!props.cancel ? (
        <button className={cn("button")} type="submit" disabled={!(text.length > 0)}>
          {props.t("add.comment.button")}
        </button>
      ) : (
        <SideLayout>
          <button className={cn("button")} type="submit" disabled={!(text.length > 0)}>
            {props.t("add.comment.button")}
          </button>
          <button onClick={props.onCancel} type='button' className={cn("button")}>{props.t("cancel.comment.button")}</button>
        </SideLayout>
      )}
    </form>
  );
})

export default memo(CommentForm);
