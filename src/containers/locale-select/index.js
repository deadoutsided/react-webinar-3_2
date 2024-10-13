import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useLang from '../../hooks/use-lang';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {
  const lang = useLang()
  const /* {t, lang, setLang} */ i18n = useTranslate();

  //t = useCallback((text, number) => i18n.t(text, number), [i18n]);

  const options = {
    lang: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  return <Select onChange={/* i18n.setLang */ (value) => i18n.setLang(value)} value={lang} options={options.lang} />;
}

export default memo(LocaleSelect);
