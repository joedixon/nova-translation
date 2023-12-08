<template>
<div>
    <heading class="mb-3">{{ __('Add a new language') }}</heading>
    <card class="overflow-hidden">
        <form @submit.prevent="createLanguage" autocomplete="off">

            <TextField
            name="name"
            label="Name"
            placeholder="Language Name"
            :errors="validationErrors"
            v-model="name" />

            <TextField
            name="locale"
            label="Locale"
            placeholder="e.g. EN"
            :errors="validationErrors"
            v-model="locale" />

            <div v-if="created" class="text-primary-600 px-4 pt-4 pb-0">{{ __('New Translation language has been created') }}</div>

            <!-- Create Button -->
            <div class="bg-30 flex px-8 py-4 items-center">
                <button class="ml-auto border text-left appearance-none cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 relative disabled:cursor-not-allowed inline-flex items-center justify-center shadow h-9 px-3 bg-primary-500 border-primary-500 hover:[&:not(:disabled)]:bg-primary-400 hover:[&:not(:disabled)]:border-primary-400 text-white dark:text-gray-900">
                    {{__('Create Language')}}
                </button>
            </div>

        </form>
    </card>
    </div>
    
</template>

<script>
import { Errors, Button } from 'laravel-nova';
import TextField from '../components/TextField.vue';
export default { 
    props: ['novaPath'],

    components: {
        TextField
    },
    data() {
        return {
           validationErrors: new Errors(),
           name: "",
           locale: "",
           isWorking: false,
           created: false,
        }
    },
    methods: {
        async createLanguage() {
            try {
                this.isWorking = true;
                await Nova.request().post('/nova-vendor/nova-translation/languages', {
                    name: this.name,
                    locale: this.locale
                })

              
                this.created = true;

                window.location.href = this.novaPath + '/nova-translation';
            } catch (error) {
                this.isWorking = false;
                if (error && error.response && error.response.status == 422) {
                    this.validationErrors = new Errors(error.response.data.errors)
                }
            }
        }
    },
    metaInfo() {
        return {
            title: 'Create Language',
        }
    },
}
</script>