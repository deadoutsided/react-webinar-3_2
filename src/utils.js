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

export function formCategoriesArr(res) {
  const withoutParent = [];
  res.forEach((e) => (e.children = []));
  res.forEach((e) => {
    if (e.parent !== null) {
      let parentIndex = res.findIndex((parent) => parent._id === e.parent._id);
      if (parentIndex === -1) {
        withoutParent.push(e);
      } else {
        res[parentIndex].children.push(e);
      }
    }
  });

  const newArr = [...withoutParent];
  res.forEach((item) => {
    if (!item.parent) {
      newArr.push(item);
    }
  });

  let catArr = [];
  let tires = new RegExp("(- )*");
  //if(withoutParent){catArr = catArr.concat(withoutParent)}
  function categoriesArr(el) {
    if (!el.parent) catArr = [...catArr, el];

    if (
      res.find((parent) => el.parent !== null && parent._id === el.parent._id)
    ) {
      const nest = tires.exec(
        catArr[catArr.findIndex((parent) => el.parent._id === parent._id)].title
      );

      if (nest !== null) el.title = nest[0] + "- " + el.title;
      else if (el.parent !== null) el.title = "- " + el.title;
      catArr = [...catArr, el];
    } else if (el.parent !== null) {
      el.title = "- " + el.title;
      catArr = [...catArr, el];
    }
    el.children.length > 0
      ? el.children.forEach((child) => categoriesArr(child))
      : "lol";
  }

  newArr.forEach((e) => categoriesArr(e));
  catArr.forEach((e) => delete e.children);
  return catArr;
}
