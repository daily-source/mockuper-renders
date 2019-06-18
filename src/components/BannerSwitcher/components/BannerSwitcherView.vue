<template>
  <div id="banner-switcher">
    <button class="btn-trigger button is-primary" @click="toggleSwitcher()" v-if="!open">
      <i class="fas fa-cog"></i>
    </button>
    <button class="btn-trigger button is-primary" @click="toggleSwitcher()" v-if="open">
      <i class="fas fa-times"></i>
    </button>
    <div id="banner-overlay" :class="['fade', {'d-none': overlayHideTrigger, 'show': overlayShowTrigger }]">
      <div class="container">
        <div class="columns mb-3 is-multiline">
          <div class="column is-one-third mb-3" v-for="(img,index) in bgImages" :key="index">
            <img
              class="img-fluid" 
              :src="require(`@/assets/img/images/${img}`)" 
              :alt="`Background Image Placeholder ${index}`"
              @click="handleImageSelected(index)"
            >
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h2 class="font-weight-bold has-text-centered"> OR </h2>
            <input type="text" class="form-control input" placeholder="Enter an image url here...." v-model="url">
            <div class="btn-container text-center py-3 has-text-centered">
              <button class="btn btn-primary btn-lg button is-primary" @click="handleImageUrlSelected()">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'BannerSwitcherView',

  data() {
    return {
      open: false,
      overlayHideTrigger: true,
      overlayShowTrigger: false,
      url: ''
    }
  },

  computed: {
    ...mapState({
      bgImages: state => state.banner.images
    })
  },

  methods: {
    toggleSwitcher() {
      this.open = !this.open;
      if( this.open ) {
        this.overlayHideTrigger = false,
        setTimeout(() => {
          this.overlayShowTrigger = true 
        }, 100 )
      } else {
        this.overlayShowTrigger = false,
        setTimeout( () => {
          this.overlayHideTrigger = true
        }, 150)
      }
    },

    handleImageSelected( index ) {
      this.switchBannerImage( index )
      this.toggleSwitcher()
    },

    handleImageUrlSelected( ) {
      if (this.url) {
        this.switchBannerImageUrl( this.url )
      }

      this.toggleSwitcher()
    },

    ...mapActions({
      switchBannerImage: 'switchBannerImage',
      switchBannerImageUrl: 'switchBannerImageUrl',
    }),
  }
}
</script>

<style lang="scss">
  .fade {
    opacity: 0;
    transition: opacity .2s ease;

    &.show {
      opacity: 1;
    }
  }

  .d-none {
    display: none !important;
  }

  #banner-switcher {
    position: fixed;
    bottom: 3%;
    right: 5%;
    z-index: 9999;

    .btn-trigger  {
      border-radius: 100%;
      font-size: 1.5em;
      width: 50px;
      height: 50px;
      position: relative;
      z-index: 9999;
    }
  }

  #banner-overlay {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(255,255,255,.95);

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      cursor: pointer;
    }

    .form-control {
      margin-top: 1em;
    }

    .btn-container {
      margin-top: 1em;
    }
  }
</style>
