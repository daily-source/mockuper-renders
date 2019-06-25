const state = {
  data: [
    {
      id: 1,
      name: 'Hoya Railroad',
      stationName: 'Georgetown Hoya Station',
      tagline: 'We are Georgetown University alumni, students, staff, neighbors, friends and fans joining together to help free modern-day slaves. Lets Go Hoyas.',
      description: `<p>In its early years, Georgetown benefitted from slavery, and might not exist now if not for slaves. Later, it benefitted from the sacrifices of people who freed slaves. Today, everyone in the U.S. is benefitting from current slavery. Slaves grow food we eat, mine our raw materials and make many of the products we all use. With all that in mind, we members of the extended Georgetown community are working to help the people who are sacrificing and suffering the most today: modern-day slaves.</p>`,
      participants: 913,
      amountDonated: 48343,
      picture: require('@/assets/img/georgetown-university-2.jpg'),
      icon: require('@/assets/img/georgetown-hoyas-kepsar-mossor.png'),
      position: {
        lat: 38.907689,
        lng: -77.0737924,
        name: 'Washington D.C',
      },
      establishmentType: 'school'
    },
    {
      id: 2,
      name: 'St. Michael\'s Church',
      tagline: 'We started our station in 2019 and our members have responded very positively to it, with more than 15% of our congregation helping out so far and continuing to grow. ',
      participants: 128,
      amountDonated: 6921,
      description: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius tellus posuere, congue nulla vestibulum, ornare mi. Sed commodo metus eu nisi efficitur, et placerat quam ultrices. Proin vehicula egestas nibh eu tincidunt. Nunc suscipit gravida mi, in pretium libero condimentum a. Fusce vehicula quis libero ac faucibus. Nulla facilisi. Cras facilisis enim at eleifend pretium. Ut non erat sed mi euismod suscipit in vitae nibh. Vivamus ac dapibus ante, ut gravida ipsum. Fusce rutrum arcu nullam.</p>`,
      picture: require('@/assets/img/church-1.jpg'),
      position: {
        lat: 38.907689,
        lng: -77.0737924,
        name: 'Hartford, CT',        
      },
    },
    {
      id: 3,
      name: 'Sun Glow Apparel',
      tagline: 'Sun Glow Apparel is an online general clothing store. Our products of over 10,000 products covers every aspect of fashion, from shirts to dresses, sneakers to slip-ons, sportswear to watches, and so much more.',
      description: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius tellus posuere, congue nulla vestibulum, ornare mi. Sed commodo metus eu nisi efficitur, et placerat quam ultrices. Proin vehicula egestas nibh eu tincidunt. Nunc suscipit gravida mi, in pretium libero condimentum a. Fusce vehicula quis libero ac faucibus. Nulla facilisi. Cras facilisis enim at eleifend pretium. Ut non erat sed mi euismod suscipit in vitae nibh. Vivamus ac dapibus ante, ut gravida ipsum. Fusce rutrum arcu nullam.</p>`,
      position: {
        lat: 38.907689,
        lng: -77.0737924,
        name: 'Sarasota, FL',
      },
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