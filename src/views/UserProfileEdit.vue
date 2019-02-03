<template>
	<div class='user-edit'>
    <intro-video />
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
import IntroVideo from 'LocalComponents/IntroVideo'
import UserEditForm from 'LocalComponents/User/Edit/UserEditForm'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
	name: 'UserEdit',

	components: {
		AppHeader,
		IntroVideo,
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

	metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: `${this.user.firstName} ${this.user.lastName} - Edit | Virtual Railroad`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>
