<template>
  <div class="layout-base">
    <app-header />
		<virtual-railroad-map />
		<shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import VirtualRailroadMap from 'LocalComponents/Map'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
		VirtualRailroadMap,
		SharedFooter,
 	},

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad';
    return {
      title: 'Home | Virtual Railroad',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
  },

};
</script>
