<template>
  <div class="home-content">
    <div>
      <OakText
        v-bind:data="data.count"
        id="count"
        @change="handleChange"
        label="Number of paragraphs"
      />
      <OakButton
        @click="generate"
        label="Generate"
        theme="primary"
        variant="animate in"
      />
    </div>
  </div>
</template>

<script>
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';

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
      },
    };
  },
  methods: {
    generate: function() {
      alert(this.data.count);
    },
    handleChange: function() {
      this.data[event.target.name] = event.target.value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-content {
  padding: 100px;
}
</style>
