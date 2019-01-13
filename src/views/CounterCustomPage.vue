<template>
	<div class="layout-base">
		<alert-bar />
    <counter-widget-jumbotron 
      :widget-id='widget.id'
      :show-logo='true'
      :color-id='theme.colorId'
      :logo-position='theme.logoPosition'
      :bg-image='backgroundImage'
      :widget-position='["bottom", "left"]'
    />
    <user-info 
      :widget-id='widget.id'
      v-if='id == 2'
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
import imageSrc from '@/util/imageSrc'

import AlertBar from '@/components/CountersForThePoor/AlertBar'
import CounterWidgetJumbotron from '@/components/CountersForThePoor/CounterWidgetJumbotron'
import UserInfo from '@/components/CountersForThePoor/UserInfo'
import WidgetCustomizer from '@/components/CountersForThePoor/WidgetCustomizer'
import CounterPageCreator from '@/components/CountersForThePoor/CounterPageCreator'
import SharedFooter from '@/components/Shared/SharedFooter'

export default {
  name: 'CounterCustomPage',
  
  mixins: [imageSrc],

	components: {
    AlertBar,
    CounterWidgetJumbotron,
    UserInfo,
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

    theme () {
      return this.counter.themes[this.widget.themeId]
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

      backgroundImage (state) {
        const img = state.counterwidgets.backgroundImages[this.theme.backgroundImageId]

        if (img) {
          return this.getImageSrc(`widget-imgs/${img}`)
        }

        return null
      }
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

.banner {
  margin-bottom: 0;
}
</style>
