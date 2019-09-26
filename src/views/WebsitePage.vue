<template>
  <div class='website-page'>
    <website-page-header 
      :is-logo-loading='isWebsitePageHeaderLoading'
      :logo='site'
    />
    <div class="website-page__content">
      <div class="container">
        <p class='has-text-centered'><span class="has-text-weight-bold">Note:</span> This website is still being built, and is partly done. When new pages are being built by web developers, they often host them at developer domains and links similar to the one you see in your address bar.</p>
      </div>
    </div>
    <shared-footer />
  </div>
</template>

<script>
export default {
  name: 'WebsitePage',

  components: {
    WebsitePageHeader: () => import('Components/OptionsForGood/WebsitePageHeader'),
    SharedFooter: () => import('Components/Shared/SharedFooter')
  },

  data () {
    return {
      loading: true,
      site: null,
      isWebsitePageHeaderLoading: true,
    }
  },
  
  mounted () {
    const { slug } = this.$route.params;

    console.log(process.env.VUE_APP_IRS_SEARCH_API_URL)

    fetch(`https://maxgood-logo-manager.herokuapp.com/api/logos/?slug=${slug}&max=1`)
      .then(res => {
        return res.json()
      }).then(({ logos }) => {
        this.site = logos[0]
        this.loading = false
        this.isWebsitePageHeaderLoading = false
      })
  },

  metaInfo () {
    const siteName = (this.site && this.site.name) || ''
    const description = 'A host of options to do good.'

    return {
      title: `${siteName} | Options for Good`,
      meta: [
        { vmid: "description", name: "description", content: description },
      ]
    }
  }  
}
</script>

<style lang="scss" scoped>
.website-page {
  &__content {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      @include tablet {
        font-size: 1.25rem;
        max-width: 75%;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>