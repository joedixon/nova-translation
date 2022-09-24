<template>
    <loading-view :loading="initialLoading">
        <heading class="mb-6">{{ __('Translations') }}</heading>
        <div class="flex">
            <!-- Search -->
            <div class="relative h-9 mb-6 flex-no-shrink">
                <icon type="search" class="absolute search-icon-center ml-3 text-70" />

                <input
                    class="appearance-none form-control form-input w-search pl-search"
                    :placeholder="__('Search')"
                    type="search"
                    v-model="search"
                />
            </div>
            <div class="flex w-full justify-end">
                <router-link
                    class="cursor-pointer btn btn-default btn-primary"
                :to="{ name: 'nova-translation.languages.translations.create', params: { language }}"

                    :title="__('Add language')"
                >
                    {{ __('Add Translation') }}
                </router-link>
            </div>
        </div>

        <loading-card :loading="loading" class="card">

            <div class="py-3 flex items-center border-b border-50">

                <div class="flex items-center ml-auto px-3">
                    <dropdown>
                        <dropdown-trigger
                            :handle-click="toggle"
                            class="bg-30 px-3 border-2 border-30 rounded"
                            :class="{ 'bg-primary border-primary': filtersAreApplied }"
                            :active="filtersAreApplied"
                        >
                            <icon type="filter" :class="filtersAreApplied ? 'text-white' : 'text-80'" />

                            <span v-if="filtersAreApplied" class="ml-2 font-bold text-white text-80">
                                {{ activeFilterCount }}
                            </span>
                        </dropdown-trigger>
                        <dropdown-menu slot="menu" width="290" direction="rtl" :dark="true">
                            <scroll-wrap :height="350">
                                <h3 slot="default" class="text-sm uppercase tracking-wide text-80 bg-30 p-3">
                                    {{ __('Group') }}
                                </h3>

                                <div class="p-2">
                                    <select
                                        class="block w-full form-control-sm form-select"
                                        :value="group"
                                        @change="groupChanged"
                                    >
                                        <option value="">-----</option>
                                        <option
                                            v-for="group in groups"
                                            :value="group"
                                            :key="group"
                                        >
                                            {{ group }}
                                        </option>
                                    </select>
                                </div>

                                <h3 slot="default" class="text-sm uppercase tracking-wide text-80 bg-30 p-3">
                                    {{ __('Language') }}
                                </h3>

                                <div class="p-2">
                                    <select
                                        slot="select"
                                        class="block w-full form-control-sm form-select"
                                        :value="language"
                                        @change="languageChanged"
                                    >
                                        <option
                                            v-for="language in languages"
                                            :value="language"
                                            :key="language"
                                        >
                                            {{ language }}
                                        </option>
                                    </select>
                                </div>

                                <h3 slot="default" class="text-sm uppercase tracking-wide text-80 bg-30 p-3">
                                    {{ __('Per Page') }}
                                </h3>

                                <div class="p-2">
                                    <select
                                        slot="select"
                                        dusk="per-page-select"
                                        class="block w-full form-control-sm form-select"
                                        :value="perPage"
                                        @change="perPageChanged"
                                    >
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>

                            </scroll-wrap>
                        </dropdown-menu>
                    </dropdown>
                </div>
            </div>
            <div v-if="!translations.length" class="flex justify-center items-center px-6 py-8">

                <div class="text-center">

                    <svg
                        class="mb-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="65"
                        height="51"
                        viewBox="0 0 65 51"
                    >
                        <g id="Page-1" fill="none" fill-rule="evenodd">
                            <g
                                id="05-blank-state"
                                fill="#A8B9C5"
                                fill-rule="nonzero"
                                transform="translate(-779 -695)"
                            >
                                <path
                                    id="Combined-Shape"
                                    d="M835 735h2c.552285 0 1 .447715 1 1s-.447715 1-1 1h-2v2c0 .552285-.447715 1-1 1s-1-.447715-1-1v-2h-2c-.552285 0-1-.447715-1-1s.447715-1 1-1h2v-2c0-.552285.447715-1 1-1s1 .447715 1 1v2zm-5.364125-8H817v8h7.049375c.350333-3.528515 2.534789-6.517471 5.5865-8zm-5.5865 10H785c-3.313708 0-6-2.686292-6-6v-30c0-3.313708 2.686292-6 6-6h44c3.313708 0 6 2.686292 6 6v25.049375c5.053323.501725 9 4.765277 9 9.950625 0 5.522847-4.477153 10-10 10-5.185348 0-9.4489-3.946677-9.950625-9zM799 725h16v-8h-16v8zm0 2v8h16v-8h-16zm34-2v-8h-16v8h16zm-52 0h16v-8h-16v8zm0 2v4c0 2.209139 1.790861 4 4 4h12v-8h-16zm18-12h16v-8h-16v8zm34 0v-8h-16v8h16zm-52 0h16v-8h-16v8zm52-10v-4c0-2.209139-1.790861-4-4-4h-44c-2.209139 0-4 1.790861-4 4v4h52zm1 39c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8z"
                                />
                            </g>
                        </g>
                    </svg>

                    <h3 class="text-base text-80 font-normal mb-6">
                        {{
                            __('No translations matched the given criteria')
                        }}
                    </h3>

                    <router-link
                        class="cursor-pointer btn btn-default btn-primary"
                        :to="{ name: 'nova-translation.languages.translations.create', params: { language }}"
                        :title="__('Add language')"
                    >
                        {{ __('Add Translation') }}
                    </router-link>

                </div>

            </div>
            <div v-if="Object.keys(translations).length">
                <table
                    class="table w-full"
                    cellpadding="0"
                    cellspacing="0"
                    data-testid="resource-table"
                >
                    <thead>
                        <tr>
                            <th class="text-left">{{ __('Group / Single') }}</th>
                            <th class="text-left">{{ __('Key') }}</th>
                            <th class="text-left">{{ sourceLanguage }}</th>
                            <th class="w-2/5 text-left">{{ language }}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="translation in translations" :key="translation.id">
                            <td>{{ translation.group }}</td>
                            <td>{{ translation.key }}</td>
                            <td>{{ translation.translations[sourceLanguage] }}</td>
                            <td>
                                <translation-input
                                    :initial-translation="translation.translations[language]"
                                    :language="language"
                                    :group="translation.group"
                                    :translation-key="translation.key"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Pagination -->
                <div v-if="Object.keys(translations).length" class="bg-20 rounded-b">
                    <nav class="flex justify-between items-center">
                        <!-- Previous Link -->
                        <button
                            :disabled="!hasPreviousPages"
                            class="btn btn-link py-3 px-4"
                            :class="{
                                'text-primary dim': hasPreviousPages,
                                'text-80 opacity-50': !hasPreviousPages,
                            }"
                            rel="prev"
                            @click.prevent="selectPreviousPage()"
                            dusk="previous"
                        >
                            {{__('Previous')}}
                        </button>

                        <slot />

                        <!-- Next Link -->
                        <button
                            :disabled="!hasMorePages"
                            class="btn btn-link py-3 px-4"
                            :class="{
                                'text-primary dim': hasMorePages,
                                'text-80 opacity-50': !hasMorePages,
                            }"
                            rel="next"
                            @click.prevent="selectNextPage()"
                            dusk="next"
                        >
                            {{__('Next')}}
                        </button>
                    </nav>
                </div>
            </div>
        </loading-card>
    </loading-view>
