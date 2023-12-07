// Nova.booting((Vue) => {
//     window.Vue.use = Vue.use;
//     Vue.inertia("NovaTranslation", require("./views/LanguagesIndex").default);
//     Vue.inertia("NovaTranslationLangCreate", require("./views/LanguagesCreate").default);
//     Vue.inertia("NovaTranslationTranslationIndex", require("./views/TranslationsIndex").default);
//     Vue.inertia("NovaTranslationTranslationsCreate", require("./views/TranslationsCreate").default);
// });

import LanguageIndex from './views/LanguagesIndex'

Nova.booting((app, store) => {
  Nova.inertia('Test', Tool)
  Nova.inertia('LanguageIndex', LanguageIndex)
})
