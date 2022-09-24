<template>
    <div>
        <heading class="mb-3">{{ __('Add a new language') }}</heading>
        <card class="overflow-hidden">
            <form autocomplete="off" @submit.prevent="createLanguage">
                <form-text-field
                    :field="{
                        attribute: 'name',
                        name: __('Name'),
                    }"
                    :errors="validationErrors"
                />
                <form-text-field
                    :field="{
                        attribute: 'locale',
                        name: __('Locale'),
                    }"
                    :errors="validationErrors"
                />

                <!-- Create Button -->
                <div class="bg-30 flex px-8 py-4">
                    <button class="btn btn-default btn-primary ml-auto">
                        {{ __('Create Language') }}
                    </button>
                </div>
            </form>
        </card>
    </div>
</template>

<script>
import { Errors } from 'laravel-nova'
export default {
    metaInfo() {
        return {
            title: 'Create Language',
        }
    },

    data() {
        return {
            validationErrors: new Errors(),
        }
    },

    methods: {
        async createLanguage() {
            try {
                await axios.post('/nova-vendor/nova-translation/languages', {
                    name: document.getElementById('name').value,
                    locale: document.getElementById('locale').value,
                })

                this.$toasted.show(this.__('The language was created!'), { type: 'success' })

                this.$router.push({
                    name: 'nova-translation',
                })
            } catch (error) {
                if (error.response.status == 422) {
                    this.validationErrors = new Errors(error.response.data.errors)
                }
            }
        },
    },
}
</script>
