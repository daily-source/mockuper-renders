<template>
  <input 
    type='text'
    class='nonprofit-directory-search__input input'
    :placeholder='placeholder'
    @change='onInputChange'
  >
</template>

<script>
export default {
  name: 'NonprofitDirectorySearch',

  props: {
    value: {
      type: String,
      required: false,
    },

    placeholder: {
      type: String,
      required: false,
      default: 'Enter your keyword/s to search...'
    }
  },

  methods: {
    onInputChange (event) {
      this.$emit('input', event.target.value)
    }
  },
}
</script>
