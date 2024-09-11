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
 * формирование строки с счетчиком и "раз" в соответствующем цифре падеже
 * @param times {Number} описываемое количество
 * @returns {String}
 */
export function timesClicked(times) {
  if((times % 10 === 2 && times % 100 !== 12) || (times % 10 === 3 && times % 100 !== 13) || (times % 10 === 4 && times % 100 !== 14)) {
    return ` | Выделяли ${times} раза`
  } else return ` | Выделяли ${times} раз`;
}
