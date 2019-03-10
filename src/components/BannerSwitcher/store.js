/**
 * Build the state for the module
 * 
 * @param bgImages the background images in an array
 * @param selected default selected index
 */
const buildState = (bgImages, selected = null) => {
  if (!Array.isArray(bgImages)) {
    bgImages = []
  }

  return {
    images: bgImages,
    url: '',
    selected
  }
}

const mutations = {
  changeCurrentBannerImage( state, data ) {
    state.selected = data.index
  },
  changeCurrentBannerImageUrl( state, data ) {
    state.selected = 'url'
    state.url = data.url
  }
}

const actions = {
  switchBannerImage( { commit }, index ) {
    commit({
      type: 'changeCurrentBannerImage',
      index: index,
    })
  },
  switchBannerImageUrl( { commit }, url ) {
    commit({
      type: 'changeCurrentBannerImageUrl',
      url: url
    })
  }
}

const getters = {
  // Gets the current local background image
  getCurrentLocalImage: state => {
    if (state.selected === null || state.selected === 'url') return
    return state.images[state.selected]
  }
}

/**
 * Register module function
 * 
 * @param store Vuex store
 */
export const registerModule = ( store, bgImages = [], selected  = null) => {
  // Check if registermodule is a function
  if (typeof store.registerModule !== 'function' || !bgImages) return

  const state = buildState (bgImages, selected)

  store.registerModule ('banner', {
    state,
    actions,
    mutations,
    getters,
  })
}
