import { cn as bem } from "@bem-react/classname";
import { memo } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import SideLayout from "../side-layout";

function HeadLogin(props) {
  const {
    logoutButtonLabel = 'Выйти',
    loginButtonLabel = 'Войти',
    ...resProps
  } = props;
  const cn = bem("headLogin");

  return (
    <div className={cn()}>
      <SideLayout side="end">
        <Link to="/profile">{props.username}</Link>
        {props.auth ? (
          <button className={cn("button", {logout: true})} onClick={props.onClick}>{props.logoutButtonLabel}</button>
        ) : (
          <button className={cn("button")}>
            <Link to="/login" className={cn("text")} state={'smth'}>
              {props.loginButtonLabel}
            </Link>
          </button>
        )}
      </SideLayout>
    </div>
  );
}

export default memo(HeadLogin);
