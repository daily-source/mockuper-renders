<template>
  <div class="layout-base">
    <app-header />
    <section class="section">
      <div class="container">
        <h2 class='has-text-centered has-text-primary home-heading'>
          We help non-profits and their supporters raise money, raise awareness and change the world. <br /> 
          All non-profits in the US can use our fundraising apps to raise money.  And their supporters can too. <br/> 
          It's simple and easy. <router-link to='get-started' class='button button-gradient-secondary'>Get Started</router-link>
        </h2>
      </div>
    </section>
    <section class="section">
      <div class="container nonprofit-slider__container">
        <nonprofit-slider />
      </div>
    </section>
    <section class="section tools-heading-section">
      <div class="container">
        <h2 class="home-heading has-text-centered">We offer 70 fundraising tools ranging from classic opportunities to innovative new approaches.</h2>
      </div>
    </section>
    <div class="btn-container section has-text-centered">
      <div class="container">
        <router-link to='get-started' class='button button-gradient-secondary is-large'>View all the ways you can do Maximum Good</router-link>
      </div>
    </div>

    <h2 class='home-heading--md has-text-centered section'>
      All people who want to help a nonprofit can use our fundraising tools. These include:
    </h2>

    <section 
      class="section fundraiser-section" 
      v-for="(fundraiser, key) in data" 
      :key="key"
      :id="key"
    >
      <div class="container">
        <fundraiser-grid 
          :fundraiser="fundraiser"
        />
      </div>
    </section>

    <section 
        class="section fundraiser-section" 
        v-for="(fundraiser, key) in fundraisers" 
        :key="key"
        :id="key"
      >
        <div class="container">
          <fundraiser-grid 
            :fundraiser="fundraiser"
          />
        </div>
      </section>

    <section class='section innovative-sites'>
      <h2 class="home-heading home-heading--lg has-text-centered has-text-primary">
        In addition to providing apps to help all nonprofits, we've created special websites to help you do the most good possible for the following: 
      </h2>
      <div class="container">
        <div class="columns is-multiline  innovative-sites__columns">
          <div class="column innovative-sites__column is-6-desktop">
            <div class="innovative-site" id='for-the-earth'>
              <div class="innovative-site__link-wrapper">
                <a href='http://fortheearth.org/' target='_blank'>
                  <img src="@/assets/img/site-logos/for-the-earth.png" alt="For the Earth">
                </a>
              </div>
              <h3 class='is-marginless'>Fight climate change and help the earth. <a href='http://fortheearth.org/' target='_blank' class=' innovative-site__view-link has-text-secondary'> View </a></h3>
            </div>
          </div>
          <div class="column innovative-sites__column is-6-desktop">
            <div class="innovative-site" id='for-the-slaves'>
              <a href='http://fortheslaves.org/' target='_blank'>              
                <img src="@/assets/img/site-logos/for-the-slaves.png" alt="For the Slaves">
              </a>
              <h3 class='is-marginles'>Free some of the world’s 25 million slaves. <a href='http://fortheslaves.org/' target='_blank' class=' innovative-site__view-link has-text-secondary'> View </a></h3>
              
            </div>
          </div>
          <div class="column innovative-sites__column is-6-desktop">
            <div class="innovative-site" id='for-learning'>
              <a href='http://forlearning.org/' target='_blank'>                            
                <img src="@/assets/img/site-logos/for-learning.png" alt="For Learning">
              </a>
              <h3 class='is-marginles'>Resources to help you and the world. <a href='http://forlearning.org/' target='_blank' class='innovative-site__view-link has-text-secondary'> View </a></h3>
            </div>
          </div>
          <div class="column innovative-sites__column is-6-desktop">
            <div class="innovative-site" id='for-the-poor'>
              <a href='http://forthepoor.org/' target='_blank'>                                          
                <img src="@/assets/img/site-logos/for-the-poor.png" alt="For the Poor">
              </a>
              <h3 class='is-marginles'>Help the poorest get the basics of life. <router-link to='for-the-poor' class=' innovative-site__view-link has-text-secondary'> View </router-link></h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <shared-footer /> 
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from 'Components/MaximumGood/AppHeader'
import NonprofitSlider from 'Components/MaximumGood/NonprofitSlider'
import FundraiserGrid from 'Components/MaximumGood/FundraiserGrid'
import SharedFooter from 'Components/Shared/SharedFooter'

export default {
  name: 'HomePage',

  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppHeader,
    NonprofitSlider,
    FundraiserGrid,
    SharedFooter,
  },

  computed: {
    ...mapState({
      fundraisers: state => state.siteFundraisers.data,
    }),
  },

  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    const siteTitle = 'Maximum Good - v1'
    return {
      title: siteTitle,
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  },
};
</script>

<style scoped lang="scss">
  .home-heading {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.8;
    max-width: 85%;
    margin-left: auto;
    margin-right: auto;
  }

  .home-heading--md {
    padding-top: 1em;
    font-size: 1.375rem;
    margin-bottom: 1.25em;
  }

  .home-heading--lg {
    font-size: 1.625rem;
  }

  .play-btn {
    content: '';
    position: absolute;
    bottom: 1em;
    right: 1em;
    border: 0;
    width: 4em;
    height: 4em;
    background-color: transparent;
    background-size: 100% 100%;
    opacity: 0;
    transition: opacity .2s ease;
    display: none;
    z-index: 99;

    &.show {
      display: block;

      &.in {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  #innovative-fundraising {
    background-color: #eaf7ff;
  }

  #fundraising-classics {
    background-color: #f8f1e2;
  }

  .innovative-sites {
    margin-bottom: .25rem;

    h2 {
      margin-bottom: 3rem;
      margin-top: 2.875rem;
      max-width: 70%;
    }
  }

  .innovative-site {
    padding: 1.5rem 2rem;
    border: 1px solid #ddd;
    transition: box-shadow .2s ease;
    box-shadow: 0;
    text-align: center;
    flex: 1;

    &:hover {
      box-shadow: 0 2px 8px 2px rgba(#000, .2)
    }

    img {
      height: 80px;
      max-height: 80px;
      display: block;
      object-fit: contain;
      object-position: center;
      margin-left: auto;
      margin-right: auto;
      max-width: 500px;
      margin-bottom: 1rem;
    }

    h3 {
      font-weight: 700;
      font-size: 1.25rem;
      text-align: center;
      display: inline-block;
    }

    .innovative-site__view-link {
      display: inline-block;
      text-decoration: underline;
      font-weight: 600;
      margin-left: .375em;
    }
  }

  .tools-heading-section {
    padding-top: 0;
    padding-bottom: 1em;
    margin-bottom: 1.5em;

    h2 {
      font-size: 1.375rem;
    }
  }

  .btn-container {
    padding-top: .375em; 
    padding-bottom: 1em;
    margin-bottom: .375em;
  }

  .innovative-sites {
    &__column {
      padding: 1.2em;
      display: flex;
      align-items: stretch;
    }

    img {
      max-width: 100%;
    }

    h3 {
      color: #4a4a4a;
    }

    a {
      max-width: 100%;
      width: 100%;
    }
  }

  .nonprofit-slider__container {
    padding-left: 0;
    padding-right: 0;
  }
</style>

