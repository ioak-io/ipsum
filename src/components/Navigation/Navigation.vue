<template>
  <div class="navigation">
    <div class="darkmode">
      <i class="material-icons" @click="toggleDarkmode">brightness_medium</i>
    </div>
    <div class="links">
      <!-- <router-link v-bind:to="`/home`">
        Home
      </router-link>
      <router-link v-bind:to="`/generate`">
        Generate
      </router-link>
      <router-link v-bind:to="`/about`">
        About
      </router-link> -->
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
    ...mapActions(['removeAuth', 'toggleDarkmode']),
  },
};
</script>
<style scoped lang="scss">
@import './style.scss';
.navigation {
  user-select: none;
  display: flex;
  align-items: center;
  .darkmode {
    .material-icons {
      cursor: pointer;
    }
  }
  .links {
    font-family: Arial, Helvetica, sans-serif;
    // margin-right: 60px;
    a {
      text-decoration: none;
      color: white;
      text-transform: uppercase;
      margin: 0px 5px;
      padding: 10px;
      border-radius: 6px;
      font-size: 14px;
      color: var(--color-foreground-1);
      &:hover {
        background-color: var(--color-background-2);
      }
      &.router-link-active {
        // color: var(--color-primary-1);
        background-color: var(--color-background-4);
      }
    }
  }
}
</style>
