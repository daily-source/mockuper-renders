<template>
  <div class='user-register-step-one'>
    <h4 class='has-text-weight-bold has-text-centered'>Join the Virtual Railroad</h4>
    <form @submit.prevent='onFormSubmit'>
      <div class='field'>
        <label for='username' class='label'>Username: </label>
        <div class='control'>
          <input type='text' class='input' id='username' v-model='form.username'>
        </div>
      </div>
      <div class='field'>
        <label for='firstname' class='label'>First Name: </label>
        <div class='control'>
          <input type='text' class='input' id='firtname' v-model='form.firstName'>
        </div>
      </div>
      <div class='field'>
        <label for='firstname' class='label'>Last Name:</label>
        <div class='control'>
          <input type='text' class='input' id='firtname' v-model='form.lastName'>
        </div>
      </div>
      <div class='field'>
        <p>To join, you must volunteer for, work for or donate to at least one nonprofit that fights slavery. To find one to support, click <router-link to='nonprofit-directory'>here</router-link>. Select up to 8 nonprofits that will show as places you support on your profile page:</p>
        <user-add-nonprofits 
          @nonprofitsChange='onNonprofitsChange'
        />
      </div>

      <button class='button is-primary'>Continue</button>
    </form>
  </div>
</template>

<script>
import UserAddNonprofits from 'LocalComponents/User/UserAddNonprofits'

export default {
  name: 'UserRegisterFormStepOne',

  components: {
    UserAddNonprofits,
  },

  props: {
    minimumNonprofitsCount: {
      type: Number,
      required: false,
      default: 3,
    },

    formValues: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },

  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        nonprofits: [],
        ...this.formValues,
      },
      nonprofitsCount: this.minimumNonprofitsCount,
    }
  },

  methods: {
    /**
     * Handles form submission
     */
    onFormSubmit () {
      this.$emit('submit', this.form)
    },

    /**
     * Handles location changes
     */
    onNonprofitsChange (nonprofits) {
      nonprofits.map(nonprofitLocations => {
				this.form.nonprofits = [
					...this.form.nonprofits,
					...nonprofitLocations,
				]	
			})
    },
  }
}
</script>

<style lang="scss" scoped>
.user-register-step-one {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  .label{ 
    justify-content: flex-start;
    font-weight: 700 !important;
  }
}
</style>
