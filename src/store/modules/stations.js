const state = {
  data: [
    {
      id: 1,
      name: 'Hoya Railroad',
      stationName: 'Georgetown Hoya Station',
      tagline: 'We are Georgetown University alumni, students, staff, neighbors, friends and fans joining together to help free modern-day slaves. Lets Go Hoyas.',
      description: `
      <p>Everyone in the U.S. today is benefitting from current slavery. Slaves around the world grow and pick some of the food we consume, mine raw materials and make some of the clothing, electronics and other products we all use. In its early years, Georgetown benefitted from slavery, and might not exist now if not for slaves. Later, it benefitted from the sacrifices of people who freed slaves: a former slave, Patrick Healy, became Georgetown’s “second founder” and transformed it from a small rural college to a major national university. With all that in mind, Georgetown alumni, students, staff and fans are joining together to help the people who are involuntarily sacrificing and suffering the most now: modern-day slaves.</p>
      `,
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
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet mauris id nunc mollis vulputate. Aliquam quis quam vitae tellus sollicitudin semper. Donec in enim volutpat, rhoncus erat sit amet, porta sem. Phasellus mollis quis tortor quis venenatis. Nullam semper faucibus ante, quis auctor velit. Mauris vitae urna in purus sodales condimentum eu vel purus. Nunc ac mattis erat, ac tempor velit. Phasellus accumsan, est vel fringilla ornare, nisl nunc cursus urna, nec fermentum metus risus sed ante. Cras ut arcu sit amet libero mollis pulvinar. Suspendisse molestie, ligula vitae feugiat ornare, ligula mi iaculis lacus, id hendrerit orci dolor ut felis. Mauris sed mi sollicitudin, tincidunt quam volutpat metus.</p>
      `,
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
      description: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet mauris id nunc mollis vulputate. Aliquam quis quam vitae tellus sollicitudin semper. Donec in enim volutpat, rhoncus erat sit amet, porta sem. Phasellus mollis quis tortor quis venenatis. Nullam semper faucibus ante, quis auctor velit. Mauris vitae urna in purus sodales condimentum eu vel purus. Nunc ac mattis erat, ac tempor velit. Phasellus accumsan, est vel fringilla ornare, nisl nunc cursus urna, nec fermentum metus risus sed ante. Cras ut arcu sit amet libero mollis pulvinar. Suspendisse molestie, ligula vitae feugiat ornare, ligula mi iaculis lacus, id hendrerit orci dolor ut felis. Mauris sed mi sollicitudin, tincidunt quam volutpat metus.</p>
      `,
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