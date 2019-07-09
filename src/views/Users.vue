<template>
  <div class="users-list">
    <app-header />
    <section class="section">
      <div class="container users-list__container">
        <h2 class='has-text-weight-bold'>Users List</h2>
        <user-list-comp 
          :users='users'
        />
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'LocalComponents/AppHeader'
import SharedFooter from 'Components/Shared/SharedFooter'
import UserListComp from 'LocalComponents/User/List/UserList'

export default {
  name: 'UserDirectory',

  components: {
    AppHeader,
    SharedFooter,
    UserListComp,
  },

  computed :{
    ...mapState({
      users: state => state.users.data,
    }),
  },
}
</script>

<style lang='scss'>
.users-list {
  &__container {
    max-width: 1200px;
  }
}
</style>

