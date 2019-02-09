<template>
	<transition name='video-fade'>
		<div 
			class='intro-video'
			v-show='isShown'
		>
			<youtube 
				:video-id='videoId'
				ref='youtube'
				height='100%'
				width='100%'
			/>
			<div class='intro-video__controls'>
				<button
					@click='onSkipClicked' 
					class="close-video button is-text is-paddingless"
				>
					Skip intro &raquo;
				</button>
				<div class='intro-video__checkbox'>
					<label class="checkbox">
						<input 
							v-model='dontShowVideo'
							type="checkbox" 
						>
						<span>Don't show video again. <br /> (Cookies must be active)</span>
					</label>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'IntroVideo',

  data () {
    return {
      videoId: 'xTWcpE_rdVo',
      dontShowVideo: false,
		  sessionStorageKey: 'dontShowVideo',
			example: false,
    }
  },

	created () {
		this.dontShowVideo = this.getSessionStorageKey()

		if (this.dontShowVideo) {
			this.hideVideo()

			return
		}
	},

	mounted () {
		this.player.playVideo()
		console.log(this.player)
	},


  methods: {
		/**
		 * Handles the Skip button clicked event
		 */
		onSkipClicked () {
			if (this.player) {
				this.player.stopVideo()
				this.hideVideo()
			}
		},

		/**
		 * Gets the session 'dontShowVideo' session key
		 */
		getSessionStorageKey () {
			return sessionStorage.getItem(this.sessionStorageKey)
		},
		
		...mapActions({
			hideVideo: 'video/hideVideo',
			showVideo: 'video/showVideo',
		}),
	},

  computed: {
		player () {
			return this.$refs.youtube.player
		},

    ...mapState({
			isShown (state) {
				return state.video.isShown
			},

      isPlaying: state => state.video.isPlaying,
    }),
  },

	watch: {
		dontShowVideo (value) {
			if (value) {
				sessionStorage.setItem(this.sessionStorageKey, value)
			} else {
				sessionStorage.removeItem(this.sessionStorageKey)
			}
		},
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

.video-fade-enter-active, .video-fade-leave-active {
	transition: opacity .2s ease;
}

.video-fade-enter, .video-fade-leave-to {
	opacity: 0;
}
</style>
