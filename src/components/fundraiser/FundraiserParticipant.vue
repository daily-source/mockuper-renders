<template>
  <div class="container is-fluid white-bg fundraiser-participant__wrapper" v-if="fundraiser.participant">
    <div class="fundraiser-body">
      <p v-if="canEdit" class="">
        <a class="button is-light is-rounded is-medium" v-if="editing" @click="closeEditor()">Stop editing</a>
        <a class="button is-light is-rounded is-medium" v-if="!editing" @click="openEditor()">Edit this section</a>
      </p>
      <h2 v-if="editing">Edit the fundraiser info</h2>
      <div class="fundraiser-participant" :class="{'columns is-editing': editing}">
        <figure class="fundraiser-participant__avatar" :class="{'is-editing column is-6': editing}">
          <InlineImageEditor
            class="fundraiser-participant__img"
            location="fundraiser.participant.avatar"
            ref="imageEditor"
            :item="fundraiser.participant.avatar"
            :alt="fundraiser.participant.name"
            :is-background-image="true"
            :open-default="false"
            :edition-is-enabled="editing"
            :disable-orientation="true"
            default-text="Add your avatar"
            type="avatar"
            v-on:edition:open="newImageOpenId = $event"
            v-on:edition:close="newImageOpenId = null"
            v-on:image:remove="removeNewImage()"
          ></InlineImageEditor>
        </figure>
        <div class="fundraiser-participant__details" :class="{'column is-5': editing}">
          <h3 class="fundraiser-participant__name">by
            <div class="emphasis">
              <InlineFieldEditor
                type="text"
                :remove-returns="true"
                ref="fundraiserParticipant"
                :allow-empty="false"
                error-text="This field can't be empty"
                :value="fundraiser.participant.fullname"
                :edition-is-enabled="editing"
                placeholder="Add the name of the fundraiser"
                location="fundraiser.participant.fullname"
                v-on:next:field="openEdition('fundraiserCity')"
                v-on:previous:field="openEdition('fundraiserDescription')"
              ></InlineFieldEditor>
            </div class="emphasis">
          </h3>
          <div class="fundraiser-participant__detail-item-wrapper" :class="{'is-editing': editing}">
            <div class="fundraiser-participant__detail-item">
              <Icons iconwidth="24px" iconheight="24px" icon="location" color="#f0f0f0" class="fundraiser-participant__icon icon-location"/>
              <div class="fundraiser-participant__location">
                <InlineFieldEditor
                  type="text"
                  :remove-returns="true"
                  ref="fundraiserCity"
                  :allow-empty="false"
                  error-text="This field can't be empty"
                  :value="fundraiser.participant.location"
                  :edition-is-enabled="editing"
                  layout="inline"
                  placeholder="Add the name of the fundraiser"
                  location="fundraiser.participant.location"
                  v-on:next:field="openEdition('fundraiserEmail')"
                  v-on:previous:field="openEdition('fundraiserParticipant')"
                ></InlineFieldEditor>
              </div>
            </div>
            <div class="fundraiser-participant__detail-item">
              <Icons iconwidth="24px" iconheight="24px" icon="email" color="#f0f0f0" class="fundraiser-participant__icon"/>
              <div class="fundraiser-participant__contact">
                <InlineFieldEditor
                  type="email"
                  :remove-returns="true"
                  ref="fundraiserEmail"
                  :allow-empty="false"
                  error-text="Please add your email address for notifications"
                  :value="fundraiser.participant.email"
                  :edition-is-enabled="editing"
                  layout="inline"
                  placeholder="Email address"
                  location="fundraiser.participant.email"
                  v-on:next:field="openEdition('fundraiserDescription')"
                  v-on:previous:field="openEdition('fundraiserCity')"
                  v-if="editing"
                ></InlineFieldEditor>
                <a
                  :href="`mailto:${fundraiser.participant.email}`"
                  v-if="!editing && fundraiser.participant.email"
                >Contact</a>
              </div>
            </div>
            <div class="fundraiser-participant__subscribe" v-if="!editing">
              <div class="button is-warning">+Subscribe to receive updates</div>
            </div>
          </div>
        </div>
      </div>
      <div class="fundraiser-participant__description" :class="{'is-editing': editing}">
        <p>
          <InlineFieldEditor
            type="textarea"
            :remove-returns="false"
            ref="fundraiserDescription"
            :allow-empty="false"
            error-text="Add a compelling intro for your fundraiser."
            :value="fundraiser.description"
            :edition-is-enabled="editing"
            layout="block"
            placeholder="Email address"
            location="fundraiser.description"
            v-on:next:field="openEdition('fundraiserParticipant')"
            v-on:previous:field="openEdition('fundraiserEmail')"
          ></InlineFieldEditor>
        </p>
        <SharingIconsRow
          :key="$route.fullPath"
          :route-path="$route.fullPath"
          :fundraiser-id="fundraiser.fundraiser_id"
          trigger="fundraiser/participant/shareIconsRow" />
      </div>
    </div>
  </div>
</template>

<script>
import Icons from '@/components/general/Icons.vue';
import SharingIconsRow from '@/components/general/SharingIconsRow.vue';
import LazyLoadedImage from '@/components/plugins/LazyLoadedImage.js';

export default {
  props: ['fundraiser', 'editing', 'canEdit'],
  components: {
    Icons,
    LazyLoadedImage,
    SharingIconsRow,
    InlineFieldEditor: () => import('@/components/input/InlineFieldEditor.vue'),
    InlineImageEditor: () => import('@/components/input/InlineImageEditor.vue'),
  },
  methods: {
    closeEditor() {
      this.$emit('edit:close');
    },
    openEditor() {
      this.$emit('edit:open');
    },
    openEdition(ref) {
      this.$refs[ref].openEdition();
    },
  },
};
</script>

<style scoped lang="scss">
.fundraiser-body {
}

.fundraiser-participant {
  display: flex;

  &.is-editing {
    @include breakpoint($mobile) {
      display: block;
    }
  }

  &__wrapper {
    padding-top: 20px;
  }

  &__name {
    font-size: 20px;
    color: $color-medium-gray;
    margin-bottom: 10px;
    display: flex;

    @include breakpoint($tablet) {
      margin-top: 10px;
      font-size: 24px;
    }

    .emphasis {
      font-weight: bold;
      margin-left: 5px;
    }
  }

  &__subscribe {
    @include breakpoint($mobile) {
      margin-top: 20px;
      .button {
        white-space: normal;
        line-height: 20px;
        height: 50px;
      }
    }
  }

  &__detail-item-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }

  &__details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &__detail-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
    font-size: 18px;
  }

  &__icon {
    display: inline-block;
    width: 24px;
    margin-top: 6px;
    margin-right: 10px;
  }

  &__location {
  }

  &__avatar {
    width: 160px;
    margin-right: 20px;
    display: inline-block;

    @include breakpoint($tablet) {
      width: 120px;
    }
    &.is-editing {
      width: 600px;
      @include breakpoint($mobile) {
        width: 100%;
      }
    }
  }

  &__description {
    padding-bottom: 20px;
    padding-top: 10px;

    figure {
      img {
        width: 100%;
      }
    }
    &.is-editing {
      margin-top: 50px;
    }
  }
}
.fundraiser-participant__detail-item-wrapper.is-editing {
  flex-direction: column;
  align-items: flex-start;
}

</style>
