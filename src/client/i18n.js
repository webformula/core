import { isSignal, Compute } from './signals.js';

// TODO Fetcher adding accept-language header
const translations = {};
const signals = new Set();
const valueRegex = /\$(\d)|\$(\w+)\(\$(\d)\)/g;
let useCache = false;
let currentLocal = Intl.getCanonicalLocales(navigator.language)[0].split('-')[0];
let currentTranslations;


window.addEventListener('languagechange', languageChange);



export function i18n(key, ...variables) {
  const compute = new Compute(() => {
    const message = currentTranslations.messages[key];
    if (!message) {
      if (window.wfcDev) console.warn(`Cannot localize. Missing key: ${key}`);
      return key;
    }

    return message.replace(valueRegex, function (_, varIndex, formatterName, formatterVarIndex) {
      if (varIndex) {
        const variable = variables[parseInt(varIndex) - 1];
        if (isSignal(variable)) return variable.value;
        return variable
      }
      if (formatterName && formatterVarIndex) {
        const formatMethod = translations[currentLocal].formatters[formatterName].method;
        const variable = variables[parseInt(formatterVarIndex) - 1];
        if (isSignal(variable)) return formatMethod(variable.value);
        return formatMethod(variable);
      }
      return '';
    });
  });
  signals.add(compute);
  return compute;
}

i18n.setLocale = locale => {
  locale = Intl.getCanonicalLocales(locale)[0].split('-')[0];
  const changed = locale !== currentLocal;
  if (changed) {
    if (useCache) localStorage.setItem('wfc-locale', locale);
    currentLocal = locale;
    currentTranslations = translations[currentLocal];
    for (const signal of signals) {
      signal.updateValueVersion(true);
    }
  }
}

i18n.cache = () => {
  useCache = true;
  const storedMessages = localStorage.getItem('wfc-locale-messages');
  if (storedMessages) {
    for (const [_local, config] of Object.entries(JSON.parse(storedMessages))) {
      addTranslation(_local, config);
    }
  }
  const locale = localStorage.getItem('wfc-locale');
  if (locale) setLocale(locale);
}

i18n.format = (formatterName, value) => {
  const compute = new Compute(() => {
    const formatter = translations[currentLocal].formatters[formatterName];
    if (!formatter) {
      if (window.wfcDev) console.warn(`Cannot find formatter: ${formatterName}`);
      return '';
    }

    if (isSignal(value)) return formatter.method(value.value);
    return formatter.method(value);
  })
  signals.add(compute);
  return compute;
};

i18n.addTranslation = (locale, data) => {
  locale = Intl.getCanonicalLocales(locale)[0].split('-')[0];
  if (typeof data !== 'object' || data === null) throw Error('data must be an object');

  translations[locale] = data;
  data.cardinalRules = new Intl.PluralRules(locale);
  data.ordinalRules = new Intl.PluralRules(locale, { type: 'ordinal' });

  if (data.formatters) {
    for (const [key, value] of Object.entries(data.formatters)) {
      translations[locale].formatters[key] = buildFormatter(value, locale);
    }
  }

  if (locale === currentLocal) currentTranslations = translations[locale];
  if (useCache) {
    const current = JSON.parse(localStorage.getItem('wfc-locale-messages') || {});
    current[locale] = translations[locale];
    localStorage.setItem('wfc-locale-messages', JSON.stringify(current));
  }
}

function buildFormatter(config, locale) {
  switch (config.type) {
    case 'cardinal':
      config.method = data => {
        const cardinal = translations[locale].cardinalRules.select(parseInt(data));
        return config[cardinal] || config.other;
      };
      break;
    case 'ordinal':
      config.method = data => {
        const ordinal = translations[locale].ordinalRules.select(parseInt(data));
        return config[ordinal] || config.other;
      };
      break;
    case 'date':
      config.method = data => {
        return getDateFormatter(locale, config.options).format(data);
      };
      break;
    case 'number':
      config.method = data => {
        return getNumberFormatter(locale, config.options).format(data);
      };
      break;
    case 'relativeTime':
      config.method = data => {
        return getRelativeTimeFormatter(locale, config.options).format(data || '', config.unit);
      };
      break;

    default:
      config.method = data => data;
  }

  return config;
}

const dateFormatters = [];
function getDateFormatter(locale, options) {
  const key = `${locale}${JSON.stringify(options || '')}`;
  if (!dateFormatters[key]) dateFormatters[key] = new Intl.DateTimeFormat(locale, options);
  return dateFormatters[key];
}

const numberFormatters = [];
function getNumberFormatter(locale, options) {
  const key = `${locale}${JSON.stringify(options || '')}`;
  if (!numberFormatters[key]) numberFormatters[key] = new Intl.NumberFormat(locale, options);
  return numberFormatters[key];
}

const relativeTimeFormatters = [];
function getRelativeTimeFormatter(locale, options) {
  const key = `${locale}${JSON.stringify(options || '')}`;
  if (!relativeTimeFormatters[key]) relativeTimeFormatters[key] = new Intl.RelativeTimeFormat(locale, options);
  return relativeTimeFormatters[key];
}

function languageChange() {
  setLocale(navigator.language);
  // window.dispatchEvent(new Event('wfclanguagechange'));
}
