<template>
  <div>
    <div v-if="notification" v-bind:class="style">
      <div class="message">{{ notification ? notification.message : '' }}</div>
    </div>
    <div v-if="spinner" class="lds-dual-ring" />
  </div>
</template>
<script>
import { sendMessage, receiveMessage } from '@/events/MessageService';
export default {
  name: 'Notification',
  data: function() {
    return {
      spinner: false,
      notification: {
        type: '',
        message: '',
      },
    };
  },
  computed: {
    style: function() {
      return `notification ${this.notification?.type}`;
    },
  },
  created() {
    this.eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'notification') {
        if (!message.signal) {
          this.notification = null;
        } else {
          this.notification = message.data;
          this.spinner = false;

          if (message.data && message.data.duration) {
            setTimeout(() => {
              sendMessage('notification', false);
            }, message.data.duration);
          }
        }
      }

      if (message.name === 'spinner') {
        this.spinner = message.signal;
      }
    });
  },
  beforeDestroy() {
    this.eventBus.unsubscribe();
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
