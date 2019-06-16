<template>
	<div class='user-edit-form'>
		<div class='field is-horizontal'>
			<div class='field-label'>
				<label for='firstname'>First name:</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<input class='input' type='text' id='firstname' v-model='form.firstName'>
					</div>
				</div>
			</div>
		</div>
		<div class='field is-horizontal'>
			<div class='field-label'>
				<label for='lastname'>Last name:</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<input class='input' type='text' id='lastname' v-model='form.lastName'>
					</div>
				</div>
			</div>
		</div>
		<div class='field is-horizontal'>
			<div class='field-label'>
				Location:
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
				<label for='about'>About:</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<!-- <textarea id='about' class='textarea user-edit-form__textarea' v-model='form.about'></textarea> -->
            <textarea-with-warning
              id='about' 
              class='user-edit-form__textarea' 
              v-model='form.about'
              :max-length='descriptionMaxLength'
              @invalid='(errors) => onFieldError("about", errors)'
            />
            <div class="field-errors">
              <p 
                class='help has-text-danger has-text-weight-bold'
                v-if='errors.about && errors.about.maxLength'
              >
                * Description cannot exceed {{ descriptionMaxLength }} characters. Description currently exceeds {{ form.about.length - descriptionMaxLength }} character(s).
              </p>
            </div>
					</div>
				</div>
			</div>
		</div>
    <div class='field is-horizontal'>
			<div class='field-label'>
				<label for='username'>Username:</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<input class='input' type='text' id='username' v-model='form.userName'>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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
      descriptionMaxLength: 350,
      errors: {}
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
			this.form.location = place.formatted_address
			this.form.latitude = location.lat()
			this.form.longitude = location.lng()
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
		margin-right: .5em;
	}

	&__location-field {
		display: flex;
		align-items: center;
	}

  &__textarea {
    height: 215px;
  }
}
</style>
