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
    <div class="nonprofit-directory-search-form__actions">
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
    </div>
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
  justify-content: flex-start;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;

  @include tablet {
    flex-direction: row;
  }

  @include desktop {
    align-items: center;
  }

  &__button {
    margin-top: .625em;
    margin-right: 0.25em;

    @include tablet {
      margin-top: 0;
      margin-left: 1em;
      margin-right: 0;
    }
  }

  &__input {
    width: 400px;
    max-width: 100%;
    flex-grow: 1;

    @include tablet {
      flex-basis: 400px;
      max-width: 400px;
    }
  }
}
</style>
