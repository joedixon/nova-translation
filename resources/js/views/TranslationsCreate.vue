<template>
    <div>
    <heading class="mb-3">{{ __('Add a new translation') }} </heading>
    <card class="overflow-hidden">
        <form @submit.prevent="createTranslation" autocomplete="off">
            <TextField 
                name="group"
                v-model="group"
                :label="__('Group (optional)')"
                :placeholder="__('e.g. homepage')"
                :errors="validationErrors"
            />
            <TextField
                name="key"
                v-model="key"
                :label="__('Key')"
                :placeholder="__('e.g. welcome')"
                :errors="validationErrors"
            />

            <TextField
                name="value"
                v-model="value"
                :label="__('Value')"
                :placeholder="__('e.g. Welcome')"
                :errors="validationErrors"
            />

            <TextField
                name="namepsace"
                v-model="namespace"
                :label="__('Namespace (optional)')"
                :placeholder="__('e.g. my-package')"
                :errors="validationErrors"
            />
            <!-- Create Button -->
            <div class="bg-30 flex px-8 py-4">
                <button class="ml-auto border text-left appearance-none cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 relative disabled:cursor-not-allowed inline-flex items-center justify-center shadow h-9 px-3 bg-primary-500 border-primary-500 hover:[&:not(:disabled)]:bg-primary-400 hover:[&:not(:disabled)]:border-primary-400 text-white dark:text-gray-900">
                    {{__('Create Translation')}}
                </button>
            </div>

        </form>
    </card>
    </div>
    
</template>

<script>
import { Errors } from 'laravel-nova'
import TextField from '../components/TextField.vue';
export default {

    props: ['language', 'novaPath'],


    components: {
        TextField
    },

    data() {
        return {
            group: '',
            key: '',
            value: '',
            namespace: '',
           validationErrors: new Errors() 
        }
    },

    methods: {
        async createTranslation() {
            try {
                await Nova.request().post(`/nova-vendor/nova-translation/languages/${this.language}/translations`, {
                    group: this.group,
                    key: this.key,
                    value: this.value,
                    namespace:  this.namespace
                });

                // redirect back to translation index if all good
                window.location.href = this.novaPath + '/nova-translation/languages/translations?language='+this.language
            } catch (error) {
                if (error.response.status == 422) {
                    this.validationErrors = new Errors(error.response.data.errors)
                }
            }
        }
    },

    metaInfo() {
        return {
            title: 'Create Translation',
        }
    },
}
</script>