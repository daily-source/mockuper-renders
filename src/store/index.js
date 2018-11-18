import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import selections from './modules/selections'
import bannerSwitcher from './modules/bannerSwitcher'

Vue.use(Vuex);

const baseUrl = process.env.BASE_URL;
export default new Vuex.Store({
  state: {
    fullPath: '',
    common: {},
    nonprofit: {
      "43138428": {
        EIN: 43138428,
        NAME: 'MELROSE MASSACHUSETTS TELEVISION',
        STREET: '360 MAIN ST',
        CITY: 'MELROSE',
        STATE: 'MA',
        ZIP: '02176-4623',
        ACTIVITY: 'Described in section 170(b)1)(a)(vi) of the Code; Radio or television broadcasting',
        CLASSIFICATION: 'Charitable Organization',
        DEDUCTIBILITY: 1,
        SUBSECTION: 3,
        NTEE_CD: '0',
        SORT_NAME: '0',
        validated: true,
        data: {
          name: 'MELROSE MASSACHUSETTS TELEVISION',
          hero: {
            src: `${baseUrl}img/5672087be97cb2bb8e59ad897a14ea35.jpg`,
          },
          default_hero: {
            src: `${baseUrl}img/nonoprofit-base-hero.jpg`,
          },
          about: 'We are an international confederation of 17 like-minded charitable organizations working together to bring about lasting solutions to poverty and injustice. We work with partners around the world to make a difference in the lives of people in need.',
          slogan: '',
          website: 'https://www.oxfam.org',
          city: 'MELROSE, MA',
          email: 'info@oxfam.org',
          ein: '20-1059569',
          background_cover: `${baseUrl}img/nonprofit-base-hero.jpg`,
          media: [
            { id: '1', type: 'image', src: `${baseUrl}img/nonprofit-image-1.jpg` },
            { id: '2', type: 'image', src: `${baseUrl}img/nonprofit-image-2.jpg` },
            { id: '3', type: 'image', src: `${baseUrl}img/nonprofit-image-3.jpg` },
            { id: '4', type: 'image', src: `${baseUrl}img/nonprofit-image-4.png` },
            { id: '5', type: 'image', src: `${baseUrl}img/nonprofit-image-5.png` },
            { id: '6', type: 'image', src: `${baseUrl}img/nonprofit-image-6.jpg` },
            { id: '7', type: 'image', src: `${baseUrl}img/nonprofit-image-7.jpg` },
            { id: '8', type: 'image', src: `${baseUrl}img/nonprofit-image-8.jpg` },
            { id: '9', type: 'image', src: `${baseUrl}img/nonprofit-image-9.jpg` },
            { id: '10', type: 'image', src: `${baseUrl}img/nonprofit-image-10.jpg` },
            { id: '11', type: 'image', src: `${baseUrl}img/nonprofit-image-11.jpg` },
            { id: '12', type: 'image', src: `${baseUrl}img/nonprofit-image-12.jpg` },
            { id: '13', type: 'image', src: `${baseUrl}img/nonprofit-image-13.jpg` },
            { id: '14', type: 'image', src: `${baseUrl}img/nonprofit-image-14.jpg` },
            { id: '15', type: 'image', src: `${baseUrl}img/nonprofit-image-15.jpg` },
            { id: '16', type: 'image', src: `${baseUrl}img/nonprofit-image-16.jpg` },
            { id: '17', type: 'image', src: `${baseUrl}img/nonprofit-image-17.jpg` },
            { id: '18', type: 'image', src: `${baseUrl}img/nonprofit-image-18.png` },
            { id: '19', type: 'image', src: `${baseUrl}img/nonprofit-image-19.jpg` },
            { id: '20', type: 'image', src: `${baseUrl}img/nonprofit-image-20.jpg` },
            { id: '21', type: 'video', src: 'qXPzeJQua5k' },
            { id: '22', type: 'video', src: 'lE-y7FuJT8E' },
          ],
        },        
      },
      "237069110": {
        EIN: 237069110,
        NAME: 'OXFAM AMERICA',
        STREET: '360 MAIN ST',
        CITY: 'MELROSE',
        STATE: 'MA',
        ZIP: '02176-4623',
        ACTIVITY: 'Described in section 170(b)1)(a)(vi) of the Code; Radio or television broadcasting',
        CLASSIFICATION: 'Charitable Organization',
        DEDUCTIBILITY: 1,
        SUBSECTION: 3,
        NTEE_CD: '0',
        SORT_NAME: '0',
        validated: true,
        data: {
          name: 'OXFAM AMERICA',
          hero: {
            src: `${baseUrl}img/nonoprofit-base-hero-oxfam.jpg`,
          },
          default_hero: {
            src: `${baseUrl}img/nonoprofit-base-hero.jpg`,
          },
          about: 'We are an international confederation of 17 like-minded charitable organizations working together to bring about lasting solutions to poverty and injustice. We work with partners around the world to make a difference in the lives of people in need.',
          slogan: '',
          website: 'https://www.oxfam.org',
          city: 'MELROSE, MA',
          email: 'info@oxfam.org',
          ein: '20-1059569',
          background_cover: `${baseUrl}img/nonprofit-base-hero.jpg`,
          logo: {
            src: `${baseUrl}img/nonprofit-base-logo.png`,
          },
          media: [
            { id: '1', type: 'image', src: `${baseUrl}img/nonprofit-image-1.jpg` },
            { id: '2', type: 'image', src: `${baseUrl}img/nonprofit-image-2.jpg` },
            { id: '3', type: 'image', src: `${baseUrl}img/nonprofit-image-3.jpg` },
            { id: '4', type: 'image', src: `${baseUrl}img/nonprofit-image-4.png` },
            { id: '5', type: 'image', src: `${baseUrl}img/nonprofit-image-5.png` },
            { id: '6', type: 'image', src: `${baseUrl}img/nonprofit-image-6.jpg` },
            { id: '7', type: 'image', src: `${baseUrl}img/nonprofit-image-7.jpg` },
            { id: '8', type: 'image', src: `${baseUrl}img/nonprofit-image-8.jpg` },
            { id: '9', type: 'image', src: `${baseUrl}img/nonprofit-image-9.jpg` },
            { id: '10', type: 'image', src: `${baseUrl}img/nonprofit-image-10.jpg` },
            { id: '11', type: 'image', src: `${baseUrl}img/nonprofit-image-11.jpg` },
            { id: '12', type: 'image', src: `${baseUrl}img/nonprofit-image-12.jpg` },
            { id: '13', type: 'image', src: `${baseUrl}img/nonprofit-image-13.jpg` },
            { id: '14', type: 'image', src: `${baseUrl}img/nonprofit-image-14.jpg` },
            { id: '15', type: 'image', src: `${baseUrl}img/nonprofit-image-15.jpg` },
            { id: '16', type: 'image', src: `${baseUrl}img/nonprofit-image-16.jpg` },
            { id: '17', type: 'image', src: `${baseUrl}img/nonprofit-image-17.jpg` },
            { id: '18', type: 'image', src: `${baseUrl}img/nonprofit-image-18.png` },
            { id: '19', type: 'image', src: `${baseUrl}img/nonprofit-image-19.jpg` },
            { id: '20', type: 'image', src: `${baseUrl}img/nonprofit-image-20.jpg` },
            { id: '21', type: 'video', src: 'qXPzeJQua5k' },
            { id: '22', type: 'video', src: 'lE-y7FuJT8E' },
          ],
        },        
      }
    },
    fundraiser: {
      fundraiser_id: 254,
      user_id: 721,
      nonprofit_ein: 237069110,
      name: 'Giving up candy for three months to help ',
      description: 'Everyone deserves a chance, so I\'m doing a Give It Up for Good fundraiser to raise money for Oxfam America, an organization that helps people in poverty. I will be giving up candy for three months. I will donate all the money I save on candy to the nonprofit, and all donations that people make to my campaign will go to it too. You know I love my candy, so I\'m going to miss it, but it will be worth it to know people are going to have a brighter future.',
      intro_text: '<p>If you\'re inspired to support my cause, please do and all the money will go to Oxfam ... or give me some encouragement to live without candy. :-) I\'ll be fine, but many of the people that Oxfam helps won\'t be fine unless people step up to lend a hand. If you want more information about Oxfam, click the links on my page here that say Oxfam.</p>',
      picture: `${baseUrl}img/fundraiser-hero-3x2.jpg`,
      data: {
        media: [
          { id: '1', type: 'image', src: `${baseUrl}img/fundraiser-hero-3x2.jpg` },
          { id: '2', type: 'image', src: `${baseUrl}img/fundraiser-hero-1.jpg` },
          { id: '3', type: 'image', src: `${baseUrl}img/fundraiser-hero-1x1.jpg` },
          { id: '4', type: 'image', src: `${baseUrl}img/fundraiser-hero-2.jpg` },
          { id: '5', type: 'image', src: `${baseUrl}img/fundraiser-hero-4.jpg` },
          { id: '6', type: 'image', src: `${baseUrl}img/fundraiser-hero-4x3.jpg` },
          { id: '7', type: 'image', src: `${baseUrl}img/fundraiser-hero-5.jpg` },
          { id: '8', type: 'image', src: `${baseUrl}img/fundraiser-hero-9x16.jpg` },
          { id: '9', type: 'image', src: `${baseUrl}img/fundraiser-hero-16x9.jpg` },
          { id: '10', type: 'video', src: 'NbpRu-yzNfs' },
        ],
      },
      participant: {
        name: 'Carol',
        fullname: 'Joan Engelman',
        location: 'Youngstown, Ohio, US',
        email: 'john@email.com',
        avatar: {
          id: '1',
          type: 'image',
          src: `${baseUrl}img/donor-8.jpg`,
        },
      },
      nonprofit: {
        logo_square: `${baseUrl}img/oxfam-square.png`,
        logo: {
          src: `${baseUrl}img/nonprofit-base-logo.png`,
        },
        name: 'OXFAM AMERICA',
        website: 'https://melrose-massachusetts.tv',
        EIN: 237069110,
        STREET: '360 MAIN ST',
        CITY: 'MELROSE',
        STATE: 'MA',
        ZIP: '02176-4623',
        ACTIVITY: 'Described in section 170(b)1)(a)(vi) of the Code; Radio or television broadcasting',
        CLASSIFICATION: 'Charitable Organization',
        DEDUCTIBILITY: 1,
        SUBSECTION: 3,
        NTEE_CD: '0',
        SORT_NAME: '0',
      },
      giving_levelsx: [
        {
          id: 231, amount: 10, tagline: 'Per mile', description: 'For every 10 dollars spent, I will run a mile!',
        },
        {
          id: 232, amount: 25, tagline: 'Donor', description: 'Thank you for your donation!',
        },
        {
          id: 233, amount: 50, tagline: 'Shirt sponsor', description: 'Donate $50 and your name will go on the back of my race shirt as a sponsor!',
        },
        {
          id: 234, amount: 100, tagline: 'Per mile', description: "If you donate $100, your name will go on the back of my shirt as a sponsor and you'll get a t-shirt!",
        },
      ],
      profilePicUrl: 'https://vthon__nonprofit-generic.surge.sh/feed-the-children/profile-pic.jpg',
      currentStats: {
        hours: 100,
        donated: 45,
        donors: 4,
        goal: 400,
        daysLeft: 131,
      },
      updates_count: 2,
      comments_count: 5,
      donations_count: 6,
      shared_count: 12,
    },
    fundraisers: {
      data: JSON.parse(`[{"fundraiser_id":254,"user_id":721,"nonprofit_ein":237069110,"name":"Giving up candy for three months to help the poor","description":"Everyone deserves a chance, so I'm doing a Give It Up for Good fundraiser to raise money for Oxfam America, an organization that helps people in poverty. I will be giving up candy for three months. I will donate all the money I save on candy to the nonprofit, and all donations that people make to my campaign will go to it too. You know I love my candy, so I'm going to miss it, but it will be worth it to know people are going to have a brighter future.","intro_text":"<p>I\'m going to do a Volunteerathon in which I give 80 hours to the Lowell Food Pantry and raise money for Oxfam America. The food pantry helps feed people locally and Oxfam helps feed children in poor countries. So it\'s a win-win. I love serving people, so I\'m excited for it. My friend Elizabeth is joining me in the effort. Some of you may know her because she was a brides maid at my wedding and we go way back.</p><p>Click on my profile link to check out these other fundraisers I\'m doing now or will do in the future:</p><p>Young people are the future of our world, so I\'m also doing a Give It Up for Good fundraiser to raise money for Tutor the Children, an organization that matches youth with tutors and mentors. I will be giving up drinking coffee for four months. I will donate all the money I save on coffee to the nonprofit, and all donations to my campaign will go to it too. You know I love my coffee, so I\'m going to miss it, but it will be worth it to know kids are going to have a brighter future. </p><p>I\'m doing a Run for Good in March to raise money for cancer research. Breast cancer effects everyone. Nonprofits such as the Cancer Research Association are what give us hope for a brighter future by allowing for new research and treatments! Let\'s make best cancer history! I\'m going to run 15 miles from Denver to Boulder. I will post photos me starting and finishing the run after it\'s over. Please support my efforts and help those who are in need by making a donation to my run.</p><p>Everyone has a right to realize their potential, and to live in freedom with basic human rights. To make our world a better place and help people to have these rights, I\'m going to volunteer 150 hours for Amnesty International with all of the proceeds of my fundraiser going to Amnesty. They are a great nonprofit that does lots of great work.</p><p>I\'m also going to do a Noble New Year in 2019. I think that pets should not be hurt or abandoned without homes, which is why the nonprofit that I\'m raising money for is The Society for the Prevention of Cruelty to Animals. Here is information about them: </p><p>Rescuing, rehabilitating & re-homing shelter, homeless and abandoned animals. We are a non-profit 501(c)(3) & rely heavily on donations to continue help animals in need. Funding received will be used 100% for this purpose. </p><p>For my annual Quitathon, I will be quitting smoking and donating all of the money I save to the global Red Cross, with all donations to my fundraiser also going to it. I could really use your support in quitting, whether it be supporting my campaign or giving me encouragement when I\'m going through withdrawal. Besides adding years to my life, this will also help save the lives of others through medical care. Big thanks and love to you all.</p>","picture":"${baseUrl}img/fundraiser-hero-3x2.jpg","data":{"media":[{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-3x2.jpg"},{"id":"2","type":"image","src":"${baseUrl}img/fundraiser-hero-1.jpg"},{"id":"3","type":"image","src":"${baseUrl}img/fundraiser-hero-1x1.jpg"},{"id":"4","type":"image","src":"${baseUrl}img/fundraiser-hero-2.jpg"},{"id":"5","type":"image","src":"${baseUrl}img/fundraiser-hero-4.jpg"},{"id":"6","type":"image","src":"${baseUrl}img/fundraiser-hero-4x3.jpg"},{"id":"7","type":"image","src":"${baseUrl}img/fundraiser-hero-5.jpg"},{"id":"8","type":"image","src":"${baseUrl}img/fundraiser-hero-9x16.jpg"},{"id":"9","type":"image","src":"${baseUrl}img/fundraiser-hero-16x9.jpg"},{"id":"10","type":"video","src":"NbpRu-yzNfs"}]},"participant":{"name":"Joan","fullname":"Joan Engelman","location":"Youngstown, Ohio, US","email":"john@email.com","avatar":{"id":"1","type":"image","src":"${baseUrl}img/donor-8.jpg"}},"nonprofit":{"logo_square":"${baseUrl}img/oxfam-square.png","logo":{"src":"${baseUrl}img/fundraiser-feed-the-children-logo.png"},"name":"OXFAM AMERICA","website":"https://oxfam.org","EIN":237069110,"STREET":"360 MAIN ST","CITY":"MELROSE","STATE":"MA","ZIP":"02176-4623","ACTIVITY":"Described in section 170(b)1)(a)(vi) of the Code; Radio or television broadcasting","CLASSIFICATION":"Charitable Organization","DEDUCTIBILITY":1,"SUBSECTION":3,"NTEE_CD":"0","SORT_NAME":"0"},"giving_levelsx":[{"id":231,"amount":10,"tagline":"Per mile","description":"For every 10 dollars spent, I will run a mile!"},{"id":232,"amount":25,"tagline":"Donor","description":"Thank you for your donation!"},{"id":233,"amount":50,"tagline":"Shirt sponsor","description":"Donate $50 and your name will go on the back of my race shirt as a sponsor!"},{"id":234,"amount":100,"tagline":"Per mile","description":"If you donate $100, your name will go on the back of my shirt as a sponsor and you\'ll get a t-shirt!"}],"profilePicUrl":"https://vthon__nonprofit-generic.surge.sh/feed-the-children/profile-pic.jpg","currentStats":{"hours":100,"donated":145,"donors":6,"goal":1200,"daysLeft":131},"updates_count":5,"comments_count":6,"donations_count":6,"shared_count":12},{"fundraiser_id":255,"nonprofit_ein":237069110,"user_id":721,"name":"Volunteering for freedom","description":"Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis. ","data":{"media":[{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-1.jpg"},{"id":"2","type":"image","src":"${baseUrl}img/fundraiser-hero-1x1.jpg"},{"id":"3","type":"image","src":"${baseUrl}img/fundraiser-hero-2.jpg"},{"id":"4","type":"image","src":"${baseUrl}img/fundraiser-hero-4.jpg"},{"id":"5","type":"image","src":"${baseUrl}img/fundraiser-hero-4x3.jpg"},{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-5.jpg"},{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-9x16.jpg"},{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-16x9.jpg"},{"id":"1","type":"video","src":"NbpRu-yzNfs"}]},"participant":{"name":"Martina","fullname":"Martina Friedrichstrasse","location":"Youngstown, Ohio, US"},"profilePicUrl":"https://vthon__nonprofit-generic.surge.sh/feed-the-children/profile-pic.jpg","currentStats":{"hours":100,"donated":3250,"donors":6,"goal":9400,"daysLeft":31}},{"fundraiser_id":722,"nonprofit_ein":237069110,"name":"Haiti earthquake relief","description":"Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis. ","data":{"media":[{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-1x1.jpg"},{"id":"2","type":"image","src":"${baseUrl}img/fundraiser-hero-2.jpg"},{"id":"3","type":"image","src":"${baseUrl}img/fundraiser-hero-4.jpg"},{"id":"4","type":"image","src":"${baseUrl}img/fundraiser-hero-4x3.jpg"},{"id":"5","type":"image","src":"${baseUrl}img/fundraiser-hero-5.jpg"},{"id":"6","type":"image","src":"${baseUrl}img/fundraiser-hero-9x16.jpg"},{"id":"7","type":"image","src":"${baseUrl}img/fundraiser-hero-16x9.jpg"},{"id":"8","type":"video","src":"NbpRu-yzNfs"}]},"participant":{"name":"Ingrid","fullname":"Ingrid Kertzman","location":"Youngstown, Ohio, US"},"profilePicUrl":"https://vthon__nonprofit-generic.surge.sh/feed-the-children/profile-pic.jpg","currentStats":{"hours":100,"donated":250,"donors":6,"goal":1900,"daysLeft":131}},{"fundraiser_id":257,"nonprofit_ein":237069110,"name":"Never lost: restoring hope for abused children","description":"Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis. ","data":{"media":[{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-2.jpg"},{"id":"2","type":"image","src":"${baseUrl}img/fundraiser-hero-4.jpg"},{"id":"3","type":"image","src":"${baseUrl}img/fundraiser-hero-4x3.jpg"},{"id":"4","type":"image","src":"${baseUrl}img/fundraiser-hero-5.jpg"},{"id":"5","type":"image","src":"${baseUrl}img/fundraiser-hero-9x16.jpg"},{"id":"6","type":"image","src":"${baseUrl}img/fundraiser-hero-16x9.jpg"},{"id":"7","type":"video","src":"NbpRu-yzNfs"}]},"participant":{"name":"Sabina","fullname":"Sabina Rückbauer","location":"Youngstown, Ohio, US"},"profilePicUrl":"https://vthon__nonprofit-generic.surge.sh/feed-the-children/profile-pic.jpg","currentStats":{"hours":100,"donated":3250,"donors":6,"goal":6000,"daysLeft":131}},{"fundraiser_id":258,"nonprofit_ein":237069110,"name":"Tutoring children for the future","description":"Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis. ","data":{"media":[{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-4.jpg"},{"id":"2","type":"image","src":"${baseUrl}img/fundraiser-hero-4x3.jpg"},{"id":"3","type":"image","src":"${baseUrl}img/fundraiser-hero-5.jpg"},{"id":"4","type":"image","src":"${baseUrl}img/fundraiser-hero-9x16.jpg"},{"id":"5","type":"image","src":"${baseUrl}img/fundraiser-hero-16x9.jpg"},{"id":"6","type":"video","src":"NbpRu-yzNfs"}]},"participant":{"name":"Carol","fullname":"Carol Engelman","location":"Youngstown, Ohio, US"},"profilePicUrl":"https://vthon__nonprofit-generic.surge.sh/feed-the-children/profile-pic.jpg","currentStats":{"hours":100,"donated":1250,"donors":6,"goal":12000,"daysLeft":131}},{"fundraiser_id":259,"nonprofit_ein":237069110,"name":"Help give children life and love","description":"Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis. ","data":{"media":[{"id":"1","type":"image","src":"${baseUrl}img/fundraiser-hero-4x3.jpg"},{"id":"2","type":"image","src":"${baseUrl}img/fundraiser-hero-5.jpg"},{"id":"3","type":"image","src":"${baseUrl}img/fundraiser-hero-9x16.jpg"},{"id":"4","type":"image","src":"${baseUrl}img/fundraiser-hero-16x9.jpg"},{"id":"5","type":"video","src":"NbpRu-yzNfs"}]},"participant":{"name":"Carol","fullname":"Carol Engelman","location":"Youngstown, Ohio, US"},"profilePicUrl":"https://vthon__nonprofit-generic.surge.sh/feed-the-children/profile-pic.jpg","currentStats":{"hours":100,"donated":1250,"donors":6,"goal":12000,"daysLeft":131}}]`),
      current: 1,
      limit: 6,
    },
    updates: {
      data: [
        {
          id: 18,
          author_id: 24,
          fundraiser_id: 254,
          content: '<p>Latest update. Mauris nec pharetra massa. Nulla facilisi. Nulla at scelerisque ante. Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Quisque feugiat gravida faucibus. Praesent eget nisl bibendum, suscipit odio vitae, euismod nisl. Ut varius aliquam semper. Quisque ac aliquam leo. Suspendisse et rhoncus neque.</p><p>Ut eleifend leo eu est lobortis, nec lobortis magna fringilla. Nullam nec condimentum libero. Vivamus et tristique est, vitae venenatis tellus. Duis tempus nibh justo, at mattis turpis rhoncus ut. Morbi ac est id ex feugiat lacinia a sit amet arcu. Maecenas sit amet eros tellus. Ut sit amet mattis neque. Nunc leo risus, vulputate pellentesque interdum facilisis, suscipit ac sapien. Morbi volutpat ac turpis a blandit. Maecenas ultricies quis nunc vitae aliquam.</p><p>Nulla facilisi. Proin congue imperdiet volutpat. Vivamus quis enim a neque consequat dictum et sed lacus. Vestibulum aliquam vel metus non egestas. Duis ligula lacus, tincidunt a quam non, porta cursus elit. Nunc at fermentum quam. Duis ut elit justo. In eget pulvinar sapien. Cras interdum orci a pellentesque faucibus. Maecenas nec enim ac velit commodo faucibus. Nam vitae lorem sollicitudin, sodales eros ac, congue nibh. Aenean laoreet semper convallis. Vestibulum pharetra, purus non elementum convallis, lectus neque consequat magna, et dictum metus ante non lacus. Quisque scelerisque ex sit amet euismod semper.</p><p>Integer sed ante vitae arcu luctus ultrices. Donec iaculis est ut turpis malesuada, eu bibendum libero malesuada. Sed et fermentum est. Sed sit amet consequat nibh. Mauris posuere mi eu sapien vestibulum, ac viverra urna dictum. Vestibulum finibus enim et pharetra fringilla. Curabitur molestie, dui vitae lobortis dignissim, elit massa facilisis arcu, a lobortis odio felis et sem. Mauris lectus quam, varius in scelerisque ac, condimentum eget nisi. Sed ac vulputate purus, sit amet aliquam lacus. Sed eget euismod arcu. Quisque maximus, sapien at blandit vestibulum, lectus purus sagittis dui, vitae lacinia arcu sapien ut urna. Nunc laoreet mi eget libero condimentum ultricies. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p>',
          timestamp: 1517915925000,
          fullname: 'Alison Baxley',
          name: 'Alison',
          title: 'My fourth week of volunteering',
        },
        {
          id: 12,
          author_id: 24,
          fundraiser_id: 254,
          content: '<p>Mauris nec pharetra massa. Nulla facilisi. Nulla at scelerisque ante. Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Quisque feugiat gravida faucibus. Praesent eget nisl bibendum, suscipit odio vitae, euismod nisl. Ut varius aliquam semper. Quisque ac aliquam leo. Suspendisse et rhoncus neque.</p><p>Ut eleifend leo eu est lobortis, nec lobortis magna fringilla. Nullam nec condimentum libero. Vivamus et tristique est, vitae venenatis tellus. Duis tempus nibh justo, at mattis turpis rhoncus ut. Morbi ac est id ex feugiat lacinia a sit amet arcu. Maecenas sit amet eros tellus. Ut sit amet mattis neque. Nunc leo risus, vulputate pellentesque interdum facilisis, suscipit ac sapien. Morbi volutpat ac turpis a blandit. Maecenas ultricies quis nunc vitae aliquam.</p><p>Nulla facilisi. Proin congue imperdiet volutpat. Vivamus quis enim a neque consequat dictum et sed lacus. Vestibulum aliquam vel metus non egestas. Duis ligula lacus, tincidunt a quam non, porta cursus elit. Nunc at fermentum quam. Duis ut elit justo. In eget pulvinar sapien. Cras interdum orci a pellentesque faucibus. Maecenas nec enim ac velit commodo faucibus. Nam vitae lorem sollicitudin, sodales eros ac, congue nibh. Aenean laoreet semper convallis. Vestibulum pharetra, purus non elementum convallis, lectus neque consequat magna, et dictum metus ante non lacus. Quisque scelerisque ex sit amet euismod semper.</p><p>Integer sed ante vitae arcu luctus ultrices. Donec iaculis est ut turpis malesuada, eu bibendum libero malesuada. Sed et fermentum est. Sed sit amet consequat nibh. Mauris posuere mi eu sapien vestibulum, ac viverra urna dictum. Vestibulum finibus enim et pharetra fringilla. Curabitur molestie, dui vitae lobortis dignissim, elit massa facilisis arcu, a lobortis odio felis et sem. Mauris lectus quam, varius in scelerisque ac, condimentum eget nisi. Sed ac vulputate purus, sit amet aliquam lacus. Sed eget euismod arcu. Quisque maximus, sapien at blandit vestibulum, lectus purus sagittis dui, vitae lacinia arcu sapien ut urna. Nunc laoreet mi eget libero condimentum ultricies. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p>',
          timestamp: 1517415125000,
          fullname: 'Alison Baxley',
          name: 'Alison',
          title: 'My first week of volunteering',
        },
      ],
      current: 1,
      limit: 2,
    },
    comments: {
      data: [
        {
          id: 22,
          author_id: 24,
          fundraiser_id: 254,
          avatar: 'https://volunteerathon__fundraiser2.surge.sh/fundraiser/avatar.png',
          comment: '<p>This is great that you’re doing this good deed to help other people in need. I myself have needed help in the past and gladly, I have found this site.</p>',
          timestamp: 1517415125000,
          fullname: 'Mark Twain',
          name: 'Alison',
          replies: [
            {
              id: 23,
              author_id: 24,
              fundraiser_id: 254,
              reply_to: 22,
              avatar: null,
              comment: '<p>Indeed, that’s fantastic.</p>',
              timestamp: 1526504544000,
              fullname: 'George Gerschwinn',
              name: 'George',
            },
            {
              id: 24,
              author_id: 24,
              fundraiser_id: 254,
              reply_to: 22,
              avatar: null,
              comment: '<p>Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p>',
              timestamp: 1521504544000,
              fullname: 'Dave Weckl',
              name: 'Dave',
            },
          ],
        },
        {
          id: 25,
          author_id: 24,
          fundraiser_id: 254,
          reply_to: 22,
          avatar: null,
          comment: '<p>Indeed, that’s fantastic.</p>',
          timestamp: 1526504544000,
          fullname: 'Jen Zuckerberg',
          name: 'Jen',
        },
        {
          id: 26,
          author_id: 24,
          fundraiser_id: 254,
          reply_to: 22,
          avatar: null,
          comment: '<p>Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p>',
          timestamp: 1521504544000,
          fullname: 'Martin Luc-Defau',
          name: 'Martin',
        },
      ],
      current: 1,
      limit: 3,
      latest: null,
    },
    donations: {
      data: [
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 721,
          amount: 45,
          fullname: 'Francisca Morana',
          firstname: 'Francisca',
          lastname: 'Morana',
          avatar: `${baseUrl}img/donor-1.jpg`,
          timestamp: 1521504544000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 722,
          amount: 30,
          fullname: 'Ariadna Beckenbauer',
          firstname: 'Ariadna',
          lastname: 'Beckenbauer',
          avatar: `${baseUrl}img/donor-3.jpg`,
          timestamp: 1526504544000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 723,
          amount: 35,
          fullname: 'Andreas Higgins',
          firstname: 'Andreas',
          lastname: 'Higgins',
          avatar: `${baseUrl}img/donor-4.jpg`,
          timestamp: 1539504944000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 724,
          amount: 40,
          fullname: 'Luisa Lane',
          firstname: 'Luisa',
          lastname: 'Lane',
          avatar: `${baseUrl}img/donor-5.jpg`,
          timestamp: 1536504944000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 725,
          amount: 25,
          fullname: 'Martin Fitzgerald',
          firstname: 'Martin',
          lastname: 'Fitzgerald',
          avatar: `${baseUrl}img/donor-6.jpg`,
          timestamp: 1516504944000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 726,
          amount: 25,
          fullname: 'Sandra Martignon',
          firstname: 'Sandra',
          lastname: 'Martignon',
          avatar: `${baseUrl}img/donor-10.jpg`,
          timestamp: 1540504944000,
          public: true,
        },
      ],
      current: 1,
      limit: 2,
    },
    topFundraisers: {
      data: [
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 721,
          amount: 625,
          fullname: 'Francisca Morana',
          firstname: 'Francisca',
          lastname: 'Morana',
          avatar: `${baseUrl}img/donor-1.jpg`,
          timestamp: 1521504544000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 722,
          amount: 550,
          fullname: 'Ariadna Beckenbauer',
          firstname: 'Ariadna',
          lastname: 'Beckenbauer',
          avatar: `${baseUrl}img/donor-3.jpg`,
          timestamp: 1526504544000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 723,
          amount: 400,
          fullname: 'Andreas Higgins',
          firstname: 'Andreas',
          lastname: 'Higgins',
          avatar: `${baseUrl}img/donor-4.jpg`,
          timestamp: 1526504944000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 724,
          amount: 350,
          fullname: 'Luisa Lane',
          firstname: 'Luisa',
          lastname: 'Lane',
          avatar: `${baseUrl}img/donor-5.jpg`,
          timestamp: 1526504944000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 725,
          amount: 220,
          fullname: 'Martin Fitzgerald',
          firstname: 'Martin',
          lastname: 'Fitzgerald',
          avatar: `${baseUrl}img/donor-6.jpg`,
          timestamp: 1526504944000,
          public: true,
        },
        {
          fundraiser_id: 254,
          nonprofit_ein: 43138428,
          user_id: 726,
          amount: 180,
          fullname: 'Sandra Martignon',
          firstname: 'Sandra',
          lastname: 'Martignon',
          avatar: `${baseUrl}img/donor-10.jpg`,
          timestamp: 1526504944000,
          public: true,
        },
        {
          fundraiser_id: 255,
          nonprofit_ein: 43138427,
          user_id: 726,
          amount: 180,
          fullname: 'Sandra Martignon',
          firstname: 'Sandra',
          lastname: 'Martignon',
          avatar: `${baseUrl}img/donor-10.jpg`,
          timestamp: 1526504944000,
          public: true,
        },
      ],
      current: 1,
      limit: 6,
    },
    home: {},
    explore: {
      fundraisers: {
        data: [],
      },
    },
    user: {
      id: null,
      loggedIn: false,
      email: null,
      fullName: null,
      firstname: null,
      paymentMethods: [
      ],
      data: {},
    },
    userActions: {
      donation: {
        status: '',
        amount: 350,
        email: null,
        initiator: {},
      },
    },
    extra: {
      request: {},
    },
  },
  actions,
  mutations,
  modules: {
    selections,
    bannerSwitcher
  }
});
