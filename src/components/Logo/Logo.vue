<template>
  <img
    v-if="getProfile.darkmode"
    class="logo"
    v-bind:src="darkLogo"
    alt="ipsum logo"
  />
  <img v-else class="logo" v-bind:src="lightLogo" alt="ipsum logo" />
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Logo',
  data: function() {
    return {
      darkLogo: require('@/assets/ipsum_dark.svg'),
      lightLogo: require('@/assets/ipsum_light.svg'),
    };
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
};
</script>
<style lang="scss" scoped>
img {
  &.logo {
    height: 35px;
    width: auto;
  }
}
</style>
