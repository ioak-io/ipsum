<template>
  <OakTab v-bind:meta="staticData.tabs" class="generate-content-container">
    <div slot="main">
      <div class="generate-content">
        <div class="input-container">
          <i class="material-icons icon-link" @click="reduceCount">remove</i>
          <div class="count-text">
            <OakText
              v-bind:data="data.count"
              id="count"
              @change="handleChange"
            />
          </div>

          <i class="material-icons icon-link" @click="addCount">add</i>
          <OakButton
            @click="generatetext"
            label="Generate"
            v-bind:theme="data.dirty ? 'secondary' : 'default'"
            v-bind:variant="data.dirty ? 'animate none' : 'animate none'"
          />
          <OakButton
            v-if="getSnippets.length > 0"
            @click="copyAllContent"
            label="Copy all"
            theme="default"
            variant="animate none"
          />
        </div>
        <div class="output-container">
          <div v-for="snippet in getSnippets" v-bind:key="snippet.id">
            <Snippet v-bind:snippet="snippet" />
          </div>
        </div>
      </div>
    </div>
    <div slot="settings">
      <div class="settings-content">
        <Settings @change="changeSettings" v-bind:data="settings" />
      </div>
    </div>
  </OakTab>
</template>

<script type="text/javascript">
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import Clipboard from 'v-clipboard';
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { sendMessage } from '@/events/MessageService';
import OakTab from '@/oakui/OakTab.vue';
import Snippet from './Snippet.vue';
import Settings from './Settings.vue';

Vue.use(Clipboard);
export default {
  name: 'GenerateContent',
  components: {
    OakText,
    OakButton,
    OakTab,
    Snippet,
    Settings,
  },
  data: function() {
    return {
      data: {
        count: 5,
        dirty: false,
        loremipsum:
          '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non tortor lorem. Suspendisse neque lorem, vehicula ut interdum ut, dignissim a erat. In ipsum tortor, molestie in fringilla ac, auctor at eros. Aliquam eget sem tempus, ultricies ante in, feugiat ligula. Vestibulum justo velit, condimentum sit amet nulla sed, viverra efficitur nibh. Aliquam in risus pharetra velit varius accumsan. In nec risus id magna volutpat feugiat. Cras tincidunt sem vitae molestie sollicitudin. Quisque bibendum sem id urna interdum, quis luctus purus commodo. Sed id scelerisque odio. Sed accumsan eros ex, et ultrices augue aliquet eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut mollis sapien eu orci feugiat, egestas vulputate diam bibendum. Donec egestas, erat ut suscipit mattis, justo mauris dictum turpis, eu imperdiet lacus neque eu tortor.\n',
        snippets: [{}],
        generatedtext: '',
      },
      settings: {
        language: 'en',
        strategy: 'lorem',
        unit: 'sentence',
      },
      staticData: {
        tabs: [
          { slotName: 'main', icon: 'text_fields', label: 'Generate Text' },
          { slotName: 'settings', icon: 'settings', label: 'Settings' },
        ],
      },
    };
  },
  computed: { ...mapGetters(['getSnippets']) },
  mounted() {
    this.generatetext();
  },
  methods: {
    ...mapActions(['fetchSnippets']),
    addCount: function() {
      if (this.data.count < 1) {
        this.data.count = 1;
      } else {
        this.data.count++;
        this.data.dirty = true;
      }
    },
    reduceCount: function() {
      if (this.data.count > 1) {
        this.data.count--;
        this.data.dirty = true;
      }
    },
    copyAllContent: function() {
      this.data.generatedtext = '';
      this.getSnippets.forEach(
        item => (this.data.generatedtext += item.text + '\n')
      );
      this.$clipboard(this.data.generatedtext.replace(/\s*$/, ''));
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
      this.data.dirty = true;
    },
    changeSettings: function(attribute, value) {
      this.settings[attribute] = value;
    },
    generatetext: function() {
      this.fetchSnippets({
        unit: this.settings.unit,
        language: this.settings.language,
        strategy: this.settings.strategy,
        count: this.data.count,
      });
      this.data.generatedtext = '';
      for (let i = 0; i < this.data.count; i++) {
        this.data.generatedtext =
          this.data.generatedtext + this.data.loremipsum;
        this.data.snippets.push({ text: this.data.loremipsum });
      }
      this.data.dirty = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.generate-content-container {
  width: 70vw;
  margin: auto;
  @media (max-width: 767px) {
    width: 90vw;
  }
  .generate-content {
    // padding: 100px;
    // white-space: pre-wrap;
    display: grid;
    grid-template-columns: auto;
    row-gap: 40px;
    .input-container {
      display: grid;
      grid-template-columns: repeat(5, auto);
      align-items: center;
      justify-content: center;
      column-gap: 10px;
      .count-text {
        width: 52px;
      }
    }
    .output-container {
      display: grid;
      grid-template-rows: auto;
      row-gap: 40px;
    }
  }
  .generate-content,
  .settings-content {
    padding: 40px 0;
  }
}
</style>
