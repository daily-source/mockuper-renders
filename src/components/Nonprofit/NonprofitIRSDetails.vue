<template>
  <div class="nonprofit-irs-details">
    <p>{{ nonprofit.NAME }}</p>
    <p>{{ nonprofit.STATE }}, {{ nonprofit.CITY }}</p>
    <p>{{ nonprofit.STREET}}, {{ nonprofit.ZIP }}</p>
    <p>{{ nonprofit.EIN }}</p>
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
  p {
    font-size: 20px;
  }
}
</style>

