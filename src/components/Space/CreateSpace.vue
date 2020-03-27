<template>
  <div class="create-space boxed">
    <CreateSpaceForm v-if="!isSpaceCreated" v-on:created="created" />
    <SpaceCreationSuccess v-else v-bind:name="spaceName" />
  </div>
</template>
<script>
import CreateSpaceForm from './CreateSpaceForm.vue';
import SpaceCreationSuccess from './SpaceCreationSuccess';
export default {
  name: 'CreateSpace',
  data: function() {
    return {
      spaceName: '',
      isSpaceCreated: false,
    };
  },
  components: {
    CreateSpaceForm,
    SpaceCreationSuccess,
  },
  methods: {
    created(spaceName) {
      this.isSpaceCreated = true;
      this.spaceName = spaceName;
    },
  },
};
</script>
<style lang="scss" scoped>
.create-space {
  // background: url('../../assets/space_creation.jpg') no-repeat center center;
}
</style>
