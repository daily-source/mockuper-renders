<template>
  <div :class="`version_${version}`">
    <section id="choices" class="py-4" >
      <div class="container">
        <h3 class="text-center text-primary">Pick what to give up or use less of:</h3>
        <p class="text-center"></p>
        <div class="choices__input-container py-3">
          <div class="row" v-if="choices && choices.length > 0">
            <div class="col-md-3" v-for="(choice, index) in choices" :key="index" v-if="displayCheckbox(index)">
              <choice-checkbox 
                :choice="choice" 
                @choiceChanged="inputHandler"
                v-if="!choice.customChoice"
              />
              <custom-choice 
                :index="`custom-choice-${index}`"
                v-else
              />
            </div>
          </div>
        </div>
        <div class="expand-container text-right">
          <a href="#" @click.stop.prevent="toggleExpanded"> {{ expand ? 'Show less ideas' : 'Show more ideas' }} </a>
        </div>
        <div class="btn-container text-center">
          <button class="btn btn-lg btn-primary text-uppercase" @click="showNext" v-if="version">Next: choose how much</button>
          <button class="btn btn-lg btn-primary text-uppercase" @click="showNext" v-else>Next: choose how long</button>
          <p class="text-danger d-block mt-3" v-if="showError">*You must choose at least one item before you can do the next step. To choose an item, click the checkbox to the left of the item</p>
        </div>
      </div>
    </section>
    <section id="how-much" class="py-4" v-if="nextStep">
      <div class="container">
        <p>You can add another item by checking off its box above. You can remove an item by unchecking it.</p>
        <how-much-input 
          v-for="(input, index) in selected" 
          :key="index"
          :input="input"
          @inputChanged="computeTotal"
        />
        <div class="total-container text-primary">
          <div class="total-rate-container d-flex align-items-center mb-2">
            Do this for
            <input 
              v-model="totalInput"
              type="number" 
              class="form-control total-number-input" 
            >
            <select 
              v-model="totalRate"
              class="custom-selectx form-control total-select-input" 
            >
              <option value="day">days</option>
              <option value="week">weeks</option>
              <option value="month" selected>months</option>
              <option value="year">years</option>
            </select>
          </div>
          <div class="total-raised-container my-3">
            You will raise:
            <span class="total text-success align-middle">
              {{ (total ? total : 0) | currencyFormat }}
            </span>
          </div>
          <div class="nonprofit-select-container d-flex align-items-center">
            The money will go to: 
            <div class="form-group mb-0" v-if="version != 2">
              <label for="nonprofit" class="sr-only">Nonprofit</label>
              <nonprofit-ajax-search 
                :standalone="true"
                v-if="canRender"
              />
            </div>
            <span v-else>
              <span class="nonprofit-name text-success" v-html="nonprofitName"></span>
            </span>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <button class="btn btn-primary btn-lg">Continue</button>
      </div>
    </section>
  </div>
</template>

<script>
import ChoiceCheckbox from '@/components/GiveItUp/ChoiceCheckbox.vue'
import HowMuchInput from '@/components/GiveItUp/HowMuchInput.vue'
import CustomChoice from '@/components/GiveItUp/CustomChoice.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',

  components: {
    ChoiceCheckbox,
    HowMuchInput,
    CustomChoice,
    NonprofitAjaxSearch: () => import('@/components/GiveItUp/NonprofitAjaxSearch.vue'),
  },

  data() {
    return {
      canRender: false,
      nextStep: false,
      total: null,
      totalInput: null,
      totalRate: 'month',
      customChoiceNum: 3,
      itemsToShow: 13,
      showError: false,
    }
  },

  computed: {
    ...mapState({
      choices (state) {
        if (!state.selections) {
          return
        }
        // Store choice for later use
        const choices = state.selections.data
        let ctr = 0

        // We make a new array that has the length of the selections plus the defined custom choices.
        // Map the newly created Array and then check if the index is on the range of itemsToShow
        // If it is, return an object with customChoice set to true,
        // else, return the choice at the ctr-th element.
        const newChoices = Array(choices.length + this.customChoiceNum).fill().map((_, i) => {
          if (i >= (this.itemsToShow) && i <= (this.customChoiceNum + this.itemsToShow -1)) {
            _ = { customChoice: true }
          } else {
            _ = choices[ctr]
            ctr++
          }
          
          return _
        })

        return newChoices
      },
      expand: state => state.selections ? state.selections.expanded : {},
      selected: state=> state.selections ? state.selections.selected : {}
    }),
    version () {
      return this.$route.query.version
    },
    nonprofitName () {
      return this.$store.state.nonprofit.data.name || this.$store.state.nonprofit.NAME
    }

  },

  mounted () {
    this.canRender = true
  },

  methods: {
    computeTotal () {
      let multiplier

      // Calculate the total by array.reduce
      let total = this.selected.reduce((previous, current) => {
        return previous + ( current.perMonthValue ? current.perMonthValue : 0 )
      }, 0)

      // Calculate the multiplier according to "rate" seleced
      switch(this.totalRate) {
        case 'week':
          multiplier = this.totalInput / 4
          break
        case 'day':
          multiplier = this.totalInput / 3
          break
        case 'year':
          multiplier = this.totalInput * 12
          break
        
        default:
          multiplier = this.totalInput
      }

      this.total = total * multiplier
    },

    displayCheckbox(index) {
      return this.expand ? true : index < this.itemsToShow + this.customChoiceNum
    },

    inputHandler ({checked, choice, customLabel}) {
      if (checked) {
        return this.addSelected({ choice, customLabel })
      }

      return this.removeSelected({ choice })
    },

    customChoiceClickedHandler (choice) {
      if(!choice.label) {
        choice.selected = false
        return
      }

      choice.selected = !choice.selected
    },  

    showNext () {
      if (this.selected.length <= 0) {
        this.showError = true
        return
      } 

      this.showError = false
      this.nextStep = true

      // Smoothscroll on next tick to make sure the how-much section is loaded before we scroll
      var that = this
      this.$nextTick(() => {
        that.smoothScroll('choices')
      })

    },

    ...mapActions({
      toggleExpanded: 'selections/toggleExpanded',
      addSelected: 'selections/pushSelected',
      removeSelected: 'selections/removeSelected'
    }),
  },

  watch: {
    totalInput() {
      this.computeTotal()
    },

    totalRate() {
      this.computeTotal()
    },

  },
}
</script>

<style lang="scss" scoped>
  .total-number-input,
  .total-select-input {
    max-width: 120px;
    margin-right: 5px;
    margin-left: 10px;
  }

  .total-container {
    font-size: 1.5rem;
    font-weight: 900;
    font-family: 'Montserrat';
    padding-top: 1.5rem;
    border-top: 1px solid #ddd;
  }

  .total {
    font-size: 2.025rem;
    margin-left: 5px;
    margin-right: 5px;
  }

  .nonprofit-name {
    font-size: 2.625rem;
    margin-left: 10px;
    margin-right: 5px;
  }

  #choices h3 {
    font-family: "Poppins";
    font-weight: 700;
    font-size: 2rem;
    margin-left: -2px;

    span {
      font-size: 0.933em;
    }
  }

  #nonprofit {
    width: 270px;
    margin-left: 8px;
    margin-right: 8px;
  }
  .row {
    margin-right: 0;
    margin-left: 0;
  }

  .version_2 {
    .mb-2 {
      margin-bottom: 2rem !important;
    }
  }
</style>

