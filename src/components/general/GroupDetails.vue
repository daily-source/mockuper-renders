<template>
  <div class="group-details">
    <div class="group-details__header">
      <h1 class='group-details__title has-text-left'>Sun Glow Apparel</h1>
      <small>Sarasota, FL</small>
    </div>
    <div class="group-details__main-image">
      <img src="@/assets/img/main-image.png" class="group-details__image" alt="Portiuncula Fraternity">
    </div>
    <div class="group-details__description">
      <p class="group-details__text">Sun Glow Apparel is an online general clothing store. Our products of over 10,000 products covers every aspect of fashion, from shirts to dresses, sneakers to slip-ons, sportswear to watches, and so much more. We, as an organization, are encouraging our employees to do various fundraisers where 100% of the money raised will be donated to charity.</p>
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
