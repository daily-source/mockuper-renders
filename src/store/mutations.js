import Vue from 'vue';

export default {
  SET_HOME_PAGE: (state, { home }) => {
    state.home = home;
  },
  SET_NONPROFIT: (state, { nonprofit }) => {
    state.nonprofit = nonprofit;
  },
  ADD_NEW_NONPROFIT: (state, { nonprofit }) => {
    nonprofit['data'] = {}
    state.nonprofit[nonprofit.EIN] = nonprofit
  },
  SET_FUNDRAISER: (state, { fundraiser }) => {
    state.fundraiser = fundraiser;
  },
  ADD_UPDATES: (state, { updates }) => {
    state.updates.data = state.updates.data.concat(updates);
    state.updates.current++;
  },
  RESET_FUNDRAISERS: (state) => {
    state.fundraisers.data = [];
  },
  ADD_COMMENTS: (state, { comments }) => {
    state.comments.data = state.comments.data.concat(comments);
    state.comments.current++;
  },
  /**
   * Add fetched data to store.
   * If no data is returned, delete the current stored data.
   */
  ADD_DONATIONS: (state, { donations }) => {
    if (donations.length) {
      state.donations.data = state.donations.data.concat(donations);
      state.donations.current++;
    } else {
      state.donations.data = [];
      state.donations.current = 1;
    }
  },
  ADD_TOP_FUNDRAISERS: (state, { fundraisers }) => {
    state.topFundraisers.data = state.topFundraisers.data.concat(fundraisers);
    state.topFundraisers.current++;
  },
  SET_FUNDRAISERS: (state, { fundraisers }) => {
    state.fundraisers.data = fundraisers;
  },
  SET_EXPLORE_FUNDRAISERS: (state, { fundraisers }) => {
    state.explore.fundraisers.data = fundraisers;
  },
  SET_COMMON_DATA: (state, { common }) => {
    state.common = common;
  },
  UPDATE_COMMENTS: (state, { comment }) => {
    console.log(comment);
  },
  UPDATE_DONATION: (state, { donation }) => {
    state.userActions.donation.status = 'completed';
    state.userActions.donation.email = donation.data.donation.email;
  },
  AUTHENTICATE_USER: (state, data) => {
    state.user = data.data;
    state.user.loggedIn = true;
  },
  START_DONATION: (state, { initiator }) => {
    state.userActions.donation.status = 'started';
    state.userActions.donation.amount = initiator.givingLevel ? initiator.givingLevel.amount : state.userActions.donation.amount;
    state.userActions.donation.initiator = initiator;
    state.userActions.donation.fundraiserId = initiator.fundraiserId;
    state.userActions.donation.nonprofitEin = initiator.nonprofitEin;
  },
  LOG_OFF: (state) => {
    // TODO: also delete all the cookies when logging user out
    state.user = {};
    state.user.loggedIn = false;
  },
  STORE_REQUEST: (state, req) => {
    state.extra.request = req;
  },
  SET_USER_ACCOUNT_DATA: (state, { userData }) => {
    state.user.data = userData;
  },
  REMOVE_PAYMENT_METHOD: (state, { id }) => {
    state.user.payment_methods.splice(state.user.payment_methods.findIndex(item => item.id === id), 1);
  },
  UPDATE_USER_FIELD: (state, { field, value }) => {
    state.user[field] = value;
  },
  SAVE_INLINE_FIELD: (state, { location, value }) => {
    nestedObjectSet(state, location, value);
  },
  REMOVE_IMAGE: (state, { location, id }) => {
    nestedObjectRemove(state, location, id);
  },
  REMOVE_VIDEO: (state, { location, id }) => {
    nestedObjectRemove(state, location, id);
  },
  ADD_VIDEO: (state, { location, youTubeID }) => {
    nestedObjectAdd(state, location, {
      type: 'video',
      src: youTubeID,
    });
  },
  UPDATE_VIDEO: (state, { location, oldSrc, newSrc }) => {
    nestedObjectRemove(state, location, oldSrc);
    nestedObjectAdd(state, location, {
      type: 'video',
      src: newSrc,
    });
  },
};

/*
 * Helper function that dynamically creates the nested object path to be saved.
 */
/* eslint-disable */
const getNestedObject = (obj, path) => {
  const keys = path.split(".")
  const lastKey = keys.pop()

  const lastObj = keys.reduce((obj, key) =>
    obj[key] = obj[key] || {},
    obj)
  return { lastObj, lastKey }
}
 /* eslint-enable */

const nestedObjectRemove = (obj, path, id) => {
  const { lastObj, lastKey } = getNestedObject(obj, path);
  let newObj = [];
  if (lastObj.hasOwnProperty(lastKey)) {
    if (Array.isArray(lastObj[lastKey])) {
      newObj = lastObj[lastKey].filter(item => item.id !== id);
      Vue.set(lastObj, lastKey, newObj);
    } else {
      Vue.set(lastObj, lastKey, {});
    }
  } else {
    console.log('nothing to remove');
  }
};

const nestedObjectSet = (obj, path, value) => {
  const { lastObj, lastKey } = getNestedObject(obj, path);
  Vue.set(lastObj, lastKey, value);
};

const nestedObjectAdd = (obj, path, value) => {
  const { lastObj, lastKey } = getNestedObject(obj, path);
  let newObj = [];
  if (lastObj.hasOwnProperty(lastKey)) {
    newObj = lastObj[lastKey].concat(value);
  } else {
    newObj.push(value);
  }
  Vue.set(lastObj, lastKey, newObj);
};
