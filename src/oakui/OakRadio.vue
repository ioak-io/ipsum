<template>
  <div class="oak-radio" v-bind:class="style">
    <div v-for="item in objects" v-bind:key="item.key" class="radio-item">
      <div
        v-bind:class="item.key === data ? 'checked' : 'unchecked'"
        @click="handleChange(item.key)"
      >
        <div class="decorator" />
      </div>
      <div class="label">{{ item.value }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OakRadio',
  props: {
    data: String,
    labelPosition: String,
    variant: String,
    theme: String,
    objects: Array,
  },
  computed: {
    style: function() {
      let style = this.theme ? this.theme : '';
      style += this.variant ? ` ${this.variant}` : '';
      return style;
    },
  },
  methods: {
    handleChange: function(checkedState) {
      event.target.value = checkedState;
      this.$emit('change', event);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './styles/oak-radio.scss';
</style>
