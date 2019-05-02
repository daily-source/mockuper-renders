const baseURL = process.env.VUE_APP_BASE_URL

const state = {
	data: [
		{
			id: 1,
			description:"Rerum velit officia.",
			loction:"461 Hermann Greens Apt. 847",
			name:"Working with thousands of local partner organizations, we work with people living in poverty striving to exercise their human rights.",
			picture: `${baseURL}img/oxfam.png`,
			state:"Kansas",
			url:"https://titus.net",
			locations: [
				{
					id: 1,
					country: 'India',
					state: 'Maharastra',
					city: 'Mumbai',
					location: 'Candies, Bandra West, Mumbai, Maharastra, India',
					latitude: 19.075983,
					longitude: 72.877655,
				},
				{
					id: 2,
					country: 'India',
					state: 'Noida Uttar Pradesh',
					city: 'Mumbai',
					location: 'Fr. Agnel Schoolm KJhora Colony, Sector 62A, Noida Uttar Pradesh, India',
					latitude: 28.535517,
					longitude: 77.391029,
				},
				// {
				// 	id: 3,
				// 	country: 'India',
				// 	state: 'Poonam Kirti',
				// 	city: 'Poonam Nayar',
				// 	location: '29, Poonam Kirti,poonam Nayar, Mahakali Caves Rd, Andheri(e), Poonam Nayar, Poonam Kirti, India',
				// 	latitude: 21.168190,
				// 	longitude: 72.814280,
				// },
			],
		},
		{	
			description:"International Justice Mission is a human rights agency that secures justice for victims of slavery, sexual exploitation and other forms of violent oppression.",
			id: 2,
			name:"International Justice Mission",
			picture: `${baseURL}img/ijm.png`,			
			url:"http://miracle.info",
			locations: [
				{
					id: 1,
					country: 'USA',
					state: 'California',
					city: 'Los Angeles',
					location: 'Los Angeles, California, USA',
					latitude: 34.052235,
					longitude: -118.243683,
				},
				{
					id: 2,
					country: 'Brazil',
					state: 'Sao Paulo',
					city: 'Santos',
					location: 'Santos, Sao Paulo, Brazil',
					longitude: -56.0210109172757,
					latitude: -9.063321460334844,
				},
				{
					id: 3,
					country: 'Bangladesh',
					state: '199, Tejgaon I/A',
					city: 'Dhaka',
					location: '199, Tejgaon I/A, Dhaka, Bangladesh',
					longitude: 90.916015625,
					latitude: 24.102377387370506,
				}
			],
		},
		{
			description: "Every day, Kiva connects thousands of people to borrowers and partner institutions around the world, working together to create opportunity and alleviate poverty.",
			id:3,
			name:"KIVA",
			picture: `${baseURL}img/kiva.jpg`,						
			state:"New Hampshire",
			url:"http://eileen.com",
			locations: [
				{
					id: 1,
					country: 'England',
					state: 'United Kingdom',
					city: 'London',
					location: 'London, United Kingdom, England',
					latitude: 51.507351,
					longitude: -0.127758,
				},
				{
					id: 2,
					country: 'Japan',
					city: 'Tokyo',
					location: 'Tokyo, Japan',
					latitude: 35.689487,
					longitude: 139.691711,
				},
				{
					id: 3,
					country: 'Ethiopia',
					state: 'Addis Ababa',
					city: 'Addis Ababa',
					street: 'P.O.Box 15388',
					location: 'P.O.Box 15388, Addis Ababa, Ethiopia',
					longitude: 39.84570701948269,
					latitude: 8.15030692292331,
				},
			],
    },
    {
      name: 'Streetlight',
      picture: `${baseURL}img/streetlight.png`,
      id: 4,
      url: 'gttps://streetlight.com',
      description: 'Streetlight’s Mission is to Eradicate Child Sex Slavery through a 3-tier strategy of Awareness, Prevention, and Aftercare.',
      locations: [
        {
					id: 1,
					country: 'Colombia',
					street: 'Cl 20SUR No. 14-05, C.P 11001',
					city: 'Bogotá',
					state: 'Bogotá',
					location: 'Cl 20SUR No. 14-05, C.P 11001, Bogotá, Colombia',
					latitude: 4.5819344,
					longitude: -74.1037359,
				},
				{
					id: 2,
					country: 'Afghanistan',
					street: '',
					city: 'Herat',
					state: '',
					location: 'Herat, Afghanistan',
					latitude: 34.3535219,
					longitude: 62.1760507,
				}
      ],
    },
    {
      name: 'Girls Against Slavery',
      picture: `${baseURL}img/gems.jpg`,
      id: 5,
      url: 'https://gems.com',
      description: 'GEMS provides a spectrum of continuous and comprehensive services to address the needs of commercially and sexually exploited girls and young women. Commercial sexual exploitation is intrinsically linked to racism, poverty, gender-based violence, and the criminalization of youth. All these factors are an integral part of any discussion, advocacy work or direct service programming that involves sexual exploitation. All of GEMS programs are based on our philosophy and values that each girl and young woman is.',
      locations: [
        {
					id: 1,
					country: 'Thailand',
					street: 'Silom Road, Silom, Bangrak',
					city: 'Bangrak',
					state: 'Bangkok',
					location: 'Silom Road, Silom, Bangrak, Bangkok, Thailand',
					latitude: 13.7258063,
					longitude: 100.5246047,
				},
				{
					id: 2,
					country: 'Africa',
					state: 'Mauritania',
					city: '',
					location: 'Mauritania, Africa',
					latitude: 19.9956052,
					longitude: -10.935897,
				},
      ],
    },
    {
      name: 'ZOE Children\'s Homes',
      picture: `${baseURL}img/zoes.jpg`,
      id: 6,
      url: 'https://gems.com',
      description: 'ZOE Children’s Homes is an international Christian organization that rescues children who are at high risk of being sold into slavery, have already been victimized as slaves, have been orphaned, or have suffered other heinous forms of abuse.',
      locations: [
        {
					id: 1,
					country: 'Bolivia',
					street: 'c. Federico Zuazo # 1913',
					city: '',
					state: 'La Paz',
					location: 'c. Federico Zuazo # 1913, La Paz, Bolivia',
					latitude: -16.5207007,
					longitude: -68.1941175,
				},
				{
					id: 2,
					country: 'Nigeria',
					street: '62, Seriki Aro Avenue',
					city: 'Ikeja',
					state: 'Lagos',
					location: '62, Seriki Aro Avenue, Ikeja, Lagos, Nigeria',
					latitude: 7.92404181555562,
					longitude: 8.842270332724297,
				}
      ],
    },
    {
      name: 'Living Water for Girls',
      picture: `${baseURL}img/livingwater.png`,
      id: 7,
      url: '3',
      description: 'The mission of Living Waters for Girls is to rescue, rehabilitate and restore commercially sexually exploited girls by providing safe refuge and holistic therapeutic services.',
      locations: [
        {
					id: 1,
					country: 'Indonesia',
					street: 'Jl Panjang 7-9 Kedoya Elok Plaza Bl DE/11,Kedoya Selatan',
					city: 'Kebon Jeruk',
					state: 'Jakarta',
					location: 'Jl Panjang 7-9 Kedoya Elok Plaza Bl DE/11,Kedoya Selatan, Kebon Jeruk, Jakarta, Bolivia',
					latitude: -6.1856285,
					longitude: 106.7661928,
				}
      ],
    },
    {
      name: 'Raphahouse',
      picture: `${baseURL}img/raphahouse.jpg`,
      id: 8,
      url: '#',
      description: 'Rapha House programs exist to extend unconditional love to girls who have been rescued out of slavery and sexual exploitation.  Every member of the Rapha House staff has dedicated his or herself to seeing each child at Rapha House restored to sustainable freedom.',
      locations: [
        {
					id: 1,
					country: 'Paraguay',
					street: 'Av. José A. Flores 3614 c/ Bartolomé de las Casas',
					city: '',
					state: 'Asunción',
					location: 'Av. José A. Flores 3614 c/ Bartolomé de las Casas, Asunción, Paraguay',
					latitude: -25.3122219,
					longitude: -57.6073105,
				},
				{
					id: 2,
					country: 'India',
					state: 'Noida Uttar Pradesh',
					city: 'Mumbai',
					location: 'Fr. Agnel Schoolm KJhora Colony, Sector 62A, Noida Uttar Pradesh, India',
					latitude: 28.535517,
					longitude: 77.391029,
				},
      ],
    },
    {
      name: 'Tresures Ministry',
      picture: `${baseURL}img/treasures-ministry.png`,
      id: 9,
      url: 'http://www.iamatreasure.com/',
      description: 'Treasures is a unique, faith-based outreach and support group for women in the sex industry, including victims of commercialized sexual exploitation and trafficking. As the only organization of its kind based in the adult industry capital of the world (San Fernando Valley in Los Angeles County), our mission is to reach, restore and equip women in order to help them live healthy, flourishing lives.',
      locations: [
        {
					id: 1,
					country: 'Zimbabwe',
					street: 'Suite 1309 13th Floor Robinson House Cnr Angwa And And Kwame Nkrumah',
					city: 'Harare',
					state: 'Asunción',
					location: 'Suite 1309 13th Floor Robinson House Cnr Angwa And And Kwame Nkrumah, Harare, Zimbabwe',
					latitude: -17.8282433,
					longitude: 31.0455279,
				}
      ],
    },
    {
      name: 'Missey',
      picture: `${baseURL}img/missey.jpg`,
      id: 10,
      url: 'http://misssey.org/index.html',
      description: 'Motivating, Inspiring, Supporting, and Serving Sexually Exploited Youth (MISSSEY) advocates and facilitates the empowerment and inner transformation of sexually exploited youth by holistically addressing their specific needs. MISSSEY collaborates to bring about systemic and community change to prevent the sexual exploitation of children and youth through raising awareness, education and policy development.',
      locations: [
        {
					id: 1,
					country: 'Kenya',
					street: '479-20117 Naivasha',
					city: 'Naivasha',
					state: 'Naivasha',
					location: '479-20117, Naivasha, Kenya',
					latitude: -0.713515,
					longitude: 36.4235122,
				}
      ],
		},
		{
      name: 'Life Impact International',
      picture: `${baseURL}img/life-impact-international-logo-retina.png`,
      id: 11,
      url: 'https://lifeimpactintl.org/',
      description: 'At Life Impact International, we prevent human trafficking by intervening in the lives of at-risk children, youth, displaced people, refugees and orphans.',
      locations: [
        {
					id: 1,
					country: 'Mongolia',
					street: '',
					city: '',
					state: 'Jinst',
					location: 'Jinst, Mongolia',
					latitude: 45.8795793,
					longitude: 100.6180053,
				},
				{
					id: 2,
					country: 'Suriname',
					street: 'Wanica, Indira ghandiweg 320',
					city: 'Lelydorp',
					state: '',
					location: 'Wanica, Indira ghandiweg 320, Lelydorp, Suriname',
					latitude: 5.7127727,
					longitude: -55.2176452,
				}
      ],
		},
		{
      name: 'HAGAR',
      picture: `${baseURL}img/hagar.jpg`,
      id: 12,
      url: 'https://hagarinternational.org/',
      description: 'We are an international organisation dedicated to the recovery of women and children who have endured extreme abuses. We are working to see communities free and healed from the trauma of human slavery, trafficking and abuse.',
      locations: [
        {
					id: 1,
					country: 'Turkey',
					street: '',
					city: 'Karaköy',
					state: 'Istanbul',
					location: 'Karaköy, Istanbul, Turkey',
					latitude: 41.0242773,
					longitude: 28.9761782,
				},
				{
					id: 2,
					country: 'Haiti',
					street: '',
					city: '',
					state: 'Gonaives',
					location: 'Gonaives, Haiti',
					latitude: 19.457108,
					longitude: -72.6970554,
				}
      ],
		},
		{
      name: 'Hope for Justice',
      picture: `${baseURL}img/hopeforjustice.jpg`,
      id: 13,
      url: 'https://hopeforjustice.org/',
      description: 'We exist to bring an end to modern slavery by preventing exploitation, rescuing victims, restoring lives and reforming society.',
      locations: [
        {
					id: 1,
					country: 'Algeria',
					street: 'Cité Sonelgaz villa n°6',
					city: 'Djasr Kassentina',
					state: 'Djasr Kassentina',
					location: 'Cité Sonelgaz villa n°6, Djasr Kassentina, Algeria',
					latitude: 26.0739396,
					longitude: 2.4627029,
				},
				{
					id: 2,
					country: 'USA',
					street: '1740  Small Street',
					city: 'New York',
					state: 'New York',
					location: '1740  Small Street, New York, USA',
					latitude: 40.6974034,
					longitude: -74.1197636,
				}
      ],
    },
	]
}

const getters = {}

const actions = {
	registerNonprofit({state, commit}, nonprofit) {
		// This is just a mock way to generate an ID.
		const id = state.data.length + 1

		const newNonprofit = {
			id,
			...nonprofit
		}

		commit('add', newNonprofit)

		return newNonprofit
	},
}

const mutations = {
	add (state, nonprofitData) {
		state.data = [
			...state.data,
			nonprofitData,
		]
	},
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}
