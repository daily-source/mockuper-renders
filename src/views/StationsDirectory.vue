<template>
  <div class="stations-directory">
    <app-header />
    <intro-video />
    <section class="section">
      <div class="container stations-directory__container">
        <h3 class='has-text-weight-bold'>Stations On The Virtual Railroad</h3>
        <p class='subheading'>A station is a group of people such as a school, business, church, synagogue or community that is helping to fight slavery through donations or volunteering. To create a new station, click <a href="#">here</a>. To find a station, use the search field or scroll.</p>
        <stations-directory-list />
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import IntroVideo from 'LocalComponents/IntroVideo'
import StationsDirectoryList from 'LocalComponents/StationsDirectory/StationsDirectoryList'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'StationsDirectory',

  components: {
    AppHeader,
    SharedFooter,
    StationsDirectoryList
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: 'Stations Directory | Hoya Railroad',
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
.stations-directory {
  &__container {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  h3 {
    font-size: 27px;
    margin-bottom: 1.5rem;
  }

  .subheading {
    font-size: 17px;
  }
}
</style>
