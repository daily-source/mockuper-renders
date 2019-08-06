import store from '../store'

function fetchUserDetails(userId) {
  let user

  if( userId ) {
    user = store.state.users.data.find(user => user.id === userId)
  } else {
    user = {
      name: "Anonymous",
    }
  }

  return user
}

export default {
  fetchUserDetails,
}
