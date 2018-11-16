import {
  authenticateUser,
  createUser,
  fetchFundraiser,
  fetchFundraisers,
  fetchComments,
  fetchCommonData,
  fetchDonations,
  fetchExploreFundraisers,
  fetchHomePage,
  fetchNonprofit,
  fetchTopFundraisers,
  fetchUpdates,
  lookUpEmail,
  sendComment,
  sendDonation,
  removePaymentMethod,
  updateUserField,
  submitNonprofitForm,
  submitPasswordChangeRequest,
  setTemporaryPassword,
  saveInlineField,
  saveImageField,
  removeImage,
  removeVideo,
  addVideo,
  updateVideo,
} from '../api';

export default {
  /**
   * Fetch nonprofit for the given EIN.
   * Store the response or reject the promise if not found.
   * Same for most functions below.
   */
  FETCH_NONPROFIT: ({ commit, dispatch, state }, { ein }) => new Promise((resolve, reject) => fetchNonprofit(ein)
    .then((data) => {
      commit('ADD_NEW_NONPROFIT', { nonprofit: data });
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  FETCH_FUNDRAISER: ({ commit, dispatch, state }, { id }) => new Promise((resolve, reject) => fetchFundraiser(id)
    .then((data) => {
      commit('SET_FUNDRAISER', { fundraiser: data });
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  FETCH_FUNDRAISERS: ({ commit, dispatch, state }, { ein }) => new Promise((resolve, reject) => fetchFundraisers(ein)
    .then((data) => {
      commit('SET_FUNDRAISERS', { fundraisers: data });
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  FETCH_COMMON_DATA: ({ commit, dispatch, state }) => new Promise((resolve, reject) => fetchCommonData()
    .then((data) => {
      commit('SET_COMMON_DATA', { common: data });
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  /**
   * Fetch updates for a given fundraiser.
   * If no data is returned, delete the stored object (meaning the fundraiser doesn't have any updates).
   */
  FETCH_UPDATES: ({ commit, dispatch, state }, { fundraiserId, paginated }) => new Promise((resolve, reject) => fetchUpdates(fundraiserId, state.updates.current, state.updates.limit, paginated)
    .then((data) => {
      commit('ADD_UPDATES', { updates: data });
      resolve(data);
    })
    .catch((err) => {
      commit('ADD_UPDATES', { updates: [] });
      reject(err);
    })),
  FETCH_COMMENTS: ({ commit, dispatch, state }, { fundraiserId, paginated }) => new Promise((resolve, reject) => fetchComments(fundraiserId, state.comments.current, state.comments.limit, paginated)
    .then((data) => {
      commit('ADD_COMMENTS', { comments: data });
      resolve(data);
    })
    .catch((err) => {
      commit('ADD_COMMENTS', { comments: [] });
      reject(err);
    })),
  /**
   * Fetch donors data.
   * The query is modified depending on the target: if it's nonprofit or a fundraiser.
   * If no data is returned, delete the stored object.
   */
  FETCH_DONATIONS: ({ commit, dispatch, state }, { fundraiserId, nonprofitEIN, paginated }) => new Promise((resolve, reject) => {
    let query = '';
    if (fundraiserId) {
      query = `fundraiser_id=${fundraiserId}`;
    }
    if (nonprofitEIN) {
      query = `nonprofit_ein=${nonprofitEIN}`;
    }
    return fetchDonations(query, state.donations.current, state.donations.limit, paginated)
      .then((data) => {
        commit('ADD_DONATIONS', { donations: data });
        resolve(data);
      })
      .catch((err) => {
        commit('ADD_DONATIONS', { donations: [] });
        reject(err);
      });
  }),
  FETCH_TOP_FUNDRAISERS: ({ commit, dispatch, state }, { paginated }) => new Promise((resolve, reject) => fetchTopFundraisers(state.topFundraisers.current, state.topFundraisers.limit, paginated)
    .then((data) => {
      commit('ADD_TOP_FUNDRAISERS', { fundraisers: data });
      resolve(data);
    })
    .catch((err) => {
      commit('ADD_TOP_FUNDRAISERS', { fundraisers: [] });
      reject(err);
    })),
  FETCH_HOME_PAGE: ({ commit, dispatch, state }) => new Promise((resolve, reject) => fetchHomePage()
    .then((data) => {
      commit('SET_HOME_PAGE', { home: data });
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  FETCH_EXPLORE_FUNDRAISERS: ({ commit, dispatch, state }) => new Promise((resolve, reject) => fetchExploreFundraisers()
    .then((data) => {
      commit('SET_EXPLORE_FUNDRAISERS', { fundraisers: data });
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  /**
   * This just stores the donation trigger, to be further sent with the donation to the backend.
   */
  START_DONATION: ({ commit, dispatch, state }, { initiator }) => {
    commit('START_DONATION', { initiator });
  },
  WRITE_COMMENT: ({ commit, dispatch, state }, {
    comment, reply, fullName, fundraiserId, honeypot,
  }) => new Promise((resolve, reject) => sendComment(comment, reply, fullName, fundraiserId, honeypot)
    .then((data) => {
      commit('UPDATE_COMMENTS', { comment: data });
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  SEND_DONATION: ({ commit, dispatch, state }, { donation }) => new Promise((resolve, reject) => sendDonation(donation)
    .then((data) => {
      commit('UPDATE_DONATION', { donation: data });
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  /**
   * This should create a new user. For now, create a fake user and authenticate it.
   */
  CREATE_USER: ({ commit, dispatch, state }, {
    email, password, firstname, lastname,
  }) => new Promise((resolve, reject) => createUser({
    email, password, firstname, lastname,
  })
    .then((data) => {
      if (data && data.code !== 401) {
        // temporarily use a standard email to authentica a newly created user.
        dispatch('AUTHENTICATE_USER', { email: 'john@doe.com', password: 'qqQQ11!!' })
          .then((data) => {
            if (data && data.code !== 401) {
              resolve(data);
            } else {
              resolve({ code: 401 });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        resolve(null);
      }
    })
    .catch((err) => {
      reject(err);
    })),
  AUTHENTICATE_USER: ({ commit, dispatch, state }, { email, password }) => new Promise((resolve, reject) => authenticateUser(email, password)
    .then((data) => {
      if (data && data.code !== 401) {
        commit('AUTHENTICATE_USER', { data });
        setTimeout(() => {
          resolve(data);
        }, 3000);
      } else {
        setTimeout(() => {
          resolve(null);
        }, 3000);
      }
    })
    .catch((err) => {
      reject(err);
    })),
  LOOK_UP_EMAIL: ({ commit, dispatch, state }, { email }) => new Promise((resolve, reject) => lookUpEmail(email)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  REMOVE_PAYMENT_METHOD: ({ commit, dispatch, state }, { id }) => new Promise((resolve, reject) => removePaymentMethod(id)
    .then((id) => {
      commit('REMOVE_PAYMENT_METHOD', { id });
      resolve(id);
    })
    .catch((err) => {
      reject(err);
    })),
  UPDATE_USER_FIELD: ({ commit, dispatch, state }, { field, value }) => new Promise((resolve, reject) => updateUserField(field, value)
    .then((value) => {
      commit('UPDATE_USER_FIELD', { field, value });
      resolve(value);
    })
    .catch((err) => {
      reject(err);
    })),
  SUBMIT_NONPROFIT_FORM: ({ commit, dispatch, state }, { form }) => new Promise((resolve, reject) => submitNonprofitForm(form)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })),
  SUBMIT_PASSWORD_CHANGE_REQUEST: ({ commit, dispatch, state }, { form }) => new Promise((resolve, reject) => {
    submitPasswordChangeRequest(form)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  }),
  SET_TEMPORARY_PASSWORD: ({ commit, dispatch, state }, { email }) => new Promise((resolve, reject) => {
    setTemporaryPassword(email)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  }),
  SAVE_INLINE_FIELD: ({ commit, dispatch, state }, { location, value }) => new Promise((resolve, reject) => {
    saveInlineField(location, value)
      .then((data) => {
        commit('SAVE_INLINE_FIELD', { location, value });
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  SAVE_IMAGE_FIELD: ({ commit, dispatch, state }, { location, route, blob }) => new Promise((resolve, reject) => {
    saveImageField(location, route, blob)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  REMOVE_IMAGE: ({ commit, dispatch, state }, { location, route, id }) => new Promise((resolve, reject) => {
    removeImage(location, route, id)
      .then((data) => {
        commit('REMOVE_IMAGE', { location, id });
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  REMOVE_VIDEO: ({ commit, dispatch, state }, { location, route, id }) => new Promise((resolve, reject) => {
    removeVideo(location, route, id)
      .then((data) => {
        commit('REMOVE_VIDEO', { location, id });
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  ADD_VIDEO: ({ commit, dispatch, state }, { location, route, youTubeID }) => new Promise((resolve, reject) => {
    addVideo(location, route, youTubeID)
      .then((data) => {
        commit('ADD_VIDEO', { location, youTubeID });
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  UPDATE_VIDEO: ({ commit, dispatch, state }, {
    location, route, oldSrc, newSrc,
  }) => new Promise((resolve, reject) => {
    updateVideo(location, route, oldSrc, newSrc)
      .then((data) => {
        commit('UPDATE_VIDEO', { location, oldSrc, newSrc });
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
};
