<template>
  <div class='nonprofit-register'>
    <app-header />
    <intro-video />
    <section class="section nonprofit-register__section">
      <transition
        name='slider-fade'
        mode='out-in'
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view />
      </transition>
    </section>
    <!-- <section class='section nonprofit-register__section'>
      <div class='container nonprofit-register__container'>
        <h2 class='has-text-weight-bold'>Add your nonprofit</h2>
        <p>Most nonprofits are already in our directory. It will confuse visitors if you have two different profiles because they will be unsure which is the right one. Thus they will be less likely to pick you to donate to and add to their profile. Also, when we eventually discover you have two profiles, we will have to delete one and you will lose all the people who have connected to the deleted profile. To prevent that, search our directory to see if you’re already in it. If yes, you can claim the profile. If not, then you can add a new nonprofit.</p>
        <p>In the field below, search for one or two of the most unique words of your nonprofit to get a list of matching results. If it doesn’t show up in those results, there is a small chance your current profile has a typo. Thus, do a second search using other words from your name.</p>
        <nonprofit-directory-search-form 
          @formSubmit='onFormSubmit'
          :input-placeholder='"Enter 1-2 keywords from your nonprofit name"'
          id='nonprofit-directory-search-form'
        />
        <nonprofit-directory-list 
          :enable-nonprofit-suggest='false'
          :show-claim-nonprofit-button='true'
          :show-search='false'
          class='nonprofit-register__directory'
        >
          <h3 slot='title' class='has-text-weight-bold nonprofit-register__heading'>Nonprofit Directory</h3>
        </nonprofit-directory-list>
        <div 
          class="nonprofit-register__search-results"
          id='nonprofit-register-search-results'
          v-if='filterValue'
        >
          <h3 class='has-text-weight-bold nonprofit-register__heading'>Results</h3>
          <p>View your results below. If your nonprofit is not in them, you can add a new nonprofit at the bottom.</p>
          <nonprofit-directory-list 
            :enable-nonprofit-suggest='false'
            :show-claim-nonprofit-button='true'
            :show-search='false'
            :initial-filter='filterValue'
          />
          <p>If your nonprofit isn’t in the results, there is a small chance your current profile has a typo in the name. Thus, we recommend doing a second search using other words from your name. Then you can add a new nonprofit below.</p>
          <nonprofit-directory-search-form 
            @formSubmit='onFormSubmit'
            @formReset='onFormReset(false)'
            :show-reset-button='false'
          />
        </div>
        <div 
          class="nonprofit-register__register-form"
          v-if='filterValue'
        >
          <h3 class='has-text-weight-bold nonprofit-register__heading'>Add A New Nonprofit</h3>
          <nonprofit-register-form />
        </div>
      </div>
    </section> -->
    <shared-footer />
  </div>
</template>

<script>
import AppHeader from 'LocalComponents/AppHeader'
import IntroVideo from 'LocalComponents/IntroVideo'
import NonprofitDirectorySearchForm from 'LocalComponents/NonprofitDirectory/NonprofitDirectorySearchForm'
import NonprofitRegisterForm from 'LocalComponents/Nonprofit/Register/NonprofitRegisterForm'
import NonprofitDirectoryList from 'LocalComponents/NonprofitDirectory/NonprofitDirectoryList'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'NonprofitRegister',

  components: {
    AppHeader,
    IntroVideo,
    SharedFooter,
    NonprofitRegisterForm,
    NonprofitDirectoryList,
    NonprofitDirectorySearchForm,
  },

  data () {
    return {
      filterValue: '',
    }
  },

  methods :{
    onFormSubmit (filterValue) {
      this.filterValue = filterValue

      this.$nextTick(() => {
        this.smoothScroll('nonprofit-register-search-results')
      })

    },

    onFormReset (reset = true) {
      this.filterValue = ''

      if (reset) {
        this.$nextTick(() => {
          this.smoothScroll('nonprofit-directory-search-form')
        })
      }
    },

    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },

    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },

    afterEnter(element) {
      element.style.height = 'auto';
    },
  },

  metaInfo() {
    const description = 'The modern way to help free slaves';
    const title = 'Virtual Railroad'
    return {
      title: `Register a Nonprofit | Virtual Railroad`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    }
  },
}
</script>

<style lang="scss">
.nonprofit-register {
  $self: &;

  &__heading {
    font-size: 32px;
  }

  &__register-form {
    margin-top: 1em;
  }

  &__directory {
    max-width: 100% !important;
    margin-top: .875em !important;
  }

  &__container {
    &--small {
      max-width: 990px !important;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .nonprofit-directory-list-item__nonprofit-details {
    margin-right: 0 !important;
  }

  .nonprofit-directory-list--empty {
    min-height: 400px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    > img {
      max-width: 170px;
      width: 100%;
    }
  }
}

.slider-fade-enter,
.slider-fade-leave-active {
  opacity: 0
}

.slider-fade-enter-active,
.slider-fade-leave-active {
  transition-duration: .5s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

</style>

