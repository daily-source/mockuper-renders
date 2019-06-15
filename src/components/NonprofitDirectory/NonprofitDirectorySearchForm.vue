<template>
  <form 
    @submit.prevent="onFormSubmit"
    class='nonprofit-directory-search-form'  
  >
    <input 
      type='text'
      class='nonprofit-directory-search-form__input input'
      :placeholder='inputPlaceholder'
      v-model='filterValue'
    >
    <button 
      class='button is-primary nonprofit-directory-search-form__button'
      type='submit'
    >
      Search
    </button>
    <button 
      class='button is-secondary nonprofit-directory-search-form__button'
      @click.prevent.stop='resetFilter'
      v-if='showResetButton'
    >
      Reset
    </button>
  </form>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'NonprofitDirectorySearchForm',

  props: {
    showResetButton: {
      type: Boolean,
      required: false,
      default: true,
    },

    inputPlaceholder: {
      type: String,
      required: false,
      default: 'Enter your keyword(s) to search'
    },
  },

  data () {
    return {
      filterValue: '',
    }
  },  

  methods: {
    onFormSubmit () {
      this.$emit('formSubmit', this.filterValue)
      this.filterValue = ''
    },

    /**
     * Resets the filter value
     */
    resetFilter () {
      this.filterValue = ''

      this.$emit('formReset')
    },
  }
}
</script>

<style lang="scss" scoped>
.nonprofit-directory-search-form {
  display: flex;
  align-items: center;

  > form {
    display: flex;
    align-items: center;
  }

  &__button {
    margin-left: 1em;
  }

  &__input {
    flex-basis: 400px;
    width: 400px;
    flex-grow: 1;
    max-width: 400px;
  }
}
</style>
