class Nonprofit {
	
	name
	description
	state
	country
	picture
	url
	location
	latitude
	longitude

	constructor (name, description, state, country, picture, url, location, latitude, longitude) {
		this.name = name
		this.description = description
		this.state = state
		this.country = country
		this.picture = picture
		this.url = url
		this.loction = location
		this.latitude = parseFloat(latitude)
		this.longitude = parseFloat(longitude)
	}

}

export default Nonprofit
