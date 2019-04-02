<template>
  <div class="layout-base">
    <shared-header 
      :logo='require("@/assets/img/logo.png")'
    />
    <app-banner />
    <div id="content">
      <fundraiser-grid 
        :fundraiser="fundraisers['innovative-fundraising']"
        :key="'innovative-fundraising'"
      />
      <fundraiser-grid 
        :fundraiser="fundraisers['year-round-holiday-options']"
        :key="'year-round-holiday-options'"
      >
        <div class="year-round-holiday-options__extra-content has-text-right">
          <p class="mb-2">To see all the holiday and seasonal options, visit <a href="#" class="text-primary">Calendar for Good</a></p>
        </div>
      </fundraiser-grid>
      <fundraiser-grid 
        :fundraiser="fundraisers['fundraising-classics']"
        :key="'fundraising-classics'"
      />
      <fundraiser-grid 
        :fundraiser="fundraisers['help-the-poorest-half']"
        :key="'help-the-poorest-half'"
      />
      <fundraiser-grid 
        :fundraiser="fundraisers['free-modern-day-slaves']"
        :key="'free-modern-day-slaves'"
      />
      <fundraiser-grid 
        :fundraiser="fundraisers['help-the-earth']"
        :key="'help-the-earth'"
      />
      <fundraiser-grid 
        :fundraiser="fundraisers['do-good-together']"
        :key="'do-good-together'"
      />
    </div>
    <SharedFooter></SharedFooter>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import SharedHeader from 'Components/Shared/SharedHeader.vue';
import AppBanner from 'Components/OptionsForGood/AppBanner.vue';
import FundraiserGrid from 'Components/OptionsForGood/FundraiserGrid.vue';
import SharedFooter from 'Components/Shared/SharedFooter.vue';

export default {
  name: 'BaseLayout',

  components: {
    SharedHeader,
    AppBanner,
    FundraiserGrid,
    SharedFooter,
  },

  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    return {
      title: 'Options for Good - v1',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
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

