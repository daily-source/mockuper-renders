import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import nonprofits from './modules/nonprofits'
import video from './modules/video'
import info from './modules/info'
import navbar from './modules/navbar'
import map from './modules/map'
import splash from './modules/splash'
import nonprofitRegistration from './modules/nonprofitRegistration'
import nonprofitDirectory from './modules/nonprofitDirectory'
import stations from './modules/stations'

Vue.use(Vuex)
const baseURL = process.env.VUE_APP_BASE_URL

export default new Vuex.Store({
  // TODO: When logged in is implemented, this module should be on a file of
  // it's own
  state: {
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
    commonData: {
      fundraisers: {
        data: [
          {
            "id": 2,
            "name": "Help give children life and love",
            "introText": "<p>Mauris nec pharetra massa. Nulla facilisi. Nulla at scelerisque ante. Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Quisque feugiat gravida faucibus. Praesent eget nisl bibendum, suscipit odio vitae, euismod nisl. Ut varius aliquam semper. Quisque ac aliquam leo. Suspendisse et rhoncus neque.</p><p>Ut eleifend leo eu est lobortis, nec lobortis magna fringilla. Nullam nec condimentum libero. Vivamus et tristique est, vitae venenatis tellus. Duis tempus nibh justo, at mattis turpis rhoncus ut. Morbi ac est id ex feugiat lacinia a sit amet arcu. Maecenas sit amet eros tellus. Ut sit amet mattis neque. Nunc leo risus, vulputate pellentesque interdum facilisis, suscipit ac sapien. Morbi volutpat ac turpis a blandit. Maecenas ultricies quis nunc vitae aliquam.</p><p>Nulla facilisi. Proin congue imperdiet volutpat. Vivamus quis enim a neque consequat dictum et sed lacus. Vestibulum aliquam vel metus non egestas. Duis ligula lacus, tincidunt a quam non, porta cursus elit. Nunc at fermentum quam. Duis ut elit justo. In eget pulvinar sapien. Cras interdum orci a pellentesque faucibus. Maecenas nec enim ac velit commodo faucibus. Nam vitae lorem sollicitudin, sodales eros ac, congue nibh. Aenean laoreet semper convallis. Vestibulum pharetra, purus non elementum convallis, lectus neque consequat magna, et dictum metus ante non lacus. Quisque scelerisque ex sit amet euismod semper.</p><p>Integer sed ante vitae arcu luctus ultrices. Donec iaculis est ut turpis malesuada, eu bibendum libero malesuada. Sed et fermentum est. Sed sit amet consequat nibh. Mauris posuere mi eu sapien vestibulum, ac viverra urna dictum. Vestibulum finibus enim et pharetra fringilla. Curabitur molestie, dui vitae lobortis dignissim, elit massa facilisis arcu, a lobortis odio felis et sem. Mauris lectus quam, varius in scelerisque ac, condimentum eget nisi. Sed ac vulputate purus, sit amet aliquam lacus. Sed eget euismod arcu. Quisque maximus, sapien at blandit vestibulum, lectus purus sagittis dui, vitae lacinia arcu sapien ut urna. Nunc laoreet mi eget libero condimentum ultricies. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p><p>Nam quis ligula nibh. Duis viverra at diam a sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ullamcorper nisl et metus dictum viverra. Nam vel iaculis est. Nunc elementum in mauris convallis auctor. Mauris ac enim felis. Sed eget venenatis purus. Nam varius mattis massa.</p><p>Integer rhoncus pretium molestie. Morbi bibendum iaculis volutpat. Morbi id velit lobortis, porttitor neque et, ornare turpis. Sed at tincidunt enim, nec lobortis sapien. Donec posuere, ante at rhoncus euismod, enim libero porta turpis, vel blandit lacus lacus tempus urna. Ut quis lacus eleifend, interdum lorem at, sollicitudin ligula. Suspendisse vel lectus consectetur, gravida dui blandit, molestie erat. Phasellus sit amet mauris sapien. Curabitur vitae tempor elit. Duis id ultricies leo. Nunc quam erat, euismod viverra facilisis eu, rutrum viverra arcu. Quisque porta, orci eget congue hendrerit, quam libero porta diam, vel dictum mauris risus eget nibh. Ut at mi risus. Aliquam in dignissim augue. Vestibulum eros leo, sollicitudin consectetur ipsum ac, rutrum lacinia tortor.</p><p>Nam ullamcorper arcu sed euismod cursus. Nam pretium ultricies lacus. Aliquam auctor diam velit, id consectetur nulla ultrices a. Maecenas pretium arcu in placerat rutrum. Morbi fringilla lectus id magna ullamcorper, eget gravida odio hendrerit. Vivamus non aliquet eros. Phasellus eget lectus at libero tincidunt sollicitudin. Nam interdum vitae justo molestie imperdiet.</p>",
            "description": "Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis.",
            "participant": {
              "fullname": "Joan Engelman",
              "email": "joan.engelman@mail.com",
            },
            "User": {
              "fullname": "Joan Engelman",
              "email": "joan.engelman@mail.com",
              "firstName": "Joan",
              lastName: "Engelman",
            },
            "fundraiserDetails": {
              "goal": 80000,
              "donated": 55000,
              "timestamp": 1533470481336,
            },
            "media": {
              images: [
                `${baseURL}img/fundraiser-hero-9x16.jpg`,
              ]
            }
          },
          {
            "id": 2,
            "name": "For a Brighter Future",
            "introText": "<p>Mauris nec pharetra massa. Nulla facilisi. Nulla at scelerisque ante. Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Quisque feugiat gravida faucibus. Praesent eget nisl bibendum, suscipit odio vitae, euismod nisl. Ut varius aliquam semper. Quisque ac aliquam leo. Suspendisse et rhoncus neque.</p><p>Ut eleifend leo eu est lobortis, nec lobortis magna fringilla. Nullam nec condimentum libero. Vivamus et tristique est, vitae venenatis tellus. Duis tempus nibh justo, at mattis turpis rhoncus ut. Morbi ac est id ex feugiat lacinia a sit amet arcu. Maecenas sit amet eros tellus. Ut sit amet mattis neque. Nunc leo risus, vulputate pellentesque interdum facilisis, suscipit ac sapien. Morbi volutpat ac turpis a blandit. Maecenas ultricies quis nunc vitae aliquam.</p><p>Nulla facilisi. Proin congue imperdiet volutpat. Vivamus quis enim a neque consequat dictum et sed lacus. Vestibulum aliquam vel metus non egestas. Duis ligula lacus, tincidunt a quam non, porta cursus elit. Nunc at fermentum quam. Duis ut elit justo. In eget pulvinar sapien. Cras interdum orci a pellentesque faucibus. Maecenas nec enim ac velit commodo faucibus. Nam vitae lorem sollicitudin, sodales eros ac, congue nibh. Aenean laoreet semper convallis. Vestibulum pharetra, purus non elementum convallis, lectus neque consequat magna, et dictum metus ante non lacus. Quisque scelerisque ex sit amet euismod semper.</p><p>Integer sed ante vitae arcu luctus ultrices. Donec iaculis est ut turpis malesuada, eu bibendum libero malesuada. Sed et fermentum est. Sed sit amet consequat nibh. Mauris posuere mi eu sapien vestibulum, ac viverra urna dictum. Vestibulum finibus enim et pharetra fringilla. Curabitur molestie, dui vitae lobortis dignissim, elit massa facilisis arcu, a lobortis odio felis et sem. Mauris lectus quam, varius in scelerisque ac, condimentum eget nisi. Sed ac vulputate purus, sit amet aliquam lacus. Sed eget euismod arcu. Quisque maximus, sapien at blandit vestibulum, lectus purus sagittis dui, vitae lacinia arcu sapien ut urna. Nunc laoreet mi eget libero condimentum ultricies. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p><p>Nam quis ligula nibh. Duis viverra at diam a sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ullamcorper nisl et metus dictum viverra. Nam vel iaculis est. Nunc elementum in mauris convallis auctor. Mauris ac enim felis. Sed eget venenatis purus. Nam varius mattis massa.</p><p>Integer rhoncus pretium molestie. Morbi bibendum iaculis volutpat. Morbi id velit lobortis, porttitor neque et, ornare turpis. Sed at tincidunt enim, nec lobortis sapien. Donec posuere, ante at rhoncus euismod, enim libero porta turpis, vel blandit lacus lacus tempus urna. Ut quis lacus eleifend, interdum lorem at, sollicitudin ligula. Suspendisse vel lectus consectetur, gravida dui blandit, molestie erat. Phasellus sit amet mauris sapien. Curabitur vitae tempor elit. Duis id ultricies leo. Nunc quam erat, euismod viverra facilisis eu, rutrum viverra arcu. Quisque porta, orci eget congue hendrerit, quam libero porta diam, vel dictum mauris risus eget nibh. Ut at mi risus. Aliquam in dignissim augue. Vestibulum eros leo, sollicitudin consectetur ipsum ac, rutrum lacinia tortor.</p><p>Nam ullamcorper arcu sed euismod cursus. Nam pretium ultricies lacus. Aliquam auctor diam velit, id consectetur nulla ultrices a. Maecenas pretium arcu in placerat rutrum. Morbi fringilla lectus id magna ullamcorper, eget gravida odio hendrerit. Vivamus non aliquet eros. Phasellus eget lectus at libero tincidunt sollicitudin. Nam interdum vitae justo molestie imperdiet.</p>",
            "description": "Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis.",
            "participant": {
              "fullname": "Martina Martins",
              "email": "joan.engelman@mail.com",
            },
            "User": {
              "fullname": "Martina Martins",
              "email": "martina.martins@mail.com",
              "firstName": "Martina",
              lastName: "Martins",
            },
            "fundraiserDetails": {
              "goal": 60000,
              "donated": 24000,
              "timestamp": 1533470481336,
            },
            "media": {
              images: [
                `${baseURL}img/fundraiser-hero-4x3.jpg`,
              ]
            }
          },
          {
            "id": 2,
            "name": "Raising money for children in need",
            "introText": "<p>Mauris nec pharetra massa. Nulla facilisi. Nulla at scelerisque ante. Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Quisque feugiat gravida faucibus. Praesent eget nisl bibendum, suscipit odio vitae, euismod nisl. Ut varius aliquam semper. Quisque ac aliquam leo. Suspendisse et rhoncus neque.</p><p>Ut eleifend leo eu est lobortis, nec lobortis magna fringilla. Nullam nec condimentum libero. Vivamus et tristique est, vitae venenatis tellus. Duis tempus nibh justo, at mattis turpis rhoncus ut. Morbi ac est id ex feugiat lacinia a sit amet arcu. Maecenas sit amet eros tellus. Ut sit amet mattis neque. Nunc leo risus, vulputate pellentesque interdum facilisis, suscipit ac sapien. Morbi volutpat ac turpis a blandit. Maecenas ultricies quis nunc vitae aliquam.</p><p>Nulla facilisi. Proin congue imperdiet volutpat. Vivamus quis enim a neque consequat dictum et sed lacus. Vestibulum aliquam vel metus non egestas. Duis ligula lacus, tincidunt a quam non, porta cursus elit. Nunc at fermentum quam. Duis ut elit justo. In eget pulvinar sapien. Cras interdum orci a pellentesque faucibus. Maecenas nec enim ac velit commodo faucibus. Nam vitae lorem sollicitudin, sodales eros ac, congue nibh. Aenean laoreet semper convallis. Vestibulum pharetra, purus non elementum convallis, lectus neque consequat magna, et dictum metus ante non lacus. Quisque scelerisque ex sit amet euismod semper.</p><p>Integer sed ante vitae arcu luctus ultrices. Donec iaculis est ut turpis malesuada, eu bibendum libero malesuada. Sed et fermentum est. Sed sit amet consequat nibh. Mauris posuere mi eu sapien vestibulum, ac viverra urna dictum. Vestibulum finibus enim et pharetra fringilla. Curabitur molestie, dui vitae lobortis dignissim, elit massa facilisis arcu, a lobortis odio felis et sem. Mauris lectus quam, varius in scelerisque ac, condimentum eget nisi. Sed ac vulputate purus, sit amet aliquam lacus. Sed eget euismod arcu. Quisque maximus, sapien at blandit vestibulum, lectus purus sagittis dui, vitae lacinia arcu sapien ut urna. Nunc laoreet mi eget libero condimentum ultricies. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p><p>Nam quis ligula nibh. Duis viverra at diam a sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ullamcorper nisl et metus dictum viverra. Nam vel iaculis est. Nunc elementum in mauris convallis auctor. Mauris ac enim felis. Sed eget venenatis purus. Nam varius mattis massa.</p><p>Integer rhoncus pretium molestie. Morbi bibendum iaculis volutpat. Morbi id velit lobortis, porttitor neque et, ornare turpis. Sed at tincidunt enim, nec lobortis sapien. Donec posuere, ante at rhoncus euismod, enim libero porta turpis, vel blandit lacus lacus tempus urna. Ut quis lacus eleifend, interdum lorem at, sollicitudin ligula. Suspendisse vel lectus consectetur, gravida dui blandit, molestie erat. Phasellus sit amet mauris sapien. Curabitur vitae tempor elit. Duis id ultricies leo. Nunc quam erat, euismod viverra facilisis eu, rutrum viverra arcu. Quisque porta, orci eget congue hendrerit, quam libero porta diam, vel dictum mauris risus eget nibh. Ut at mi risus. Aliquam in dignissim augue. Vestibulum eros leo, sollicitudin consectetur ipsum ac, rutrum lacinia tortor.</p><p>Nam ullamcorper arcu sed euismod cursus. Nam pretium ultricies lacus. Aliquam auctor diam velit, id consectetur nulla ultrices a. Maecenas pretium arcu in placerat rutrum. Morbi fringilla lectus id magna ullamcorper, eget gravida odio hendrerit. Vivamus non aliquet eros. Phasellus eget lectus at libero tincidunt sollicitudin. Nam interdum vitae justo molestie imperdiet.</p>",
            "description": "Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis.",
            "participant": {
              "fullname": "Carol Canter",
              "email": "joan.engelman@mail.com",
            },
            "User": {
              "fullname": "Carol Canter",
              "email": "carol.canter@mail.com",
              "firstName": "Carol",
              lastName: "Canter",
            },
            "fundraiserDetails": {
              "goal": 100000,
              "donated": 85000,
              "timestamp": 1533470481336,
            },
            "media": {
              images: [
                `${baseURL}img/fundraiser-hero-3x2.jpg`,
              ]
            }
          },
          {
            "id": 3,
            "name": "Let's feed the hungry",
            "introText": "<p>Mauris nec pharetra massa. Nulla facilisi. Nulla at scelerisque ante. Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Quisque feugiat gravida faucibus. Praesent eget nisl bibendum, suscipit odio vitae, euismod nisl. Ut varius aliquam semper. Quisque ac aliquam leo. Suspendisse et rhoncus neque.</p><p>Ut eleifend leo eu est lobortis, nec lobortis magna fringilla. Nullam nec condimentum libero. Vivamus et tristique est, vitae venenatis tellus. Duis tempus nibh justo, at mattis turpis rhoncus ut. Morbi ac est id ex feugiat lacinia a sit amet arcu. Maecenas sit amet eros tellus. Ut sit amet mattis neque. Nunc leo risus, vulputate pellentesque interdum facilisis, suscipit ac sapien. Morbi volutpat ac turpis a blandit. Maecenas ultricies quis nunc vitae aliquam.</p><p>Nulla facilisi. Proin congue imperdiet volutpat. Vivamus quis enim a neque consequat dictum et sed lacus. Vestibulum aliquam vel metus non egestas. Duis ligula lacus, tincidunt a quam non, porta cursus elit. Nunc at fermentum quam. Duis ut elit justo. In eget pulvinar sapien. Cras interdum orci a pellentesque faucibus. Maecenas nec enim ac velit commodo faucibus. Nam vitae lorem sollicitudin, sodales eros ac, congue nibh. Aenean laoreet semper convallis. Vestibulum pharetra, purus non elementum convallis, lectus neque consequat magna, et dictum metus ante non lacus. Quisque scelerisque ex sit amet euismod semper.</p><p>Integer sed ante vitae arcu luctus ultrices. Donec iaculis est ut turpis malesuada, eu bibendum libero malesuada. Sed et fermentum est. Sed sit amet consequat nibh. Mauris posuere mi eu sapien vestibulum, ac viverra urna dictum. Vestibulum finibus enim et pharetra fringilla. Curabitur molestie, dui vitae lobortis dignissim, elit massa facilisis arcu, a lobortis odio felis et sem. Mauris lectus quam, varius in scelerisque ac, condimentum eget nisi. Sed ac vulputate purus, sit amet aliquam lacus. Sed eget euismod arcu. Quisque maximus, sapien at blandit vestibulum, lectus purus sagittis dui, vitae lacinia arcu sapien ut urna. Nunc laoreet mi eget libero condimentum ultricies. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p><p>Nam quis ligula nibh. Duis viverra at diam a sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ullamcorper nisl et metus dictum viverra. Nam vel iaculis est. Nunc elementum in mauris convallis auctor. Mauris ac enim felis. Sed eget venenatis purus. Nam varius mattis massa.</p><p>Integer rhoncus pretium molestie. Morbi bibendum iaculis volutpat. Morbi id velit lobortis, porttitor neque et, ornare turpis. Sed at tincidunt enim, nec lobortis sapien. Donec posuere, ante at rhoncus euismod, enim libero porta turpis, vel blandit lacus lacus tempus urna. Ut quis lacus eleifend, interdum lorem at, sollicitudin ligula. Suspendisse vel lectus consectetur, gravida dui blandit, molestie erat. Phasellus sit amet mauris sapien. Curabitur vitae tempor elit. Duis id ultricies leo. Nunc quam erat, euismod viverra facilisis eu, rutrum viverra arcu. Quisque porta, orci eget congue hendrerit, quam libero porta diam, vel dictum mauris risus eget nibh. Ut at mi risus. Aliquam in dignissim augue. Vestibulum eros leo, sollicitudin consectetur ipsum ac, rutrum lacinia tortor.</p><p>Nam ullamcorper arcu sed euismod cursus. Nam pretium ultricies lacus. Aliquam auctor diam velit, id consectetur nulla ultrices a. Maecenas pretium arcu in placerat rutrum. Morbi fringilla lectus id magna ullamcorper, eget gravida odio hendrerit. Vivamus non aliquet eros. Phasellus eget lectus at libero tincidunt sollicitudin. Nam interdum vitae justo molestie imperdiet.</p>",
            "description": "Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis.",
            "participant": {
              "fullname": "Patricia Mourraile",
              "email": "joan.engelman@mail.com",
            },
            "User": {
              "fullname": "Patricia Martins",
              "email": "partricia.mourraile@Mourraile.com",
              "firstName": "Patricia",
              lastName: "Mourraile",
            },
            "fundraiserDetails": {
              "goal": 200000,
              "donated": 93000,
              "timestamp": 1533470481336,
            },
            "media": {
              images: [
                `${baseURL}img/fundraiser-hero-1x1.jpg`,
              ]
            }
          },
          {
            "id": 4,
            "name": "In support of freedom",
            "introText": "<p>Mauris nec pharetra massa. Nulla facilisi. Nulla at scelerisque ante. Nam at nisi vel odio fringilla ultrices. Phasellus quis nunc consectetur, ullamcorper sapien ut, condimentum risus. Quisque feugiat gravida faucibus. Praesent eget nisl bibendum, suscipit odio vitae, euismod nisl. Ut varius aliquam semper. Quisque ac aliquam leo. Suspendisse et rhoncus neque.</p><p>Ut eleifend leo eu est lobortis, nec lobortis magna fringilla. Nullam nec condimentum libero. Vivamus et tristique est, vitae venenatis tellus. Duis tempus nibh justo, at mattis turpis rhoncus ut. Morbi ac est id ex feugiat lacinia a sit amet arcu. Maecenas sit amet eros tellus. Ut sit amet mattis neque. Nunc leo risus, vulputate pellentesque interdum facilisis, suscipit ac sapien. Morbi volutpat ac turpis a blandit. Maecenas ultricies quis nunc vitae aliquam.</p><p>Nulla facilisi. Proin congue imperdiet volutpat. Vivamus quis enim a neque consequat dictum et sed lacus. Vestibulum aliquam vel metus non egestas. Duis ligula lacus, tincidunt a quam non, porta cursus elit. Nunc at fermentum quam. Duis ut elit justo. In eget pulvinar sapien. Cras interdum orci a pellentesque faucibus. Maecenas nec enim ac velit commodo faucibus. Nam vitae lorem sollicitudin, sodales eros ac, congue nibh. Aenean laoreet semper convallis. Vestibulum pharetra, purus non elementum convallis, lectus neque consequat magna, et dictum metus ante non lacus. Quisque scelerisque ex sit amet euismod semper.</p><p>Integer sed ante vitae arcu luctus ultrices. Donec iaculis est ut turpis malesuada, eu bibendum libero malesuada. Sed et fermentum est. Sed sit amet consequat nibh. Mauris posuere mi eu sapien vestibulum, ac viverra urna dictum. Vestibulum finibus enim et pharetra fringilla. Curabitur molestie, dui vitae lobortis dignissim, elit massa facilisis arcu, a lobortis odio felis et sem. Mauris lectus quam, varius in scelerisque ac, condimentum eget nisi. Sed ac vulputate purus, sit amet aliquam lacus. Sed eget euismod arcu. Quisque maximus, sapien at blandit vestibulum, lectus purus sagittis dui, vitae lacinia arcu sapien ut urna. Nunc laoreet mi eget libero condimentum ultricies. Phasellus quam augue, congue ac est ac, rutrum tincidunt nibh.</p><p>Nam quis ligula nibh. Duis viverra at diam a sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ullamcorper nisl et metus dictum viverra. Nam vel iaculis est. Nunc elementum in mauris convallis auctor. Mauris ac enim felis. Sed eget venenatis purus. Nam varius mattis massa.</p><p>Integer rhoncus pretium molestie. Morbi bibendum iaculis volutpat. Morbi id velit lobortis, porttitor neque et, ornare turpis. Sed at tincidunt enim, nec lobortis sapien. Donec posuere, ante at rhoncus euismod, enim libero porta turpis, vel blandit lacus lacus tempus urna. Ut quis lacus eleifend, interdum lorem at, sollicitudin ligula. Suspendisse vel lectus consectetur, gravida dui blandit, molestie erat. Phasellus sit amet mauris sapien. Curabitur vitae tempor elit. Duis id ultricies leo. Nunc quam erat, euismod viverra facilisis eu, rutrum viverra arcu. Quisque porta, orci eget congue hendrerit, quam libero porta diam, vel dictum mauris risus eget nibh. Ut at mi risus. Aliquam in dignissim augue. Vestibulum eros leo, sollicitudin consectetur ipsum ac, rutrum lacinia tortor.</p><p>Nam ullamcorper arcu sed euismod cursus. Nam pretium ultricies lacus. Aliquam auctor diam velit, id consectetur nulla ultrices a. Maecenas pretium arcu in placerat rutrum. Morbi fringilla lectus id magna ullamcorper, eget gravida odio hendrerit. Vivamus non aliquet eros. Phasellus eget lectus at libero tincidunt sollicitudin. Nam interdum vitae justo molestie imperdiet.</p>",
            "description": "Praesent bibendum gravida diam faucibus lobortis. Nulla a leo id mauris fringilla dictum dictum vitae ligula. Etiam maximus turpis vel dolor venenatis malesuada. Duis eget rutrum elit. Fusce elementum tempor condimentum. Cras feugiat consectetur sem, non scelerisque nisi. Donec eu magna a ante imperdiet accumsan. In tempus laoreet mi aliquet fermentum. Nullam nec cursus est. Nulla dapibus dolor fermentum hendrerit lobortis.",
            "participant": {
              "fullname": "Chester Thompson",
              "email": "joan.engelman@mail.com",
            },
            "User": {
              "fullname": "Chester Thompson",
              "email": "chester.thompson@Mourraile.com",
              "firstName": "Chester",
              lastName: "Thompson",
            },
            "fundraiserDetails": {
              "goal": 70000,
              "donated": 15000,
              "timestamp": 1533470481336,
            },
            "media": {
              images: [
                `${baseURL}img/fundraiser-hero-2.jpg`,
              ]
            }
          },
        ],
        current: 1,
        limit: 6,
      },
      donations: {
        byAmount: {
          data: [
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 721, amountInCents: 45000, User: { firstName: "Francisca", lastName: "Morana", nickname: "Fran", avatar: `${baseURL}img/donor-5.jpg` }, fullname: 'Clare Nightingale', firstName: 'Clare', lastName: 'Nightingale', avatar: `${baseURL}img/donor-1.jpg`, createdAt: 1521504544000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 722, amountInCents: 31000, fullname: 'Ariadna Beckenbauer', firstName: 'Ariadna', lastName: 'Beckenbauer', createdAt: 1526504544000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 723, amountInCents: 27500, fullname: 'Tori Stowe', firstName: 'Tori', lastName: 'Stowe', User: { avatar: `${baseURL}img/donor-3.jpg`  }, createdAt: 1539504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 724, amountInCents: 20000, fullname: 'Nat Cohen', firstName: 'Nat', lastName: 'Cohen', avatar: `${baseURL}img/donor-5.jpg` , createdAt: 1536504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 725, amountInCents: 16000, fullname: 'Martin Fitzgerald', firstName: 'Martin', lastName: 'Fitzgerald', User: {avatar: `${baseURL}img/donor-6.jpg` }, createdAt: 1516504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 726, amountInCents: 14000, fullname: 'John Mitchell', firstName: 'John', lastName: 'Mitchell', User: {avatar: `${baseURL}img/donor-2.jpg` }, createdAt: 1540504944000, public: true, },
          ]
        },
        byDate: {
          data: [
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 721, amountInCents: 4500, User: { firstName: "Francisca", lastName: "Morana", nickname: "Fran", avatar: `${baseURL}img/donor-1.jpg` }, fullname: 'Francisca Morana', firstName: 'Francisca', lastName: 'Morana', avatar: `${baseURL}img/donor-1.jpg`, createdAt: 1521504544000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 722, amountInCents: 3000, fullname: 'Ariadna Beckenbauer', firstName: 'Ariadna', lastName: 'Beckenbauer', createdAt: 1526504544000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 723, amountInCents: 3500, fullname: 'Andreas Higgins', firstName: 'Andreas', lastName: 'Higgins', avatar: `${baseURL}img/donor-4.jpg`, createdAt: 1539504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 724, amountInCents: 4000, fullname: 'Luisa Lane', firstName: 'Luisa', lastName: 'Lane', avatar: `${baseURL}img/donor-5.jpg`, createdAt: 1536504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 725, amountInCents: 2500, fullname: 'Martin Fitzgerald', firstName: 'Martin', lastName: 'Fitzgerald', User: {avatar: `${baseURL}img/donor-6.jpg` }, createdAt: 1516504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 726, amountInCents: 2500, fullname: 'Sandra Martignon', firstName: 'Sandra', lastName: 'Martignon', User: {avatar: `${baseURL}img/donor-10.jpg` }, createdAt: 1540504944000, public: true, },
          ]
        },
        topFundraisers: {
          data: [
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 721, amountInCents: 214500, firstName: "Francisca", lastName: "Morana", nickname: "Fran", User: { firstName: "Francisca", lastName: "Morana", nickname: "Fran", avatar: `${baseURL}img/donor-1.jpg`, fullname: 'Francisca Morana', firstName: 'Francisca', lastName: 'Morana', createdAt: 1521504544000, public: true, } },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 723, amountInCents: 193500, fullname: 'Andreas Higgins', firstName: 'Andreas', lastName: 'Higgins', User: { avatar: `${baseURL}img/donor-4.jpg` }, createdAt: 1539504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 722, amountInCents: 153400, fullname: 'Joey Douglass', firstName: 'Joey', lastName: 'Douglass', createdAt: 1526504544000, public: true  },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 725, amountInCents: 132500, fullname: 'Martin Fitzgerald', firstName: 'Martin', lastName: 'Fitzgerald', User: {avatar: `${baseURL}img/donor-6.jpg` }, createdAt: 1516504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 726, amountInCents: 215000, fullname: 'Sandra Martignon', firstName: 'Sandra', lastName: 'Martignon', User: {avatar: `${baseURL}img/donor-10.jpg` }, createdAt: 1540504944000, public: true, },
            { fundraiser_id: 254, nonprofit_ein: 237069110, user_id: 724, amountInCents: 117300, fullname: 'Caleb Garrison', firstName: 'Caleb', lastName: 'Garrison', avatar: `${baseURL}img/donor-5.jpg`, createdAt: 1536504944000, public: true, },
          ]
        },
        current: 1,
        limit: 2,
      },
    },
  },
  // TODO: Common data for all nonprofits. Should be removed once backend is setup
	modules: {
		users,
		nonprofits,
		video,
		info,
		navbar,
		map,
    splash,
    nonprofitRegistration,
    nonprofitDirectory,
    stations,
	},
})
