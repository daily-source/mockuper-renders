<template>
<div class='stations-directory-list-item'>
  <div class="columns stations-directory-list-item__columns">
    <div class="column is-3 stations-directory-list-item__img-column">
      <div class="stations-directory-list-item__img">
        <img :src="station.picture" :alt="station.name">
      </div>
    </div>
    <div class="column stations-directory-list-item__details-column">
      <div class="stations-directory-list-item__name-block is-flex">
        <h4 class='has-text-weight-bold'>
          <router-link :to="{ name: 'stations-profile', params: { id: station.id } }" v-if='!edit'>{{ station.name }}</router-link>
          <span v-else>{{ station.name }}</span>
        </h4>
        <span class="stations-directory-list-item__location">{{ station.position.name }}</span>
      </div>
      <div class="columns stations-directory-list-item__details-block">
        <div class="column is-3">
          <p class='is-marginless'><span class="has-text-weight-bold">Participants:</span> {{ station.participants || 0}}</p>
        </div>
        <div class="column">
          <p class='is-marginless'><span class="has-text-weight-bold">Amount Donated:</span> {{ station.amountDonated || 0 | usd }}</p>
        </div>
      </div>
      <!-- <div class="columns stations-directory-list-item__details-block stations-directory-list-item__details-block--last">
        <div class="column">
          <p class='is-marginless'><span class="has-text-weight-bold">Location:</span> {{ station.position.name }}</p>
        </div>
      </div> -->
      <div class="stations-directory-list-item__tagline">
        <p v-if='!edit'>{{ station.tagline }}</p>
        <div class="field" v-if='edit'>
          <div class="control">
            <textarea-with-warning
              class='stations-directory-list-item__textarea'
              name='description'
              placeholder='Maximum of 225 characters '
              id='description'
              rows='3'
              :max-length='225'
              :warning-max-length='225'
              v-model='form.tagline'
              @invalid='(errors) => onFieldError("description", errors)'
              @warningChange='(warnings) => onFieldWarning("description", warnings)'
            />
            <div class="field-errors">
              <p 
                class='help has-text-success has-text-weight-bold'
              >
                Maximum {{ 225 }} characters. Remaining: 
                <span
                  :class='{"has-text-danger": errors.description && errors.description.maxLength}'
                >
                  {{ 225 - form.tagline.length }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="stations-directory-list-item__actions" v-if='!edit'>
        <router-link :to="{ name: 'stations-profile', params: { id: station.id } }" class='button is-secondary'>Visit</router-link>
        <router-link to="#" class='button is-primary'>Join</router-link>
        <div class="stations-directory-list-item__management-actions" v-if='isManagement'>
          <router-link to="#" class='has-text-danger is-primary' >Get info</router-link>
          <router-link to="#" class='has-text-danger is-primary'>Admin this station</router-link>
        </div>
      </div>
      <div class="stations-directory-list-item__actions stations-directory-list-item__actions--edit" v-else>
        <router-link to="#" class='button is-secondary'>Visit</router-link>
        <router-link to="#" class='button is-primary'>Join</router-link>
        <div class="stations-directory-list-item__management-actions" v-if='isManagement'>
          <router-link to="#" class='has-text-danger is-primary' >Get info</router-link>
          <router-link to="#" class='has-text-danger is-primary'>Admin this station</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TextareaWithWarning from 'Components/input/TextareaWithWarning'

export default {
  name: 'StationsDirectoryListItem',

  components: {
    TextareaWithWarning,
  },

  props: {
    station: {
      type: Object,
      required: false,
    },

    edit: {
      type: Boolean,
      required: false,
      default: false
    },
  },

  data () {
    const tagline = this.station.tagline ? this.station.tagline : this.stripHtml(this.station.description)

    return {
      form: {
        ...this.station,
        tagline,
      },
      errors: {},
    }
  },

  methods: {
    onFormChange () {
      this.$emit('item:change', this.form)
    },

    stripHtml (content) {
      return content.replace(/<\/?[^>]+(>|$)/g, "")
    },
  },

  computed: {
    isManagement () {
      return this.$route.meta.management
    },
  },

  watch: {
    form: {
      deep: 'true',
      handler: 'onFormChange',
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.stations-directory-list-item {
  padding-top: 1em;
  padding-bottom: 1.25em;

  &:first-child {
    padding-top: 2em;
  }

  p {
    &:not(.help) {
      font-size: 17px;
    }
  }

  &__name-block {
    padding-top: .25em;
    align-items: center;
    margin-bottom: 1.25em;

    span {
      font-size: 1.125em;
    }
  }

  h4 {
    font-size: 1.375em;
    color: $primary;
    margin-bottom: 0;
    margin-right: .875rem;
  }

  &__img-column {
    width: 380px;
  }

  &__details-column {
    display: flex;
    flex-direction: column;

    @include tablet {
      margin-top: -5px;
    }
  }

  .field {
    margin-bottom: 1rem;
  }

  &__textarea {
    font-size: 17px;
    max-width: 720px;
    min-width: auto;
  }

  &__columns {
    align-items: stretch;
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: auto;

    a {
      font-size: 0.875em;
      padding: 0.125em 0.5em !important;
      height: auto;
    }

    > a {
      &:not(:last-of-type) {
        margin-right: .375em;
        @media (min-width: 576px) {
          margin-right: 1em;
        }
      }
    }
  }

  &__management-actions {
    margin-left: .375em;

    @media (min-width: 576px) {
      margin-left: 1em;
    }
    
    a {
      text-decoration: underline;
      padding: 0 !important;
      
      @include tablet {
        font-size: 1em;
      }
      
      &:not(:last-of-type) {
        margin-right: .375em;
        @media (min-width: 576px) {
          margin-right: 1em;
        }
      }
    }
  }

  img {
    // min-height: 225px;
    height: 200px;
    width: 100%;
    object-fit: cover;
  }

  &__details-block { 
    &:last-of-type {
      margin-bottom: .25rem;
    }

    > .column {
      padding-top: .25rem;
      padding-bottom: .25rem;

      @include tablet {
        padding-top: .5rem;
        padding-bottom: .5rem;
      }
    }
  }
}
</style>

