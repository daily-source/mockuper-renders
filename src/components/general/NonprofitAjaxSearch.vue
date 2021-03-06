<template v-if="canRender">
  <div class="column is-centered nonprofit-search-field-wrapper" :class="{'standalone columns': standalone}">
    <VueSelect
      transition="fade"
      label="name"
      :filterable="false"
      :options="options"
      :placeholder="placeholder"
      @search="onSearch"
      v-model="selected"
      v-if="canRender"
    >
      <template slot="no-options">
        Type to search nonprofits...
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center selection">
          {{ option.NAME }}
          </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected ellipsis-text">
          {{ option.NAME }}
        </div>
      </template>
    </VueSelect>
  </div>
</template>

<script>
import Icons from '@/components/general/Icons.vue';
import VueSelect from 'vue-select';
import debounce from 'lodash/debounce';

const IRSSearchAPI = process.env.IRS_SEARCH_API_URL;

export default {
  props: ['standalone', 'placeholder', 'defaultValue'],
  components: {
    Icons,
    VueSelect,
  },
  data() {
    return {
      canRender: false,
      selected: null,
      options: [],
    };
  },
  /**
   * Display this form only in the browser, not in the server.
   */
  mounted() {
    this.canRender = true;
    if (this.defaultValue) {
      this.selected = this.defaultValue;
    }
  },

  /**
   * Perform a debounced lookup on the IRS Search API (meaning it will group the input to
   * avoid flooding the server with calls).
   */
  methods: {
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: debounce((loading, search, vm) => {
      fetch(
        `${IRSSearchAPI}/nonprofits/search/${escape(search)}`,
      ).then((res) => {
        res.json().then(json => (vm.options = json));
        loading(false);
      });
    }, 350),
  },
  /**
   * Upon selection, emit selected value.
   * The parent component can react to the event like this v-on:selected="doSomething($event)".
   */
  watch: {
    selected(newVal) {
      if (newVal) {
        this.$emit('selected', newVal);
      } else {
        this.$emit('selected', null);
      }
    },
    defaultValue(newVal) {
      this.selected = newVal;
    },
  },
};
</script>

<style lang="scss">
.nonprofit-search-field-wrapper {
  position: relative;
  display: flex;

  .v-select {
    flex: 1;

    .selected-tag {
      position: absolute;
      text-align: left;
      padding-right: 50px;
      width: 100%;
    }
    .dropdown-toggle {
      height: 38px;
      flex: 1;
      display: flex;
      .clear {
        bottom: 14px;
      }
      .open-indicator {
        bottom: 7px;
      }
      @include breakpoint($tablet) {
        .open-indicator {
          bottom: 12px;
        }
      }
    }
    input[type=search] {
      text-align: left;
      flex: 1;
    }
  }

  .dropdown-menu {
    margin-top: -10px;
    li {
      padding-left: 0px;
      padding-right: 0px;
      a {
        display: block;
        white-space: normal;
        margin-bottom: 10px;
      }
      .selection {
        line-height: 20px;
        overflow: auto;
      }
    }
  }

  .ellipsis-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.standalone {
    margin: 40px auto;
    max-width: 600px;

    .v-select {
      .dropdown-toggle {
        .clear {

        }
        .open-indicator {
          bottom: 7px;
        }
      }
    }
  }
}

</style>
