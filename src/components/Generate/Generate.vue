<template>
  <div class="generate">
    <div class="overlay">
      <div class="header">
        <Logo clickable />
        <Navigation />
      </div>
      <div class="content">
        <GenerateContent msg="Home page content" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GenerateContent from './GenerateContent.vue';
import Navigation from '@/components/Navigation/Navigation.vue';
import Logo from '@/components/Logo/Logo.vue';

export default {
  name: 'Generate',
  components: {
    GenerateContent,
    Navigation,
    Logo,
  },
};
</script>

<style lang="scss" scoped>
.generate {
  min-height: 100vh;
  background: url('../../assets/images/background2.jpg') no-repeat center center;
  background-size: cover;
  .overlay {
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background-color: var(--color-overlay-others);
    // background-color: rgba(0, 0, 0, 0.92);
    .header {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      align-items: center;
    }
  }
}
</style>
