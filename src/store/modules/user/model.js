class User {

	firstName;
	lastName;
	userName;
	latitude;
	longitude;
	picture;
	about;

	constructor(userName, firstName, lastName, latitude, longitude, picture, about) {
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
