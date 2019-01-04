<template>
	<div 
		:class='["alert-bar", { "alert-bar--show": isShown }, alertPositionClass]'
	>
		<p class='alert-bar__text has-text-centered'>
			Here is a preview of your page. To publish it, register for a free account <a href='#' class='alert-bar__link'>here</a>. Your changes will be saved while you register. If you have an account, login <a href='#' class='alert-bar__link'>here</a>. To edit the page, click the pen icons below
		</p>
		<button class='button is-link is-inverted close-button is-clear is-paddingless' @click='toggleShow'>
			<icon 
				icon='close'
				:iconheight='16'
				:iconwidth='16' 
				color='#E2AB40'
			/>
		</button>
	</div>
</template>

<script>
import Icon from '@/components/general/Icons'

export default {
	name: 'AlertBar',

	components: {
		Icon,
	},

	props: {
		position: {
			type: String,
			default: 'top',
			validator: (value) => {
        return ['top', 'bottom'].indexOf(value) !== -1
			},
		},
		show: {
			type: Boolean,
			default: true,
		},
	},

	data () {
		return {
			isShown: this.show,
		}
	},

	computed: {
		alertPositionClass () {
			if (this.position === 'bottom') {
				return 'alert-bar--bottom'
			}	

			return 'alert-bar--top'
		}
	},

	methods: {
		toggleShow () {
			this.isShown = !this.isShown
		}
	}
}
</script>
	
<style lang='scss' scoped>
	.alert-bar {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: 1em;
		padding-bottom: 1em;
		padding-left: 1.5em;
		padding-right: 1.5em;
		background-color: $secondary;
		box-shadow: 0 2px 10px 0 rgba(102, 101, 101, 0.7);
		transition: all .4s ease;

		&--top {
			top: -20%;
		}

		&--bottom {
			bottom: -20%;
		}
	}

	.alert-bar--show {
		&.alert-bar--top {
			top: 0;
		}

		&.alert-bar--bottom {
			bottom: 0;
		}
	}

	.alert-bar__text {
		color: #fff;
		text-align: center;
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 0;
	}

	.alert-bar__link {
		color: $primary;
		text-decoration: underline;
	}

	.close-button {
		border-radius: 100%;
		width: 2.5em;
		height: 2.5em;
		border-color: transparent;
		position: absolute;
		top: 1em;
		right: 1em;
	}
</style>
