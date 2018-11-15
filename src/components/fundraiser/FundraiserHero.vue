<template>
  <div class="container is-fluid white-bg fundraiser-content__wrapper">
    <div class="columns fundraiser-content" v-if="!editing">
      <div class="column is-two-thirds-desktop fundraiser-content__left">
        <div class="fundraiser-photo-section">
          <flickity
            ref="flickity"
            class="main-carousel"
            :options="mainCarouselOptions"
          >
            <LazyLoadedImage
              class="fundraiser-photo-section__photo"
              :is-background="true"
              :src="item.src"
              :key="_uid + item.src"
              v-if="item.type === 'image'"
              v-for="(item, index) in fundraiser.data.media"
            ></LazyLoadedImage>

            <div class="fundraiser-photo-section__photo fundraiser-photo-section__video plyr-wrapper" v-if="item.type === 'video'" v-for="(item, index) in fundraiser.data.media">
              <VuePlyrWrapper v-if="canRender">
                <vue-plyr :ref="`plyr_${index}`">
                  <div data-plyr-provider="youtube" :data-plyr-embed-id="item.src"></div>
                </vue-plyr>
              </VuePlyrWrapper>
            </div>

          </flickity>
        </div>
      </div>
      <div class="column is-one-third-desktop fundraiser-content__right">
        <div class="fundraiser-pledge">
          <div class="fundraiser-pledge__heading" v-if="fundraiser.participant">
            <p class="button-wrapper" v-if="canEdit">
              <a class="button is-light is-rounded is-medium" @click="openEdition()" v-if="!editing">Edit this fundraiser</a>
            </p>
            <p>{{fundraiser.participant.name}} will ride 130 miles from Stockbridge to Boston on May 5 to raise money for <router-link :to="`/nonprofit/${fundraiser.nonprofit.EIN}`">{{fundraiser.nonprofit.name}}</router-link>.</p>
            <p class="fundraiser-pledge__subheading">Please support {{fundraiser.participant.name}}'s Ride For Good</p>
          </div>
          <div class="button fundraiser-pledge__cta is-success is-large">
            <DonateAction
              :fundraiser-id="fundraiser.fundraiser_id"
              trigger="fundraiser/hero">
              Donate now
            </DonateAction>
          </div>
          <div class="progress-barx fundraiser-pledge__progress-wrapper">
            <ProgressBar :fundraiser="fundraiser" size="large" />
          </div>
          <div class="fundraiser-pledge__more-stats">
            <div class="fundraiser-pledge__goal">Goal: {{fundraiser.currentStats.goal | usd}}</div>
            <div class="fundraiser-pledge__goal">Days left: {{fundraiser.currentStats.daysLeft}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editing">
      <MediaEditor
        :media-source="fundraiser.data"
        location="fundraiser.data.media"
      >
        <h2 slot="heading">Edit the gallery</h2>
        <p slot="tagline" v-if="!fundraiser.data.media.length">You don't have any images or videos. A default image will be used.</p>
      </MediaEditor>
    </div>
  </div>
</template>

<script>
import DonateAction from '@/components/general/DonateAction.vue';
import ProgressBar from '@/components/general/ProgressBar.vue';
import Flickity from '@/components/plugins/Flickity.vue';
import LazyLoadedImage from '@/components/plugins/LazyLoadedImage.js';

export default {
  props: ['fundraiser', 'canEdit', 'editing'],
  components: {
    DonateAction,
    Flickity,
    LazyLoadedImage,
    ProgressBar,
    MediaEditor: () => import('@/components/input/MediaEditor.vue'),
    InlineImageEditor: () => import('@/components/input/InlineImageEditor.vue'),
    VuePlyrWrapper: () => import('@/components/general/VuePlyrWrapper.vue'),
  },
  data() {
    return {
      canRender: false,
      currentCell: null,
      mainCarouselOptions: {
        initialIndex: 0,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        autoPlay: false,
      },
    };
  },
  methods: {
    openEdition() {
      this.$emit('edit:open');
    },
  },
  mounted() {
    this.canRender = true;

    /** Listen to a flickity event:
     * if there's a slide change and the previous one had a video, pause it.
     */
    const flick = this.$refs.flickity;
    this.currentCell = 0;
    flick.on('change', () => {
      // Auto play if there's video in the selected cell.
      if (flick.$flickity.cells[flick.selectedIndex()].element.className.indexOf('plyr') > -1) {
        this.$refs[`plyr_${flick.selectedIndex()}`][0].player.play();
      }
      // Auto pause if there's video in the previously selected cell.
      if (flick.$flickity.cells[this.currentCell].element.className.indexOf('plyr') > -1) {
        setTimeout(() => {
          this.$refs[`plyr_${this.currentCell}`][0].player.pause();
        }, 50);
      }
      this.$emit('slideChange', flick);

      setTimeout(() => {
        this.currentCell = flick.selectedIndex();
      }, 50);
    });
  },
};
</script>

<style scoped lang="scss">
.fundraiser-content {
  &__wrapper {
    @include breakpoint($tablet) {
      padding-top: 20px !important;
    }
  }
  &__left {
    @include breakpoint($mobile) {
      padding-left: 0 !important;
    }
  }
  &__right {
    @include breakpoint($tablet) {
      padding-left: 6px;
      display: flex;
    }
  }
}

.fundraiser-photo-section {
  width: 100vw;

  @include breakpoint($mobile) {
    max-width: $max-flickity-width - 22px;
    margin-left: 0;
  }

  @include breakpoint($tablet) {
    transform: translateX(0);
    width: calc(100% - 30px);
    height: 0;
    padding-bottom: calc(100% * 2/3 - 60px + 70px);
    overflow: hidden;
  }

  &__photo {
    width: 100vw;
    height: calc((100vw - 30px) * 2/3);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    @include breakpoint($mobile) {
      max-width: $max-flickity-width;
    }

    @include breakpoint($tablet) {
      width: 102%;
      height: 0;
      padding-bottom: calc(100% * 2/3);
      overflow: hidden;
      background-color: $color-lightest-gray;
    }
  }
  &__thumbnail {
    width: 28.3333vw;
    height: calc(28.3333vw*3/4);
    background-size: cover;
    background-position: center;
    margin-right: 2.5vw;

    @include breakpoint($tablet) {
      width: calc(5vw);
      height: calc(5vw*3/4);
      margin-right: 0.5vw;

      &:hover {
        cursor: pointer;
      }
    }
  }
  &__video {
    display: flex;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      > div {
        flex: 1;
      }
    }
    @include breakpoint($tablet) {
      height: 100%;
      padding-bottom: 0;
      overflow: hidden;
      background-color: $color-lightest-gray;
    }
  }
}

.fundraiser-pledge {
  margin-top: 20px;
  font-size: 17px;
  text-align: center;

  @include breakpoint($tablet) {
    text-align: left;
    margin-bottom: 30px;
    margin-top: 0;
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    font-size: 22px;
    &.fundraiser-pledge__subheading {
      font-size: 18px;
      color: $color-medium-gray;
      font-style: italic;
      margin-bottom: 20px;
    }
  }

  &__cta {
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
  }

  &__stats {
    text-align: center;
    display: block;
    margin-bottom: 15px;
  }

  &__more-stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
}

.button-wrapper {
  display: block;
  .button {
    width: 100%;
  }
}
</style>
<style lang="scss">
.flickity-button {
  @include breakpoint($mobile) {
    display: none;
  }
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.fundraiser-photo-section {
  &:hover {
    .flickity-button {
      opacity: 1;
    }
  }

}
</style>
