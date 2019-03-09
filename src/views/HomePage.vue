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
    const description = 'A Loseathon is similar to a walkathon but instead of walking a certain distance to raise money, a person loses a certain amount of weight';
    const title = 'Raise money while losing weight!';
    return {
      title: 'Home - v1',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>
