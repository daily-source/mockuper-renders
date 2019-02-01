<template>
  <div class='user-register-form'>
    <component 
      :is='formComponent'
      @submit='onFormSubmit'
      @onBackClicked='goToPreviousStep'
      :form-values='form'
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import UserRegisterFormStepOne from 'LocalComponents/User/Register/UserRegisterFormStepOne'
import UserRegisterFormStepTwo from 'LocalComponents/User/Register/UserRegisterFormStepTwo'

export default {
  name: 'UserRegisterForm',

  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        latitude: null,
        longitude: null,
        nonprofits: []
      },
      currentStep: 1,
    }
  },

  methods: {
    async onFormSubmit (formData, finishSubmitting = false) {
      this.form = {
        ...this.form,
        ...formData,
      }


      if (finishSubmitting) {
        const user = await this.registerUser(this.form)
        console.log(user)
        this.$router.push({name: 'user-profile', params: { userId: user.id }})
      } else {
        this.currentStep += 1
      }
    },

    /**
     * Go to the previous form step
     */
    goToPreviousStep () {
      this.currentStep -= 1
    },

    ...mapActions({
      registerUser: 'users/registerUser'
    })
  },

  computed: {
    formComponent () {
      if (this.currentStep === 1) {
        return UserRegisterFormStepOne
      }

      return UserRegisterFormStepTwo
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
