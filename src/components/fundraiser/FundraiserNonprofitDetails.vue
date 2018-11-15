<template>
  <div class="fundraiser-nonprofit-organization__wrapper" v-if="fundraiser.participant">
    <p><span v-html="fundraiser.participant.name"></span> is raising money for: </p>
    <div class="this-nonprofit__wrapper">
      <figure class="fundraiser-lower__logo-wrapper" v-if="fundraiser.nonprofit">
        <LazyLoadedImage
          width="200"
          class="fundraiser-lower__logo"
          :src="fundraiser.nonprofit.logo_square"
        ></LazyLoadedImage>
      </figure>
      <div class="this-nonprofit__right-side">
        <span class="this-nonprofit__title" v-html="fundraiser.nonprofit.name"></span>
        <div class="fundraiser-lower__button-wrapper">
          <router-link :to="`/nonprofit/${fundraiser.nonprofit.EIN}`">
            <button class="button button-style is-warning">View profile</button>
          </router-link>
          <button class="button button-style is-info">
            <DonateAction
              :nonprofit-ein="fundraiser.nonprofit.EIN"
              trigger="fundraiser/lower/left/organization">
              Contribute
            </DonateAction>
          </button>
        </div>
        <p class="help">This is an IRS-approved 501(c){{fundraiser.nonprofit.SUBSECTION}} charity, so<br>your donation is 100% tax deductible</p>
      </div>
    </div>
  </div>
</template>

<script>
import DonateAction from '@/components/general/DonateAction.vue';
import LazyLoadedImage from '@/components/plugins/LazyLoadedImage.js';

export default {
  props: ['fundraiser'],
  components: {
    DonateAction,
    LazyLoadedImage,
  },
};
</script>

<style scoped lang="scss">
.fundraiser-lower {
  &__logo-wrapper {
    display: flex;
    flex-direction: column;
    height: 140px;
    width: 140px;
    margin: 15px auto;

    @include breakpoint($tablet) {
      margin: 0 24px 0 0;
    }

    img {
      display: block;
      max-width: 140px;
    }
  }
  &__button-wrapper {
    .button-style {
      margin: 10px 0;
      display: inline-block;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.this-nonprofit {
  &__wrapper {
    text-align: center;
    margin: auto;
    margin-bottom: 40px;
    margin-top: 25px;

    figure {
      align-items: center;
    }

    @include breakpoint($tablet) {
      text-align: left;
      display: flex;
      flex-direction: row;
    }
  }
  .help {
    font-size: 13px;
  }
  &__title {
    font-weight: bold;
    color: $color-dark-gray;
    font-size: 20px;
    text-transform: uppercase;
  }
}

</style>
