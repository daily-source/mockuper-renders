<template>
	<div class="layout-base">
		<alert-bar />
		<app-header />
		<app-banner
			:widget-id='widget.id'		
		/>
    <section class="widget-customize section">
      <div class="container">
        <h2 class='has-text-centered'>Place a widget on your blog or website</h2>
        <p class='has-text-centered'>Once you create your customized widget you'll be provided with code to simply paste onto your website. It's as easy as that!</p>
        <widget-customizer 
          :widget-id='widget.id'
        />
      </div>
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
import { mapState } from 'vuex'

import AlertBar from '@/components/CountersForThePoor/AlertBar'
import AppHeader from '@/components/CountersForThePoor/AppHeader'
import AppBanner from '@/components/CountersForThePoor/AppBanner'
import WidgetCustomizer from '@/components/CountersForThePoor/WidgetCustomizer'
import CounterPageCreator from '@/components/CountersForThePoor/CounterPageCreator'
import SharedFooter from '@/components/Shared/SharedFooter'

export default {
	name: 'CounterCustomPage',

	components: {
		AlertBar,
		AppBanner,
		AppHeader,
		SharedFooter,
		WidgetCustomizer,
		CounterPageCreator,
	},

  computed: {
    id () {
      return this.$route.params.id
    },

    title () { 
      if (this.widget.title) {
        return this.widget.title
      } else if (this.counter) {
        return this.counter.title
      }

      return ''
    },

    ...mapState({
      page (state) {
				return state.counterwidgets.pages.find(page => page.id === parseInt(this.id))
			},

      widget (state) {
        return state.counterwidgets.widgets.find(widget => widget.id === parseInt(this.page.widgetId))
      },

			counter (state) {
				return state.counterwidgets.counters.find(counter => counter.id === parseInt(this.widget.counterId))
			},
    })
  },

  metaInfo() {
    if (!this.widget) return {}

    const description = this.widget.message
    const title = `${this.title} | Counters for the Poor`

    return {
      title,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', property: 'og:description', content: description },
      ]
    }
  } 
}
</script>

<style lang='scss' scoped>
.intro {
	background-color: $secondary;
	color: #fff;
	padding-top: 1em;
	padding-bottom: 1em;
	padding-left: 1.5em;
	padding-right: 1.5em;

	&__text {
		margin-bottom: 0;
		max-width: 70%;
		margin-left: auto;
		margin-right: auto;
	}

	&__text--link {
		color: $primary;
		text-decoration: underline;
	}
}
</style>
