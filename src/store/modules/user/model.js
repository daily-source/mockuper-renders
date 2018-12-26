class User {
	id
	firstName
	lastName
	userName
	latitude
	longitude
	picture
	about
	nonprofits

	constructor(id, userName, firstName, lastName, latitude, longitude, picture, about) {
		this.id = id
		this.userName = userName
		this.firstName = firstName
		this.lastName = lastName
		this.latitude = parseFloat(latitude)
		this.longitude = parseFloat(longitude)
		this.picture = picture
		this.about = about
	}

	getUserLocation () {
		return {
			lat: this.latitude,
			lng: this.longitude,
		}
	}
}

export default User 
