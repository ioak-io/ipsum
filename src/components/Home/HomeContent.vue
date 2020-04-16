<template>
  <div class="home-content">
    <!-- <div>
      <Logo />
    </div> -->
    <div>
      <Typewriter v-bind:text="messages[currentIndex]" />
    </div>
    <div>
      <OakButton
        theme="tertiary"
        variant="animate none"
        label="Start generating"
        @click="startGenerating"
      ></OakButton>
    </div>
  </div>
</template>

<script type="text/javascript">
import OakButton from '@/oakui/OakButton.vue';
import Typewriter from './Typewriter.vue';
import Logo from '@/components/Logo/Logo.vue';

export default {
  name: 'HomeContent',
  props: {
    messages: Array,
  },
  data: function() {
    return {
      currentIndex: 0,
    };
  },
  components: {
    OakButton,
    Typewriter,
    // Logo,
  },
  mounted() {
    setInterval(() => {
      if (this.currentIndex < this.messages.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    }, 6000);
  },
  methods: {
    startGenerating() {
      console.log(122);
      this.$router.push('/generate');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-content {
  display: grid;
  row-gap: 20px;
  justify-items: center;
}
</style>
