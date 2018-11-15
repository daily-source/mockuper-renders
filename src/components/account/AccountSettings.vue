<template>
  <div class="user-management-page__wrapper">
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      :disable-close= "userDialogSpinner"
      v-on:modal:close="closeUserDialog()"
    >
      <div slot="header">{{userDialogHeading}}</div>
      <div slot="content"><p>{{userDialogMessage}}</p></div>
    </UserDialog>

    <h3>Settings</h3>

    <section class="account-section">
      <h4>Personal Data</h4>
      <EditableTextField
        label="First name:"
        ref="firstname"
        :value="userData.firstname"
        error-text="This field can't be empty"
        type="name"
        v-on:input:save="updateUserField('firstname', $event)"
        v-on:next:field="openEdition('lastname')"
      ></EditableTextField>
      <EditableTextField
        label="Last name:"
        ref="lastname"
        :value="userData.lastname"
        error-text="This field can't be empty"
        type="name"
        v-on:input:save="updateUserField('lastname', $event)"
        v-on:next:field="openEdition('email')"
        v-on:previous:field="openEdition('firstname')"
      ></EditableTextField>
      <EditableTextField
        label="Email:"
        ref="email"
        :value="userData.email"
        error-text="Email is invalid"
        type="email"
        v-on:input:save="updateUserField('email', $event)"
        v-on:previous:field="openEdition('lastname')"
      ></EditableTextField>
      <EditableImageField
        label="Avatar:"
        :avatar="userData.avatar"
        error-text="Invalid image"
        type="avatar"
        v-on:input:save="updateAvatar($event)"
      ></EditableImageField>

      <div class="columns is-multiline is-mobile">
        <div class="column is-4-tablet is-11-mobile">
          <label>Password</label>
        </div>
        <div class="column is-5-tablet is-7-mobile">
          <ModalPasswordChange
            :state="passwordChangeModal"
            v-on:modal:close="passwordChangeModal = false"
          >
            <div slot="trigger" @click="passwordChangeModal = true"><a>Not shown. Change password?</a></div>
            <div slot="heading">Password change</div>
          </ModalPasswordChange>
        </div>
      </div>

    </section>

    <section class="account-section">
      <h4>Stored Payment Methods</h4>
      <div v-if="userData.payment_methods.length">
        <table class="table is-striped is-fullwidth payment-methods-table">
          <thead>
            <tr>
              <th>Payment method</th>
              <th>Number</th>
              <th>Expiration</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="method in userData.payment_methods" :key="method.id">
              <td v-if="method.method === 'card'">
                <Icons icon="credit-card" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons> Credit Card
              </td>
              <td>**** **** **** {{method.last_four}}</td>
              <td>{{method.expiration_month}}/{{method.expiration_year}}</td>
              <td><a class="delete" @click="removePaymentMethod(method.id)">(Remove)</a></td>
            </tr>
          </tbody>
        </table>
        <p class="small">*Note: you can add a new payment method directly on the donation screen.</p>
      </div>
      <p v-else>You don't have any stored payment methods. You can add them while donating.</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userDialogModal: false,
      userDialogHeading: 'Processing...',
      userDialogMessage: '',
      userDialogSpinner: false,
      passwordChangeModal: false,
    };
  },
  components: {
    DonateBillingMethod: () => import('@/components/donate/DonateBillingMethod.vue'),
    UserDialog: () => import('@/components/general/UserDialog.vue'),
    Icons: () => import('@/components/general/Icons.vue'),
    ModalPasswordChange: () => import('@/components/login/ModalPasswordChange.vue'),
    EditableTextField: () => import('@/components/input/EditableTextField.vue'),
    EditableImageField: () => import('@/components/input/EditableImageField.vue'),
  },
  computed: {
    userData() {
      return this.$store.state.user;
    },
  },
  methods: {
    openEdition(fieldName) {
      this.$refs[fieldName].openEdition();
    },
    removePaymentMethod(id) {
      this.userDialogModal = true;
      this.userDialogSpinner = true;
      return this.$store.dispatch('REMOVE_PAYMENT_METHOD', { id })
        .then((data) => {
          this.userDialogMessage = 'The payment method was removed.';
          this.userDialogSpinner = false;
        })
        .catch((err) => {
          this.userDialogMessage = 'An error occurred. Try again later.';
          this.userDialogSpinner = false;
          console.log(err);
        });
    },
    updateUserField(fieldName, newValue) {
      if (this.$store.state.user[fieldName] === newValue) {
        return;
      }
      this.userDialogModal = true;
      this.userDialogSpinner = true;
      return this.$store.dispatch('UPDATE_USER_FIELD', { field: fieldName, value: newValue })
        .then((data) => {
          this.userDialogModal = false;
        })
        .catch((err) => {
          this.userDialogMessage = 'An error occurred. Try again later.';
          this.userDialogSpinner = false;
          console.log(err);
        });
    },
    updateAvatar(blob) {
      // TODO: dispatch event to update the image in the DB
      console.log(blob);
    },
    closeUserDialog() {
      this.userDialogMessage = '';
      this.userDialogModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
.account-section {
  margin-bottom: 80px;
}
.user-management-page {
  &__wrapper {
  }
}
.capitalize {
  text-transform: capitalize;
}
.small {
  font-size: 16px;
}
ul {
  margin-left: 30px;

  li {
    list-style-type: disc;
  }
}
.input-icon {
  display: inline-block;
  transform: translateY(3px);
}
.payment-methods-table {
  td {
    text-align: center;
  }
}
.table {
  thead {
    th {
      text-align: center;
    }
  }
  th {
    @include breakpoint($mobile) {
      padding: .5em .25em;
    }
  }
}
</style>
