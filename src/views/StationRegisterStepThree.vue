<template>
<div class="station-register-step-three">
  <div class="container station-register-step-three__container">
    <alert
      :open='showSaveSucess'
      @closeButtonClicked='showSaveSucess = false'
      type='success'
    >
      Station successfuly saved. If you’re ready to submit your station for approval, click “Submit.” 
    </alert>
    <h1 class='station-register__heading has-text-weight-bold'>Create your directory listing</h1>
    <p class='station-register__subheading'>Below is how your listing in our stations directory will look. Most of it is drawn from your station page. When people join your station or donate to nonprofits, the figures in your listing will instantly go up. On this screen, you only need to create a summary of your station. In case you want to adapt your About text, we’ve copied it below. If it’s less than 225 characters, you can use the same text. If it’s longer, reduce it as needed.</p>
    <station-register-step-three-form 
      :station='station'
      @station:saved='showSaveSucess = true'
    />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

import Alert from 'LocalComponents/Alert/Alert'
import StationsDirectoryListItem from 'LocalComponents/StationsDirectory/StationsDirectoryListItem'
import StationRegisterStepThreeForm from 'LocalComponents/Station/Register/StationRegisterStepThreeForm';

export default {
  name: 'StationRegisterStepThree',

  components: {
    StationsDirectoryListItem,
    StationRegisterStepThreeForm,
    Alert,
  },

  data () {
    return {
      tempStation: {
        ...this.station,
      },
      showSaveSucess: false,
    }
  },

  computed: {
    ...mapState({
      station: state => state.stations.register.station
    })
  }
}
</script>

<style lang='scss' scoped>
.station-register-step-three {
  &__container {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  .station-register__subheading {
    color: $grey;
  }
}
</style>
