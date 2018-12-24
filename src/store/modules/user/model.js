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
		this.latitude = latitude
		this.longitude = longitude
		this.picture = picture
		this.about = about
	}
}

export default User 
