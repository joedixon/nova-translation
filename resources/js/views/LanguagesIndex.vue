<template>
    <div>
        <div class="flex items-center mb-6">
            <heading class="flex">{{ __('Languages') }}</heading>
            <div class="flex w-full justify-end">
                <router-link
                    class="cursor-pointer btn btn-default btn-primary"
                    :to="{ name: 'nova-translation.languages.create' }"
                    :title="__('Add language')"
                >
                    {{ __('Add Language') }}
                </router-link>
            </div>
        </div>
        <loading-view :loading="initialLoading">
            <loading-card :loading="loading" class="card">
                <table
                    v-if="Object.keys(languages).length > 0"
                    class="table w-full"
                    cellpadding="0"
                    cellspacing="0"
                    data-testid="resource-table"
                >
                    <thead>
                        <tr>
                            <th class="text-left">{{ __('Language') }}</th>
                            <th class="text-left">{{ __('Locale') }}</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="language in languages" :key="language">
                            <td>{{ language }}</td>
                            <td>{{ languages[language] }}</td>
                            <td>
                                <router-link
                                    class="cursor-pointer text-70 hover:text-primary"
                                    :to="{
                                        name: 'nova-translation.languages.translations.index',
                                        title: __('View the translations for the language'),
                                        query: {
                                            language: language,
                                        },
                                    }"
                                    title="View translations"
                                >
                                    <icon type="view" width="22" height="18" view-box="0 0 22 16" />
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </loading-card>
        </loading-view>
    </div>
</template>

<script>
export default {
    metaInfo() {
        return {
            title: 'Languages',
        }
    },

    data() {
        return {
            initialLoading: true,
            loading: false,
            languages: {},
        }
    },

    methods: {
        listLanguages() {
            Nova.request()
                .get('/nova-vendor/nova-translation/languages')
                .then(response => {
                    this.languages = response.data
                    this.initialLoading = false
                    this.loading = false
                })
        },
    },

    created() {
        this.listLanguages()
    },
}
</script>
