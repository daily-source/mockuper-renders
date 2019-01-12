<template>
	<div :class='["counter-widget-jumbotron",  { "counter-widget-jumbotron--no-img": !bgImage }]'>
		<div 
			:class='["counter-widget-jumbotron__logo-container", logoPositionClass]' 
			v-if='showLogo'
		>
			<img :src='logo' alt='Counters for the Poor Logo'>
		</div>
		<div 
			:class='["counter-widget-jumbotron__widget", ...widgetPosition]'
		>
			<counter-widget 
				:id='widgetId'
				:class='`counter-widget--${color}`'
			/>
		</div>
		<div class='counter-widget-jumbotron__img-container'>
			<img :src='bgImage' class='counter-widget-jumbotron__img' alt='Counter Widget Banner Image' v-if='bgImage'>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import { difference } from 'lodash'
import CounterWidget from '@/components/CountersForThePoor/CounterWidget'

export default {
	name: 'CounterWidgetJumbotron',

	components: {
		CounterWidget,
	},

	props: {
		widgetId: {
			type: Number,
			required: true,
		},

		bgImage: {
			type: String,
			required: false,
		},

		widgetPosition: {
			type: Array,
			validator: (value) => {
				const choices = [	
					'top',
					'left',
					'center-x',
					'center-y',
					'center',
					'bottom',
					'right',
				]
				return difference(value, choices).length === 0
			},

			default: () => {
				return ['top', 'left']
			},
		},

		showLogo: {
			type: Boolean,
			default: false,
		},

		logoPosition: {
			type: String,
			required: false,
			default: 'center',
			validator: (value) => {
				const choices = [
					'top',
					'center',
					'right',
				]

				return choices.indexOf(value) !== -1
			}
		},

		colorId: {
			type: Number,
			default: 0,
		},
	},

	data () {
		return {}
	},

	computed: {
		logo () {
			if (this.color === 'primary') {
				return require('@/assets/img/counters-for-the-poor-gold.png')
			}

			return require('@/assets/img/counters-for-the-poor-blue.png')
		},

		logoPositionClass () {
			const position = this.logoPosition
			if (position) {
				return `counter-widget-jumbotron__logo-container--${position}`
			}
		},

		...mapState({
			color (state) {
				return state.counterwidgets.colors.find((color, index) => index == this.colorId)
			}
		}),
	}
}
</script>

<style scoped lang='scss'>
.counter-widget-jumbotron {
	position: relative;

	&--no-img {
		min-height: 450px;
	}

	&__logo-container {
		position: absolute;
		top: 1em;
		max-width: 300px;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;

		&--right {
			margin-right: 0 !important;
		}

		&--left {
			margin-left: 0 !important;
		}
	}

	&__img-container {
		margin-left: -1.5rem;
		margin-right: -1.5rem;
	}

	&__widget {
		position: absolute;
		z-index: 10;

		&.top,
		&.center,
		&.center-y {
			top: 2em;	
		}

		&.left, 
		&.center {
			left: 2em;
		}

		&.right,
		&.center{
			right: 2em;
		}

		&.center {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.counter-widget {
				margin-left: auto;
				margin-right: auto;
			}
		}

		&.center-y {
			display: flex;
			height: 100%;
			align-items: center;
		}

		&.bottom {
			bottom: 2em;
		}
	}

	.counter-widget {
		padding: 1em;
		padding: 1.5rem 2rem;
		background-color: rgba(3, 0, 0, 0.28);
		border: 2px solid $primary;
		border-radius: 4px;
		max-width: 570px;
	}
}
</style>

<style lang="scss">
.counter-widget-jumbotron--no-img {
	.counter-widget {
		color: #000;
		transform: scale(.9) !important;
		max-width: 100% !important;
	}

	.counter-widget__details {
		flex-direction: column;
		align-items: center;
	}
	
	.counter-widget__counters {
		width: 80%;
		margin-right: 0;
	}

	.button {
		color: #000;
	}
}
</style>
