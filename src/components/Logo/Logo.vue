<template>
  <img
    v-if="getProfile.darkmode"
    class="logo"
    v-bind:src="whiteLogo"
    alt="ipsum logo"
  />
  <img v-else class="logo" v-bind:src="blackLogo" alt="ipsum logo" />
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Logo',
  data: function() {
    return {
      blackLogo: require('@/assets/ipsum_black.svg'),
      whiteLogo: require('@/assets/ipsum_white.svg'),
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
