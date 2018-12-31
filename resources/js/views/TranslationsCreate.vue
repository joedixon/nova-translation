<template>
    <div>
    <heading class="mb-3">{{ __('Add a new translation') }}</heading>
    <card class="overflow-hidden">
        <form @submit.prevent="createTranslation" autocomplete="off">
            <form-text-field
                :field="{
                    attribute: 'group',
                    name: __('Group (optional)'),
                    placeholder: __('e.g. homepage')
                }"
                :errors="validationErrors"
            />
            <form-text-field
                :field="{
                    attribute: 'key',
                    name: __('Key'),
                    placeholder: __('e.g. welcome')
                }"
                :errors="validationErrors"
            />
            <form-text-field
                :field="{
                    attribute: 'value',
                    name: __('Value'),
                    placeholder: __('e.g. Welcome')
                }"
                :errors="validationErrors"
            />
            <form-text-field
                :field="{
                    attribute: 'namespace',
                    name: __('Namespace (optional)'),
                    placeholder: __('e.g. my-package')
                }"
                :errors="validationErrors"
            />

            <!-- Create Button -->
            <div class="bg-30 flex px-8 py-4">
                <button class="btn btn-default btn-primary ml-auto">
                    {{__('Create Translation')}}
                </button>
            </div>

        </form>
    </card>
    </div>
    
</template>

<script>
import { Errors } from 'laravel-nova'
export default {

    props: ['language'],

    data() {
        return {
           validationErrors: new Errors() 
        }
    },

    methods: {
        async createTranslation() {
            try {
                await axios.post(`/nova-vendor/nova-translation/languages/${this.language}/translations`, {
                    group: document.getElementById('group').value,
                    key: document.getElementById('key').value,
                    value: document.getElementById('value').value,
                    namespace: document.getElementById('namespace').value
                });

                this.$toasted.show(
                    this.__('The translation was created!'),
                    { type: 'success' }
                )

                this.$router.push({
                    name: 'nova-translation.languages.translations.index',
                    query: { language: this.language }
                })
            } catch (error) {
                console.log(error);
                if (error.response.status == 422) {
                    this.validationErrors = new Errors(error.response.data.errors)
                }
            }
        }
    }
}
</script>