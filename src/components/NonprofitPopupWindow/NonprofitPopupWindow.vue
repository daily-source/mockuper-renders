<template>
<div>
	<div
		class='nonprofit-info-window-wrap' 
		:ref='refName'
	>
		<div class="nonprofit-info-window">	
			<h4 class="nonprofit-info-window__title">
				{{ nonprofit.name }}
			</h4>
      <p class='nonprofit-info-window__country'>
        ({{ nonprofit.country }})
      </p>
			<img :src="nonprofit.picture" class='nonprofit-info-window__photo'>
			<router-link 
				class='nonprofit-info-window__link button is-primary is-small'
				:to='{ name: "nonprofit-details", params: { nonprofitId: nonprofit.id } }'
			>
				View Profile
  		</router-link>
			<button
				@click='closeButtonClicked' 
				class='nonprofit-info-window__close-button'
			>
				<i class='fas fa-times'></i>
			</button>
		</div>
	</div>
</div>
</template>

<script>
	export default ( function(x) { return x.default })(require('./nonprofitPopupWindowImpl.js'))
</script>

<style scoped lang='scss'>
	.nonprofit-info-window-wrap {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -100%);
	}

	.nonprofit-info-window {
		min-height: 60px;
		min-width: 60px;
		max-width: 120px;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		padding: .25rem;
		font-size: .75rem;
		background-color: #fff;
		border-radius: 5px;
		font-family: inherit;
		align-items: center;
		text-align: center;
	}

	.nonprofit-info-window__title {
		font-size: .875rem;
		font-weight: 700;
		font-family: $font-primary;
    margin-bottom: .25rem;
    padding: 0 .25rem;
	}

	.nonprofit-info-window__photo {
		width: 95px;
		height: 95px;
		display: inline-block;
		margin-bottom: .25rem;
		object-fit: contain;
	}

	.nonprofit-info-window__link {
		display: inline-block;
		margin-bottom: .25rem;
	}

	.nonprofit-info-window__close-button {
		cursor: pointer;
		border: 0;
		padding: 0;
		background-color: transparent;
		position: absolute;
		top: .25em;
		right: .5em;
	}
</style>
