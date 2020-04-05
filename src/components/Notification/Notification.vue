<template>
  <div>
    <div v-if="notificationList.length > 0" class="notification">
      <div
        v-for="notification in notificationList.slice(0, 5).reverse()"
        v-bind:key="notification.id"
      >
        <NotificationMessage
          v-bind:notification="notification"
          @remove="() => removeNotification(notification)"
        />
      </div>
    </div>
    <div v-if="spinner" class="lds-dual-ring" />
  </div>
</template>
<script>
import { receiveMessage } from '@/events/MessageService';
import NotificationMessage from './NotificationMessage.vue';
export default {
  name: 'Notification',
  components: { NotificationMessage },
  data: function() {
    return {
      spinner: false,
      notificationList: [],
    };
  },
  methods: {
    removeNotification(notificationData) {
      this.notificationList = this.notificationList.filter(item => {
        return item.id !== notificationData.id;
      });
    },
    addNotification(notificationData) {
      this.notificationList.unshift(notificationData);
      if (notificationData.duration) {
        setTimeout(() => {
          this.removeNotification(notificationData);
        }, notificationData.duration);
      } else if (!notificationData.id) {
        setTimeout(() => {
          this.removeNotification(notificationData);
        }, 5000);
      }
      // console.log(this.notificationList.splice(0, 100));
    },
  },
  created() {
    this.eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'notification') {
        if (!message.signal) {
          this.removeNotification(message.data);
        } else {
          this.removeNotification(message.data);
          this.addNotification(message.data);
          // this.notification = message.data;
          // this.spinner = false;

          // if (message.data && message.data.duration) {
          //   setTimeout(() => {
          //     sendMessage('notification', false);
          //   }, message.data.duration);
          // }
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
