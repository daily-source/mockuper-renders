<template>
	<div class='user-edit-form'>
		<div class='field is-horizontal'>
			<div class='field-label'>
				<label for='username'>Username</label>
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
			<div class='field-label'>
				<label for='firstname'>Firstname</label>
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
				<label for='lastname'>Lastname</label>
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
						<textarea id='about' class='textarea' v-model='form.about'></textarea>
					</div>
				</div>
			</div>
		</div>
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
				lastName: this.user.lastName,
				location: this.user.location,
				latitude: this.user.latitude,
				longitude: this.user.longitude,
				about: this.user.about,
			}
		}
	},

	methods: {
		/**
		 * Event handler for whenever form data changes.
		 */
		onFormChange () {
			this.$emit('userDetailsChange', this.form)
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
