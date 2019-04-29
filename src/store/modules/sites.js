import { kebabCase } from 'lodash'

const baseUrl = process.env.VUE_APP_BASE_URL;

const logoUrl = fileName => `${baseUrl}img/site-logos/${fileName}`

const state = {
  data: [
    {
      title: 'Practical tools for spiritual living',
      slug: kebabCase('Practical tools for spiritual living'),
      logos: [
        {
          name: 'Forgiveness Class',
          slug: kebabCase('Forgiveness Class'),
          url: logoUrl('forgiveness-class.png'),
        },
        {
          name: 'Christian Evaluation',
          slug: kebabCase('Christian Evaluation'),
          url: logoUrl('christian-evaluation.jpg'),
        },
        {
          name: 'Handling Losses',
          slug: kebabCase('Handling Losses'),
          url: logoUrl('handling-losses.jpg'),
        },
        {
          name: 'Learning Discrement',
          slug: kebabCase('Learning Discrement'),
          url: logoUrl('learning-discrement.png'),
        },
        {
          name: 'Practice of Letting Go',
          slug: kebabCase('Practice of Letting Go'),
          url: logoUrl('practice-of-letting-go.png'),
        },
        {
          name: 'Practicing Gratitude',
          slug: kebabCase('Praciticing Gratitude'),
          url: logoUrl('practicing-gratitude.jpg'),
        },
        {
          name: 'Christian Song',
          slug: kebabCase('Christian Song'),
          url: logoUrl('christian-song-2.jpg'),
        },
        {
          name: 'The Lent Site',
          slug: kebabCase('The Lent Site'),
          url: logoUrl('the-lent-site.png'),
        },
      ],
    },
    {
      title: 'Connecting with God', 
      slug: kebabCase('Connecting With God'),
      logos: [
        {
          name: 'Walks With God',
          slug: kebabCase('Walks With God'),
          url: logoUrl('walks-with-god.png'),
        },
        {
          name: 'Prayer Approaches',
          slug: kebabCase('Prayer Approaches'),
          url: logoUrl('prayer-approaches.png'),
        },
        {
          name: 'Divine Music',
          slug: kebabCase('Divine Music'),
          url: logoUrl('divine-music-v2.png'),
        },
        {
          name: 'Christian Mythics',
          slug: kebabCase('Christian Mythics'),
          url: logoUrl('christian-mythics-v2.png'),
        },
        {
          name: 'Adoration Guide',
          slug: kebabCase('Adoration Guide'),
          url: logoUrl('adoration-guide-v2.png'),
        },
        {
          name: 'Righteous Resolutions',
          slug: kebabCase('Righteous Resolutions'),
          url: logoUrl('righteous-resolutions.png'),
        },
      ]
    },
    {
      title: 'Opportunities and resources for groups',
      slug: kebabCase('Opportunities and resources for groups'),
      logos: [
        {
          name: 'Families for Good',
          slug: kebabCase('Families for Good'),
          url: logoUrl('families-for-good.png'),
        },
        {
          name: 'Businesses for Good',
          slug: kebabCase('Businesses for Good'),
          url: logoUrl('business-for-good.png'),
        },
        {
          name: 'Schools for Good',
          slug: kebabCase('Schools for Good'),
          url: logoUrl('schools-for-good.png'),
        },
        {
          name: 'Colleges for Good',
          slug: kebabCase('Colleges for Good'),
          url: logoUrl('colleges-for-good-v2.png'),
        },
        {
          name: 'Temples for Good',
          slug: kebabCase('Temples for Good'),
          url: logoUrl('temples-for-good-v2.jpg'),
        },
        {
          name: 'Churches for Good',
          slug: kebabCase('Churches for Good'),
          url: logoUrl('churches-for-good.png'),
        },
        {
          name: 'Franciscans for Good',
          slug: kebabCase('Franciscans for Good'),
          url: logoUrl('franciscans-for-good-v2.png'),
        },
        {
          name: 'Leagues for Good',
          slug: kebabCase('Leagues for Good'),
          url: logoUrl('leagues-for-good.png'),
        },
      ],
    },
    {
      title: 'Grow in God and raise money for good',
      slug: kebabCase('Grow in God and raise money for good'),
      logos: [
        {
          name: 'Thanksathon',
          slug: kebabCase('Thanksathon'),
          url: logoUrl('thankathon.png'),
        },
        {
          name: 'Christmas Compassion',
          slug: kebabCase('Christmas Compassion'),
          url: logoUrl('christmas-compassion.png'),
        },
        {
          name: 'Easter Giving',
          slug: kebabCase('Easter Giving'),
          url: logoUrl('easter-giving-v2.png'),
        }, 
        {
          name: 'Lent for Love',
          slug: kebabCase('Lent for Love'),
          url: logoUrl('lent-for-love.png'),
        }, {
          name: 'Bibleathon',
          slug: kebabCase('Bibleathon'),
          url: logoUrl('bibleathon.png'),
        }, 
        {
          name: 'Helpful Hannakuh',
          slug: kebabCase('Helpful Hannakuh'),
          url: logoUrl('helpful-hannakuh.png'),
        },
      ],
    }
  ]
}

const getters = {}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}