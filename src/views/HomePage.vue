<template>
  <div class="layout-base">
    <intro-video />
    <app-header />
		<section class='home-virtual-railroad-map section'>	
			<div class='container'>
			<p class='has-text-centered home-virtual-railroad-map__intro'>Click the bulbs to see who's helping free slaves and where they're helping. Click <a href='#'>here </a> to be part of the Virtual Railroad.</p>
				<home-map />
				<div class='legends'>
					<p>
						<img src='@/assets/img/light_bulb_32.png' alt='Light Bulb'><span class='has-text-weight-bold'> = person helping to free slaves. </span> Individuals helping the Underground Railroad left lit lamps hanging on their barn doors and sheds overnight to let runaway slaves know they were safe havens where they could sleep or find food and water for their journey. They also used lamps to signal to runaway slaves who were preparing to cross rivers whether there was anyone on the other shore who would report them or try to capture them, or if the coast was clear to swim across.
					</p>
					<p>
						<img src='@/assets/img/star_32.png' alt='Star'><span class='has-text-weight-bold'> = nonprofit helping to free slaves.</span> In the 1800s, slaves trying to escape north to freedom regularly relied on the North star as a beacon and compass because it's the only star in the sky that doesn't change its location. Today, slaves rely on nonprofits to help them gain their freedom and the nonprofits are steadfast in their commitment to free slaves, so we represent them with stars.
					</p>
				</div>
			</div>
		</section>
		<shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import HomeMap from 'LocalComponents/HomeMap'
import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'
import IntroVideo from 'LocalComponents/IntroVideo'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
		VirtualRailroadMap,
		HomeMap,
    IntroVideo,
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

<style lang='scss'scoped>
.legends {
	img {
		vertical-align: middle;
	}
}	
</style>
