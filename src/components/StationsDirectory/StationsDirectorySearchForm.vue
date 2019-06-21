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
    <div class="stations-directory-search-form__actions">
      <button 
        class='button is-primary stations-directory-search-form__button'
        type='submit'
      >
        Search
      </button>
      <button 
        class='button is-secondary stations-directory-search-form__button'
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
  flex-direction: column;

  @include tablet {
    flex-direction: row;
    align-items: center;
  }

  > form {
    display: flex;
    align-items: center;
  }

  &__button {
    margin-left: 0.75em;

    &:first-child {
      margin-left: 0;
    }
    @include tablet {
      margin-left: 1em;
    }
  }

  &__actions {
    margin-top: .5em;

    @include tablet {
      margin-left: 1em;
      margin-top: 0;
    }
  }

  &__input {
    width: 350px;
    max-width: 100%;
    flex-grow: 1;

    @include tablet {
      flex-basis: 350px;
      max-width: 350px;
    }
  }
}
</style>
