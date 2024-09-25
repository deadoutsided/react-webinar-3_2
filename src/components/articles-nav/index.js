import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { formPaginationArr } from "../../utils";
import { Link } from "react-router-dom";
import { memo } from "react";

export function ArticlesNav({ pages, current }) {
  const cn = bem("ArticlesNav");
  return (
    <div className={cn()}>
      {formPaginationArr(pages, current).map((e, index) => {
        return (
          <div
            key={index}
            className={
              current === e ? cn("item", { current: true }) : cn("item")
            }
          >
            {e !== "..." && e !== current ? (
              <Link className={cn("text")} to={`/${e}`}>
                {e}
              </Link>
            ) : (
              <p className={e !== current ? cn("dots") : cn("text")}>{e}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(ArticlesNav)
