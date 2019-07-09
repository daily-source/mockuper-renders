<template>
	<div class='user-edit-form'>
    <div class="field user-edit-form__name-block user-profile__heading--underline is-flex">
      <label class='label is-sr-only' for='firstname'>First name:</label>
      <input class='input' type='text' id='firstname' v-model='form.firstName' placeholder='First name'>
      <label class='label is-sr-only' for='lastname'>Last name:</label>
      <input class='input' type='text' id='lastname' v-model='form.lastName' placeholder='Last name'>
    </div>
		<div class='field is-horizontal'>
			<div class='field-label'>
				<span class="label">Location:</span>
			</div>
			<div class='field-body user-edit-form__location-field'>
				<span class='user-edit-form__location'>{{ form.location }}</span>
				<user-choose-location-modal
					@placeChanged='onPlaceChange'
				/>
			</div>
		</div>
    <div class='field is-horizontal'>
			<div class='field-label'>
				<label class='label has-text-weight-bold' for='username'>Username:</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<input class='input' type='text' id='username' v-model='form.userName'>
					</div>
				</div>
			</div>
		</div>
		<div class='field is-horizontal'>
			<!-- <div class='field-label'>
				<label class='label' for='about'>About:</label>
			</div> -->
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<!-- <textarea id='about' class='textarea user-edit-form__textarea' v-model='form.about'></textarea> -->
				    <label class='label is-sr-only' for='about'>About:</label>
            <textarea-with-warning
              class='user-edit-form__textarea'             
              name='about'
              placeholder='Maximum of 500 characters '
              id='description'
              :max-length='aboutMaxLength'
              :warning-max-length='325'
              v-model='form.about'
              @invalid='(errors) => onFieldError("about", errors)'
              @warningChange='(warnings) => onFieldWarning("about", warnings)'
            />
            <div class="field-errors">
              <p 
                class='help has-text-success has-text-weight-bold'
                v-if='(errors.about && errors.about.maxLength) || (warnings.about && warnings.about.maxLength)'
              >
                Maximum {{ aboutMaxLength }} characters. Remaining: 
                <span
                  :class='{"has-text-danger": errors.about && errors.about.maxLength}'
                >
                  {{ aboutMaxLength - form.about.length }}
                </span>
              </p>
            </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

import UserChooseLocationModal from 'LocalComponents/User/UserChooseLocationModal'
import TextareaWithWarning from 'Components/input/TextareaWithWarning'

export default {
	name: 'UserEditDetails',

	components: {
    UserChooseLocationModal,
    TextareaWithWarning,
	},

	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	data () {
		return {
			form: {
				...this.user
      },
      aboutMaxLength: 350,
      errors: {},
      warnings: {},
		}
	},

	methods: {
		/**
		 * Event handler for whenever form data changes.
		 */
		onFormChange () {
			this.$emit('userDetailsChange', this.form)
    },
    
    onFieldError (field, errors) {
      this.errors[field] = errors
    },

		/**
		 * Event handler for whenever place changes.
		 * 
		 * @param {Object} place Geocode repsponce object from Google Maps
		 * @parma {Object} location LatLng object from Google Maps
		 */
		onPlaceChange (place, location) {
      console.log('Save Location')

      Vue.set(this.form, 'location', place.formatted_address)
      Vue.set(this.form, 'latitude', location.lat())
      Vue.set(this.form, 'longitude', location.lng())
    },
    

	},

	watch: {
		form: {
			handler: 'onFormChange',
			deep: true,
		},
	},
}
</script>

<style lang='scss' scoped>
.user-edit-form {
	&__location {
		display: inline-block;
		margin-right: .75em;
	}

	&__location-field {
		display: flex;
		align-items: center;
	}

  &__textarea {
    height: 192px;
  }

  .field-label {
    width: 100%;
    flex-basis: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;

    @media (min-width: 576px) {
      flex-basis: 100px;
      max-width: 100px;
      margin-right: 0;
    }

    @include tablet {
	    margin-left: .25em;
    }

		&--location {
			flex-basis: 0;
			max-width: 150px;
    }
    
    .label {
      font-weight: 700 !important;
      line-height: 1.4;
    }
  }

  &__name-block {
    .input {
      font-size: 1.2em;
      font-weight: 700;
      font-family: Montserrat !important;
      color: #000;

      &:not(:last-child) {
        margin-right: .25em;
      }
    }
  }
}
</style>
