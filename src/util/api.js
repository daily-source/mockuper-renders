import _ from 'lodash'
import store from '../store'

const IRSSearchAPI = process.env.VUE_APP_IRS_SEARCH_API_URL || process.env.IRS_SEARCH_API_URL

/**
 * 
 * all-caps and vice-versa
 */
const protectedKeys = ['data', 'fromIrs']

export async function getNonprofit (ein, caps = false) {
    let np = await getNonprofitFromIRSDatabase(ein)

    if (np) return np

    np = await getNonprofitFromVRDatabase(ein, caps)

    return np
}

/**
 * Fetches a nonprofit from the IRS database
 * 
 * @param {string} ein Employee Identification Number
 */
export async function getNonprofitFromIRSDatabase (ein, caps = false) {
  try {
    const res = await fetch(`${IRSSearchAPI}/nonprofits/${ein}`)

    const resJson = await res.json()

    if (!resJson.length) return false

    const nonprofit = {
      data: {
        name: resJson[0].NAME
      },
      ...resJson[0],
      NTEE_CD: resJson[0].NTEE_CD && resJson[0].NTEE_CD !== '0' ? resJson[0].NTEE_CD : '-',
      ACTIVITY: resJson[0].ACTIVITY && resJson[0].ACTIVITY !== '0' ? resJson[0].ACTIVITY : '-',
      fromIrs: true,
    }

    return transformNonprofit(nonprofit, caps)
  } catch (err) {
    console.log(err)
  }
}

/**
 * Gets nonprofit from the VR database
 * 
 * @param {Number} ein 
 * @param {Boolean} caps Transform to keys to all caps
 */
export async function getNonprofitFromVRDatabase (ein, caps = false) {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      let np = store.state.nonprofits.data.find(nonprofit => nonprofit.ein == ein)

      if (np) {
        let nonprofit = {
          data: {
            name: np.NAME
          },
          ...np,
          NTEE_CD: np.NTEE_CD && np.NTEE_CD !== '0' ? np.NTEE_CD : '-',
          ACTIVITY: np.ACTIVITY && np.ACTIVITY !== '0' ? np.ACTIVITY : '-',
          fromIrs: false,
        }

        nonprofit = transformNonprofit(nonprofit, caps)

        resolve(nonprofit)
        return
      }
      
      resolve(null)
    }, _.random(100, 800))
  })
}

/**
 * The IRS database returns an object with all-caps keys, while the VR mock
 * database currently returns an object with small-caps keys. This function
 * converts them to all small caps or all-caps to preserve consistency. Default
 * to small caps
 *
 * @param {*} nonprofit 
 */
export function transformNonprofit (nonprofit, caps = false) {
  return _.transform(nonprofit, (result, val, key) => {
    if (protectedKeys.indexOf(key) !== -1) {
      result[key] = val
    } else {
      const transformedKey = caps ? key.toUpperCase() : key.toLowerCase()
      result[transformedKey] = val
    }
  })
}