<template>
	<div class='user-edit-form'>
		<div class='field is-horizontal'>
			<div class='field-label'>
				<label for='username'>Username</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<input class='input' type='text' id='username' v-model='user.userName'>
					</div>
				</div>
			</div>
		</div>
		<div class='field is-horizontal'>
			<div class='field-label'>
				<label for='firstname'>Firstname</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<input class='input' type='text' id='firstname' v-model='user.firstName'>
					</div>
				</div>
			</div>
		</div>
		<div class='field is-horizontal'>
			<div class='field-label'>
				<label for='lastname'>Lastname</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<input class='input' type='text' id='lastname' v-model='user.lastName'>
					</div>
				</div>
			</div>
		</div>
		<div class='field is-horizontal'>
			<div class='field-label'>
				Location:
			</div>
			<div class='field-body'>
				{{ user.location }}
			</div>
		</div>
		<div class='field is-horizontal'>
			<div class='field-label'>
				<label class='label' for='about'>About:</label>
			</div>
			<div class='field-body'>
				<div class='field'>
					<div class='control'>
						<textarea id='about' class='textarea' v-model='user.about'></textarea>
					</div>
				</div>
			</div>
		</div>
		<button class='button is-primary'>Save Profile</button>
	</div>
</template>

<script>
export default {
	name: 'UserEditDetails',

	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	data () {
		return {
			form: {
				userName: this.user.userName,
				firstName: this.user.firstName,
				lastname: this.user.lastName,
				location: this.user.location,
				latitude: this.user.latitude,
				longitude: this.user.longitude,
				about: this.user.about,
			}
		}
	},

	watch: {
		/**
		 * Emits userDetailsChange event when form data is changed
		 */
		form () {
			this.emit('userDetailsChange', this.form)
		},
	},
}
</script>
