import { MapElementFactory } from 'vue2-google-maps'

const mappedProps = {
	path: {
		type: Array,
		twoWay: true,
	},
	options: {
		type: Object,
		twoWay: false,
	},
}

export default MapElementFactory({
	mappedProps,
	props: {
		deepWatch: {
			type: Boolean,
			default: false,
		},
		icons: {
			type: Array,
			default: () => {
				return [{
					icon: {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 2,
						strokeColor: '#4475b7',
					},
					offset: '0%'
				}]
			}
		}
	},
	events: [],
	name: 'polylineAnimatedSymbol',

	data () {
		return {
			iconOffset: null,
			animationStarted: null,
		}
	},

	ctr: () => google.maps.Polyline,

	afterCreate (inst) {
		this.$polylineAnimatedSymbolObject.set('icons', this.icons)
		this.$emit('polylineCreated', this)
	},

	methods: {
		animateCircle () {
			this.animationStarted = true
			if (this.iconOffset >= 200) {
				this.animationStarted = false
				this.iconOffset = null
			}

			if(this.animationStarted && !this.iconOffset) {
				this.iconOffset = 0
			}

			setTimeout(() => {
				this.iconOffset = this.iconOffset + 1
				const icons = this.$polylineAnimatedSymbolObject.get('icons')
				icons[0].offset = `${this.iconOffset / 2}%`
				this.$polylineAnimatedSymbolObject.set('icons', icons)
				this.animateCircle()
			}, 20)
		},
	},
})
