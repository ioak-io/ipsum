<template>
  <div class="navigation">
    <div>
      <router-link v-bind:to="`/${getProfile.space}/home`">
        Home
      </router-link>
      <router-link
        v-if="getProfile.auth.isAuth"
        v-bind:to="`/${getProfile.space}/listpage`"
      >
        List Page
      </router-link>
      <router-link to="/createspace">
        Create Space
      </router-link>
      <router-link
        v-if="!getProfile.auth.isAuth"
        v-bind:to="`/${getProfile.space}/login?signin=y`"
      >
        Login
      </router-link>
      <router-link
        v-if="!getProfile.auth.isAuth"
        v-bind:to="`/${getProfile.space}/login?signup=y`"
      >
        Sign up
      </router-link>
      <OakButton
        v-if="getProfile.auth.isAuth"
        v-on:click="logout"
        label="Logout"
        theme="primary"
        variant="animate none"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OakButton from '@/oakui/OakButton.vue';
export default {
  name: 'Navigation',
  components: {
    OakButton,
  },
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
