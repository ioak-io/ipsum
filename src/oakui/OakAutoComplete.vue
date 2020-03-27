<template>
  <div class="oak-auto-complete" v-bind:id="id">
    <div class="search-bar">
      <OakText
        id="auto-complete"
        v-bind:label="label"
        @focus="onFocus"
        @blur="onBlur"
        @change="$emit('search')"
      />
    </div>
    <div class="results" v-if="isSearchOn">
      <div
        class="element"
        v-for="item in objects"
        v-bind:key="item.key"
        @click="selected(item.key)"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script>
import OakText from '@/oakui/OakText.vue';
export default {
  name: 'OakAutoComplete',
  components: { OakText },
  props: {
    label: String,
    objects: Array,
    id: String,
  },
  data: function() {
    return {
      isSearchOn: false,
    };
  },
  created() {
    window.addEventListener('click', e => {
      // console.log(e.target, document.getElementById(this.id), this.id);
      // console.log(
      //   document
      //     .getElementById(this.id)
      //     .querySelector('.oak-popover-menu-label').classList
      // );
      if (!document.getElementById(this.id)?.contains(e.target)) {
        this.isSearchOn = false;
      }
    });
  },
  methods: {
    onBlur() {
      console.log('blur');
      //   console.log(event.target);
      //   this.isSearchOn = false;
    },
    onFocus() {
      console.log('focus');
      this.isSearchOn = true;
    },
    selected(key) {
      this.isSearchOn = false;
      this.$emit('change', key);
    },
  },
};
</script>
<style lang="scss" scoped>
.oak-auto-complete {
  position: relative;
  .results {
    position: absolute;
    z-index: 1;
    margin-top: -20px;
    padding: 8px 0px;
    background-color: var(--color-background-5);
    box-shadow: 0 0 0 1px rgba(111, 119, 130, 0.15),
      0 5px 20px 0 rgba(21, 27, 38, 0.08);
    cursor: default;
    .element {
      padding: 0px 20px;
      height: 40px;
      line-height: 40px;
      &:hover {
        background-color: var(--color-background-3);
      }
    }
  }
}
</style>
