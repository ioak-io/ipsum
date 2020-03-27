<template>
  <div></div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'AuthInit',
  computed: {
    ...mapGetters(['getProfile']),
  },
  created() {
    const fromCookies = this.$cookies.get(
      `appnamehere_${this.getProfile.space}`
    );
    if (fromCookies) {
      this.addAuth({ auth: fromCookies });
    }
  },
  methods: {
    ...mapActions(['addAuth']),
  },
};
</script>
