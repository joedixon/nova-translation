<template>
    <div>
        <div class="flex items-center mb-6">
            <heading class="flex">{{ __('Languages') }}</heading>
            <div class="flex w-full justify-end">
                <InertiaLink :href="novaPath+'/nova-translation/languages/create'">
                        <icon type="plus" class="w-6 h-5" view-box="0 0 22 16" />
                        {{ __('Add Language') }}
                </InertiaLink>
            </div>
        </div>
        <loading-view :loading="initialLoading">
            <loading-card :loading="loading" class="card">
                <table v-if="Object.keys(languages).length > 0"
                    class="table w-full w-full divide-y divide-gray-100 dark:divide-gray-700"
                    cellpadding="0"
                    cellspacing="0"
                    data-testid="resource-table"
                >
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th class="text-left px-2 whitespace-nowrap uppercase text-gray-500 text-xxs tracking-wide py-2">{{ __('Language') }}</th>
                            <th class="text-left px-2 whitespace-nowrap uppercase text-gray-500 text-xxs tracking-wide py-2">{{ __('Locale') }}</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                        <tr v-for="language in languages" :key="language">
                            <td class="px-2 py-2 whitespace-nowrap cursor-pointer dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-900">{{language}}</td>
                            <td class="px-2 py-2 whitespace-nowrap cursor-pointer dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-900">{{languages[language]}}</td>
                            <td>
                                <InertiaLink :href="novaPath+'/nova-translation/languages/translations?language='+language">
                                        <icon type="eye" class="w-6 h-5" view-box="0 0 22 16" />
                                </InertiaLink>
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
    props: ['novaPath'],

    data() {
        return {
            initialLoading: true,
            loading: false,
            languages: {}
        }
    },

    metaInfo() {
        return {
            title: 'Languages',
        }
    },

    methods: {
        listLanguages() {
            Nova.request().get('/nova-vendor/nova-translation/languages')
                .then((response) => {
                    this.languages = response.data;
                    this.initialLoading = false;
                    this.loading = false;
                })
        }
    },

    created() {
        this.listLanguages()
    },
}
</script>