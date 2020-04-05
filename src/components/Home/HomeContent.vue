<template>
  <div class="home-content">
    <div id="app">
      <OakText
        v-bind:data="data.count"
        id="count"
        @change="handleChange"
        label="Number of paragraphs"
      />
      <OakButton
        @click="generatetext"
        label="Generate Lorem Ipsum"
        theme="primary"
        variant="animate in"
      />
      <ul>
        <div v-for="(snippet, index) in getSnippets" v-bind:key="snippet.id">
          <p>{{ snippet.body }}</p>
          <OakButton
            @click="copyToClipboard(index)"
            label="Copy to Clipboard"
            theme="primary"
            variant="animate in"
          />
        </div>
      </ul>
      <OakButton
        @click="copyAllContent"
        label="Copy all content"
        theme="primary"
        variant="animate in"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import Clipboard from 'v-clipboard';
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

Vue.use(Clipboard);
export default {
  name: 'HomeContent',
  components: {
    OakText,
    OakButton,
  },
  data: function() {
    return {
      data: {
        count: 0,
        loremipsum:
          '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non tortor lorem. Suspendisse neque lorem, vehicula ut interdum ut, dignissim a erat. In ipsum tortor, molestie in fringilla ac, auctor at eros. Aliquam eget sem tempus, ultricies ante in, feugiat ligula. Vestibulum justo velit, condimentum sit amet nulla sed, viverra efficitur nibh. Aliquam in risus pharetra velit varius accumsan. In nec risus id magna volutpat feugiat. Cras tincidunt sem vitae molestie sollicitudin. Quisque bibendum sem id urna interdum, quis luctus purus commodo. Sed id scelerisque odio. Sed accumsan eros ex, et ultrices augue aliquet eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut mollis sapien eu orci feugiat, egestas vulputate diam bibendum. Donec egestas, erat ut suscipit mattis, justo mauris dictum turpis, eu imperdiet lacus neque eu tortor.\n',
        snippets: [{}],
        generatedtext: '',
        label: 'Copy to Clipboard',
      },
    };
  },
  computed: { ...mapGetters(['getSnippets']) },
  methods: {
    ...mapActions(['fetchSnippets']),
    generate: function() {
      alert('Number of paragraphs: ' + this.data.count);
    },
    copyToClipboard: function(index) {
      /*this.$clipboard(this.data.generatedtext)*/
      this.$clipboard(this.data.snippets[index + 1].text);
    },
    copyAllContent: function() {
      this.data.generatedtext = '';
      for (let i = 1; i <= this.data.count; i++) {
        /*alert(this.data.snippets[i].text)*/
        this.data.generatedtext =
          this.data.generatedtext + this.data.snippets[i].text;
      }
      this.$clipboard(this.data.generatedtext);
      alert(this.data.generatedtext);
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
    generatetext: function() {
      this.fetchSnippets(this.data.count);
      this.data.generatedtext = '';
      for (let i = 0; i < this.data.count; i++) {
        this.data.generatedtext =
          this.data.generatedtext + this.data.loremipsum;
        this.data.snippets.push({ text: this.data.loremipsum });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-content {
  padding: 100px;
  white-space: pre-wrap;
}
</style>
