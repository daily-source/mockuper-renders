<template>
	<transition 
		:name='videoTransition'
	>
		<div 
			class='intro-video'
			v-show='isShown'
			ref='introVideo'
		>
			<div class='video-container'>
				<youtube
					:video-id='videoId'
					ref='youtube'
					height='100%'
					width='100%'
					@playing='playing'
					@ready='onReady'
          :player-vars='{
            playsinline: playsinline,
          }'
          v-if='render'
				/>
			</div>
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

	props: {
		autoplay: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

  data () {
    return {
      videoId: 'PazcMTddZik',
      dontShowVideo: false,
		  sessionStorageKey: 'dontShowVideo',
			example: false,
			fadeAfter: 107,
			sampleRate: 500,
			videoTransition: 'video-fade-short', 
			playerCurrentTime: 0,
			player: null,
			playingFlag: false,
      counter: 0,
      playsinline: 0,
      render: false,
    }
  },

	created () {
		this.dontShowVideo = this.getSessionStorageKey()

		if (this.dontShowVideo) {
      this.hideVideo()
      this.stopVideo()

			return
		}
  },
  
  mounted () {
    if (window.innerWidth <= 768 ) {
      this.playsinline = 1
    } 

    this.render = true
  },

  methods: {
		onReady (event) {
			this.player = event
		},

		/**
		 * Handles the Skip button clicked event
		 */
		onSkipClicked () {
			this.hideVideo()
			if (this.player) {
				this.player.stopVideo()
			}
		},

		onIntroVideoClicked () {
			console.log('clicked')
			this.counter += 1;
		},

		/**
		 * Gets the session 'dontShowVideo' session key
		 */
		getSessionStorageKey () {
			return sessionStorage.getItem(this.sessionStorageKey)
    },
    
		/**
		 * Checks the player's time recursively.
		 */
		checkPlayerTimeRecursively () {
			setTimeout( () => {
				this.getPlayerCurrentTime().then(() => {
					if (this.player.getPlayerState() === 1) {
						this.checkPlayerTimeRecursively()
					}
				})
			}, this.sampleRate)
		},

		/**
		 * Triggers when the video is playing.
		 */
		playing (event) {
			this.checkPlayerTimeRecursively()
		},

		/**
		 * Get player current time
		 */
		async getPlayerCurrentTime () {
			try {
				const time = await this.player.getCurrentTime()
				this.playerCurrentTime = time
			} catch (err) {
				console.log(err)
			}
    },
    
    /**
     * Plays the video asynchronously
     */
    async playVideoAsync () {
      await this.player.playVideo()
    },
		
		...mapActions({
			hideVideo: 'video/hideVideo',
			showVideo: 'video/showVideo',
			playVideo: 'video/playVideo',
			stopVideo: 'video/stopVideo',
		}),
	},

  computed: {
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

		player (value) {
			if (this.autoplay || this.isPlaying) {
        this.player.playVideo()
      } else {
        this.player.stopVideo()
      }
		},

		isShown (value) {
			if (value) {
				this.player.playVideo()

				this.videoTransition = 'video-fade-short'
			} else {
        this.hideVideo()
				this.dontShowVideo = true        
				// this.stopVideo()
			}
		},

		isPlaying () {
      if (this.player) {
        if (this.isPlaying) {
          this.player.playVideo()		
        } else {
          this.player.stopVideo()
        }
      }
		},

		playerCurrentTime (value) {
			if (value >= this.fadeAfter) {
				this.videoTransition = 'video-fade-long'

				this.hideVideo()
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
    bottom: 3em;
    right: 0;
    z-index: 11;
    padding: 1em;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    width: 200px;
    border-radius: 5px;

    @media (min-width: 576px) {
      right: 1em;
      bottom: 2em;
    }

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

.video-fade-short-enter-active, .video-fade-short-leave-active {
	transition: opacity .2s ease;
}

.video-fade-long-enter-active, .video-fade-long-leave-active {
	transition: opacity 1.7s ease;
}

.video-fade-short-enter, 
.video-fade-short-leave-to,
.video-fade-long-enter, 
.video-fade-long-leave-to {
	opacity: 0;
}
</style>

<style lang='scss'>
.intro-video {
	.video-container {
		width: 100%;
		height: 100%;

		div {
			height: 100%;
			width: 100%;
		}

		iframe {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
