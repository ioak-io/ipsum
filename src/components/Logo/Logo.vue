<template>
  <img
    v-if="getProfile.darkmode"
    class="logo"
    v-bind:class="clickable ? 'clickable' : ''"
    v-bind:src="whiteLogo"
    @click="gotoHome"
    alt="ipsum logo"
  />
  <img
    v-else
    class="logo"
    v-bind:class="clickable ? 'clickable' : ''"
    v-bind:src="blackLogo"
    @click="gotoHome"
    alt="ipsum logo"
  />
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Logo',
  props: {
    clickable: Boolean,
  },
  data: function() {
    return {
      blackLogo: require('@/assets/ipsum_black.svg'),
      whiteLogo: require('@/assets/ipsum_white.svg'),
    };
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    gotoHome: function() {
      this.clickable ? this.$router.push('/home') : '';
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  &.logo {
    height: 35px;
    width: auto;
  }
  &.clickable {
    cursor: pointer;
  }
}
</style>
