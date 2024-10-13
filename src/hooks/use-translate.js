import useServices from './use-services';

export default function useTranslate() {
  return useServices().i18n;
}
