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
      <div class="container gallery">
        <div class='slide-main__wrapper'>
          <button :class="['button play-btn', {'show': sliderPaused, 'in': showButton}]" @click="sliderPaused && handleCarouselClicked()"></button>
          <div class="slide__main-slider" @click="!sliderPaused && handleCarouselClicked()">
            <slick 
              ref='slide-main'
              class='slide-main'
              :options='slickOptions' 
              >
              <div class="slide slide--loseathon">
                <div class="slide-main__img-container">
                  <img src="../assets/loseathon.png"/>
                </div>
                <div class="slide-main__caption-conatainer">
                  <p>
                    Feel better, look better and live longer as you support your favorite charity by doing a Loseathon.
                  </p>
                </div>
              </div> 
              <div class="slide">
                <div class="slide-main__img-container">
                  <img src="../assets/virtual-railroad.png"/>
                </div>
                <div class="slide-main__caption-conatainer">
                  <p>
                    If an underground railroad existed today to free slaves, would you support it? Well, now you can.
                  </p>
                </div>
              </div>
              <div class="slide slide--volunteerathon">
                <div class="slide-main__img-container">
                  <img src="../assets/volunteerathon.png"/>
                </div>
                <div class="slide-main__caption-conatainer">
                  <p>
                    This is a fundraiser like a walkathon or bikeathon, but you spend your time volunteering and can have triple the impact.
                  </p>
                </div>
              </div>
              <div class="slide">
                <div class="slide-main__img-container">
                  <img src="../assets/ride-for-good.png"/>
                </div>
                <div class="slide-main__caption-conatainer">
                  <p>
                    Easily organize a group ride or do your own to ride money anywhere in the world any day of the year.
                  </p>
                </div>
              </div>
              <div class="slide">
                <div class="slide-main__img-container">
                  <img src="../assets/quitathon.png"/>
                </div>
                <div class="slide-main__caption-conatainer">
                  <p>
                    Make your life better and help your favorite cause by quitting something you no longer want to do.
                  </p>
                </div>
              </div>
              <div class="slide">
                <div class="slide-main__img-container">
                  <img src="../assets/calendar-for-good.png"/>
                </div>
                <div class="slide-main__caption-conatainer">
                  <p>
                    Ideas, opportunities and inspiration to do good every holiday and every season of the year
                  </p>
                </div>
              </div>
              <div class="slide">
                <div class="slide-main__img-container">
                  <img src="../assets/giveitupforgood.png"/>
                </div>
                <div class="slide-main__caption-conatainer">
                  <p>
                    Give something up temporarily and donate the money you save to a good cause.
                  </p>
                </div>
              </div>
              <div class="slide slide--run-for-good">
                <div class="slide-main__img-container">
                  <img src="../assets/run-for-good.png"/>
                </div>
                <div class="slide-main__caption-conatainer">
                  <p>
                    You pick the date, the place and the distance for a group run or solo run to raise money for a good cause.
                  </p>
                </div>
              </div>
            </slick>
          </div>
        </div>
        <slick
          class='slide-nav'
          :options='slickNavOptions'
          >
          <div class="slide loseathon">
            <img src="../assets/loseathon.png" alt="Loseathon">
          </div>
          <div class="slide">
            <img src="../assets/virtual-railroad.png" alt="Loseathon">
          </div>
          <div class="slide">
            <img src="../assets/volunteerathon.png" alt="Loseathon">
          </div>
          <div class="slide ride-for-good">
            <img src="../assets/ride-for-good.png" alt="Loseathon">
          </div>
          <div class="slide">
            <img src="../assets/quitathon.png" alt="Loseathon">
          </div>
          <div class="slide">
            <img src="../assets/calendar-for-good.png" alt="Loseathon">
          </div>
          <div class="slide">
            <img src="../assets/giveitupforgood.png" alt="Loseathon">
          </div>
          <div class="slide run-for-good">
            <img src="../assets/run-for-good.png" alt="Loseathon">
          </div>
        </slick>
      </div>          
    </section>
    <section class="section tools-heading-section">
      <div class="container">
        <h2 class="home-heading has-text-centered">We offer 70 fundraising tools ranging from classic opportunities to innovative new approaches.</h2>
      </div>
    </section>
  </div>
</template>

<script>
import AppHeader from 'Components/MaximumGood/AppHeader'

export default {
  name: 'HomePage',

  components: {
    AppHeader,
  },

  metaInfo() {
    const description = 'A Ride For Good will allow you to raise money for nonprofits while you ride your bike.';
    const title = 'Raise money while riding!';
    return {
      title: 'Home',
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:title', property: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: description },
      ],
    };
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
</style>

