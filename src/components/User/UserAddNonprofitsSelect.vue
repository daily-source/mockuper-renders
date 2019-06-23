<template>
  <div 
    :class='[
      "user-add-supported-nonprofits-select", 
      {"user-add-supported-nonprofits-select--no-action": !showActionButtons}
    ]'
  >
    <select-nonprofits 
      v-bind='attrs'
      :exclude='exclude'
      class='user-add-supported-nonprofits-select__input'
      @nonprofitChange='onNonprofitChange'
      @locationChange='onSelectNonprofitLocationChange'
      @moreInfoClicked='showInfoModal'
      :value='value'
      ref='nonprofitsSelect'
    />
    <div 
      class='user-add-supported-nonprofits-select__actions'
      v-if='showActionButtons'
    >
      <button 
        class='user-add-supported-nonprofits-select__remove button is-small is-round is-danger'
        @click.prevent.stop='onRemoveButtonClicked'
      >
        <Icon 
          icon='minus'
          :iconwidth='10'
          :iconheight='10'
          color='#fff'
        />
      </button>
    </div>
    <modal
      :state='infoModalShown'
      @modal:close='hideInfoModal'
    >
      <div class='modal__content' slot='content'>
        <p>If a nonprofit you support doesn’t allow donors to specify which region your donations go to, it’s fine to pick the region that has most inspired you to help that nonprofit. For example, if a nonprofit has locations in Kenya, India and Cambodia, and you’re most interested in helping slaves in India, then choose India.</p>
      </div>
    </modal>
  </div>
</template>

<script>
import SelectNonprofits from 'LocalComponents/Form/SelectNonprofits'
import Icon from 'Components/general/Icons'

import Modal from 'Components/general/Modal'

export default {
  name: 'UserAddNonprofitsSelect',

  inheritAttrs: false,
 
  components: {
    SelectNonprofits,
    Icon,
    Modal,
  },

  props: {
    exclude: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },

    value: {
      type: Number,
      required: false,
      default: 0,
    },

    showActionButtons: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data () {
    return {
      nonprofit: this.value,
      infoModalShown: false,
    }
  },

  methods: {
    /**
     * Handles when the remove button is clicked
     */
    onRemoveButtonClicked () {
      this.$emit('removeButtonClicked')
    },

    /**
     * Handles location changes on the `select-nonprofit` component
     */
    onSelectNonprofitLocationChange (locationPair, selectedNonprofit, selectedLocations) {
      this.$emit('locationChange', locationPair, selectedNonprofit, selectedLocations)
    },

    /**
     * Hanles nonprofit changes
     */
    onNonprofitChange (nonprofit) {
      this.$emit('nonprofitChange', nonprofit)
    },

    /**
     * Shows the Info Modal
     */
    showInfoModal () {
      this.infoModalShown = true
    },

    /**
     * Hides the info modal
     */
    hideInfoModal () {
      this.infoModalShown = false
    },

    /**
     * Resets the select value
     */
    resetSelectValue () {
      this.$refs.nonprofitsSelect.nonprofit = 0
    },
  },

  computed: {
    /** 
		 * The attirubutes to inherit
		 */
    attrs () {
			const { id } = this.$attrs

			return {
				id,
			}
		},
  },

  watch: {
    nonprofit() {
      this.$emit('input', this.nonprofit)
    },
  },
}
</script>

<style lang="scss" scoped>
.user-add-supported-nonprofits-select {
  $self: &;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__input {
    max-width: 90%;
    flex-grow: 1,
  }

  &__remove {
  	border-radius: 100%;
		width: 1rem;
		height: 1rem;
		padding: 0 !important;

		.icon-wrapper {
			display: flex;
			align-items: center;
		}
  }

  &--no-action {
    #{ $self }__input {
      max-width: 100%;
    }
  }
}
</style>

