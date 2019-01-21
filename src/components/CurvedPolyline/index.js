let evenOdd = 0

export const curvedLineGenerate = (Options = {}) => {
	const {latStart, lngStart, latEnd, lngEnd, color, opacity, weight, gapWidth, horizontal, multiplier, resolution} = extractOptions(Options)
	let Points = []
	let PointsOffset = []
	let partLat
	let partLng
	let lastLat = latStart
	let lastLng = lngStart
	let lines = []

	for(let point = 0; point <= 1; point += resolution) {
		Points.push(point)
		let offset = (.6 * Math.sin((Math.PI * point / 1)))
		PointsOffset.push(offset)
	}

	let offsetMultiplier = 0;

	const offsetLength = horizontal ? (lngEnd - lngStart) * 0.1 : (latEnd - latStart) * 0.1

	Points.forEach((point, i) => {
		if(i == 4) {
			offsetMultiplier = 1.5 * multiplier;
		}
	
		if(i >= 5) {
				offsetMultiplier = (offsetLength * PointsOffset[i]) * multiplier;
		} else {
				offsetMultiplier = (offsetLength * PointsOffset[i]) * multiplier;
		}
		
		
		partLat = horizontal ? (latStart + ((latEnd - latStart) * Points[i])) + offsetMultiplier : (latStart + ((latEnd - latStart) * Points[i]))
		partLng = horizontal ? (lngStart + ((lngEnd - lngStart) * Points[i])) : (lngStart + ((lngEnd - lngStart) * Points[i])) + offsetMultiplier

		const segments = curvedLineSegment(lastLat, lastLng, partLat, partLng, gapWidth)

		for(let x in segments) {
			lines.push(segments[x])
		}

		lastLat = partLat
		lastLng = partLng
	})

	const segments = curvedLineSegment(lastLat, lastLng, latEnd, lngEnd, gapWidth)

	for(let y in segments) {
		lines.push(segments[y])
	}

	return lines
}

const curvedLineSegment = (latStart, lngStart, latEnd, lngEnd, gapWidth) => {
	evenOdd++

	if (evenOdd % (gapWidth+1)) return

	return [
		new google.maps.LatLng(latStart, lngStart),
		new google.maps.LatLng(latEnd, lngEnd),
	]
}

const extractOptions = (Options = {}) => {
	return {
		color: '#4475b7',
		opacity: 1,
		weight: 2,
		width: 0,
		horizontal: true,
		multiplier: 1,
		resolution: .1,
		...Options,
	}
}

