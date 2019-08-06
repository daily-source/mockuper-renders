<template>
  <div class="group-details">
    <div class="group-details__header">
      <h1 class='group-details__title has-text-left'>Portiuncula Fraternity</h1>
      <small>Sarasota, Florida</small>
    </div>
    <div class="group-details__main-image">
      <img src="@/assets/img/main-image.png" class="group-details__image" alt="Portiuncula Fraternity">
    </div>
    <div class="group-details__description">
      <p class="group-details__text">We are a Secular Franciscan fraternity of men and women dedicated to living lives of love, service and care for the world following the examples of St. Francis and Jesus. We are collectively giving up things we don’t need in order to give life and hope to “The Least of These” - people who have next to nothing and have no avenue for moving forward. Francis and Jesus consumed very little so that their spirit and their attention would be freed up to serve God, and also so that others could have more. We are trying to move in the same direction.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupDetails'
}
</script>

<style lang='scss' scoped>
.group-details {
  &__header {
    margin-bottom: .5rem;
  }

  &__title {
    color: #000;
    font-size: 1.875rem;
    font-family: $font-primary;
    margin-bottom: 0;
    line-height: 1;
  }

  &__main-image {
    margin-bottom: .5rem;
  }

  &__text {
    font-size: 1.125em;
  }
}
</style>
