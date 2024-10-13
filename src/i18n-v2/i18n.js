class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}, lang = 'ru') {
    this.services = services;
    this.config = config;
    this.lang = lang;
    this.listeners = []; // Слушатели изменений состояния
  }

  subscribe(listener) {/*
    this._listeners = []; */
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  getlang() {
    return this.lang
  }

  setLang(value) {
    if (this.lang !== value) {
      this.lang = value;
      if(this.services.api.defaultHeaders['Accept-Language'] !== value)this.services.api.setHeader('Accept-Language', this.lang);
      for (const listener of this.listeners ? this.listeners : []) {
        listener(this.lang);
      }
    }
  }

  getLang = this.getlang.bind(this)

  /**
   * Перевод фразу по словарю
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(locale = this.lang,text, plural) {
    let result =
      this.config.translations[locale] && text in this.config.translations[locale]
        ? this.config.translations[locale][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(locale).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  t = this.translate.bind(this);
}

export default I18nService;
