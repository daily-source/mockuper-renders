<template>
	<div class='user-edit'>
		<app-header />
		<section class='section'>
			<div class='container'>
				<user-edit-form 
					 :user='user'
				/>
			</div>
		</section>
		<shared-footer />
	</div>
</template>

<script>
import { mapState } from 'vuex' 

import AppHeader from 'LocalComponents/AppHeader'
import UserEditForm from 'LocalComponents/User/Edit/UserEditForm'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
	name: 'UserEdit',

	components: {
		AppHeader,
		UserEditForm,
		SharedFooter,
	},

	computed: {
		userId () {
			return this.$route.params.userId
		},

		...mapState({
			user (state) {
				return state.users.data.find(user => user.id == this.userId)
			},
		}),
	},
}
</script>
