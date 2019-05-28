<template>
  <form 
    @submit.prevent="onFormSubmit"
    class='nonprofit-directory-search-form'  
  >
    <input 
      type='text'
      class='nonprofit-directory-search-form__input input'
      placeholder='Enter your keyword/s to search...'
      v-model='filterValue'
    >
    <button 
      class='button is-primary nonprofit-directory-search-form__button'
      type='submit'
    >
      Search
    </button>
    <button 
      class='button is-danger nonprofit-directory-search-form__button'
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
    flex-basis: 350px;
    width: 350px;
    flex-grow: 1;
    max-width: 350px;
  }
}
</style>
