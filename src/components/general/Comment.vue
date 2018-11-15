<template>
  <div class="comment-item__comment-wrapper"
      :class="{'is-reply': isReply, 'current': comment.id === currentId}"
      :id="`comment_${comment.id}`">
    <div class="comment-item__avatar">
      <avatar
        username="comment.commenter.fullname"
        :rounded="false" :src="comment.avatar"></avatar>
    </div>
    <div class="comment-item__content">
      <div class="comment-item__comment-header">
        {{comment.fullname}} commented {{comment.timestamp | timeAgo}}.
      </div>
      <div class="comment-item__comment-content" v-html="comment.comment"></div>
    </div>
    <ShareDonateToolbar
      :fundraiser-id="fundraiserId"
      :comment-id="comment.id"
      :text="comment.comment"
      :url-params="`comment_id=${comment.id}`"
      :allow-comment="!isReply"
      title="Share this comment"
      trigger="fundraiser/lower/comments"
      v-on:replyTo="openReplyBox($event)"
      v-on:share="openShareBox = true"
      v-on:donate="openDonateBox()"
      via="Volunteerathon" />
    <transition name="slide-fade">
      <CommentReply :in-reply-to="inReplyTo" class="comment-reply__wrapper" v-if="showReplyBox" />
    </transition>
  </div>
</template>

<style scoped lang="scss">
.comment-item {
  &__comment-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 30px;

    &.is-reply {
      margin-left: 30px;
    }

    &.current {
      padding: 10px;
      margin-left: -10px;
      animation: fadeBackground 3s ease-in-out;
      animation-delay: 3s;

      &.is-reply {
        margin-left: 20px;
      }
    }
  }
  &__comment-header {
    color: $color-silver;
    font-style: italic;
  }
  &__avatar {
    margin-right: 10px;
  }
  &__content {
    width: calc(90% - 60px);
  }
}

.share-toolbar {
  &__share-wrapper {
    @include breakpoint($tablet) {
      margin-left: 80px !important;
    }
  }
}

.comment-reply__wrapper {
  margin-left: 60px;
}

</style>

<script>
import ShareDonateToolbar from '@/components/general/ShareDonateToolbar.vue';
import CommentReply from '@/components/general/CommentReply.vue';
import Avatar from 'vue-avatar';
import Icons from '@/components/general/Icons.vue';

export default {
  props: ['comment', 'is-reply', 'fundraiserId'],
  components: {
    Avatar,
    CommentReply,
    Icons,
    ShareDonateToolbar,
  },
  data() {
    return {
      showReplyBox: false,
      inReplyTo: null,
      openShareBox: false,
    };
  },
  computed: {
    currentId() {
      return parseInt(this.$route.query.comment_id, 10);
    },
  },
  methods: {
    openReplyBox(payload) {
      this.showReplyBox = true;
      this.inReplyTo = payload.commentId;
    },
    openShareBoxx() {
      alert(`${window.location.origin}${window.location.pathname}?comment_id=${this.comment.id}`);
    },
  },
};
</script>
