import { MapElementFactory } from 'vue2-google-maps'

const props = {
	nonprofit: {
		type: Object,
		twoWay: true,
	}
}

const events = []

export default MapElementFactory({
	mappedProps: {},
	events,
	name: 'nonprofitPopupWindow',
	props,

	data () {
		return {
			map: null,
			ref: null,
			refName: 'popupWindow',
		}
	},

	ctr:() => google.maps.OverlayView,

	mounted () {
		this.ref = this.$refs[this.refName]
		this.tracksActive = false
		if(this.ref.parentNode) {
			this.ref.parentNode.removeChild(this.ref)
		}
	},

	methods: {
		definePopupClass () {	
			this.$nonprofitPopupWindowObject.onAdd = this.onAdd
			this.$nonprofitPopupWindowObject.draw = this.draw
			this.$nonprofitPopupWindowObject.onRemove = this.onRemove
		},

		onAdd () {
			this.$nonprofitPopupWindowObject.getPanes().floatPane.appendChild(this.ref)
		},

		draw () {
			const position = new google.maps.LatLng(this.nonprofit.latitude, this.nonprofit.longitude)
			
			const divPosition = this.$nonprofitPopupWindowObject.getProjection().fromLatLngToDivPixel(position)

			const display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

			if(display === 'block') {
				const top = divPosition.y - 18
				this.ref.style.left = `${divPosition.x}px`
				this.ref.style.top = `${top}px`
			}

			if(this.ref.style.display !== display) {
				this.ref.style.display = display
			}

		},
		onRemove () {
			// this.ref.parentElement.removeChild(this.ref)
		},

		closeButtonClicked () {
			this.$emit('nonprofitCloseButtonClicked')
		},
	},

	afterCreate () {
		this.definePopupClass()
		this.$nonprofitPopupWindowObject.setMap(this.$map)
		this.$watch('user', () => {
			this.$nonprofitPopupWindowObject.draw()
		})
	}
})
