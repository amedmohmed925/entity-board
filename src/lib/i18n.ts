import arCommon from '@/locales/ar/common.json';
import enCommon from '@/locales/en/common.json';

export type Locale = 'ar' | 'en';

const translations: Record<Locale, Record<string, unknown>> = {
  ar: arCommon,
  en: enCommon,
};

export function getTranslations(locale: Locale = 'ar') {
  return translations[locale] || translations['ar'];
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[locale] || translations['ar'];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}
