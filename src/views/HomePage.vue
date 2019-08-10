<template>
  <div class="layout-base">
    <shared-header 
      :logo='require("@/assets/img/logo.png")'
    />
    <app-banner />
    <div id="content">
      <section class="section" id='innovative-fundraising'>
        <div class="container">
          <fundraiser-grid 
            :fundraiser="fundraisers['innovative-fundraising']"
          />
        </div>
      </section>
      <section class="section" id="year-round-holiday-options">
        <div class="container">
          <fundraiser-grid 
            :fundraiser="fundraisers['year-round-holiday-options']"
            :key="'year-round-holiday-options'"
            id='year-round-holiday-options'
          >
            <div class="year-round-holiday-options__extra-content has-text-right">
              <p class="mb-2">To see all the holiday and seasonal options, visit <a href="#" class="text-primary">Calendar for Good</a></p>
            </div>
          </fundraiser-grid>
        </div>
      </section>
      <section class="section" id="fundraising-classics">
        <div class="container">
          <fundraiser-grid 
            :fundraiser="fundraisers['fundraising-classics']"
            :key="'fundraising-classics'"
            id='fundraising-classics'
          />
        </div>
      </section>
      <section class="section" id="help-the-poorest-half">
        <div class="container">
          <fundraiser-grid 
            :fundraiser="fundraisers['help-the-poorest-half']"
            :key="'help-the-poorest-half'"
            id='help-the-poorest-half'
          />
        </div>
      </section>
      <section class="section" id="free-modern-day-slaves">
        <div class="container">  
          <fundraiser-grid 
            :fundraiser="fundraisers['free-modern-day-slaves']"
            :key="'free-modern-day-slaves'"
            id='free-modern-day-slaves'
          />
        </div>
      </section>
      <section class="section" id="help-the-earth">
        <div class="container">
          <fundraiser-grid 
            :fundraiser="fundraisers['help-the-earth']"
            :key="'help-the-earth'"
            id='help-the-earth'
          />
        </div>
      </section>
      <section class="section" id="do-good-together">
        <div class="container">
          <fundraiser-grid 
            :fundraiser="fundraisers['do-good-together']"
            :key="'do-good-together'"
            id='do-good-together'
          />
        </div>
      </section> -->
    </div>
    <SharedFooter></SharedFooter>
    <banner-switcher />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import SharedHeader from 'Components/Shared/SharedHeader.vue';
import AppBanner from 'Components/OptionsForGood/AppBanner.vue';
import FundraiserGrid from 'Components/MaximumGood/FundraiserGrid.vue';
import SharedFooter from 'Components/Shared/SharedFooter.vue';

export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    SharedHeader,
    AppBanner,
    FundraiserGrid,
    SharedFooter,
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
      title: 'Options for Good - Home',
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

