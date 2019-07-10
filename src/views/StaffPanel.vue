<template>
  <div class="staff-panel">
    <app-header />
    <intro-video />
    <section class="section">
      <div class="staff-panel__container container">
        <h2 class="has-text-weight-bold">Staff Panel</h2>
        <ul class='staff-panel__list'>
          <li class='staff-panel__item'><router-link class='staff-panel__link' :to='{ name: "nonprofits-management" }'>Nonprofits Directory (Management)</router-link></li>
          <li class='staff-panel__item'><router-link class='staff-panel__link' :to='{ name: "station-management" }'>Stations Directory (Management)</router-link></li>
          <li class='staff-panel__item'><router-link class='staff-panel__link' :to='{ name: "user-list" }'>Users List</router-link></li>
        </ul>
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import IntroVideo from 'LocalComponents/IntroVideo'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'StaffPanel',

  components: {
    AppHeader,
    IntroVideo,
    SharedFooter,
  },

  
  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad';
    return {
      title: 'Staff Panel | Virtual Railroad',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },
}
</script>

<style lang='scss' scoped>
.staff-panel {
  &__container {
    max-width: 1110px;
  }

  &__item {
    margin-bottom: .75em;
  }

  &__link {
    font-size: 1.125em;
    display: inline-block;
  }
}
</style>
