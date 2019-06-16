import { MapElementFactory } from 'vue2-google-maps'

const props = {
	station: {
		type: Object,
		twoWay: true,
	}
}

const events = []

export default MapElementFactory({
	mappedProps: {},
	events,
	name: 'stationPopupWindow',
	props,

	data () {
		return {
			map: null,
			ref: null,
			refName: 'popupWindow',
			nonprofits: null,
			tracksActive: false,
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
			this.$stationPopupWindowObject.onAdd = this.onAdd
			this.$stationPopupWindowObject.draw = this.draw
			this.$stationPopupWindowObject.onRemove = this.onRemove
		},

		onAdd () {
			this.$stationPopupWindowObject.getPanes().floatPane.appendChild(this.ref)
		},

		draw () {
			const position = new google.maps.LatLng(this.station.position.lat, this.station.position.lng)
			
			const divPosition = this.$stationPopupWindowObject.getProjection().fromLatLngToDivPixel(position)

			const display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

			if(display === 'block') {
				const top = divPosition.y - 40
				this.ref.style.left = `${divPosition.x}px`
				this.ref.style.top = `${top}px`
			}

			if(this.ref.style.display !== display) {
				this.ref.style.display = display
			}

		},

		trackClicked () {
			if(this.tracksActive) {
				this.$emit('previousViewClicked', this.station)	
			} else {
				this.tracksActive = true	
				this.$emit('seeTracksClicked', this.station)
			}
		},

		profileClicked () {
			console.log('Profile Clicked')
		},

		onRemove () {
			this.ref.parentElement.removeChild(this.ref)
		},

		closeButtonClicked () {
			this.$emit('closeButtonClicked', this.station)
		}
	},

	afterCreate () {
		this.definePopupClass()
		this.$stationPopupWindowObject.setMap(this.$map)
		this.$watch('organization', () => {
			this.$stationPopupWindowObject.draw()
		})
	}
})
