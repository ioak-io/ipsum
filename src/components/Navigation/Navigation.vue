<template>
  <div class="navigation">
    <div class="logo">
      <Logo />
    </div>
    <div class="rightnav">
      <div class="darkmode">
        <i class="material-icons" @click="toggleDarkmode">brightness_medium</i>
      </div>
      <div class="links">
        <router-link v-bind:to="`/home`">
          Random Text
        </router-link>
        <router-link v-bind:to="`/nlg`">
          Intelligent Text
        </router-link>
        <router-link v-bind:to="`/about`">
          About
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Logo from '@/components/Logo/Logo.vue';

export default {
  name: 'Navigation',
  components: { Logo },
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    ...mapActions(['removeAuth', 'toggleDarkmode']),
    logout() {
      this.removeAuth(this.$cookies);
    },
    // handleDarkmodeChange: function() {
    //   this.toggleDarkmode();
    // },
  },
};
</script>
<style scoped lang="scss">
@import './style.scss';
</style>
