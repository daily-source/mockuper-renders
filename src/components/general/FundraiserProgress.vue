<template>
<div class="fundraiser-progress">
  <p>Raising Money for: <span class="has-text-weight-bold">{{ cause }}</span></p>
  <div class="fundraiser-progress__bar">
    <div 
      class="fundraiser-progress__bar-progress"
      :style="{width: `${reached/goal * 100}%`}"
    >
    </div>
  </div>
  <p class="mb-2">Reached <span class="has-text-weight-bold">{{ reached | usdCurrencyFormat }}</span> of their <span class="has-text-weight-bold">{{ goal | usdCurrencyFormat }}</span> goal</p>
  <button class="button is-block is-secondary">Donate</button>
</div>
</template>

<script>
export default {
  name: 'FundraiserProgress',

  props: {
    cause: {
      type: String,
      required: true,
    },
    reached: {
      type: Number,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.fundraiser-progress {
  color: #fff;
  padding: 1.5em 1em;
  border: 1px solid #a3a3a3;
  background-color: $primary;
  border-color: $primary;

  p {
    font-size: 1.125em;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }

  &__bar {
    margin-bottom: 1rem;
    width: 100%;
    height: 20px;
    background-color: #fafafa;
    position: relative;
  }

  &__bar-progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-color: lighten($secondary, 5%);
  }

  .button {
    width: 100%;
    border-radius: 0;
    border-color: $secondary;
    background-color: $secondary;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
  }
}
</style>
