<template>
  <button class="oak-button" :class="getStyle" @click="$emit('click')">
    {{ label }}
  </button>
</template>
<script>
export default {
  name: 'OakButton',
  props: {
    label: String,
    icon: String,
    action: Object,
    variant: String,
    theme: String,
    align: String,
    small: Boolean,
    invert: Boolean,
  },
  computed: {
    getStyle() {
      let style = this.theme ? this.theme : '';
      style += this.variant ? ` ${this.variant}` : '';

      if (!this.label) {
        style += ' icon';
      }

      style += this.invert ? ' invert' : '';

      style += this.small ? ' small' : '';

      style += this.align ? ` align-${this.align}` : '';

      return style;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/oak-button-slide.scss';
</style>
