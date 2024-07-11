const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.js$/i)
const messages = {}
locales.keys().forEach((key) => {
  Object.assign(messages, locales(key).default)
})
export default {
  ...messages
}
