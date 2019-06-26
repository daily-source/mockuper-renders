<template>
	<div>
		<div
			class='station-info-wrap' 
			:ref='refName'
		>
			<div class="station-popup-info">
				<h4 class="station-popup-info__title">
					{{ `${ station.stationName || station.name }` }}
				</h4>
				<img :src="station.picture" class='station-popup-info__photo'>
				<router-link 
					class='station-popup-info__link button is-primary is-small'
					:to="{ name: 'stations-profile', params: { id: station.id } }"
				>
					View Profile
			</router-link>
				<button
					@click='closeButtonClicked' 
					class='station-popup-info__close-button'
				>
					<i class='fas fa-times'></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default ( function(x) { return x.default })(require('./stationPopupWindow.js'))
</script>

<style scoped lang='scss'>
	.station-info-wrap {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -100%);
	}

	.station-popup-info {
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

	.station-popup-info__title {
		font-size: .875rem;
		font-weight: 700;
		font-family: $font-primary;
    margin-bottom: .25rem;
    padding: 0 .25rem;
	}

	.station-popup-info__photo {
		width: 100%;
		display: inline-block;
		margin-bottom: .5rem;
		object-fit: cover;
    height: 110px;
	}

	.station-popup-info__link {
		display: inline-block;
		margin-bottom: .25rem;
	}

	.station-popup-info__close-button {
		cursor: pointer;
		border: 0;
		padding: 0;
		background-color: transparent;
		position: absolute;
		top: .25em;
		right: .5em;
	}
</style>
