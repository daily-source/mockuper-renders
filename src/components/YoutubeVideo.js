import player from 'youtube-player'

let pid = 0

export default {
  name: 'YoutubeVideo',

  data () {
    pid += 1

    return {
      elementId: `youtube-player-${pid}`,
      player: {}
    }
  },

  methods : {
    playerReady () {
      setTimeout( () => {
        console.log('Play now')
        this.player.playVideo()        
      }, 3000)
    }
  },

  mounted () {
    this.player = player(this.elementId, {
      width: 600,
      height: 450,
      videoId: 'PazcMTddZik',
      playerVars: {
        mute: 1,
        autoplay: 1,
      }
    })

    this.player.on('ready', this.playerReady)
  },

  render (h) {
    return h('div', { attrs: { id: this.elementId }})
  }
}