<template>
  <div class="home">
    <HomeContent msg="Home page content" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeContent from './HomeContent.vue';

export default {
  name: 'Home',
  components: {
    HomeContent,
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: var(--color-background-1);
  min-height: 100vh;
}
</style>
