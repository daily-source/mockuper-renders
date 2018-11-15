<template>
  <div class="user-management-page__wrapper">
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      :diseable-close= "userDialogDisableClose"
      v-on:modal:close="closeUserDialog()"
    >
      <div slot="header">{{userDialogHeading}}</div>
      <div slot="content"><p>{{userDialogMessage}}</p></div>
    </UserDialog>

    <h3>Nonprofits I manage</h3>
    <section class="nonprofits-section">
      <div v-if="userData.fundraisers.length">
        <table class="table is-striped is-fullwidth fundraisers-table">
          <thead>
            <tr>
              <th>Nonprofit</th>
              <th>Raised</th>
              <th>Donors count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nonprofit in userData.nonprofits" :key="nonprofit.ein">
              <td>
                <router-link :to="`/nonprofit/${nonprofit.ein}`">{{nonprofit.name}}</router-link>
              </td>
              <td>{{nonprofit.raised | usd}}</td>
              <td>{{nonprofit.donors_count}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>You are not managing any nonprofit yet. If you represent one or more organizations, get to the nonprofit page using the search engine below. There you will be able to claim the organization and manage it.</p>
        <NonprofitAjaxSearch
          v-on:selected="goToNonprofit($event)"
          placeholder="Enter a nonprofit name"
          :standalone="true"
        ></NonprofitAjaxSearch>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userDialogModal: false,
      userDialogHeading: 'Processing...',
      userDialogMessage: '',
      userDialogSpinner: false,
      userDialogDisableClose: false,
    };
  },
  components: {
    NonprofitAjaxSearch: () => import('@/components/general/NonprofitAjaxSearch.vue'),
    UserDialog: () => import('@/components/general/UserDialog.vue'),
  },
  computed: {
    userData() {
      return this.$store.state.user;
    },
  },
  methods: {
    goToNonprofit(ein) {
      this.$router.push(`/nonprofit/${ein}`);
    },
  },
};
</script>

<style scoped lang="scss">
.account-section {
  margin-bottom: 80px;
}

.fundraisers-table {
  td {
    text-align: center;
  }
}
.table {
  thead {
    th {
      text-align: center;
    }
  }
  th {
    @include breakpoint($mobile) {
      padding: .5em .25em;
    }
  }
}
.nonprofit-search-field-wrapper.standalone {
  @include breakpoint($tablet) {
    margin-left: -0.75em;
  }
}
</style>
