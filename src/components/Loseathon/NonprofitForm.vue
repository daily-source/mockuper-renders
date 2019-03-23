<template>
<div class='loseathon-nonprofit-form'>
  <div class='container'>
    <h2 class='loseathon-nonprofit-form__heading has-text-weight-bold has-text-centered '>Change the world in 3 easy steps:</h2>
    <div class='loseathon-nonprofit-form__steps'>
      <div class='loseathon-nonprofit-form__icon-wrapper'>
        <img src='@/assets/img/images/check.png' alt='Select'>
      </div>
      <div class='loseathon-nonprofit-form__icon-wrapper'>
        <img src='@/assets/img/images/invite.png' alt='Invite'>
      </div>
      <div class='loseathon-nonprofit-form__icon-wrapper'>
        <img src='@/assets/img/images/act.png' alt='Act'>
      </div>
    </div>
    <div class='loseathon-nonprofit-form__form-wrapper'>
      <form @submit.stop.prevent='onFormSubmit' class='loseathon-nonprofit-form__form'>
        <div class='loseathon-nonprofit-form__field-group'>
          <div class='field is-horizontal loseathon-nonprofit-form__field'>
            <div class='field-label loseathon-nonprofit-form__field-label'>
              <label for='current-weight'>Current Weight: </label>
            </div>
            <div class='field-body  loseathon-nonprofit-form__field-body'>
              <div class='field'>
                <div class='control is-flex loseathon-nonprofit-form__weight-input-wrapper'>
                  <input 
                    type='number' 
                    class='input' 
                    id='current-weight'
                    v-model='form.currentWeight'
                    placeholder='Enter number'
                  >
                  pounds
                </div>
              </div> 
            </div>
          </div>
          <div class='field is-horizontal loseathon-nonprofit-form__field'>
            <div class='field-label loseathon-nonprofit-form__field-label'>
              <label for='goal-weight'>Goal Weight: </label>
            </div>
            <div class='field-body  loseathon-nonprofit-form__field-body'>
              <div class='field'>
                <div class='control is-flex loseathon-nonprofit-form__weight-input-wrapper'>
                  <input 
                    type='number' 
                    :class='["input", {"is-danger": form.errors.includes(goalErrorKey)}]' 
                    id='goal-weight'
                    v-model='form.goalWeight' 
                    placeholder='Enter number'
                  >
                  pounds
                </div>
                <small class='has-text-danger' v-if='form.errors.includes(goalErrorKey)'>The Goal Weight must be lower than the Current Weight. Please adjust your entry and submit it again.</small>
              </div> 
            </div>
          </div>
          <div class='field loseathon-nonprofit-form__field'>
            <p><span class='has-text-weight-bold'>Total Loss:</span> &nbsp; {{ totalLoss }} pounds</p>
          </div>
        </div>
        <div class='loseathon-nonprofit-form__field-group'>
          <p class='has-text-weight-bold'>Supporters will donate based on: </p>
          <div class='field loseathon-nonprofit-form__field'>
            <div class='field'>
              <div class='control'>
                <radio 
                  :id='"own-money"'
                  label='An amount per pound lost. '
                  :value='1'
                  @input:change='val => donationBasis = parseInt(val)'
                  :checked='donationBasis === 1'
                />
              </div>
              <small class='loseathon-nonprofit-form__info'>Donor selects amount and screen shows the total. Example: $1.5 per pound x 20 pounds = $30.</small>
            </div>
          </div>
          <div class='field loseathon-nonprofit-form__field'>
            <div class='field'>
              <div class='control'>
                <radio 
                  label='A total amount chosen by the donor.'
                  :value='2'
                  :id='"chosen-by-donor"'
                  @input:change='val => donationBasis = parseInt(val)'
                  :checked='donationBasis === 2'
                />
              </div>
            </div>
          </div>
          <div class='field is-horizontal loseathon-nonprofit-form__field'>
            <div class='field-label loseathon-nonprofit-form__field-label'>
              <label for='nonprofit-ajax-search'>Donations will go to: </label>
            </div>
            <div class='field-body loseathon-nonprofit-form__field-body'>
              <div class='field'>
                <div class='control'>
                  <nonprofit-ajax-search 
                    class='loseathon-nonprofit-form__nonprofit-ajax-search'
                    placeholder='Enter a nonprofit or a cause'
                    @selected='onNonprofitSelect'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='loseathon-nonprofit-form__field-group'>
          <div class='field loseathon-nonprofit-form__field loseathon-nonprofit-form__field--amount is-flex'>
            <div class='control'>
              <!-- <checkbox 
                id='own-money-checkbox'
                label='Own money.'
                :hidden-label='true'
                 @input:change='val => form.donateOwnMoney = val'
              /> -->
              <input type='checkbox' v-model='form.donateOwnMoney' />
            </div>
            <div class='loseathon-nonprofit-form__amount-wrapper'>
              I will donate $ <input type='number' :disabled='!form.donateOwnMoney' placeholder='Enter number' class='input loseathon-nonprofit-form__amount-input'> of my own money
            </div>
          </div>
          <div class='field loseathon-nonprofit-form__field loseathon-nonprofit-form__field--amount is-flex'>
            <div class='control'>
              <!-- <checkbox 
                id='food-money-checkbox'
                label='Food money.'
                :hidden-label='true'
              /> -->
              <input type='checkbox' v-model='form.donateFoodMoney' />
            </div>
            <div class='loseathon-nonprofit-form__amount-wrapper'>
              I will also donate the money I save on food: &nbsp; $
              <input :disabled='!form.donateFoodMoney' type='number' placeholder='Enter number' class='input loseathon-nonprofit-form__amount-input'>
            </div>
          </div>
        </div>
        <button type='submit' class='button is-primary'>Submit</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import Radio from 'Components/input/Radio'
