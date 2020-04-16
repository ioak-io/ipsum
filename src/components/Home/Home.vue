<template>
  <div class="home">
    <div class="overlay">
      <div class="header">
        <Logo />
      </div>
      <div class="content">
        <HomeContent v-bind:messages="messages" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeContent from './HomeContent.vue';
import Logo from '@/components/Logo/Logo.vue';

export default {
  name: 'Home',
  components: {
    HomeContent,
    Logo,
  },
  data: function() {
    return {
      messages: [
        'Lorem ipsum dolor sit amet',
        'Sed pellentesque laoreet velit nec interdum',
        'Duis tortor ipsum, viverra ut eros vitae',
        'Nam ullamcorper vestibulum enim, at dictum justo',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat center center;
  background-size: cover;
  .overlay {
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background-color: var(--color-overlay-home);
    display: grid;
    grid-template-rows: auto 1fr;
    .header {
      display: flex;
      justify-content: flex-start;
      padding: 20px;
      align-items: center;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
