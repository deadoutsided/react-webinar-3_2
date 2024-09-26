import { useContext } from 'react';
import { I18nContext } from './context';

/**
 * Хук для доступа к объекту хранилища
 * @return {I18n}
 */
export default function useI18n() {
  return useContext(I18nContext);
}
