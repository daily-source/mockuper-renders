<template>
  <div class="nonprofit-irs-details">
    <p class='nonprofit-irs-details__name'>{{ nonprofit.NAME }}</p>
    <p>{{ nonprofit.STREET}}</p>
    <p>{{ nonprofit.CITY }}, {{ nonprofit.STATE }}, {{ nonprofit.ZIP }}</p>
    <p>Employer ID Number (EIN): {{ nonprofit.EIN }}</p>
    <p class='nonprofit-irs-details__note has-text-grey'>The details above are from the IRS.gov database. If it’s wrong, correct it with the IRS and our system will update it automatically within 30 days. Our system checks the IRS database monthly for updates.</p>
  </div>
</template>

<script>
export default {
  name: 'NonprofitIRSDetails',

  props: {
    nonprofit: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-irs-details {
  &__name {
    font-size: 20px;
  }
}
</style>

