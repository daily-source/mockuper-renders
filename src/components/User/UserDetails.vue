<template>
	<div class='user-details columns'>
		<div class='user-details__column user-details__profile-img-container column is-4'>
			<img
				class='user-details__profile-img'
				:src='user.picture' 
				alt='`${user.firstName} ${user.lastName}`'
			>
		</div>
		<div class='column'>
				<h4 class='has-text-weight-bold user-profile__heading user-profile__heading--underline'>User Details</h4>
				<div class='user-details__bio-wrapper'>
					<div class='user-bio is-flex'>
						<p class='user-bio__label has-text-weight-bold'>Username: </p>
						<p>{{ user.userName }}</p>
					</div>
					<div class='user-bio is-flex'>
						<p class='user-bio__label has-text-weight-bold'>First Name: </p>
						<p>{{ user.firstName }}</p>
					</div>
					<div class='user-bio is-flex'>
						<p class='user-bio__label has-text-weight-bold'>Last Name: </p>
						<p>{{ user.lastName }}</p>
					</div>
					<div class='user-bio is-flex'>
						<p class='user-bio__label has-text-weight-bold'>Location: </p>
						<p>{{ user.location }}</p>
					</div>
				</div>
				<router-link :to='{ name: "user-edit", params: { userId: user.id} }' class='button is-primary'>Edit Profile</router-link>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'UserDetails',
	
	props: {
		user: {
			type: Object,
			required: true,
		},
	}
}
</script>

<style lang='scss' scoped>
.user-details {
	&__profile-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__heading {
		&--underline {
			margin-bottom: .5em;
			padding-bottom: .5em;
			border-bottom: 1px solid #ddd;
		}
	}
}

.user-bio {
	margin-left: .25em;

	&__label {
		flex-basis: 30%;
		max-width: 30%;
		margin-left: .25em;
	}
}
</style>

