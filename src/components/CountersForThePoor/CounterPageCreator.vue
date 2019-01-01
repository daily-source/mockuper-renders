<template>
    <div class="counter-page-creator">
      <form @submit.prevent='createPage'>
        <div class="columns counter-page-creator__columns">
          <div class="column is-7">
            Choose a non-profit for your widget to donate towards:
          </div>
          <nonprofit-ajax-search 
            placeholder='Search...'
            v-model='widget.nonprofit'
          />
        </div>
        <div class="columns counter-page-creator__columns">
          <div class="column is-7">
            Customize your title:
          </div>
          <div class="column">
            <div class="select">
              <select 
                name="title"   
                class="select is-block"
                v-model='widget.counterId'
              >
                <option 
                  v-for='(counter, index) in counters' 
                  :key='index' 
                  :value='counter.id'
                >
                  {{ counter.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="counter-page-creator__ft-img-chooser">
          <featured-image-chooser 
            :images='counters[widget.counterId].imgPreviews'
						 @change='handleSliderChange'
          />
        </div>
        <div class="btn-container has-text-right counter-page-creator__columns">
          <button type='submit' class='button is-primary has-text-weight-bold is-uppercase is-large'>
            Create
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import imageSrc from '@/util/imageSrc'
import NonprofitAjaxSearch from '@/components/general/NonprofitAjaxSearch'

import FeaturedImageChooser from '@/components/CountersForThePoor/FeaturedImageChooser'
import Flickity from '@/components/plugins/Flickity'

export default {
  name: 'CounterPageCreator',

  components: {
    NonprofitAjaxSearch,
    FeaturedImageChooser,
    Flickity,
  },

  mixins: [imageSrc],

  data () {
    return {
      widget: {
        nonprofit: '',
        featuredImg: 0,
        counterId: 1,
      },
    }
  },

  methods: {
    async createPage () {
      const widget = await this.addWidget(this.widget)

      this.$router.push({ name: 'page', params: { id: widget.id } })
    },

		handleSliderChange (index) {
			this.widget.featuredImg = index
		},

    ...mapActions({
      addWidget: 'counterwidgets/addWidget'
    }),
  },

  computed: {
    ...mapState({
      counters: state => state.counterwidgets.counters
    })
  }
}
</script>

<style scoped lang="scss">
  .counter-page-creator {
    margin-top: 2rem;
  }

  .counter-page-creator__columns {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
  }

  .counter-page-creator__img {
    width: 100%;
    cursor: pointer;
    filter: brightness(.7);
    border-radius: 4px;
    transition: filter .2s ease;

    &--selected,
    &:hover {
      filter: brightness(1);
    }
  }

	.btn-container {
		margin-top: 1em;
	}
</style>
