<template>
  <div class="settings">
    <div>
      <div class="typography-8 space-bottom-1">Language</div>
      <OakRadio
        theme="primary"
        v-bind:data="data.language"
        v-bind:objects="staticData.language"
        @change="event => $emit('change', 'language', event.target.value)"
      />
    </div>
    <div>
      <div class="typography-8 space-bottom-1">Unit</div>
      <OakRadio
        theme="primary"
        v-bind:data="data.unit"
        v-bind:objects="staticData.unit"
        @change="event => $emit('change', 'unit', event.target.value)"
      />
    </div>
    <div>
      <div class="typography-8 space-bottom-1">Text generation strategy</div>
      <OakRadio
        theme="primary"
        v-bind:data="data.type"
        v-bind:objects="staticData.type"
        @change="event => $emit('change', 'type', event.target.value)"
      />
    </div>
  </div>
</template>
<script>
import OakRadio from '@/oakui/OakRadio.vue';
export default {
  name: 'Settings',
  props: {
    data: Object,
  },
  data: function() {
    return {
      staticData: {
        type: [
          {
            key: 'lorem',
            value: 'Lorem ipsum',
          },
          {
            key: 'random',
            value: 'Random character text',
          },
          {
            key: 'nlg',
            value: 'Meaningful sentence',
          },
        ],
        unit: [
          {
            key: 'paragraph',
            value: 'Paragraph',
          },
          {
            key: 'sentence',
            value: 'Sentence',
          },
        ],
        language: [
          {
            key: 'en',
            value: 'English',
          },
          {
            key: 'fr',
            value: 'French',
          },
        ],
      },
    };
  },
  components: { OakRadio },
};
</script>
<style lang="scss" scoped>
.settings {
  display: grid;
  grid-template-rows: auto;
  row-gap: 30px;
}
</style>
