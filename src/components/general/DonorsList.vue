<template>
  <div>
    <div class="top-donors__wrapper" v-if="layout !== 'horizontal'">
      <h4 class="top-donors__title lower-body-right-column__title">
        {{sectionTitle}}
        <span class="top-donors__view-all-cta" v-if="viewAllCta" @click="loadMoreDonations()">
          <a>{{viewAllCta}}</a>
        </span>
      </h4>
      <div class="fundraiser-donors__wrapper"  v-if="layout === 'top'">
        <div class="fundraiser-donors__donor columns is-mobile is-multiline" v-for="(donation, index) in donations">
          <div class="column is-2 has-text-centered">
            {{index + 1}}
          </div>
          <div class="column is-3">
            <LazyLoadedImage
              class="fundraiser-donors__picture"
              :src="donation.avatar"
              :is-background="true"
            ></LazyLoadedImage>
          </div>
          <div class="column is-7">
            <span class="fundraiser-donors__donor-name"><a>{{donation.firstname}} {{donation.lastname}}</a></span><br>
            <span class="fundraiser-donors__donor-donation">{{donation.amount | usd}}</span> donated
          </div>
        </div>
        <div class="top-donors__show-more-cta-wrapper" v-if="showMore">
          <a class="top-donors__show-more-cta button">{{showMore}}</a>
        </div>
      </div>
      <div class="fundraiser-donors__wrapper" v-if="layout === 'recent'">
        <div class="recent-donations__wrapper">
          <div class="fundraiser-donors__donor columns is-mobile is-multiline" v-for="(donation, index) in donations.slice(0, limit)">
            <div class="column is-2 has-text-centered">
            </div>
            <div class="column is-3">
              <LazyLoadedImage
                class="fundraiser-donors__picture"
                :src="donation.avatar"
                :is-background="true"
              ></LazyLoadedImage>
            </div>
            <div class="column is-7">
              <div class="recent-donations__donor">{{donation.firstname}} {{donation.lastname}}</div>
              <div class="recent-donations__combined">{{donation.amount | usd}} <span class="recent-donations__time-ago">{{donation.timestamp | timeAgo}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="fundraiser-donors__wrapper" v-if="layout === 'sharing'">
        <div class="recent-donations__wrapper">
          <div class="fundraiser-donors__donor columns is-mobile is-multiline" v-for="(donation, index) in donations.slice(0, limit)">
            <div class="column is-2 has-text-centered">
              {{index + 1}}
            </div>
            <div class="column is-3">
              <LazyLoadedImage
                class="fundraiser-donors__picture"
                :src="donation.avatar"
                :is-background="true"
              ></LazyLoadedImage>
            </div>
            <div class="column is-7">
              <div class="recent-donations__donor">{{donation.firstname}} {{donation.lastname}}</div>
              <div class="recent-donations__combined">Raised {{donation.amount | usd}} from sharing</span></div>
            </div>
          </div>
        </div>
        <div class="top-donors__show-more-cta-wrapper" v-if="showMore">
          <a class="top-donors__show-more-cta button">{{showMore}}</a>
        </div>
      </div>
    </div>
    <section class="donors-list" v-if="donations.length && layout === 'horizontal'">
      <div class="container">
        <h2 v-html="sectionTitle"></h2>
        <div class="donors-list__wrapper columns is-mobile is-multiline">
          <div class="donors-list__donor column is-2-desktop is-6-mobile" v-for="donor in donations.slice(0, limit)">
            <p>{{donor.amount | usd}}</p>
            <LazyLoadedImage
              class="donors-list__picture"
              :src="donor.avatar"
              :is-background="true"
            ></LazyLoadedImage>
            <p class="donor-name">
              {{donor.firstname}}<br>
              {{donor.lastname}}
            </p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import LazyLoadedImage from '@/components/plugins/LazyLoadedImage.js';

export default {
  props: ['section-title', 'view-all-cta', 'donations', 'layout', 'show-more', 'limit'],
  methods: {
    loadMoreDonations() {
      this.$emit('loadDonationsTab');
    },
  },
  components: {
    LazyLoadedImage,
  },
};
</script>

<style scoped lang="scss">
.recent-donations {
  &__item {
    font-size: 14px;
    margin-bottom: 15px;
    line-height: 1.1;
  }
  &__donor {
    font-weight: bold;
  }
  &__time-ago {
    font-style: italic;
    color: $color-medium-gray;
    margin-left: 10px;
  }
}


.top-donors {
  &__wrapper {
    margin-bottom: 40px;
    max-width: 400px;
  }
  &__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  &__view-all-cta {
    font-size: 14px;
  }
  &__show-more-cta-wrapper {
    text-align: center;
  }
  &__show-more-cta {
    text-align: center;
    display: inline-block;
    font-size: 13px;
  }
}

.fundraiser-donors {
  &__picture  {
    background-size: cover;
    background-position: center center;
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    border-radius: 100%;
    overflow: hidden;
  }
  &__donor {
    text-align: left;
    font-size: 15px;
    color: $color-medium-gray;
    margin-bottom: 20px;
    align-items: flex-start;

    .is-9 {
      align-self: center;
    }

    .is-3 {
      padding: 1%;
    }

    .is-7 {
      padding-bottom: 0;
    }
  }
  &__donor-name {
    font-weight: bold;
  }
  &__donor-timestamp {
    color: $color-silver;
    font-style: italic;
  }
  &__donor-comment {
    font-style: italic;
    font-size: 15px;
    color: $color-gray;
    margin-top: 5px;
  }
}

.donors-list {
  margin: 40px 0;

  &__picture  {
    background-size: cover;
    background-position: center center;
    width: 70%;
    padding-bottom: 70%;
    margin: auto;
    height: 0;
    border-radius: 100%;
    overflow: hidden;
  }
  &__donor {
    text-align: center;

    p.donor-name {
      margin-top: 5px;
      font-size: 15px;
    }
  }
}

</style>
