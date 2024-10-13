import { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { I18nContext } from '../i18n/context';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useLang() {
  const service = useServices().i18n;

  const t = useCallback((text, number) => service.t(text, number), [service, lang]);

  const changeLang = useCallback(
    newLang => {
      service.setLang(newLang);
    },
    [service],
  );

  const translate = {
    t : service.t,
    lang: service.getLang,
    setLang: setLang,
  };

  const [lang, setLang] = useState(() => service.getLang());

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return service.subscribe(() => {
      const newState = () => service.getLang();
      setLang(newState);
    });
  }, []);
  useEffect(() => unsubscribe, [unsubscribe]);

  return lang;
}
