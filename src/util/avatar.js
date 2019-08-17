const baseUrl = process.env.VUE_APP_BASE_URL || '/'

function getUserAvatar (imgName = null) {
  if(!imgName) {
    return `${baseUrl}img/avatar-placeholder.png`
  }

  return `${baseUrl}img/${imgName}`
}

export default {
  getUserAvatar
}