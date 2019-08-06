<template>
  <div class="participant-fundraiser is-flex">
    <div class="participant-fundraiser__info">
      <p class="participant-fundraiser__title has-text-weight-bold">{{ fundraiser.name }}</p>
      <p class="participant-fundraiser__cause">Raising money for: Catholic Relief Services</p>
    </div>
    <div class="participant-fundraiser__progress">

    </div>
  </div>
</template>

<script>
export default {
  name: 'ParticipantFundraiser',

  props: {
    fundraiser: {
      type: Object,
      required: true,
    },
  },
}
</script>


<style lang='scss' scoped>
.participant-fundraiser {
  p {
    line-height: 1.5;
    margin-bottom: .5em;
  }

  &__cause {
    margin-bottom: 0 !important;
  }
}
</style>
