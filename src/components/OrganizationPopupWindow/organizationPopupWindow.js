import { MapElementFactory } from 'vue2-google-maps'
import { mapGetters } from 'vuex'

const props = {
	organization: {
		type: Object,
		twoWay: true,
	}
}

const events = []

export default MapElementFactory({
	mappedProps: {},
	events,
	name: 'organizationPopupWindow',
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
			this.$organizationPopupWindowObject.onAdd = this.onAdd
			this.$organizationPopupWindowObject.draw = this.draw
			this.$organizationPopupWindowObject.onRemove = this.onRemove
		},

		onAdd () {
			this.$organizationPopupWindowObject.getPanes().floatPane.appendChild(this.ref)
		},

		draw () {
			const position = new google.maps.LatLng(this.organization.latitude, this.organization.longitude)
			
			const divPosition = this.$organizationPopupWindowObject.getProjection().fromLatLngToDivPixel(position)

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
				this.$emit('previousViewClicked', this.organization)	
			} else {
				this.tracksActive = true	
				this.$emit('seeTracksClicked', this.organization)
			}
		},

		profileClicked () {
			console.log('Profile Clicked')
		},

		onRemove () {
			this.ref.parentElement.removeChild(this.ref)
		},

		closeButtonClicked () {
			this.$emit('closeButtonClicked', this.organization)
		}
	},

	afterCreate () {
		this.definePopupClass()
		this.$organizationPopupWindowObject.setMap(this.$map)
		this.$watch('organization', () => {
			this.$organizationPopupWindowObject.draw()
		})
	}
})
