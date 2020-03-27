<template>
  <div class="navigation">
    <div>
      <router-link v-bind:to="`/home`">
        Home
      </router-link>
      <router-link v-bind:to="`/about`">
        About
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Navigation',
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    ...mapActions(['removeAuth']),
    logout() {
      this.removeAuth(this.$cookies);
    },
  },
};
</script>
<style scoped lang="scss">
@import './style.scss';
</style>
