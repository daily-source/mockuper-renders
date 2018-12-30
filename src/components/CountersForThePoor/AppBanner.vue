<template>
  <section id="banner" class='section banner'>
		<div class="banner__contents">
			<counter-widget 
				:id="'1'"
			/>
		</div>
  </section>
</template>

<script>
import CounterWidget from '@/components/CountersForThePoor/CounterWidget'

export default {
  name: 'AppBanner',

  components: {
    CounterWidget,
  },
}
</script>

<style lang='scss'>
  .banner {
    position: relative;
    background-image: url('../../assets/img/images/statue-of-liberty.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    min-height: 650px;
    margin-bottom: 2rem;
  }

  .banner__img {
    display: block;
  }

  .banner__contents {
    position: absolute;
    left: 4em;
    bottom: 30px;

    .counter-widget {
      max-width: 570px;
      padding:  1.5rem 2rem;
      background-color: rgba(#030000, .28);
      border: 2px solid $primary;
      border-radius: 4px;
      margin-left: 0;
    }
  }
</style>
