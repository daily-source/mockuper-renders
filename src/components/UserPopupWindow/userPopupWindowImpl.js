import { MapElementFactory } from 'vue2-google-maps'
import { mapGetters } from 'vuex'

const props = {
	user: {
		type: Object,
		twoWay: true,
	}
}

const events = []

export default MapElementFactory({
	mappedProps: {},
	events,
	name: 'userPopupWindow',
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
			this.$userPopupWindowObject.onAdd = this.onAdd
			this.$userPopupWindowObject.draw = this.draw
			this.$userPopupWindowObject.onRemove = this.onRemove
		},

		onAdd () {
			this.$userPopupWindowObject.getPanes().floatPane.appendChild(this.ref)
		},

		draw () {
			const position = new google.maps.LatLng(this.user.latitude, this.user.longitude)
			
			const divPosition = this.$userPopupWindowObject.getProjection().fromLatLngToDivPixel(position)

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

		trackClicked () {
			if(this.tracksActive) {
				this.$emit('previousViewClicked', this)	
			} else {
				this.tracksActive = true	
				this.$emit('seeTracksClicked', this.user)
			}
		},

		profileClicked () {
			console.log('Profile Clicked')
		},

		onRemove () {
			this.ref.parentElement.removeChild(this.ref)
		},

		closeButtonClicked () {
			this.$emit('closeButtonClicked', this.user)
		}
	},

	afterCreate () {
		this.definePopupClass()
		this.$userPopupWindowObject.setMap(this.$map)
		this.$watch('user', () => {
			this.$userPopupWindowObject.draw()
		})
	}
})
