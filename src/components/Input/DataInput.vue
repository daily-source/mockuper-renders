<template>
  <div class="data-input">
    <input 
      type="number"
      v-bind='attrs'
      :class="['input', 'has-text-centered', { 'is-danger': error } ]"
      v-on='listeners'
      min=0
    >
  </div>
</template>

<script>
export default {
  name: 'DataInput',

  inheritAttrs: false,

  props: {
    error: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  computed: {
    attrs () {
      const { name, id, value } = this.$attrs

      return {
        name,
        id,
        value,
      }
    },

    listeners () {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value)
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.data-input {
  input {
    background-color: darken( white, 4.5% );
    border-radius: 5px;
    height: 45px;
    transition: border-color .2s ease;
    box-shadow: none;
    border-color: transparent;

    &:focus {
      box-shadow: none !important;
      border-color: $primary;
    }

    &.is-danger {
      border-color: $danger;
    }
  }
}
</style>
