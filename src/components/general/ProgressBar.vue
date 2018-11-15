<template>
  <div :class="`progress-bar__wrapper ${size}`">
    <p v-if="size === 'large'" :class="`${size}`">
      {{fundraiser.currentStats.donated | usd}} raised of {{fundraiser.currentStats.goal | usd}}
    </p>
    <div :class="`progress-barx fundraiser-pledge__progress-wrapper ${size}`">
      <div :class="`fundraiser-pledge__progress-bar ${size}`"
        :style="{width: 100*fundraiser.currentStats.donated / fundraiser.currentStats.goal + '%'}"></div>
    </div>
    <p v-if="size !== 'large'">
      {{fundraiser.currentStats.donated | usd}} raised of {{fundraiser.currentStats.goal | usd}}
    </p>
  </div>
</template>

<style scoped lang="scss">
.fundraiser-pledge {
  &__progress-wrapper {
    display: block;
    background: $color-light-gray;
    height: 20px;
    border-radius: 20px;
    overflow: hidden;

    @include breakpoint($tablet) {
      display: block;
    }

    &.large {
      height: 30px;
    }
  }
  &__progress-bar {
    display: flex;
    background: $color-emphasis-alt;
    height: 20px;

    &.large {
      height: 30px;
    }
  }
}

p {
  margin-top: 10px;
  font-size: 15px;
  line-height: 15px;
  max-height: 15px;
  overflow: hidden;

  &.large {
    text-align: center;
    font-size: 18px;
    margin-bottom: 20px;
  }
}

</style>

<script>
export default {
  props: ['fundraiser', 'size'],
};
</script>
