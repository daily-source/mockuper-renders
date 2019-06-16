<template>
	<div class='user-details columns'>
		<div class='user-details__column user-details__profile-img-container column'>
			<img
				class='user-details__profile-img'
				:src='user.picture' 
				alt='`${user.firstName} ${user.lastName}`'
			>
			<router-link :to='{ name: "user-edit", params: { userId: user.id} }' class='button is-primary'>Edit Profile</router-link>
		</div>
		<div class='column user-details__details-column'>
				<h4 class='has-text-weight-bold user-profile__heading user-profile__heading--underline'>{{ user.firstName }} {{user.lastName }} </h4>
				<div class='user-details__bio-wrapper'>
					<div class='user-bio is-flex'>
						<p class='user-bio__label has-text-weight-bold'>
							Location:
						</p>
						<p>{{ user.location }}</p>
					</div>
          <div class='user-bio is-flex'>
						<p class='user-bio__label has-text-weight-bold'>Username: </p>
						<p>{{ user.userName }}</p>
					</div>
					<div class='user-bio'>
						<p>
							{{ user.about }}
						</p>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

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
	}
}
</script>

<style lang='scss' scoped>
.user-details {
  justify-content: flex-start;
  
  &__profile-img-container {
    max-width: 195px;
    flex-basis: 195px;
    flex-shrink: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    @include desktop {
      margin-left: 0;
      margin-right: 0;
      text-align: left;
    }
  }

	&__profile-img {
		width: 100%;
		object-fit: cover;
		display: block;
		margin-bottom: 1em;
	}

	&__heading {
		&--underline {
			margin-bottom: .5em;
			padding-bottom: .5em;
			border-bottom: 1px solid #ddd;
		}
  }
  
  &__details-column {
    flex-basis: 75%;

    @include desktop {
      max-width: 720px;
      flex-basis: 0;
    }
  }
}

.user-bio {
	margin-left: .25em;

	&__label {
    margin-left: .25em;
    
    @include fullhd {
      flex-basis: 18%;
      max-width: 18%;
    }

		&--location {
			flex-basis: 0;
			max-width: 150px;
		}
	}
}
</style>

