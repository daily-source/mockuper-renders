<template>
  <div class='nonprofit-directory'>
    <app-header />
    <intro-video />
    <modal
      :state='showInfoModal'
      @modal:close='showInfoModal = false'
    >
      <div class='nonprofit-directory__info-modal' slot='content'>
        <p class='has-text-centered'>When you find a nonprofit you support, close this window to return to your Edit Profile page, enter the nonprofit and save your changes.</p>
      </div>
    </modal>
    <section class='section'>
      <div class='nonprofit-directory__container container'>
        <h3 class='has-text-weight-bold has-text-centered'>Nonprofits helping the virtual railroad</h3>
        <nonprofit-directory-with-filter />
      </div>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import Modal from 'Components/general/Modal'
import IntroVideo from 'LocalComponents/IntroVideo'
import NonprofitDirectoryList from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryList'
import NonprofitDirectoryWithFilter from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryWithFilter'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'NonprofitDirectory',

  components: {
    AppHeader,
    IntroVideo,
    NonprofitDirectoryList,
    NonprofitDirectoryWithFilter,
    SharedFooter,
    Modal,
  },

  data () {
    return {
      showInfoModal: false,
    }
  },

  mounted () {
    if (this.$route.params.showInfoModal) {
      setTimeout(() => {
        this.showInfoModal = true
      }, 800)
    }
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: 'Nonprofit Directory | Virtual Railroad',
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
.nonprofit-directory {
  h3 {
    font-size: 22px;
    margin: 0;

    @include tablet {
      font-size: 29px;
      margin-bottom: 1.25rem;
    }
  }

  &__container {
    max-width: 900px;
  }
}
</style>