<template>
  <div>
    <div className="typography-3 space-bottom-4">
      Space {{ name }} has been setup and is available now
    </div>
    <OakButton
      theme="primary"
      variant="animate out"
      v-on:click="gotoTenantPage"
      label="Visit my space"
    />
  </div>
</template>
<script>
import OakButton from '@/oakui/OakButton.vue';
export default {
  name: 'SpaceCreationSuccess',
  props: {
    name: String,
  },
  components: {
    OakButton,
  },
  methods: {
    gotoTenantPage() {
      this.$router.push(`/${this.name}/board`);
    },
  },
};
</script>
