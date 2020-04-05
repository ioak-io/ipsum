<template>
  <div class="home-content">
    <div class="input-container">
      <i class="material-icons icon-link" @click="reduceCount">remove</i>
      <div class="count-text">
        <OakText v-bind:data="data.count" id="count" @change="handleChange" />
      </div>

      <i class="material-icons icon-link" @click="addCount">add</i>
      <OakButton
        @click="generatetext"
        label="Generate"
        v-bind:theme="data.dirty ? 'secondary' : 'primary'"
        v-bind:variant="data.dirty ? 'animate none' : 'animate in'"
      />
      <OakButton
        v-if="getSnippets.length > 0"
        @click="copyAllContent"
        label="Copy all"
        theme="primary"
        variant="animate in"
      />
    </div>
    <div class="output-container">
      <div class="snippets-container">
        <div
          v-for="(snippet, index) in getSnippets"
          v-bind:key="snippet.id"
          class="snippet-container"
        >
          <div class="snippet typography-7">{{ snippet.body }}</div>
          <div class="copy-icon">
            <i class="material-icons icon-link" @click="copyToClipboard(index)"
              >file_copy</i
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import Clipboard from 'v-clipboard';
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { sendMessage } from '@/events/MessageService';

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
        count: 5,
        dirty: false,
        loremipsum:
          '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non tortor lorem. Suspendisse neque lorem, vehicula ut interdum ut, dignissim a erat. In ipsum tortor, molestie in fringilla ac, auctor at eros. Aliquam eget sem tempus, ultricies ante in, feugiat ligula. Vestibulum justo velit, condimentum sit amet nulla sed, viverra efficitur nibh. Aliquam in risus pharetra velit varius accumsan. In nec risus id magna volutpat feugiat. Cras tincidunt sem vitae molestie sollicitudin. Quisque bibendum sem id urna interdum, quis luctus purus commodo. Sed id scelerisque odio. Sed accumsan eros ex, et ultrices augue aliquet eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut mollis sapien eu orci feugiat, egestas vulputate diam bibendum. Donec egestas, erat ut suscipit mattis, justo mauris dictum turpis, eu imperdiet lacus neque eu tortor.\n',
        snippets: [{}],
        generatedtext: '',
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
      this.data.count++;
      this.data.dirty = true;
    },
    reduceCount: function() {
      this.data.count--;
      this.data.dirty = true;
    },
    copyToClipboard: function(index) {
      /*this.$clipboard(this.data.generatedtext)*/
      this.$clipboard(this.getSnippets[index].body);
      sendMessage('notification', true, {
        type: 'success',
        message: 'Copied to clipboard',
      });
    },
    copyAllContent: function() {
      this.data.generatedtext = '';
      this.getSnippets.forEach(
        item => (this.data.generatedtext += item.body + '\n')
      );
      this.$clipboard(this.data.generatedtext.replace(/\s*$/, ''));
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
      this.data.dirty = true;
    },
    generatetext: function() {
      this.fetchSnippets(this.data.count);
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
.home-content {
  // padding: 100px;
  // white-space: pre-wrap;
  display: grid;
  grid-template-columns: auto;
  row-gap: 40px;
  width: 70vw;
  margin: auto;
  padding: 40px 0;
  @media (max-width: 767px) {
    width: 98vw;
  }
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
    .snippets-container {
      display: grid;
      grid-template-rows: auto;
      row-gap: 40px;
      .snippet-container {
        background-color: var(--color-background-transparent-3);
        border-radius: 4px;
        padding: 10px;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
          0px 4px 5px 0px rgba(0, 0, 0, 0.14),
          0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        display: flex;
        justify-content: space-between;
        .copy-icon {
          opacity: 0.2;
          transition: 1000ms cubic-bezier(0.5, 1.6, 0.4, 0.7);
          &:hover {
            opacity: 1;
          }
        }
        .snippet {
          display: inline;
          &:hover + div {
            opacity: 1;
          }
        }
      }
    }
  }
  .icon-link {
    user-select: none;
    cursor: pointer;
    &:hover {
      color: var(--color-primary-1);
    }
  }
}
</style>
