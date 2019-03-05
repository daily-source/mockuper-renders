<template>
  <div class="layout-base">
		<app-header />
  </div>
</template>

<script>
import AppHeader from 'Components/Loseathon/AppHeader'

export default {
  name: 'BaseLayout',

  components: {
		AppHeader,
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
