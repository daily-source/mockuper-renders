<template>
  <div class="container is-fluid white-bg">
    <div class="fundraiser-body__tab-section">
      <div class="fundraiser-lower__body-wrapper">
        <div class="tabs is-toggle">
          <div class="tabs__bottom-line"></div>
          <ul>
            <li @click="currentTab = 1" :class="{'is-active': currentTab === 1}"><a>Home</a></li>
            <li @click="currentTab = 2" :class="{'is-active': currentTab === 2}">
              <a>Donors ({{donationsByAmount.length}})</a>
            </li>
            <li @click="currentTab = 3" :class="{'is-active': currentTab === 3}">
              <a>Shares ({{fundraiser.shared_count}})</a>
            </li>
            <li @click="currentTab = 4" :class="{'is-active': currentTab === 4}">
              <a>Comments ({{fundraiser.comments_count}})</a>
            </li>
            <li @click="currentTab = 5" :class="{'is-active': currentTab === 5}">
              <a>Updates ({{fundraiser.updates_count}})</a>
            </li>
          </ul>
        </div>

        <div class="columns fundraiser-lower__columns">
          <div class="column is-8 fundraiser-lower__left-column">
            <transition-group name="stretch">
              <div class="fundraiser-lower__tabs-tab" v-if="currentTab === 1" key="1">
                <div class="tab-section tab-section__updates">
                  <p v-if="canEdit" class="">
                    <a class="button is-light is-rounded is-medium" v-if="editing" @click="closeEditor()">Stop editing</a>
                    <a class="button is-light is-rounded is-medium" v-if="!editing" @click="openEditor()">Edit this section</a>
                  </p>
                  <h2>More Info</h2>
                  <InlineRichTextEditor
                    ref="fundraiserParticipant"
                    error-text="This field can't be empty"
                    :value="fundraiser.intro_text"
                    :edition-is-enabled="editing"
                    placeholder="Add an intro text for this fundraiser"
                    location="fundraiser.intro_text"
                  ></InlineRichTextEditor>
                </div>
                <div class="tab-section tab-section__updates">
                  <h2>Updates <span><a class="button is-rounded is-outlined is-medium is-pulled-right" @click="addNewUpdate()" v-if="editing">Add a new update</a></span></h2>
                  <InlineRichTextEditor
                    class="new-update-wrapper"
                    ref="newUpdate"
                    error-text="This field can't be empty"
                    :value="tempUpdateContent"
                    :edition-is-enabled="editing"
                    :default-open="true"
                    v-if="newUpdate"
                    placeholder="Add an update"
                    v-on:edit:close="closeNewUpdate()"
                    v-on:edit:save="saveNewUpdate()"
                  ></InlineRichTextEditor>

                  <div class="user-optional__updates-wrapper">
                    <FundraiserUpdates
                      :updates="updates"
                      :count="updatesCount"
                      :fundraiser-id="fundraiser.fundraiser_id"
                      maxchar="700" />
                    <button class="button is-warning is-load-more" @click="loadMoreUpdates()" v-if="moreUpdates">Load more updates</button>
                  </div>
                </div>
                <p v-if="canEdit">
                  <a class="button is-light is-rounded is-medium" @click="closeEditor()" v-if="editing">Stop editing</a>
                </p>
                <h2>Nonprofit Organization</h2>
                <div class="tab-section tab-section__header">
                  <FundraiserNonprofitDetails :fundraiser="fundraiser" />
                </div>
                <div class="tab-section tab-section__comments">
                  <h2>Comments</h2>
                  <Comments
                    :comments="comments"
                    :more-comments="moreComments"
                    :fundraiser-id="fundraiser.fundraiser_id"
                    v-on:loadMoreComments="loadMoreComments()"></Comments>
                  <router-link
                    class="button fundraiser-lower__cta-start is-info is-large"
                    to="/fundraiser/create"
                  >Start your own fundraiser</router-link>
                </div>
              </div>
              <div class="fundraiser-lower__tabs-tab" v-if="currentTab === 2" key="2">
                <DonorsList
                  v-on:loadDonationsTab="loadTab(2)"
                  section-title="Donors"
                  view-all-cta="View all"
                  :donations="donationsByAmount"
                  layout="horizontal"/>
              </div>
              <div class="fundraiser-lower__tabs-tab" v-if="currentTab === 4" key="4">
                <h2>Comments</h2>
                <Comments
                  :comments="comments"
                  :more-comments="moreComments"
                  :fundraiser-id="fundraiser.fundraiser_id"
                  v-on:loadMoreComments="loadMoreComments()"></Comments>
                <div class="button fundraiser-lower__cta-start is-info is-large">
                  Start your own fundraiser
                </div>
              </div>
              <div class="fundraiser-lower__tabs-tab" v-if="currentTab === 5" key="5">
                <div class="tab-section tab-section__updates">
                  <p v-if="canEdit" class="">
                    <a class="button is-light is-rounded is-medium" v-if="editing" @click="closeEditor()">Stop editing</a>
                    <a class="button is-light is-rounded is-medium" v-if="!editing" @click="openEditor()">Edit this section</a>
                  </p>
                  <h2>Updates <span><a class="button is-rounded is-outlined is-medium is- is-pulled-right" @click="addNewUpdate()" v-if="editing">Add a new update</a></span></h2>
                  <InlineRichTextEditor
                    ref="newUpdate"
                    error-text="This field can't be empty"
                    :value="tempUpdateContent"
                    :edition-is-enabled="editing"
                    :default-open="true"
                    v-if="newUpdate"
                    placeholder="Add an update"
                    v-on:edit:close="closeNewUpdate()"
                    v-on:edit:save="saveNewUpdate()"
                  ></InlineRichTextEditor>
                  <div class="user-optional__updates-wrapper">
                    <FundraiserUpdates
                      :updates="updates"
                      :count="updatesCount"
                      :fundraiser-id="fundraiser.fundraiser_id"
                      maxchar="700" />
                    <button class="button is-warning is-load-more" @click="loadMoreUpdates()" v-if="moreUpdates">Load more updates</button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
          <transition name="fade">
            <div class="column is-4 fundraiser-lower__right-column" key="2" v-if="currentTab === 1">
              <div class="tab-section tab-section__giving-level" v-if="fundraiser.giving_levels">
                <h4 class="lower-body-right-column__title">Choose a giving level</h4>
                <div class="user-optional__giving-level-wrapper">
                  <FundraiserGivingLevel
                    :level="givingLevel"
                    v-for="(givingLevel, index) in fundraiser.giving_levels"
                    :key="index"
                    :fundraiser="fundraiser" ></FundraiserGivingLevel>
                </div>
              </div>
              <div class="top-donors">
                <DonorsList
                  v-on:loadDonationsTab="loadTab(2)"
                  section-title="Donors"
                  view-all-cta="View all"
                  :donations="donationsByAmount"
                  layout="top"/>
              </div>
              <div class="recent-donations">
                <DonorsList
                  v-on:loadDonationsTab="loadTab(2)"
                  section-title="Recent Donations"
                  view-all-cta="View all"
                  :donations="donationsByDate"
                  layout="recent"/>
                <button class="button is-warning is-load-more" @click="loadMoreDonations()" v-if="moreDonations">Load more donations</button>
              </div>
              <div class="raised-through-sharing">
                <DonorsList
                  v-on:loadDonationsTab="loadTab(3)"
                  section-title="Raised Through Sharing"
                  view-all-cta="View all"
                  :donations="donationsBySharing"
                  :limit="3"
                  layout="sharing"/>
                <button class="button is-warning is-load-more" @click="loadMoreDonations()" v-if="moreDonations">Load more donations</button>
              </div>
              <div class="button fundraiser-pledge__cta is-success is-large">
                <DonateAction
                  :fundraiser-id="fundraiser.fundraiser_id"
                  trigger="fundraiser/lower/right/donors">
                  Donate now
                </DonateAction>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['fundraiser', 'editing', 'canEdit'],
  components: {
    FundraiserGivingLevel: () => import('@/components/fundraiser/FundraiserGivingLevel.vue'),
    FundraiserNonprofitDetails: () => import('@/components/fundraiser/FundraiserNonprofitDetails.vue'),
    FundraiserUpdates: () => import('@/components/fundraiser/FundraiserUpdates.vue'),
    Comments: () => import('@/components/general/Comments.vue'),
    DonateAction: () => import('@/components/general/DonateAction.vue'),
    DonorsList: () => import('@/components/general/DonorsList.vue'),
    InlineRichTextEditor: () => import('@/components/input/InlineRichTextEditor.vue'),
  },
  data() {
    return {
      currentTab: 1,
      mounted: false,
      tempUpdateContent: '',
      newUpdate: false,
    };
  },
  computed: {
    moreComments() {
      return false;
      return showMoreButton(this.$store.state, 'comments');
    },
    moreDonations() {
      return false;
      return showMoreButton(this.$store.state, 'donations');
    },
    moreUpdates() {
      return false;
      return showMoreButton(this.$store.state, 'updates');
    },
    donationsByAmount() {
      const donations = this.$store.state.donations.data;
      if (!donations) {
        return [];
      }
      const sorted = donations.sort((a, b) => {
        return b.amount - a.amount
      });
      return sorted;
    },
    donationsByDate() {
      const donations = this.$store.state.donations.data;
      const sorted = donations.slice().sort((a, b) => b.timestamp - a.timestamp);
      return sorted;
    },
    donationsBySharing() {
      const donations = this.$store.state.donations.data;
      if (!donations) {
        return [];
      }
      const sorted = donations.slice().sort((a, b) => a.amount > b.amount);
      const modified = [];
      if (sorted.length) {
        donations.map((part) => {
          const p = Object.assign({}, part);
          p.amount *= 2.2;
          modified.push(p);
        });
        return modified;
      }
      return [];
    },
    updatesCount() {
      return this.$store.state.updates.data.length;
    },
    updates() {
      return this.$store.state.updates.data;
    },
    comments() {
      return this.$store.state.comments.data;
    },
    common() {
      return this.$store.state.common;
    },
  },
  methods: {
    /**
     * Fetch the comments for this fundraiser.
     * This was abstracted to a function so that it can be reused.
     */
    loadMoreComments(paginated = true) {
      if (this.moreComments) {
        const fundraiserId = this.$route.params.id;
        return this.$store.dispatch('FETCH_COMMENTS', { fundraiserId, paginated })
          .then(data => data)
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * Fetch the donations for this fundraiser.
     * This was abstracted to a function so that it can be reused.
     */
    loadMoreDonations(paginated = true) {
      if (this.moreDonations) {
        const fundraiserId = this.$route.params.id;
        return this.$store.dispatch('FETCH_DONATIONS', { fundraiserId, paginated })
          .then(data => data)
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * Fetch the updates for this fundraiser.
     * This was abstracted to a function so that it can be reused.
     */
    loadMoreUpdates(paginated = true) {
      return new Promise((resolve, reject) => {
        const fundraiserId = this.$route.params.id;
        if (this.moreUpdates) {
          return this.$store.dispatch('FETCH_UPDATES', { fundraiserId, paginated })
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    },
    /**
     * Select the active tab.
     */
    loadTab(tab) {
      this.currentTab = tab;
    },
    /**
     * Recursively keep loading updates until the update in the params is found.
     * Or until there are no more updates to load from the DB.
     * This is needed when the visiting URL includes an update parameter,
     * which indicates a visitor coming from a shared update in the fundraiser page.
     */
    loadUpdatesAndScrollTo(itemId) {
      const target = `#update_${itemId}`;

      const targetExists = this.updates.find(update => update.id === parseInt(itemId, 10));
      if (targetExists) {
        this.$scrollTo(target, { offset: -200 });
      } else if (this.moreUpdates) {
        return this.loadMoreUpdates()
          .then((data) => {
            if (data) {
              return this.loadUpdatesAndScrollTo(itemId);
            }
          })
          .catch(err => err);
      } else {
        return { code: 404 };
      }
    },
    /**
     * Recursively keep loading comments until the selected one in the params is found.
     * Or until there are no more comments to load from the DB.
     * This is needed when the visiting URL includes a comment parameter,
     * which indicates a visitor coming from a shared comment in the fundraiser page.
     */
    loadCommentsAndScrollTo(itemId) {
      const target = `#comment_${itemId}`;

      let targetExists = false;
      this.comments.forEach((comment) => {
        if (comment.id === parseInt(itemId, 10)) {
          targetExists = true;
        }

        if (comment.replies && comment.replies.length) {
          const a = comment.replies.find(reply => reply.id === parseInt(itemId, 10));
          if (a) {
            targetExists = true;
          }
        }
      });

      if (targetExists) {
        this.$scrollTo(target, { offset: -200 });
      } else if (this.moreComments && this.mounted) {
        return this.loadMoreComments()
          .then((data) => {
            if (data) {
              return this.loadCommentsAndScrollTo(itemId);
            }
          })
          .catch(err => err);
      } else {
        return { code: 404 };
      }
    },
    closeEditor() {
      this.$emit('edit:close');
    },
    openEditor() {
      this.$emit('edit:open');
    },
    addNewUpdate() {
      this.newUpdate = true;
    },
    closeNewUpdate() {
      this.newUpdate = false;
      this.tempUpdateContent = '';
    },
    saveNewUpdate() {
      this.$store.dispatch('ADD_NEW_UPDATE', {
        fundraiserId: this.fundraiser.fundraiser_id,
        update: this.tempUpdateContent,
      }).then(() => {
        console.log('update added');
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  /**
   * Load updates, comments and donations on the mounted hook.
   * Below-the-fold items, are only loaded in the client, not in the server.
   */
  mounted() {
    if (this.moreUpdates && this.$store.state.updates.current === 1) {
      this.loadMoreUpdates();
    }
    if (this.moreComments && this.$store.state.comments.current === 1) {
      this.loadMoreComments();
    }
    if (this.moreDonations && this.$store.state.donations.current === 1) {
      this.loadMoreDonations();
    }

    /**
     * If there's an update ID in the URL params, recursively load updates and scroll to them.
     */
    const updateId = this.$route.query.update_id;
    if (updateId && this.moreUpdates) {
      this.currentTab = 5;
      setTimeout(() => {
        this.loadUpdatesAndScrollTo(updateId);
      }, 4500);
    }

    /**
     * If there's a comment ID in the URL params, recursively load comments and scroll to them.
     */
    const commentId = this.$route.query.comment_id;
    if (commentId && this.moreComments) {
      this.currentTab = 4;
      setTimeout(() => {
        this.loadCommentsAndScrollTo(commentId);
      }, 4500);
    }
  },
  watch: {
    /**
     * Automatically load a new set of updates if the user chooses the Updates tab.
     * This way there are 2x updates shown in the tab compared to the main (default) home view,
     * where there are by default just 1x updates being shown.
     */
    currentTab(newVal) {
      if (newVal === 5) {
        if (this.moreUpdates) {
          this.loadMoreUpdates();
        }
      }
    },
  },
};

/**
 * Helper function to determine if the show more button should appear or not.
 */
function showMoreButton(state, arg) {
  const limit = state[arg].limit;
  const current = state[arg].current;
  const count = state.fundraiser[`${arg}_count`];
  const totalPages = Math.ceil(count / limit);
  return totalPages >= current;
}
</script>

<style scoped lang="scss">
.fundraiser-lower {
  &__body-wrapper {
    padding-bottom: 20px;

    h1 {
      color: $color-text;
    }

    .tabs {
      position: relative;
      &__bottom-line {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        border-bottom: 1px solid #dbdbdb;
      }
    }
    .tabs.is-toggle li:first-child a {
      border-radius: 9px 0 0 0 !important;
    }
    .tabs.is-toggle li:last-child a {
      border-radius: 0 9px 0 0 !important;
    }

    .tabs {
      @include breakpoint($tablet) {
      }
      ul {
        justify-content: center;

        @include breakpoint($tablet) {
          justify-content: flex-start;
        }
      }
    }
  }

  &__cta-start {
    margin: 50px auto;
    border-radius: 10px;
    display: flex;
    font-size: 16px;
    @include breakpoint ($tablet) {
      font-size: 22px;
      width: 70%;
    }
  }
  &__left-column {
    padding-right: 0.5rem;
  }
  &__right-column {
    @include breakpoint($tablet) {
      padding-left: 2.7rem;
    }
  }
}
.fundraiser-pledge {
  &__cta {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
  }
}

.is-load-more {
  margin-bottom: 40px;
}
.user-optional__giving-level-wrapper {
  margin-bottom: 30px;
}
.new-update-wrapper {
  margin-top: 80px;
}
</style>
