<template>
  <div>
    <div class="comments-section__wrapper">
      <div class="comments-section__comment-wrapper" v-for="comment in comments">
        <div class="comment-item__comment-wrapper">
          <Comment :comment="comment" :fundraiser-id="fundraiserId" />
        </div>
        <div class="comment-item__comment-replies">
          <div class="comment-item__comment-wrapper" v-for="reply in comment.replies">
            <Comment :comment="reply" :is-reply="true" :fundraiser-id="fundraiserId" />
          </div>
        </div>
      </div>
    </div>
    <button class="button is-warning is-load-more" @click="loadMoreComments()" v-if="moreComments">Show more comments</button>
    <h4>Leave a comment</h4>
    <CommentReply class="comment-reply__wrapper" />
  </div>
</template>

<style scoped lang="scss">
.is-load-more {
  margin-bottom: 40px;
}
.comment-reply__wrapper {
  margin-left: 60px;
}

</style>

<script>
import Comment from '@/components/general/Comment.vue';
import CommentReply from '@/components/general/CommentReply.vue';

export default {
  props: ['comments', 'more-comments', 'fundraiserId'],
  components: {
    Comment,
    CommentReply,
  },
  methods: {
    loadMoreComments() {
      this.$emit('loadMoreComments');
    },
  },
};
</script>
