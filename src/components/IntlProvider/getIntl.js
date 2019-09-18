export default function getIntl({
  locale,
  messages,
}) {
  return {
    locale,
    getTranslatedAttribute(obj, key) {
      const translatedKey = (locale === 'de') ? key : `${key}_${locale}`
      return obj[translatedKey]
    },
    get(key) {
      return messages[key] && messages[key][locale]
    },
  }
}
