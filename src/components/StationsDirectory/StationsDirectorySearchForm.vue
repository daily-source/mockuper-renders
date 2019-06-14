<template>
  <form 
    @submit.prevent="onFormSubmit"
    class='stations-directory-search-form'  
  >
    <input 
      type='text'
      class='stations-directory-search-form__input input'
      placeholder='Enter your keyword(s) to search'
      v-model='filterValue'
    >
    <button 
      class='button is-primary stations-directory-search-form__button'
      type='submit'
    >
      Search
    </button>
    <button 
      class='button is-danger stations-directory-search-form__button'
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
  name: 'StationsDirectorySearchForm',

  props: {
    showResetButton: {
      type: Boolean,
      required: false,
      default: true,
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
.stations-directory-search-form {
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
    flex-basis: 350px;
    width: 350px;
    flex-grow: 1;
    max-width: 350px;
  }
}
</style>
