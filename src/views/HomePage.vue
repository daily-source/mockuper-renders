<template>
  <div class="view-home-page">
    <versioned-component 
      base-name='AppHeader'
      volunteer-text='Support us'
      layout='page'
    />
    <TopMenu></TopMenu>
    <versioned-component 
      base-name='AppBanner'
    />
    <section 
      class="section intro"
      v-if='showIntro'
    >
        <p 
          class='has-text-centered intro__text'
          v-if='$version != 4'
        >
          We offer churches activities and classes to reach casual churchgoers who lack a full spiritual life, and non-churchgoers who think churches have little to offer. We give them useful tools to become better people, connect with God and develop spiritual skills that bring more love and goodness to themselves and the world. Each logo below goes to a website and a class or activity that churches can use for free. Classes provide useful information plus exercises to help people put the learning into practice. Scroll to the end of this page for more information.
        </p>
        <p 
          class='has-text-centered intro__text intro__text--v4'
          v-else
        >
          Clicking on most of the logos below will lead to both a website and a class or activity on that topic. Any church can offer the class or activity to its members using our materials that are free to download and use. Most classes will offer useful information followed by silent interior exercises to help participants learn how to put the information to use. Often participants will be given the opportunity to open up to God’s presence and will, and engage in prayer with God about what the new learning means for their life.
        </p>
    </section>
    <section class="logo-grid-wrapper">
      <versioned-component 
        base-name='LogoGrid'
        v-for='site in sites'
        :key='site.slug'
        :logos='site.logos'
        :title='site.title'
        :slug='site.slug'
      />
    </section>
    <section 
      class='section more-info'
      v-if='$version == 1 || $version == 5'
    >
      <div class="container">
        <h2 class='has-text-centered has-text-weight-bold'>More Information</h2>
        <p>
          Most people who are outside of the church are either agnostic or have only a vague theoretical notion that God probably exists, but not a strong belief. They don't think it's really possible to have a connection with God. As a result, they don’t think the church has anything useful to offer their lives. They’ve already tried going to a few services and didn’t get anything out of it.
        </p> 

        <p>
          The Mass is a great thing if people have a firm belief in God and connection with Christ. Putting a person who is agnostic or who has never had an experience of God in a Mass is similar to putting a second-grader in a college physics class. It will usually go over their head and they won't connect with it. Most non-churchgoers have tried it, and it didn’t land for them.
        </p>

        <p>
          Fortunately, the Catholic tradition has plenty of additional things that offer practical benefits to people who are in the early stages of spiritual development, and can act as bridges to God and bridges to the church. For example, the Catholic tradition is rich with teachings, tips and practices related to forgiveness. Many non-churchgoers are curious about forgiveness, and have never received advice on how to actually do it. 
        </p>

        <p>
          The class on that will explain what forgiveness is and is not and describe why we should forgive including how it helps us and the world. It will walk people through experiential exercises to help them learn how to forgive and how to involve God in the process. We will encourage them to learn it as a skill and develop it as an ongoing spiritual practice.
        </p>

        <p>
          Many of our classes will focus on things from the Christian tradition that non-churchgoers and casual churchgoers will find interesting or potentially useful in their day to day lives. Once they see that what the church offers is useful, they'll be more open to engaging with things like confession that they might have hesitations about.
        </p>

        <p>
          Most people don’t start to pursue spiritual growth and practice until they have some kind of experience of God such as feeling God’s love or peace. After they have an experience of God, they hunger for more and start to put time and energy towards it. Thus all of our classes and activities will have periods of prayer and contemplation during which participants will be given the opportunity to open up to God’s presence and will. 
        </p>

        <p>
          After hearing the information about the topic of the class, they will be given time to engage in quiet prayer with God about what the new learning means for their life and how they should implement it. This gives God more of an opportunity to make himself known to the person.
        </p>

        <p>
          Consider this: if a person is walking down the street and God sends the person a big wave of love, the average person today won’t think it came from God. They’ll chalk it up to the weather or just some random feeling of their own. 
        </p>

        <p>
          However, if a person is in a class in a church and is actively opening themselves up to God during an exercise, and they receive a wave of love, they’re probably going to realize it’s of God. They will move from vaguely thinking that God probably exists towards knowing that God exists. And they will realize that there are benefits to developing a relationship with God. After they’ve connected with God enough, which they never thought was possible, they’ll be far more open to connecting with Jesus.
        </p>

        <p>
          The author of the famous book “The Little Prince” has a great lesson: If you want to get people to build a ship, don’t assign them tasks to gather wood and sew sails, but rather teach them to long for the wonderful immensity of the sea, and the rest will take care of itself.
        </p>

        <p>
          Giving people beneficial experiences of God and church causes them to long for more. Once they long for more, many of the rest of the details will fall into place. They will be motivated to find wood and sew sails even without you asking them to. Jumpstarting the longing is the key step. 
        </p>

        <p>
          People who are casual churchgoers or non-churchgoers are almost never willing to commit to doing a day-long retreat or a multi-week class series. The most they will do early on is something that is two hours or less. Thus all of our classes and activities will be 1 to 2 hours long.
        </p>

        <p>
          We will provide downloadable Word files so that churches can access the materials online for free. The informational portion of the class will be written in a way that a volunteer from the church (or staff member or minister if preferred) can read it to the attendees. For the exercises, the person only needs to read the exercise instructions to the participants, and then set a timer. Virtually no skill or experience will be needed.
        </p> 

        <p>
          In the future, we will put each class including the exercise instructions into video format so that the class leader only needs to press play, and pause it with a timer for each exercise.
        </p>

        <p>
          The end goal is activities and classes that draw people into the church, form their faith, give them useful tools to become more virtuous and closer to God, strengthen their spiritual muscles and result in a life of discipleship of holy living and social action. 
        </p>

        <p>
          Over time, the approach is to collect additional ideas, test them, then keep the ideas that work and improve them. And always make them available to churches around the world to use for free, so the churches can draw in people to lives of faith and helpful action. 
        </p>
      </div>
    </section>
    <SharedFooter></SharedFooter>
    <banner-switcher />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Vue from "vue"
