<template>
  <div class="snippet-container">
    <div class="snippet typography-7">{{ snippet.text }}</div>
    <div class="snippet-action">
      <div class="copy-icon">
        <i class="material-icons icon-link" @click="copy">file_copy</i>
      </div>
      <!-- <div class="copy-icon">
                    <i
                      class="material-icons icon-link"
                      @click="copyToClipboardAndClose(index)"
                      >clear_all</i
                    >
                  </div> -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { sendMessage } from '@/events/MessageService';
import Clipboard from 'v-clipboard';
Vue.use(Clipboard);
export default {
  name: 'Snippet',
  props: {
    snippet: Object,
  },
  methods: {
    copy: function() {
      this.$clipboard(this.snippet.text);
      sendMessage('notification', true, {
        type: 'success',
        message: 'Copied to clipboard',
      });
      this.$emit('copied');
    },
  },
};
</script>
<style lang="scss" scoped>
.snippet-container {
  background-color: var(--color-background-2);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  justify-content: space-between;
  .copy-icon {
    opacity: 0.2;
    transition: 1000ms cubic-bezier(0.5, 1.6, 0.4, 0.7);
    &:hover {
      opacity: 1;
    }
  }
  .snippet {
    font-size: 16px;
    line-height: 1.4em;
    display: inline;
    &:hover + div {
      opacity: 1;
    }
  }
  .snippet-action {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
