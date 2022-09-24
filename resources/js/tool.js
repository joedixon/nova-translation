Nova.booting((Vue, router, store) => {
  Vue.config.devtools = process.env.NODE_ENV === 'development'

  router.addRoutes([
        {
            name: 'nova-translation',
            path: '/nova-translation',
            component: require('./views/LanguagesIndex').default,
        },
        {
            name: 'nova-translation.languages.create',
            path: '/nova-translation/languages/create',
            component: require('./views/LanguagesCreate').default,
        },
        {
            name: 'nova-translation.languages.translations.index',
            path: '/nova-translation/languages/translations',
            component: require('./views/TranslationsIndex').default,
            props: true
        },
        {
            name: 'nova-translation.languages.translations.create',
            path: '/nova-translation/languages/:language/translations/create',
            component: require('./views/TranslationsCreate').default,
            props: true
        },
    ])
})
