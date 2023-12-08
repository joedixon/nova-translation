<template>
    <div class="field-wrapper flex flex-col border-b border-gray-100 dark:border-gray-700 md:flex-row">
        <div class="px-8 mt-2 md:mt-0 w-full md:w-1/5 md:py-5">
            <label :for="name" class="inline-block pt-2 leading-tight mb-2">{{ label }}</label>
        </div>
        <div class="mt-1 md:mt-0 pb-5 px-8 w-full md:w-3/5 md:py-5">
            <input
                type="text"
                class="w-full form-control form-input form-input-bordered"
                :id="name"
                :placeholder="placeholder"
                :value="modelValue" 
                @input="$emit('update:modelValue', $event.target.value)"
                :class="{
                  'form-input-border-error': errors.has(
                    name
                  ),
                }"
            />

            <p v-if="errors && errors.has(name)" class="text-red-600 my-1 text-md">
                {{errors.get(name)}}
            </p>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['name', 'label', 'placeholder', 'modelValue', 'errors'],
    }


</script>
