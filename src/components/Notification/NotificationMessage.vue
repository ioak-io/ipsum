<template>
  <div class="message" v-bind:class="notification.type">
    <div
      class="message-icon"
      v-if="notification.type === 'running'"
      v-bind:class="notification.type === 'running' ? 'running' : ''"
    >
      <i class="material-icons">rotate_right</i>
    </div>
    <div class="message-icon" v-if="notification.type === 'success'">
      <i class="material-icons">check_circle_outline</i>
    </div>
    <div class="message-icon" v-if="notification.type === 'warning'">
      <i class="material-icons">warning</i>
    </div>
    <div class="message-icon" v-if="notification.type === 'failure'">
      <i class="material-icons">error_outline</i>
    </div>
    <div class="message-text">
      {{ notification ? notification.message : '' }}
    </div>
    <div class="message-action">
      <i class="material-icons" @click="$emit('remove')">clear</i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotificationMessage',
  props: {
    notification: Object,
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
