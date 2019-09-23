<template>
  <div class="layout-base">
    <app-header 
      layout='page'
    />
    <app-banner />
    <div id="content">
      <fundraiser-grid 
        category="Cutting Edge Fundraising"
        id='innovative-fundraising'
      />
      <fundraiser-grid 
        category="Year-Round Holiday Options"
        id="year-round-holiday-options"
      >
        <div class="year-round-holiday-options__extra-content has-text-right">
          <p class="mb-2">To see all the holiday and seasonal options, visit <a href="#" class="text-primary">Calendar for Good</a></p>
        </div>
      </fundraiser-grid>
      <fundraiser-grid 
        category="Fundraising Classics"
        id="fundraising-classics"
      />
      <fundraiser-grid 
        category="Help The Poorest Half"
        id="help-the-poorest-half"
      />
      <fundraiser-grid 
        category="Free Modern Day Slaves"
        id="free-modern-day-slaves"
      />
      <fundraiser-grid 
        category="Help The Earth"
        id="help-the-earth"
      />
      <fundraiser-grid 
        category="Do Good Together"
        id="do-good-together"
      />
    </div>
    <SharedFooter></SharedFooter>
    <!-- <banner-switcher /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppHeader:  () => import('Components/OptionsForGood/AppHeader'),
    AppBanner: () => import('Components/OptionsForGood/AppBanner'),
    FundraiserGrid: () => import('Components/MaximumGood/FundraiserGridNew'),
    SharedFooter: () => import('Components/Shared/SharedFooter'),
  },

  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo () {
    var description = "Double the results, half the effort. A Volunteerathon® lets you make a far greater impact with your time than traditional fundraising events."
    var title = "Create a volunteerathon and do good!"
    return {
      title: 'Options for Good - v1',
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  },

  computed: {
    ...mapState({
      fundraisers: state => state.fundraisers.data
    })
  }

};
</script>

<style scoped lang="scss">
#year-round-holiday-options {
  background-color: #eaf7ff;
}

#help-the-poorest-half {
  background-color: #f8f1e2;
}


#help-the-earth {
  background-color: #e1f7ea;
}
</style>

