<template>
  <div class="volunteer__wrapper">
    <AppHeader layout="home"></AppHeader>
    <section class="examples__section-wrapper">
      <div class="container">
        <h1 class="section-title title">This page is under construction. Please return in the future.</h1>
      </div>
    </section>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMeta from 'vue-meta';

Vue.use(VueMeta);

export default {
  name: 'explore',
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppFooter: () => import('@/components/general/AppFooter.vue'),
    AppHeader: () => import('@/components/general/AppHeader.vue'),
  },
  metaInfo() {
    return {
      title: 'Volunteer',
      meta: [
        { vmid: 'og:title', property: 'og:title', content: 'Volunteer: multiple ways to do good!' },
        { vmid: 'description', name: 'description', content: 'Check out Volunteerathons to donate to and nonprofits that are doing good deeds and that also need your help.' },
        { vmid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
        { vmid: 'og:image:width', property: 'og:image:width', content: '1280' },
        { vmid: 'og:image:height', property: 'og:image:height', content: '680' },
        { vmid: 'og:image', property: 'og:image', content: `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}/public/volunteerathon-screenshot.png` },
      ],
    };
  },
};
</script>

<style lang="scss">

</style>