import Checkbox from 'Components/input/Checkbox'
import NonprofitAjaxSearch from 'Components/general/NonprofitAjaxSearch'

const GOAL_EXCEEDS_CURRENT_WEIGHT = 'goalExceedsCurrentWeight'

export default {
  name: 'NonprofitForm',

  components: {
    Radio,
    Checkbox,
    NonprofitAjaxSearch,
  },

  data () {
    return {
      form: {
          currentWeight: null,
          goalWeight: null,
          nonprofit: null,
          donateOwnMoney: false,
          ownMoneyAmount: null,
          donateFoodMoney: false,
          foodMoneyAmount: null,
          errors: [],
      },
      donationBasis: 1,
      goalErrorKey: GOAL_EXCEEDS_CURRENT_WEIGHT,
    }
  },

  methods: {
    /**
     * Triggers when a `nonprofit` is selected on the NonprofitAjaxSearch component
     */
    onNonprofitSelect (val) {
      this.form.nonprofit = val
    },

    /**
     * Triggers when form is submitted.
     */
    onFormSubmit () {
      this.form.errors = []

      if (this.form.goalWeight > this.form.currentWeight) {
        this.form.errors.push(this.goalErrorKey)

        return
      }
    },
  },

  computed: {
    /**
     * The total number of pounds lost.
     */
    totalLoss () {
      const total = this.form.currentWeight - this.form.goalWeight

      if (total > 0) {
        return total
      }

      return 0
    },
  }, 
}
</script>

<style lang="scss" scoped>
.loseathon-nonprofit-form {
  padding-top: 2em;
  padding-bottom: 2em;

  &__steps {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-left: -1em;
    margin-right: -1em;

    img {
      max-width: 180px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }

  &__icon-wrapper {
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 1em;
    padding-right: 1em;
    max-width: 270px;
  }

  &__form-wrapper {
    max-width: 800px;
    margin: 1em auto;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  &__field {
    align-items: center;
    margin-bottom: 1.5em;

    &:last-child {
      margin-bottom: 0;
    }

    p {
      margin-bottom: 0;
    }
  }

  &__field-label {
    flex-basis: 25%;
    text-align: left;
    font-weight: 700;
    font-size: 20px;
  }

  &__field-body {
    flex-basis: 58.3333%;
  }

  &__field-group {
    padding-top: 1.25em;
    padding-bottom: 1.25em;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-left: -.5em;
    margin-right: -.5em;
    padding-left: .5em;
    padding-right: .5em;

    &:last-of-type {
      border-bottom: 0;
    }
  }

  &__info {
    display: block;
    margin-top: .5em;
  }

  &__nonprofit-ajax-search {
    padding: 0;
  }

  &__amount-wrapper {
    margin-left: 1em;
    display: flex;
    align-items: center;
  }

  &__amount-input {
    max-width: 33%;
    margin-left: .5em;
    margin-right: .5em;
  }

  &__weight-input-wrapper {
    align-items: center;

    input {
      max-width: 75%;
      margin-right: .5em;
    }
  }
}
</style>
