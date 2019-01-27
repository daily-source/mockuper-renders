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
				:bg-image='require("../assets/img/images/widget-imgs/mlk.jpg")'
				:widget-position='["top", "left"]'
        class='mlk-banner'
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
				:bg-image='require("@/assets/img/images/widget-imgs/poor-kid-v1.jpg")'
				:widget-position='["center-y", "left"]'
			/>
    </section>
    <section class="section counter-page-creator-section">
        <h2 class='has-text-centered'>Create your own counter page to share</h2>
        <p class='has-text-centered'>Share the link with your networks and all donations made through it will go to a charity of your choice.</p>
        <counter-page-creator />
    </section>
		<shared-footer />
  </div>
</template>

<script>
import AppHeader from 'Components/CountersForThePoor/AppHeader'
import AppBanner from 'Components/CountersForThePoor/AppBanner'
import CounterWidgetJumbotron from 'Components/CountersForThePoor/CounterWidgetJumbotron'
import WidgetCustomizer from 'Components/CountersForThePoor/WidgetCustomizer'
import CounterPageCreator from 'Components/CountersForThePoor/CounterPageCreator'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'BaseLayout',

  components: {
		AppHeader,
    AppBanner,
		CounterWidgetJumbotron,
		WidgetCustomizer,
		CounterPageCreator,
    SharedFooter,
  },

  metaInfo() {
    const description = 'Every lives count.';
    const title = '';
    return {
      title: 'Counters for the Poor -v2',
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

	.widget-customize {
		padding-top: 0;
		padding-bottom: 0;
		
		.widget-customizer {
			margin-top: 1.75rem;
		}
	}

	.counter-page-creator-section {
		padding-top: 0;
		padding-bottom: 0;
	}
</style>

