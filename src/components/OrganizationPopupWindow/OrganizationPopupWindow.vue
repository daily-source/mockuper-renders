<template>
	<div>
		<div
			class='organization-info-wrap' 
			:ref='refName'
		>
			<div class="organization-info-window">
				<h4 class="organization-info-window__title">
					{{ `${organization.name}` }}
				</h4>
				<img :src="organization.mainImage" class='organization-info-window__photo'>
				<router-link 
					class='organization-info-window__link button is-primary is-small'
					to='#'
				>
					View Profile
			</router-link>
				<button
					@click='closeButtonClicked' 
					class='organization-info-window__close-button'
				>
					<i class='fas fa-times'></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default ( function(x) { return x.default })(require('./organizationPopupWindow.js'))
</script>

<style scoped lang='scss'>
	.organization-info-wrap {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -100%);
	}

	.organization-info-window {
		min-height: 60px;
		min-width: 60px;
		max-width: 220px;
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

	.organization-info-window__title {
		font-size: .875rem;
		font-weight: 700;
		font-family: $font-primary;
    margin-bottom: .25rem;
    padding: 0 .25rem;
	}

	.organization-info-window__photo {
		width: 100%;
		display: inline-block;
		margin-bottom: .5rem;
		object-fit: contain;
	}

	.organization-info-window__link {
		display: inline-block;
		margin-bottom: .25rem;
	}

	.organization-info-window__close-button {
		cursor: pointer;
		border: 0;
		padding: 0;
		background-color: transparent;
		position: absolute;
		top: .25em;
		right: .5em;
	}
</style>
