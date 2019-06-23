<template>
  <modal
    :state='state'
    @modal:close='onModalCloseClicked'
    class='user-delete-modal'
  >
    <div class="user-delete-modal__content" slot='content'>
      <p>Deleting this user will permanently remove the user. Are you sure you want to delete the user?</p>

      <div class="user-delete-modal__actions">
        <button class='button is-danger' @click='onDeleteClicked'>Delete</button>
        <button class='button is-primary' @click='onModalCloseClicked'>Cancel</button>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'

import Modal from 'Components/general/Modal'

export default {
  props: {
    state: {
      type: Boolean,
      required: false,
      default: true,
    },

    userId: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  components: {
    Modal,
  },

  methods: {
    onModalCloseClicked () {
      this.$emit('modal:close')
    },

    onDeleteClicked () {
      this.deleteUser(this.userId)
      this.$emit('delete:success')
      this.onModalCloseClicked()

    },

    ...mapActions({
      deleteUser: 'users/deleteUser',
    })
  },
}
</script>

<style lang='scss' scoped>
.user-delete-modal {
  &__actions {
    .button {
      margin-right: .5em;
    }
  }
}
</style>

