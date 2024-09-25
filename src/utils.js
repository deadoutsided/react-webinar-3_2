/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formPaginationArr(pages, current) {
  if (pages <= 3) {
    return Array.from({ length: pages }, (n, i) => i);
  }
  switch (current - 1) {
    case 2:
      return [1, current - 1, current, current + 1, "...", pages];
    case 1:
      return [current - 1, current, current + 1, "...", pages];
    case 0:
      return [current, current + 1, current + 2, "...", pages];
  }
  switch (pages - current) {
    case 2:
      return [1, "...", current - 1, current, current + 1, pages];
    case 1:
      return [1, "...", current - 1, current, current + 1];
    case 0:
      return [1, "...", current - 2, current - 1, current];
  }
  return [1, "...", current - 1, current, current + 1, "...", pages];
}

/**
 * запрос товара с сервера
 * @param productId айдишник товара в запросе
 * @param fields поля запроса, строка должна начинаться 'fields=', по умолчанию - 'fields=title,description,madeIn(title,code),category(title),edition,price'
 * @return итог запроса, пропущенный через .json()
 */
export async function getProductById(
  productId,
  fields = "fields=title,description,madeIn(title,code),category(title),edition,price"
) {
  const response = await fetch(`/api/v1/articles/${productId}?${fields}`);
  const json = await response.json();
  if(json.error) return json;
  return json.result;
}
