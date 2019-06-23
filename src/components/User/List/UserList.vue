<template>
  <div class="user-list">
    <alert
      :open='showAlert'
      @closeButtonClicked='showAlert = false'
    >
      User successfuly deleted.
    </alert>
    <user-list-item
      v-for='user in usersSorted'
      :key='user.id'
      :user='user'
      @delete='onUserListItemDeleteClicked'
    />
    <user-delete-modal 
      :state='showDeleteModal'
      :user-id='userToDelete'
      @delete:success='showAlert = true'
      @modal:close='closeDeleteModal'
    />
  </div>
</template>

<script>
import Alert from 'LocalComponents/Alert/Alert'
import UserListItem from 'LocalComponents/User/List/UserListItem'
import UserDeleteModal from 'LocalComponents/User/List/UserDeleteModal'

export default {
  name: 'UserList',

  components: {
    Alert,
    UserListItem,
    UserDeleteModal,
  },

  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      showDeleteModal: false,
      userToDelete: 0,
      showAlert: false,
    }
  },

  methods: {
    onUserListItemDeleteClicked (id) {
      this.userToDelete = id
      this.showDeleteModal = true
    },

    closeDeleteModal () {
      this.showDeleteModal = false
      this.userToDelete = null
    }
  },

  computed: {
    usersSorted () {
      return _.orderBy(this.users, [user => user.firstName.toLowerCase()], ['asc']);
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
