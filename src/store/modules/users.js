const state = {
  data: [
    {
      id: 1,
      name: "Michelle Scott",
      imgName: "michelle-scott.jpg",
      isFeaturedParticipant: true,
    },
    {
      id: 2,
      name: "Donald Hill",
      imgName: "donald-hill.jpg",
      isFeaturedParticipant: true,
    },
    {
      id: 3,
      name: "Jimmy Harris",
      imgName: "jimmy-harris.jpg",
      isFeaturedParticipant: true,
    },
    {
      id: 4,
      name: "Phillip Sanders",
      imgName: "phillip-sanders.jpg",
      isFeaturedParticipant: true,
    },
    {
      id: 5,
      name: "Joshua Martinez",
      imgName: "joshua-martinez.jpg",
      isFeaturedParticipant: true,
    },
    {
      id: 6,
      name: "Susan Lee",
      imgName: "susan-lee.jpg",
      isFeaturedParticipant: true,
    },
    {
      id: 7,
      name: "Louise Simmons",
      imgName: "louise-simmons.jpg",
      isFeaturedParticipant: true,
    },
    {
      id: 8,
      name: "Karen Smith",
      imgName: "susan-lee-1.jpg",
    },
    {
      id: 9,
      name: "Adam Munson",
      imgName: "jimmy-harris-1.jpg",
    },
    {
      id: 10,
      name: "Mike McNally",
      imgName: "mary-mcnally.jpg",
    },
    {
      id: 11,
      name: "Liz Lupinsky",
      imgName: "betty-thompson-1.jpg",
    },
    {
      id: 12,
      name: "Edith Fontaine",
    },
    {
      id: 13,
      name: "Donna Hernandez",
    },
    {
      id: 14,
      name: "Dave Donello",
      imgName: 'dave-donello.jpg',
    },
    {
      id: 15,
      name: "Betty Thompson",
      imgName: 'betty-thompson.jpg',
    },
    {
      id: 16,
      name: "Karen Stevens",
      imgName: 'karen-stevens.jpg',
    },
    {
      id: 17,
      name: "Larry Edwards",
      imgName: 'larry-edwards.jpg',
    },
    {
      id: 18,
      name: "Betty Thompson",
      imgName: 'betty-thompson-2.jpg',
    },
    {
      id: 19,
      name: "Adam Gonzales",
      imgName: 'adam-gonzales.jpg',
    },
    {
      id: 20,
      name: "Holly DeWolf",
      imgName: 'holly-dewolf.jpg',
    },
    {
      id: 21,
      name: "Dennis Walker",
      imgName: 'dennis-walker.jpg',
    },
    {
      id: 22,
      name: "Adam Garcia",
      imgName: 'adam-garcia.jpg',
    },
    {
      id: 23,
      name: "Teresa Capuano",
      imgName: 'teresa-capuano.jpg',
    }
  ]
}

const actions = {

}

const mutations = {

}

const getters = {
  featuredParticipants: state => {
    return state.data.filter(user => user.isFeaturedParticipant)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
