<template>
  <div class="layout-base">
    <app-header />
    <app-banner 
      :widget-id='1'
    />
    <section class="quote-container section">
      <div class="container">
        <h2 class='quote has-text-centered'>Give me your tired, your poor,  your huddled masses yearning to breathe free, the wretched refuse of your teeming shore.</h2>
      </div>
			<counter-widget-banner 
				:widget-id='1'
				:bg-image='require("../assets/img/images/mlk.jpg")'
				:widget-position='["top", "left"]'
			/>
    </section>
    <section class="widget-customize section">
      <div class="container">
        <h2 class='has-text-centered'>Place a widget on your blog or website</h2>
        <p class='has-text-centered'>Once you create your customized widget you'll be provided with code to simply paste onto your website.  It's as easy as that!</p>
        <widget-customizer 
          :widget-id='1'
        />
      </div>
    </section>
    <section class="section">
			<counter-widget-banner 
				:widget-id='1'
				:bg-image='require("../assets/img/images/poor-kid.jpg")'
				:widget-position='["center-y", "left"]'
			/>
    </section>
    <section class="section">
        <h2 class='has-text-centered'>Create your own counter page to share</h2>
        <p class='has-text-centered'>Share the link with your networks and all donations made through it will go to a charity of your choice.</p>
        <counter-page-creator />
    </section>
    <SharedFooter></SharedFooter>
  </div>
</template>

<script>
import AppHeader from '@/components/CountersForThePoor/AppHeader.vue';
import AppBanner from '@/components/CountersForThePoor/AppBanner.vue';
import WidgetCustomizer from '@/components/CountersForThePoor/WidgetCustomizer'
import CounterWidgetBanner from '@/components/CountersForThePoor/CounterWidgetBanner'
import CounterPageCreator from '@/components/CountersForThePoor/CounterPageCreator'
import SharedFooter from '@/components/Shared/SharedFooter.vue';

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
		CounterWidgetBanner,
    WidgetCustomizer,
    SharedFooter,
    CounterPageCreator,
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

<style lang='scss'>
  .quote {
    font-style: italic;
    font-weight: 700;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.5rem;
    color: $color-gray;
    margin-bottom: 4rem;
  }

  .img-container {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }

  .widget-customize {
    .widget-customizer {
      margin-top: 3rem;
    }
  }
</style>

