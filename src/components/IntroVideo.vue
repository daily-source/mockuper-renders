<template>
	<transition 
		:name='videoTransition'
	>
		<div 
			class='intro-video'
			v-show='isShown'
		>
			<div class='video-container'>
				<youtube
					:video-id='videoId'
					ref='youtube'
					player-height='100%'
					player-width='100%'
					@playing='playing'
					@ready='onReady'
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

  data () {
    return {
      videoId: 'xTWcpE_rdVo',
      dontShowVideo: false,
		  sessionStorageKey: 'dontShowVideo',
			example: false,
			fadeAfter: 107,
			sampleRate: 500,
			videoTransition: 'video-fade-short', 
			playerCurrentTime: 0,
			player: null,
    }
  },

	created () {
		this.dontShowVideo = this.getSessionStorageKey()

		if (this.dontShowVideo && this.player) {
			this.hideVideo()

			return
		}
	},

  methods: {
		onReady (event) {
			this.player = event.target
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
		
		...mapActions({
			hideVideo: 'video/hideVideo',
			showVideo: 'video/showVideo',
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

		google (value) {
			if (value) {
				console.log(this.player)
			}
		},

		player (value) {
			this.player.playVideo()
		},

		isShown (value) {
			if (value) {
				this.player.playVideo()

				this.videoTransition = 'video-fade-short'
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
	}
}
</style>