</template>

<script>
import TranslationInput from '../components/TranslationInput.vue';
import { InteractsWithQueryString } from 'laravel-nova';

export default {
    mixins: [
        InteractsWithQueryString,
    ],

    props: ['initialLanguage'],

    data() {
        return {
            initialLoading: true,
            loading: false,
            sourceLanguage: '',
            translations: [],
            languages: [],
            groups: [],
            search: '',
            group: '',
            language: this.initialLanguage,
            filtersAreApplied: false,
            perPage: 25,
            hasMorePages: false,
            hasPreviousPages: false,
            currentPage: 1,
            nextPage: '',
            previousPage: ''
        }
    },

    watch: {
        search: function () {
            this.$nextTick(async () => {
                this.updateQueryString({
                    page: 1,
                    search: this.search
                })
            });
            this.listTranslations();
        }
    },

    methods: {
        listTranslations() {
            this.$nextTick(async () => {
                const translations = await axios.get(
                    `/nova-vendor/nova-translation/languages/${this.language}/translations`,
                    {
                        params: {
                            group: this.group,
                            search: this.search,
                            page: this.currentPage,
                            per_page: this.perPage
                        }
                    }
                );

                this.sourceLanguage = translations.data.source_language;
                this.languages = translations.data.languages;
                this.groups = translations.data.groups;
                this.translations = translations.data.translations.data;
                this.initialLoading = false;
                this.loading = false;
                this.hasMorePages = translations.data.translations.next_page_url ? true : false;
                this.hasPreviousPages = translations.data.translations.prev_page_url ? true : false;
                this.currentPage = translations.data.translations.current_page;
            });
        },

        performSearch(event) {
            if (event.which != 9) {
                this.$nextTick(async () => {
                    this.updateQueryString({
                        page: 1,
                        search: this.search
                    })
                });
                this.listTranslations();
            }
        },

        groupChanged(event) {
            this.group = event.target.value;
            this.currentPage = 1;
            this.updateQueryString({
                page: 1,
                group: this.group
            });
            this.filtersAreApplied = event.target.value ? true : false;
            this.listTranslations();
        },

        perPageChanged(event) {
            this.perPage = event.target.value;
            this.updateQueryString({
                per_page: this.perPage
            });
            this.filtersAreApplied = event.target.value ? true : false;
            this.listTranslations();
        },

        languageChanged(value) {
            this.language = event.target.value;
            this.updateQueryString({
                language: this.language
            });
            this.listTranslations();
        },

        selectNextPage() {
            if(!this.hasMorePages) {
                return false;
            }

            this.currentPage++;
            this.updateQueryString({
                page: this.currentPage
            });
            this.listTranslations();
        },

        selectPreviousPage() {
            if(!this.hasPreviousPages) {
                return false;
            }

            this.currentPage--;
            this.updateQueryString({
                page: this.currentPage
            })
            this.listTranslations();
        },

        initializeSearchFromQueryString() {
            this.search = this.$route.query['search'] || ''
        },

        initializeGroupFromQueryString() {
            this.group = this.$route.query['group'] || ''
        },

        initializePerPageFromQueryString() {
            this.perPage = this.$route.query['per_page'] || this.perPage
        },

        initializeLanguageFromQueryString() {
            this.language = this.$route.query['language'] || this.initialLanguage
        },

        initializePageFromQueryString() {
            this.currentPage = this.$route.query['page'] || this.currentPage
        }
    },

    components: {
        'translation-input': TranslationInput,
    },

    async created() {
        this.initializeSearchFromQueryString()
        this.initializeGroupFromQueryString()
        this.initializePerPageFromQueryString()
        this.initializeLanguageFromQueryString()
        this.initializePageFromQueryString()
        await this.listTranslations();
    },

    metaInfo() {
        return {
            title: 'Translations',
        }
    },
}
</script>
