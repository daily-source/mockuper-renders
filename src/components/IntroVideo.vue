<template>
  <div class='intro-video'>
    <youtube 
      :video-id='videoId'
      ref='youtube'
      height='100%'
      width='100%'
    />
    <div class='intro-video__controls'>
      <button
        @click='hideVideo' 
        class="close-video button is-text is-paddingless"
      >
        Skip intro &raquo;
      </button>
      <div class='intro-video__checkbox'>
        <form action='#'>
          <label class="checkbox">
            <input 
              v-model='dontShowVideo'
              type="checkbox" 
            >
            <span>Don't show video again. <br /> (Cookies must be active)</span>
          </label>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'IntroVideo',

  data () {
    return {
      videoId: 'xTWcpE_rdVo',
      dontShowVideo: false,
    }
  },

  methods: {
    ...mapActions({
      hideVideo: 'toggleIsPlaying'
    }),
  },

  computed: {
    ...mapState({
      isPlaying: state => state.video.isPlaying
    }),
  },
}
</script>

<style lang="scss" scoped>
.intro-video {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 99;

  &__controls {
    position: absolute;
    bottom: 2em;
    right: 1em;
    z-index: 11;
    padding: 1em;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    width: 200px;
    border-radius: 5px;

    .close-video {
      cursor: pointer;
      background-color: transparent !important;
      color: #fff;
      text-decoration: none;

      &:focus {
        outline: 0;
        box-shadow: none;
      }
    }
  }

  &__checkbox {
    font-size: .75em;

    .checkbox {
      display: flex;

      input {
        margin-top: .25em;
      }

      span {
        display: inline-block;
        margin-left: .25em;
        color: #fff !important;
      }
    }
  }
}
</style>
