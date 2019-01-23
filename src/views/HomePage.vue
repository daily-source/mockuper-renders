<template>
  <div class="layout-base">
    <app-header />
    <app-banner 
      :widget-id='1'
    />
    <section class="quote-container section">
      <div class="container">
        <h2 class='quote has-text-centered'>"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their creator with certain unalienable rights, that among these are life, liberty and the pursuit of happiness."<br /> <span class='author'>- Declaration of Independence</span></h2> 
      </div>
			<counter-widget-jumbotron 
				:widget-id='1'
				:bg-image='require("../assets/img/images/mlk.jpg")'
				:widget-position='["bottom", "left"]'
        :show-logo='true'
        :color-id='0'
			/>
    </section>
    <section class="widget-customize section">
      <div class="container">
        <h2 class='has-text-centered'>Place a widget on your blog or website</h2>
        <p class='has-text-centered'>Create your customized widget and we'll give you code to paste onto your website. It's as easy as that!</p>
        <widget-customizer 
          :widget-id='1'
        />
      </div>
    </section>
    <section class="section poor-kid-section widget-jumbotron">
			<counter-widget-jumbotron 
				:widget-id='1'
				:bg-image='require("../assets/img/images/poor-kid.jpg")'
				:widget-position='["bottom", "left"]'
        :color-id='1'
        :show-logo='true'
        :logo-position='"right"'
			/>
    </section>
    <section class="section">
        <h2 class='has-text-centered'>Create your own counter page to share</h2>
        <p class='has-text-centered'>Share the link with your networks and all donations made through it will go to a charity of your choice.</p>
        <counter-page-creator />
    </section>
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/CountersForThePoor/AppHeader.vue';
import AppBanner from '@/components/CountersForThePoor/AppBanner.vue';
import WidgetCustomizer from '@/components/CountersForThePoor/WidgetCustomizer'
import CounterWidgetJumbotron from '@/components/CountersForThePoor/CounterWidgetJumbotron'
import CounterPageCreator from '@/components/CountersForThePoor/CounterPageCreator'
import SharedFooter from '@/components/Shared/SharedFooter.vue';

export default {
  name: 'BaseLayout',

  components: {
    AppHeader,
    AppBanner,
		CounterWidgetJumbotron,
    WidgetCustomizer,
    SharedFooter,
    CounterPageCreator,
  },

  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    return {  
      title: 'Counters for the Poor - v3',
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

    .author {
      color: $color-dark-gray;
      font-size: 1.375rem;
      display: block;
      // font-style: normal;
    }
  }

  .img-container {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }
</style>

