const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * счетчик
 * @param initialCount {Number} начальное значение счётчика
 * @returns {Func} функция вызов которой будет инкрементировать возвращаемое ей значение
 */
export function makeCounter(initialCount = 0) {
  let count = initialCount;

  return function() {
    return count++;
  };
}

/**
 * формирование строки с счетчиком и "раз" в соответствующем цифре склонение
 * @param suffixes {Map} склонения слова
 * @param num {Number} число для выбора склонения
 * @returns {String}
 */
export function getPlural(suffixes, num) {
  const plural = new Intl.PluralRules("ru-RU");
  const rule = plural.select(num);
  return suffixes.get(rule);
}
