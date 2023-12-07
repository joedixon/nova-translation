// Nova.booting((Vue, router) => {
//     router.addRoutes([
//         {
//             name: 'nova-translation',
//             path: '/nova-translation',
//             component: require('./views/LanguagesIndex'),
//         },
//         {
//             name: 'nova-translation.languages.create',
//             path: '/nova-translation/languages/create',
//             component: require('./views/LanguagesCreate'),
//         },
//         {
//             name: 'nova-translation.languages.translations.index',
//             path: '/nova-translation/languages/translations',
//             component: require('./views/TranslationsIndex'),
//             props: true
//         },
//         {
//             name: 'nova-translation.languages.translations.create',
//             path: '/nova-translation/languages/:language/translations/create',
//             component: require('./views/TranslationsCreate'),
//             props: true
//         },
//     ])
// })

Nova.booting((Vue) => {
    Nova.inertia("NovaTranslation", require("./views/LanguagesIndex").default);
    Nova.inertia("NovaTranslationLangCreate", require("./views/LanguagesCreate").default);
    Nova.inertia("NovaTranslationTranslationIndex", require("./views/TranslationsIndex").default);
    Nova.inertia("NovaTranslationTranslationsCreate", require("./views/TranslationsCreate").default);
});