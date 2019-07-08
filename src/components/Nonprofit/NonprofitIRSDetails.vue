<template>
  <div class="nonprofit-irs-details">
    <p class='nonprofit-irs-details__name'>{{ transformedNonprofit.NAME }}</p>
    <div class="nonprofit-irs-details__irs-exclusive-details" v-if='nonprofit.fromIrs'>
      <p>{{ transformedNonprofit.STREET}}</p>
      <p>{{ transformedNonprofit.CITY }}, {{ transformedNonprofit.STATE }}, {{ transformedNonprofit.ZIP }}</p>
    </div>
    <p>Employer ID Number (EIN): {{ transformedNonprofit.EIN }}</p>
    <p class='nonprofit-irs-details__note has-text-grey' v-if='nonprofit.fromIrs'>The details above are from the IRS.gov database. If it’s wrong, correct it with the IRS and our system will update it automatically within 30 days. Our system checks the IRS database monthly for updates.</p>
  </div>
</template>

<script>
import { transformNonprofit } from '@/util/api'

export default {
  name: 'NonprofitIRSDetails',

  props: {
    nonprofit: {
      type: Object,
      required: true,
    }
  },

  computed: {
    transformedNonprofit () {
      return transformNonprofit(this.nonprofit, true)
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

