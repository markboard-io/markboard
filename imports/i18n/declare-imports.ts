// Create “whitelist” to make dynamic expressions work with import. This is Meteor limitation.
// See https://docs.meteor.com/packages/dynamic-import.html#Using-import-with-dynamic-expressions
// eslint-disable-next-line no-constant-condition
if (false) {
  import('./locales/en.json')
  import('./locales/zh-CN.json')
  import('./locales/percentages.json')
}