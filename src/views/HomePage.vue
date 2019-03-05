<template>
  <div class="layout-base">
		<app-header />
    <section class='section' style='height: calc(100vh - 105px); display: flex; align-items: center; justify-content: center;'>
      <h1>Website is currently under construction...</h1>
    </section>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'Components/Loseathon/AppHeader'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    SharedFooter,
  },

  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    return {
      title: 'Home',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>
