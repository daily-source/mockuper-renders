<template>
  <form 
    class="station-register-step-two-form"
    @submit.prevent='processForm'
  >
    <div class="station-register-two-form__station-details-wrapper">
      <div class="container">
        <div class="station-register-step-two-form__columns columns">
          <div class="station-register-step-two-form__picture-column column">
            <croppa
              v-model='croppaObject'
              :width='286'
              :height='161 '
              :placeholder-font-size='18'
              :placeholder-color='"#000"'
              class='station-register-step-two-form__photo-upload'
            />
          </div>
          <div class="station-register-step-two-form__station-details column">
            <div class='station-register-step-two-form__block is-flex station-register-step-two-form__name-block'>
              <input-field-with-warning 
                v-model='form.name'
                class='station-register-step-two-form__name-input'
                placeholder='Type your station name here.'
              />
              <span class="station-register-step-two-form__location">
                <input-field-with-warning 
                  v-model='form.position.name'
                  class='station-register-step-two-form__location-input'
                  placeholder='Enter your location here'
                />
              </span>
              <button class='button is-secondary station-register-step-two-form__join-button'>
                Join
              </button>
            </div>
            <div class="station-register-step-two-form__about-block">
              <textarea-with-warning 
                v-model='form.description'
                class='station-register-step-two-form__about-input'
                placeholder='Add a description of your group and station here. For example: What is your group? Why are you fighting slavery? 500 character limit.'
                :max-length='500'
                :warning-max-length='475'
                @invalid='(errors) => onFieldError("description", errors)'
                @warningChange='(warnings) => onFieldWarning("description", warnings)'
              />
              <div class="field-errors">
                <p 
                  class='help has-text-success has-text-weight-bold'
                  v-if='(errors.description && errors.description.maxLength) || (warnings.description && warnings.description.maxLength)'
                >
                  Maximum 500 characters. Remaining: 
                  <span
                    :class='{"has-text-danger": errors.description && errors.description.maxLength}'
                  >
                    {{ 500 - form.description.length }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="station-register-step-two-form__map-section-wrapper">
      <div class="container">
        <p class='station-register-step-two-form__subheading'>Add your location to the map <span class="has-text-danger">*</span></p>
      </div>
      <station-register-location-chooser 
        @place:submit='onPlaceSubmit'
        :station='form'
      />
      <!-- <div class="station-register-step-two-form__map-section">  
        <general-info 
          :opened='true'
          class='station-general-info'
        />
        <home-page-actions 
          :show-play-button='false'
        />
        <station-map />
        <map-legends 
          :opened='opened'
          @toggle='toggleLegends'
        />
      </div> -->
    </div>
    <div class="station-register-step-two-form__alumni-section">
      <div class="container">
        <h3 class='has-text-weight-bold has-text-centered'>People Who Support Our Station</h3>
        <div class="station-register-step-two-form__establishment-type">
          <p class="station-register-step-two-form__subheading has-text-weight-bold">Choose your supporters format:</p>
          <p>Click the buttons below to see samples of how they look</p>
          <div class="field">
            <div class="control">
              <label class="radio">
                <input type="radio" name="answer" v-model='form.establishmentType' value='school'>
                School format
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="radio">
                <input type="radio" name="answer" v-model='form.establishmentType' value='non-school'>
                Non-school format
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="radio">
                <input type="radio" name="answer" v-model='form.establishmentType' value=''>
                Unselect: decide this later
              </label>
            </div>
          </div>
          <p>You must choose a format before you submit your station for approval. After approval, you can’t change from non-school format to school format. But you can change from school format to non-school format: we will remove the categories from your page and show only the names.</p>
        </div>
        <slide-fade>
          <div class="station-register-step-two-form__alumni-section-columns" v-if='form.establishmentType === "school"'>
            <div class="columns">
              <div class="column alumni-section__list-col">
                <h4 class='has-text-weight-bold'>Alumni</h4>
                <ul class=''>
                  <li>
                    <span class="has-text-weight-bold">Class of 2019</span>
                    <ul>
                      <li>David Lynn</li>
                      <li>Rafael Mason</li>
                      <li>Carrie Nardelli</li>
                      <li>Narayan Achi</li>
                    </ul>
                  </li>
                  <li>
                    <span class="has-text-weight-bold">Class of 2018</span>
                    <ul>
                      <li>Adi Vichova</li>
                      <li>Seth Aronson</li>
                      <li>Angela Nunez</li>
                    </ul>
                  </li>
                  <li>
                    <span class="has-text-weight-bold">Class of 2017</span>
                    <ul>
                      <li>Sharon Wooding</li>
                      <li>Miles Ackerman</li>
                      <li>David Chung</li>
                      <li>Steve Meenan</li>
                      <li>Kristin Bresnahan</li>
                    </ul>
                  </li>
                  <li>
                    <span class="has-text-weight-bold">Class of 2016</span>
                    <ul>
                      <li>Scott Lindbloom</li>
                      <li>Teresa Sampson</li>
                      <li>Sebastian Quinn</li>
                    </ul>
                  </li>
                  <li>
                    <span class="has-text-weight-bold">Class of 2015</span>
                    <ul>
                      <li>Don Rhee</li>
                      <li>Jimmy Cranston</li>
                      <li>Marissa Wilson</li>
                      <li>Cindy Pugoli</li>
                    </ul>
                  </li>
                  <li>
                    <span class="has-text-weight-bold">Class of 2014</span>
                    <ul>
                      <li>Marcus Steinman</li>
                      <li>Ann Marie Petri</li>
                      <li>Lynnette Cavanaugh</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="column alumni-section__list-col">
                <div class="list-section">
                  <h4 class='has-text-weight-bold'>Current students</h4>
                  <ul>
                    <li>
                      <span class="has-text-weight-bold">Class of 2020</span>
                      <ul>
                        <li>
                          Jill Smith
                        </li>
                        <li>
                          Kevin Guitierrez
                        </li>
                        <li>
                          Susan Lundgren
                        </li>
                        <li>
                          Mel Hollis
                        </li>
                        <li>
                          Karen Nguyen
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span class="has-text-weight-bold">Class of 2021</span>
                      <ul>
                        <li>
                          Ira Rosen 
                        </li>
                        <li>
                          Jason Claiborne  
                        </li>
                        <li>
                          Nick Palexis
                        </li>
                        <li>
                          Mel Hollis
                        </li>
                        <li>
                          Linda Joubert
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span class="has-text-weight-bold">Class of 2022</span>
                      <ul>
                        <li>
                          Mackensie Stevens
                        </li>
                        <li>
                          Mike Andrews  
                        </li>
                        <li>
                          Nate Birbiglia 
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span class="has-text-weight-bold">Class of 2023</span>
                      <ul>
                        <li>
                          Yousef Kabran
                        </li>
                        <li>
                          David Tosi
                        </li>
                        <li>
                          Amet Guzdar
                        </li>
                        <li>
                          Justin Pearl
                        </li>
                        <li>
                          Ted Roppel 
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="column alumni-section__list-col">
                <div class="list-section">
                  <h4 class='has-text-weight-bold'>Fans</h4>
                  <ul class='marginless-list indented-list'>
                    <li>
                      Jay Ansin
                    </li>
                    <li>
                      Roy Amberger                                                                   
                    </li>
                    <li>
                      Lily Hilgrow
                    </li>
                    <li>
                      Rob Cohen
                    </li>
                    <li>
                      Daniel Kim
                    </li>
                    <li>
                      Anthony Larelli
                    </li>
                    <li>
                      Tina Kavowski
                    </li>
                    <li>
                      Tom Newfield
                    </li>
                    <li>
                      Linda Moore
                    </li>
                    <li>
                      Laphonso Deon
                    </li>
                    <li>
                      Pablo Ruiz David Lobell
                    </li>
                    <li>
                      Jill Hagandanz
                    </li>
                    <li>
                      David Chen
                    </li>
                    <li>
                      Walter Thoreau
                    </li>
                  </ul>
                </div>
                <div class="list-section">
                  <h4 class='has-text-weight-bold'>Faculty and staff</h4>
                  <ul class='marginless-list indented-list'>
                    <li>
                      Alex Curran
                    </li>
                    <li>
                      Andrew Enoch
                    </li>
                    <li>
                      Laurence Falvey
                    </li>
                    <li>
                      Peter Ferguson
                    </li>
                    <li>
                      Hunter Aron
                    </li>
                    <li>
                      Maggie Olerud
                    </li>
                    <li>
                      Sumi Lee
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> 
        </slide-fade>
        <slide-fade>
          <div class="station-register-step-two-form__alumni-section-columns" v-if='form.establishmentType === "non-school"'>
            <div class="columns">
              <div class="column alumni-section__list-col">
                <ul class='marginless-list'>
                  <li>David Lynn</li>
                  <li>Rafael Mason</li>
                  <li>Carrie Nardelli</li>
                  <li>Narayan Achi</li>
                  <li>Adi Vichova</li>
                  <li>Seth Aronson</li>
                  <li>Angela Nunez</li>
                  <li>Sharon Wooding</li>
                  <li>Miles Ackerman</li>
                  <li>David Chung</li>
                  <li>Steve Meenan</li>
                  <li>Kristin Bresnahan</li>
                  <li>Scott Lindbloom</li>
                  <li>Teresa Sampson</li>
                  <li>Sebastian Quinn</li>
                  <li>Don Rhee</li>
                  <li>Jimmy Cranston</li>
                  <li>Marissa Wilson</li>
                  <li>Cindy Pugoli</li>
                  <li>Marcus Steinman</li>
                  <li>Ann Marie Petri</li>
                </ul>
              </div>
              <div class="column alumni-section__list-col">
                <div class="list-section">
                  <ul class='marginless-list'>
                    <li>
                      Jill Smith
                    </li>
                    <li>
                      Kevin Guitierrez
                    </li>
                    <li>
                      Susan Lundgren
                    </li>
                    <li>
                      Mel Hollis
                    </li>
                    <li>
                      Karen Nguyen
                    </li>
                    <li>
                      Ira Rosen 
                    </li>
                    <li>
                      Jason Claiborne  
                    </li>
                    <li>
                      Nick Palexis
                    </li>
                    <li>
                      Mel Hollis
                    </li>
                    <li>
                      Linda Joubert
                    </li>
                    <li>
                      Mackensie Stevens
                    </li>
                    <li>
                      Mike Andrews  
                    </li>
                    <li>
                      Nate Birbiglia 
                    </li>
                    <li>
                      Yousef Kabran
                    </li>
                    <li>
                      David Tosi
                    </li>
                    <li>
                      Amet Guzdar
                    </li>
                    <li>
                      Justin Pearl
                    </li>
                    <li>
                      Ted Roppel 
                    </li>
                    <li>Lynnette Cavanaugh</li>
                    <li>
                      Sumi Lee
                    </li>
                  </ul>
                </div>
              </div>
              <div class="column alumni-section__list-col">
                <div class="list-section">
                  <ul class='marginless-list'>
                    <li>
                    Jay Ansin
                  </li>
                  <li>
                    Roy Amberger                                                                   
                  </li>
                  <li>
                    Lily Hilgrow
                  </li>
                  <li>
                    Rob Cohen
                  </li>
                  <li>
                    Daniel Kim
                  </li>
                  <li>
                    Anthony Larelli
                  </li>
                  <li>
                    Tina Kavowski
                  </li>
                  <li>
                    Tom Newfield
                  </li>
                  <li>
                    Linda Moore
                  </li>
                  <li>
                    Laphonso Deon
                  </li>
                  <li>
                    Pablo Ruiz David Lobell
                  </li>
                  <li>
                    Jill Hagandanz
                  </li>
                  <li>
                    David Chen
                  </li>
                  <li>
                    Walter Thoreau
                  </li>
                  <li>
                      Alex Curran
                    </li>
                    <li>
                      Andrew Enoch
                    </li>
                    <li>
                      Laurence Falvey
                    </li>
                    <li>
                      Peter Ferguson
                    </li>
                    <li>
                      Hunter Aron
                    </li>
                    <li>
                      Maggie Olerud
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </slide-fade>
      </div>
    </div>
    <div class="station-register-step-two-form__actions">
      <button class='button is-primary' type='submit' :disabled='!isValid'>Save</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import SlideFade from 'Components/transitions/SlideFade'

import InputFieldWithWarning from 'Components/input/InputFieldWithWarning'
import TextareaWithWarning from 'Components/input/TextareaWithWarning'
import StationMap from 'LocalComponents/Station/StationMap'
import StationRegisterLocationChooser from 'LocalComponents/Station/Register/StationRegisterLocationChooser'

export default {
  name: 'StationRegisterStepTwoForm',

  components: {
    InputFieldWithWarning,
    TextareaWithWarning,
    StationMap,
    SlideFade,
    StationRegisterLocationChooser,
  },

  data () {
    return {
      croppaObject: null,
      form: {
        position: {
          lat: null,
          lng: null,
          name: '',
        },
      },
      opened: true,
      errors: {},
      warnings: {},
    }
  },

  mounted () { 
    this.changeMapStyle('light')
  },

  methods: {
    toggleLegends () {
      this.opened = !this.opened
    },

    onFieldError (field, errors) {
      this.errors[field] = errors
    },

    onFieldWarning (field, warnings) {
      this.warnings[field] = warnings
    },

    onPlaceSubmit (place, loc) {
      this.form.position.lat = loc.lat()
      this.form.position.lng = loc.lng()
    },

    async processForm () {
      if (this.croppaObject.imageSet) {
        const avatar = this.croppaObject.generateDataUrl("image/jpeg", 0.8)

        this.form.picture = avatar
      }

      await this.setStationForRegistration({...this.form})

      this.$router.push({name: 'stations-register-step-three'})
    },

    ...mapActions({
      changeMapStyle: 'map/changeMapStyle',
    }),

    ...mapMutations({
      setStationForRegistration: 'stations/setStationForRegistration'
    })
  },

  computed: {
    isValid () {
      return this.form.name && this.form.description && this.croppaObject.imageSet && this.form.position.name && this.form.position.lat
    }
  },
}
</script>

<style lang='scss' scoped>
.station-register-step-two-form {
  &__picture-column {
    max-width: 310px;
  }
}
</style>

<style lang='scss'>
.station-register-step-two-form {
  &__photo-upload {
    > canvas {
      border: 2px dashed $primary;
      cursor: pointer;
      background-color: #e6e6e6;
    }
  }

  &__name-block {
    margin-bottom: 1rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @include tablet {
      align-items: center;
      flex-direction: row;
    }
  }

  &__name-input {
    max-width: 350px;
    font-size: 21px;
    margin-bottom: .25em;
    color: $primary;
    max-height: 2.25rem;

    @include tablet {
      margin-bottom: 0;
      margin-right: 1.25rem;
    }
  }

  &__about-block {
    max-width: 820px;
  }

  &__about-input {
    line-height: 1.7;
    height: 215px;
  }

  &__map-section-wrapper {
    margin-top: 1.625em;
    margin-bottom: 1.625em;
  }

  &__map-section {
    position: relative;
    height: 870px;
    overflow: hidden;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }

  &__alumni-section-columns {
    @include tablet {
      margin-left: 100px;
    }

    > .columns {
      justify-content: center;
    }
  }

  &__alumni-section {
    margin-left: auto;
    margin-right: auto;

    h3 {
      font-size: 24px;
      margin-bottom: 1.5rem;
      color: $hoya-primary-color;

      @include tablet {
        font-size: 36px;
      }
    }

    ul {
      > li {
        margin-bottom: 1em;
        font-size: 18px;

        @include tablet {
          font-size: 20px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        ul {
          padding-left: 1em;
          margin-top: .25em;

          > li {
            margin-bottom: .25em;
          }

        }
      }
    }

    h4 {
      font-size: 20px;
      margin-bottom: .75rem;
      color: $hoya-primary-color !important;

      @include tablet {
        font-size: 30px;
      }
    }

    .marginless-list {
      li {
        margin-bottom: 0;
      }
    }
  }

  .list-section {
    margin-top: 1em;

    &:first-of-type {
      margin-top: 0;
    }
  }

  &__establishment-type {
    max-width: 1110px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.5rem;
  }

  &__actions {
    margin-top: 1em;
    max-width: 1110px;
    margin-left: auto;
    margin-right: auto;
  }

  &__subheading {
    font-size: 19px;
    font-weight: 700;
  }

  &__location {
    margin-right: 1.25rem;
  }
}

.station-general-info {
  z-index: 10;
  margin-top: 20px !important;
  background-color: rgba($primary, .78) !important;
}
</style>

<style lang='scss'>
.station-register-step-two-form {
  .legends {
    &--minimized {
      bottom: -124px;
    }
  }

  .home-page-actions {
    position: absolute;
    top: 10%;
    right: 2%;
    z-index: 2;
  }
}
</style>