<template>
  <div class="oak-text-field">
    <label class="form-element-label">{{ label }}</label>
    <input
      v-if="!multiline"
      :disabled="disabled"
      autoComplete="off"
      :placeholder="placeholder"
      :type="type ? type : 'text'"
      :name="id"
      :value="data"
      @keyup="$emit('change')"
      @blur="blurEvent"
      @focus="$emit('focus')"
    />
    <textarea
      v-if="multiline"
      :disabled="disabled"
      :name="id"
      :value="data"
      v-bind:rows="rows"
      @keyup="$emit('change')"
      @blur="blurEvent"
    />
  </div>
</template>
<script>
import { sendMessage } from '@/events/MessageService';
export default {
  name: 'OakText',
  props: {
    label: String,
    id: String,
    data: String,
    type: String,
    handleChange: Function,
    errorFields: Object,
    disabled: Boolean,
    rows: Number,
    multiline: Boolean,
    placeholder: String,
  },
  data() {
    return {};
  },
  methods: {
    blurEvent: function() {
      this.$emit('blur');
      sendMessage('blur', true, {
        id: this.id,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/OakText.scss';
</style>