import VueMeta from "vue-meta"

Vue.use(VueMeta)

export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    SharedFooter: () => import("Components/Shared/SharedFooter.vue"),
    AppHeader: () => import("Components/BridgesToGod/AppHeader.vue"),
    HomeHero: () => import("Components/Volunteerathon/HomeHero.vue"),
    TopMenu: () => import("Components/general/TopMenu.vue"),
    HomeSection2: () => import("Components/Volunteerathon/HomeSection2.vue"),
    HomeSection3: () => import("Components/Volunteerathon/HomeSection3.vue"),
    HomeSection4: () => import("Components/Volunteerathon/HomeSection4.vue"),
    SampleForm: () => import("LocalComponents/SampleForm.vue"),
    LogoGrid: () => import('Components/BridgesToGod/LogoGrid'),
  },

  /**
   * Fetch data and store it just before entering the view.
   */
  asyncData ({ store, route: { params: { ein } } }) {
    return new Promise((resolve, reject) => {
      return store.dispatch("FETCH_HOME_PAGE")
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo () {
    var description = "Double the results, half the effort. A Volunteerathon® lets you make a far greater impact with your time than traditional fundraising events."
    var title = "Create a volunteerathon and do good!"

    return {
      title: `Bridges to God - v${this.$version}`,
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  },
  /**
   * Return stored data for this view.
   */
  computed: {
    home () {
      return this.$store.state.home
    },

    showIntro () {
      return [1, 4, 5].indexOf(parseInt(this.$version)) !== -1
    },

    ...mapState({
      sites (state) {
        const v = `v${this.$version}`

        if (state.sites.versions[v]) return state.sites.versions[v]
        
        return state.sites.versions.v1
      }
    })
  }
}
</script>

<style scoped lang="scss">
.instructions {
  padding-top: 3em;

  p {
    padding-left: 60px;
    padding-right: 60px;
  }
}

.intro {
  padding-top: 2.625rem;
  padding-bottom: .25rem;

  &__text {
    margin-bottom: 0;
    max-width: 1240px;
    margin-left: auto;
    margin-right: auto;

    &--v4 {
      max-width: 1000px;
    }
  }
}

.more-info {
  h2 {
    font-size: 2.5rem;
    color: $primary;
    padding-bottom: 2rem;
    margin-bottom: 0;
  }

  p {
    max-width: 1176px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
