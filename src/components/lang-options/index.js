import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LangOptions(props) {
  const cn = bem("LangOptions");

  const callbacks = {
    changeLangRU: (e) => props.changeLang('ru-RU'),
    changeLangEN: (e) => props.changeLang('en-EN')
  }

  return (
    <div className={cn()}>
      <p
        className={
          props.lang === "ru-RU"
            ? cn("option", { selected: true })
            : cn("option")
        }
        onClick={callbacks.changeLangRU}
      >
        Русский
      </p>
      <p
        className={
          props.lang === "en-EN"
            ? cn("option", { selected: true })
            : cn("option")
        }
        onClick={callbacks.changeLangEN}
      >
        English
      </p>
    </div>
  );
}

export default LangOptions;
