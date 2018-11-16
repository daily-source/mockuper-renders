import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const baseURL = process.env.VUE_APP_BASE_API;
const IRSSearchAPI = process.env.VUE_APP_IRS_SEARCH_API_URL;
const commentAPI = process.env.VUE_APP_COMMENT_API;

/*
 * Fetch nonprofit. This will return the nonprofit data from the API, or
 * will default to the IRS search API service if it can't be found in the main system.
 * It will reject with a 404 if the EIN does not represent a valid nonprofit.
 */
export function fetchNonprofit(ein) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${IRSSearchAPI}/nonprofits/${ein}`)
      .then((response) => {
        resolve(response.data[0]);
      })
      .catch(() => {
        reject({ code: 404 });
      });
  });
}

/*
 * Fetch a fundraiser and return the data or a 404 code if not found.
 */
export function fetchFundraiser(id) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${baseURL}/fundraisers?fundraiser_id=${id}`)
      .then((response) => {
        if (response.data.length) {
          resolve(response.data[0]);
        } else {
          reject({ code: 404 });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Fetch fundraisers for a given EIN. Return a 404 code if no fundraisers found.
 */
export function fetchFundraisers(ein, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1;
    }
    Vue.axios.get(`${baseURL}/fundraisers?nonprofit_ein=${ein}&_limit=${limit}&_page=${page++}`)
      .then((response) => {
        if (response.data.length) {
          resolve(response.data);
        } else {
          reject({ code: 404 });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Fetch fundraisers for the explore page. Return a 404 code if no fundraisers found.
 */
export function fetchExploreFundraisers(page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1;
    }
    // TODO: create algorithm to display varied fundraisers.
    Vue.axios.get(`${baseURL}/fundraisers?&_limit=${limit}&_page=${page++}`)
      .then((response) => {
        if (response.data.length) {
          resolve(response.data);
        } else {
          reject({ code: 404 });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Fetch common data for large/editable chunks of content.
 */
export function fetchCommonData(id) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${baseURL}/common`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Fetch updates for a given fundraiser. Return from most recent to least recent, paginating.
 */
export function fetchUpdates(fundraiserId, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1;
    }
    Vue.axios.get(`${baseURL}/updates?_sort=timestamp&_order=desc&fundraiser_id=${fundraiserId}&_limit=${limit}&_page=${page++}`)
      .then((response) => {
        if (response.data.length) {
          resolve(response.data);
        } else {
          reject({ code: 404 });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Fetch comments for a given fundraiser. Return from most recent to least recent, paginating.
 */
export function fetchComments(fundraiserId, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1;
    }
    Vue.axios.get(`${baseURL}/comments?fundraiser_id=${fundraiserId}&_limit=${limit}&_page=${page++}`)
      .then((response) => {
        if (response.data.length) {
          resolve(response.data);
        } else {
          reject({ code: 404 });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Fetch donations for a given nonprofit or fundraiser.
 */
export function fetchDonations(query, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1;
    }
    Vue.axios.get(`${baseURL}/donations?${query}&_limit=${limit}&_page=${page++}`)
      .then((response) => {
        if (response.data.length) {
          resolve(response.data);
        } else {
          reject({ code: 404 });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Fetch public donor data and sort them by total raised, descending.
 */
export function fetchTopFundraisers(page = 1, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1;
    }
    Vue.axios.get(`${baseURL}/donors?_sort=total_raised&_order=desc&_limit=${limit}&_page=${page++}`)
      .then((response) => {
        if (response.data.length) {
          resolve(response.data);
        } else {
          reject({ code: 404 });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Fetch data for the home page.
 */
export function fetchHomePage() {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${baseURL}/pages?page_name=home`)
      .then((response) => {
        if (response.data) {
          resolve(response.data[0]);
        } else {
          reject({ code: 404 });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Send comment to the API. This can be another API, therefore the .env var on top.
 */
export function sendComment(commentBody, inReplyTo, fullName, fundraiserId, honeypot) {
  return new Promise((resolve, reject) => {
    Vue.axios.post(commentAPI, {
      comment: commentBody,
      reply: inReplyTo,
      fullName,
      fundraiser_id: fundraiserId,
      fax: honeypot,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/*
 * Send donation to the API. For now, mock a server response, randomly rejecting a donation.
 */
export function sendDonation(donation) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject({ code: 401 });
      } else {
        resolve({ data: { donation } });
      }
    }, 3000);
  });
}

/*
 * Mock a new user creation in the store. This should actually perform an API call.
 */
export function createUser(email, password) {
  return new Promise((resolve, reject) => {
    resolve({ data: { email: { email } } });
  });
}

/*
 * Authenticate user. Temporarily allow a given password and return data from the DB for that user.
 */
export function authenticateUser(email, password) {
  return new Promise((resolve, reject) => {
    // temporarily allow any user
    if (password === 'qqQQ11!!') {
      Vue.axios.get(`${baseURL}/users_protected?email=${email}`)
        .then((data) => {
          if (data.data.length) {
            resolve(data.data[0]);
          } else {
            resolve(null);
          }
        })
        .catch((e) => {
          console.log('err: ', e);
          reject(e);
        });
    } else {
      resolve({ code: 401 });
    }
  });
}

/*
 * Submit a password change request to the backend.
 */
export function submitPasswordChangeRequest(form) {
  return new Promise((resolve, reject) => {
    // Emulate an API call. Reject a portion of the requests.
    setTimeout(() => {
      // reject if password is incorrect
      if (form.currentPassword !== 'qqQQ11!!') {
        reject({ code: 401 });
      }
      if (form.currentPassword === form.password) {
        reject({ message: 'Please use a different password' });
      }
      if (Math.random() > 0.9) {
        reject({ message: 'Remote API error' });
      }
      resolve();
    }, 1000);
  });
}

/*
 * Find if a given email is already in use.
 * Note for the backend: this should return only the email and the service used.
 * It also shouldn't return something under /users, only if the query is successful.
 */
export function lookUpEmail(email) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${baseURL}/users_public?email=${email}`)
      .then((data) => {
        if (data.data.length) {
          resolve(data.data[0]);
        } else {
          resolve(null);
        }
      })
      .catch((e) => {
        console.log('err: ', e);
        reject(e);
      });
  });
}

/*
 * Remove a payment method.
 * TODO: the complete call. This also needs to be protected behind auth and restricted to the user.
 */
export function removePaymentMethod(id) {
  return new Promise((resolve, reject) => {
    // Emulate an API call. Randomly reject some calls.
    setTimeout(() => {
      if (Math.random > 0.5) {
        reject({ code: 401 });
      }
      resolve(id);
    }, 4000);
  });
}

/*
 * Remove a payment method.
 * TODO: the complete call. This also needs to be protected behind auth and restricted to the user.
 */
export function updateUserField(field, value) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      resolve(value);
    }, 1000);
  });
}

/*
 * Send a nonprofit form.
 * TODO: the complete call. This also requires a second page of data for the fundraiser to be created.
 */
export function submitNonprofitForm(form) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      resolve(form);
    }, 1000);
  });
}

/*
 * Set a temporary password
 */
export function setTemporaryPassword(email) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      resolve(email);
    }, 1000);
  });
}

/*
 * Save a specific field
 */
export function saveInlineField(location, route, value) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      resolve({ location, value });
    }, 1000);
  });
}

/*
 * Save an image to the user's library.
 */
export function saveImageField(location, route, blob) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      console.log('save image: ', route.fullPath + blob);
      resolve({ location });
    }, 1000);
  });
}

/*
 * Remove an image.
 */
export function removeImage(location, route, src) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      resolve({ location });
    }, 1000);
  });
}

/*
 * Remove a video.
 */
export function removeVideo(location, route, youTubeID) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      resolve({ location });
      console.log('remove video: ', route.fullPath + youTubeID);
    }, 1000);
  });
}

/*
 * Add a video.
 */
export function addVideo(location, route, youTubeID) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      resolve({ location });
      console.log('add video: ', route.fullPath + youTubeID);
    }, 1000);
  });
}

/*
 * Update a video.
 */
export function updateVideo(location, route, oldSrc, newSrc) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 });
      }
      resolve({ location });
      console.log('update video: ', `${route.fullPath}/${oldSrc}`);
    }, 1000);
  });
}
