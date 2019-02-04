<template>
<div class='nonprofit-directory-list-item'>
  <div class='nonprofit-directory-list-item__nonprofit-details'>
    <span class='nonprofit-directory-list-item__name'>{{ nonprofit.name }}</span>
    <router-link :to='`/nonprofit/${nonprofit.id}`' class='nonprofit-directory-list-item__link'>View this nonprofit's other locations</router-link>
  </div>
  <div class='nonprofit-list-item-links'>
    <button class='nonprofit-directory-list-item__link is-primary is-small button'>Donate</button>
    <a class='nonprofit-directory-list-item__link' :href='nonprofit.url' target='_blank'>View Website</a>
    <router-link :to="{ name: 'nonprofit-details', params: {nonprofitId: nonprofit.id} }" class='nonprofit-directory-list-item__link'>View Profile</router-link>
    <a class='nonprofit-directory-list-item__link' href='#'>Edit Profile</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'NonprofitDirectoryListItem',

  props: {
    nonprofit: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.nonprofit-directory-list-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &__name {
    display: inline-block;
    margin-right: 1em;
  }

  &__link {
    font-size: .875em;
  }

  &__nonprofit-details{ 
    flex-grow: 1;
    max-width: 50%;
    margin-right: 2em;
  }
}

.nonprofit-list-item-links {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

