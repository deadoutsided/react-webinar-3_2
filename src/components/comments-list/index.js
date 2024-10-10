import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsList(props) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      <p className={cn("title")}>{`${props.t("comments.title")} (${props.count})`}</p>
      <div className="list">
        {props.list && props.list.map((item) => (
          <div key={item._id} className="">
            {props.renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(CommentsList);
