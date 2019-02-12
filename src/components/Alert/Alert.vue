<template>
  <transition name='alert-fade'>
    <div 
      :class="['notification', `is-${type}`]"
      v-if='open'
    >
      <button @click='onCloseClicked' class="delete" v-if='dismissable'></button>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    type: {
      type: String,
      required: false,
      default: 'info',
    },

    dismissable: {
      type: Boolean,
      required: false,
      default: true
    },
    
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data () {
    return {
      closed: false,
    }
  },

  methods: {
    onCloseClicked () {
      this.$emit('closeButtonClicked')
    },
  }
}
</script>

<style lang="scss" scoped>
.alert-fade-enter-active, .alert-fade-leave-active {
  transition: opacity .2s;
}
.alert-fade-enter, .alert-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

