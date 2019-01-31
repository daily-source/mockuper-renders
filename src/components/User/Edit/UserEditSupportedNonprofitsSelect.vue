<template>
  <div 
    :class='[
      "user-edit-supported-nonprofits-select", 
      {"user-edit-supported-nonprofits-select--no-action": !showActionButtons}
    ]'
  >
    <select-nonprofits 
      v-bind='attrs'
      :exclude='exclude'
      class='user-edit-supported-nonprofits-select__input'
      @locationChange='onSelectNonprofitLocationChange'
    />
    <div 
      class='user-edit-supported-nonprofits-select__actions'
      v-if='showActionButtons'
    >
      <button 
        class='user-edit-supported-nonprofits-select__remove button is-small is-round is-danger'
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
  </div>
</template>

<script>
import SelectNonprofits from 'LocalComponents/Form/SelectNonprofits'
import Icon from 'Components/general/Icons'

export default {
  name: 'UserEditSupportedNonprofitsSelect',

  inheritAttrs: false,
 
  components: {
    SelectNonprofits,
    Icon,
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
.user-edit-supported-nonprofits-select {
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

