<template>
  <div
    id="app"
    class="themecolor_4"
    v-bind:class="getProfile.darkmode ? 'theme_dark' : 'theme_light'"
  >
    <AuthInit />
    <Notification />
    <div class="view-container">
      <div class="navigation-container">
        <Navigation />
      </div>
      <!-- <HomeContent /> -->
      <div class="main-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Notification from '@/components/Notification/Notification.vue';
import AuthInit from '@/components/Auth/AuthInit.vue';
import Navigation from '@/components/Navigation/Navigation.vue';
import HomeContent from '@/components/Home/HomeContent.vue';
export default {
  name: 'App',
  components: {
    Notification,
    AuthInit,
    Navigation,
    // HomeContent,
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
};
</script>

<style lang="scss">
@import './theme.scss';
@import './metric.scss';
body {
  margin: 0;
  .form-element-label {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    display: block;
    // bottom: 8px;
    // left: 10px;
    position: relative;
    font-size: var(--metric-typography-4);
    color: var(--color-foreground-2);
    text-transform: capitalize;
  }
}
#app {
  background: url('../../assets/images/ipsum_dark.svg') no-repeat center center;
  background-size: cover;
  &.theme_light {
    background: url('../../assets/images/ipsum_light.svg') no-repeat center
      center;
    background-size: cover;
  }
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // font-family: 'Lato', sans-serif;
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  color: var(--color-foreground-1);
  .view-container {
    display: grid;
    grid-template-rows: var(--height-nav) calc(100vh - var(--height-nav));
    overflow: auto;
    // max-height: 100vh;
    // .main-container {
    //   max-height: calc(100vh - var(--height-nav));
    //   overflow-y: auto;
    // }
  }
}
// body {
//   width: 100%;
//   margin: auto;
//   .boxed {
//     min-height: 100vh;
//     padding-top: calc(var(--height-nav) + 20px);
//     // padding-bottom: 40px;

//     @media (min-width: 768px) {
//       width: 60%;
//       margin: auto;
//     }
//     @media (max-width: 767px) {
//       // padding-top: 0px;
//       // padding-left: 20px;
//       // padding-right: 20px;
//       width: 90%;
//       margin: auto;
//     }
//   }
//   .full {
//     min-height: 100vh;
//     padding-top: calc(var(--height-nav));
//   }
// }
</style>
