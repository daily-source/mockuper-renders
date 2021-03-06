<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-4-tablet is-11-mobile">
      <label :for="`input-editable_${_uid}`">{{label}}</label>
    </div>
    <div class="column is-5-tablet is-7-mobile">
      <div
        class="input-non-editable-value"
        v-if="!fieldIsOpen"
        v-html="value"
        @click="openEdition()"
      ></div>
      <div v-else>
        <input
          class="input-editable-value"
          :id="`input-editable_${_uid}`"
          v-model="fieldValue"
          ref="input"
          :type="type || 'text'"
          @blur="blurInput()"
          v-on:keyup.esc="cancelEdition()"
          v-on:keyup.enter="saveField()"
          @keydown.tab.prevent="next"
        />
      </div>
    </div>
    <div class="column is-3-tablet is-5-mobile is-pulled-right">
      <div class="action-icon-wrapper" @click="openEdition()" :class="{'hide-icon': fieldIsOpen}">
        <Icons icon="pencil" class="action-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
      </div>
      <div class="action-icon-wrapper" @click="saveField(12)" :class="{'hide-icon': !fieldIsOpen}">
        <Icons icon="check" class="action-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
      </div>
      <div class="action-icon-wrapper" @click="cancelEdition()" :class="{'hide-icon': !fieldIsOpen}">
        <Icons icon="close-circle" class="action-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="column is-11-mobile is-6-tablet is-offset-4-tablet editable-error-message-wrapper" v-if="errorMessage">
        <span class="editable-error-message">{{errorMessage}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import Icons from '@/components/general/Icons.vue';
import * as validator from '../../util/validator.js';
import Vue from 'vue';

export default {
  props: ['label', 'type', 'value', 'errorText'],
  data() {
    return {
      fieldIsOpen: false,
      fieldValue: this.value,
      errorMessage: '',
      blurTimeout: null,
    };
  },
  components: {
    Icons,
  },
  methods: {
    cancelEdition() {
      this.fieldIsOpen = false;
      this.errorMessage = '';
    },
    openEdition() {
      this.fieldValue = this.value;
      this.fieldIsOpen = true;
      Vue.nextTick(() => {
        this.$refs.input.focus();
      });
    },
    saveField(id) {
      return new Promise((resolve, reject) => {
        if (!this.fieldIsOpen) {
          reject('err');
        }
        clearTimeout(this.blurTimeout);
        if (this.validateAllFields()) {
          this.$emit('input:save', this.fieldValue);
          this.cancelEdition();
          resolve();
        } else {
          this.errorMessage = this.errorText;
        }
      });
    },
    next(e) {
      this.saveField()
        .then(() => {
          if (!e.shiftKey) {
            this.$emit('next:field');
          } else {
            this.$emit('previous:field');
          }
        })
        .catch(err => err);
    },
    /**
     * This is needed in order to allow an external button to save before the blur cancels the edition
     */
    blurInput() {
      this.blurTimeout = setTimeout(() => {
        this.cancelEdition();
      }, 200);
    },
    validateAllFields() {
      if (this.type === 'name') {
        if (validator.validateName(this.fieldValue)) {
          return true;
        }
        return false;
      }
      if (this.type === 'email') {
        if (validator.validateEmail(this.fieldValue)) {
          return true;
        }
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.input-non-editable-value {
  font-weight: bold;
  font-size: inherit;
  height: 28px;
  line-height: 1.4;
  border-bottom: 1px solid transparent;
}
.input-editable-value {
  font-weight: bold;
  font-size: inherit;
  line-height: 1.4;
  height: 28px;
  border: none;
  padding: 0;
  box-shadow: none;
  border-bottom: 1px solid $color-light-gray;
  background: rgba($color-light-gray, 0.5);
}
.action-icon-wrapper {
  display: inline-block;
  padding: 0 3px;
  transition: opacity 0.1s ease-in-out;
}
.hide-icon {
  opacity: 0.4;
  &:hover {
    cursor: disabled;
  }
}
.is-pulled-right {
  text-align: right;
}
.is-multiline {
  @include breakpoint($tablet) {
    margin-bottom: 0;
  }
}
.column.is-11-mobile {
  @include breakpoint($mobile) {
    padding-bottom: 0;
  }
}
.column.is-7-mobile,
.column.is-5-mobile {
  @include breakpoint($mobile) {
    padding-top: 0;
  }
}

</style>
