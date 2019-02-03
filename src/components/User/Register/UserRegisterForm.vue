<template>
  <div class='user-register-form'>
    <div class='intro-text' v-if='currentStep === 1'>
      <p class='has-text-centered'>If you were alive in the 1800s, would you have supported the Underground Railroad to free slaves? Today, there are 25 million slaves in the world, more than ever in history. Will you help to free some of them?</p>
    </div>
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
        userName: '',
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
        this.$router.push({name: 'user-profile', params: { userId: user.id }, query: { new: 1 } })
      } else {
        this.currentStep += 1
        window.scrollTo(0, 0)
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
.intro-text {
  p {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;    
  }
}
</style>
