<template>
	<div>
		<div
			class='user-info-wrap' 
			:ref='refName'
		>
			<div class="user-info-window">
				<h4 class="user-info-window__title">
					{{ `${user.firstName} ${user.lastName}` }}
				</h4>
				<img :src="user.picture" class='user-info-window__photo'>
				<a @click.stop.prevent='trackClicked' href='#' class='user-info-window__link'>{{ tracksActive ? 'Previous View' : 'See my tracks' }} </a>
				<router-link 
					class='user-info-window__link button is-primary is-small'
					:to='{ name: "user-profile", params: { userId: user.id } }'
				>
					View Profile
			</router-link>
				<button
					@click='closeButtonClicked' 
					class='user-info-window__close-button'
				>
					<i class='fas fa-times'></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default ( function(x) { return x.default })(require('./userPopupWindowImpl.js'))
</script>

<style scoped lang='scss'>
	.user-info-wrap {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -100%);
	}

	.user-info-window {
		min-height: 60px;
		min-width: 60px;
		max-width: 110px;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		padding: .625rem;
		font-size: .75rem;
		background-color: #fff;
		border-radius: 5px;
		font-family: inherit;
		align-items: center;
		text-align: center;
	}

	.user-info-window__title {
		font-size: .875rem;
		font-weight: 700;
		font-family: $font-primary;
    margin-bottom: .25rem;
    padding: 0 .25rem;
	}

	.user-info-window__photo {
		width: 80px;
		height: 80px;
		display: inline-block;
		margin-bottom: .25rem;
		object-fit: contain;
	}

	.user-info-window__link {
		display: inline-block;
		margin-bottom: .25rem;
	}

	.user-info-window__close-button {
		cursor: pointer;
		border: 0;
		padding: 0;
		background-color: transparent;
		position: absolute;
		top: .25em;
		right: .5em;
	}
</style>
