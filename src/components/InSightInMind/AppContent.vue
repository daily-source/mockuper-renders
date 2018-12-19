<template>
  <main class='site-content'>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline is-mobile">
          <div 
            class="column is-4" v-for='box in boxes' 
            :key='`${$options.filters.slugify(box.title)}-box`'
          >
            <box-slider 
              :title='box.title'
              :message='box.message'
              :cost='box.cost'
              :deathsPerSecond='box.deathsPerSecond'
              :images='box.images'
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import BoxSlider from './BoxSlider'

export default {
  name: 'AppContent',

  data () {
    return {
      boxes: [
        {
          title: 'Terrorism Worldwide',
          cost: 500000,
          deathsPerSecond: 257,
          message: 'All terrorism in the world combined',
          images: [
            {
              name: 'terrorism-1.png',
              alt: 'Terrorism #1',
            }
          ]
        },
        {
          message: 'Accidental deaths in the U.S.',
          cost: 500000,
          deathsPerSecond: 257,
          title: 'ACCIDENTAL DEATHS IN THE U.S.',
          images: [
            {
              name: 'terrorism-1.png',
              alt: 'Terrorism #1',
            }
          ]
        },
        {
          message: 'Malnutrition and unclean water.',
          cost: 140,
          deathsPerSecond: 1,
          title: 'MALNUTRITION AND UNCLEAN WATER',
          images: [
            {
              name: 'terrorism-1.png',
              alt: 'Terrorism #1',
            }
          ]
        },
        {
          message: 'Malnutrition and unclean water in the U.S.',
          cost: 5000,
          deathsPerSecond: 6308,
          title: 'MALNUTRITION AND UNCLEAN WATER IN THE U.S.',
          images: [
            {
              name: 'terrorism-1.png',
              alt: 'Terrorism #1',
            }
          ]
        },
        {
          message: 'Malnutrition and unclean water killing a child',
          cost: 110,
          deathsPerSecond: 110,
          title: 'MALNUTRITION AND UNCLEAN WATER KILLING A CHILD.'
        },
        {
          message: 'Motor Vehicle Accidents in the U.S.',
          title: 'MOTOR VEHICLE ACCIDENTS IN THE U.S.',
          cost: 110,
          deathsPerSecond: 3,
        },
        {
          message: 'All murders in the U.S.',
          title: 'ALL MURDERS IN THE U.S.',
          cost: 200000,
          deathsPerSecond: 1572,
        },
        {
          message: 'Natural Disasters Worldwide',
          title: 'NATURAL DISASTERS WORLDWIDE.',
          cost: 450,
          deathsPerSecond: 421,
        },
        {
          message: 'Terrorism agains someone from the U.S',
          title: 'TERRORISM AGAINST SOMEONE FROM THE U.S.',
          cost: 4000000,
          deathsPerSecond: null,
        }
      ]
    }
  },

  components: {
    BoxSlider,
  },
}
</script>

<style scoped lang='scss'>
  .site-content {
    padding-top: 1em;
    padding-bottom: 1em;

    .section:first-of-type {
      padding-top: 0;
    }
  }
</style>
