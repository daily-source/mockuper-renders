<template>
  <div class="station-register-step-one">
    <div class="container station-register-step-one__container">
      <h1 class='station-register__heading'>Register Your Group</h1>
      <p class='station-register__subheading'>If you are a nonprofit that actively does anti-slavery work, you should join as a nonprofit, not as a station by clicking <router-link :to='{name: "nonprofit-sign-up-step-one"}'>here</router-link>. Joining as a nonprofit adds you to our Nonprofit Directory and our main map pages. It also allows you to receive donations if you’re a 501(c)3. You also show up more prominently on the profile pages of users that support you.</p>
      <p class="station-register__subheading">Stations are for groups (whether nonprofits, businesses or other groups) that are collectively supporting nonprofits that are doing anti-slavery work. For example, a college can have a station showing the students, alumni and faculty that are part of the Virtual Railroad. Or a business can have a station showing the employees of the business who are part of the Virtual Railroad.</p>

      <div class="station-register-step-one__form-wrapper">
        <station-register-step-one-form />
      </div>
    </div>
  </div>
</template>

<script>
import StationRegisterStepOneForm from 'LocalComponents/Station/Register/StationRegisterStepOneForm'

export default {
  name: 'StationRegisterStepOne',

  components: {
    StationRegisterStepOneForm,
  },
}
</script>

<style lang='scss' scoped>
.station-register-step-one {
  &__container {
    max-width: 1120px;
  }
  &__form-wrapper {
    max-width: 940px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
