// Nova.booting((Vue) => {
//     window.Vue.use = Vue.use;
//     Vue.inertia("NovaTranslation", require("./views/LanguagesIndex").default);
//     Vue.inertia("NovaTranslationLangCreate", require("./views/LanguagesCreate").default);
//     Vue.inertia("NovaTranslationTranslationIndex", require("./views/TranslationsIndex").default);
//     Vue.inertia("NovaTranslationTranslationsCreate", require("./views/TranslationsCreate").default);
// });

import LanguagesIndex from './views/LanguagesIndex'
import LanguagesCreate from './views/LanguagesCreate'
import TranslationsIndex from './views/TranslationsIndex'
import TranslationsCreate from './views/TranslationsCreate'

Nova.booting((app, store) => {
  Nova.inertia('LanguageIndex', LanguagesIndex)
  Nova.inertia('LanguageCreate', LanguagesCreate)
  Nova.inertia('TranslationIndex', TranslationsIndex)
  Nova.inertia('TranslationCreate', TranslationsCreate)
})
