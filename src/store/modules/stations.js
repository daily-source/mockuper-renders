const state = {
  data: [
    {
      id: 1,
      name: 'Hoya Railroad',
      tagline: 'We are Georgetown University alumni, students, staff, neighbors, friends and fans joining together to help free modern-day slaves. Lets Go Hoyas.',
      location: 'Washington D.C',
      participants: 913,
      amountDonated: 48343,
      picture: require('@/assets/img/georgetown_school_photo.png'),
    },
    {
      id: 2,
      name: 'St. Michael\'s Church',
      tagline: 'We started our station in 2019 and our members have responded very positively to it, with more than 15% of our congregation helping out so far and continuing to grow. ',
      location: 'Hartford, CT',
      participants: 128,
      amountDonated: 6921,
      picture: require('@/assets/img/church-1.jpg'),
    },
    {
      id: 3,
      name: 'Sun Glow Apparel',
      tagline: 'Sun Glow Apparel is an online general clothing store. Our products of over 10,000 products covers every aspect of fashion, from shirts to dresses, sneakers to slip-ons, sportswear to watches, and so much more.',
      location: 'Sarasota, FL',
      participants: 11,
      amountDonated: 2159,
      picture: require('@/assets/img/business-1.jpg'),
    },
  ]
}

const mutations = {}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}