<template>
	<div class='user-details columns'>
		<div class='user-details__column user-details__profile-img-container column is-4'>
			<img
				class='user-details__profile-img'
				:src='user.picture' 
				:alt='`${user.firstName} ${user.lastName}`'
			>
			<router-link :to='{ name: "user-edit", params: { userId: user.id} }' class='button is-primary'>Edit Profile</router-link>
		</div>
		<div class='user-details__user-info-container column'>
				<div class='user-bio is-flex user-details__heading'>
					<h4 class='has-text-weight-bold user-profile__heading'>{{ `${user.firstName} ${user.lastName}`}}</h4>
				<p class='is-marginless'>{{ user.location }}</p>
				</div>
				<div class='user-details__bio-wrapper'>
					<div class='user-bio is-flex'>
						<p class='user-bio__label has-text-weight-bold'>Username: </p>
						<p>{{ user.userName }}</p>
					</div>
					<div class='user-bio'>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius egestas tincidunt. Vivamus lacinia, elit quis pulvinar posuere.
						</p>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { gmapApi } from 'vue2-google-maps'

import Icon from 'Components/general/Icons'

export default {
	name: 'UserDetails',

	components: {
		Icon,
	},

	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	computed: {
		google: gmapApi,

		geocoder () {
			return new this.google.maps.Geocoder
		}
	},
}
</script>

<style lang='scss' scoped>
.user-details {
	&__profile-img {
		width: 100%;
		object-fit: cover;
		display: block;
		margin-bottom: 1em;
		margin-top: -160px;
	}

	&__heading {
		&--underline {
			margin-bottom: .5em;
			padding-bottom: .5em;
			border-bottom: 1px solid #ddd;
		}
	}

	&__heading {
		border-bottom: 1px solid #ddd;
		align-items: center;
		margin-bottom: 1em;

		h4 {
			margin-right: 1em;
			margin-bottom: 0;
			padding-bottom: 0;
		}
	}
}

.user-bio {
	margin-left: .25em;

	&__label {
		flex-basis: 30%;
		max-width: 30%;
		margin-left: .25em;

		&--location {
			flex-basis: 0;
			max-width: 150px;
		}
	}
}
</style>

