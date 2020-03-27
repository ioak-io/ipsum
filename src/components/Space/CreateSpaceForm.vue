<template>
  <div class="create-space-form">
    <OakText
      id="name"
      label="Space Name"
      v-bind:data="space.name"
      v-on:change="handleChange"
    />
    <OakText
      id="adminEmail"
      label="Administrator Email"
      v-bind:data="space.adminEmail"
      v-on:change="handleChange"
    />
    <OakText
      id="adminPassword"
      label="Administrator Password"
      type="password"
      v-bind:data="space.adminPassword"
      v-on:change="handleChange"
    />
    <OakText
      id="repeatAdminPassword"
      label="Repeat Administrator Password"
      type="password"
      v-bind:data="space.repeatAdminPassword"
      v-on:change="handleChange"
    />
    <OakButton
      label="Create Space"
      v-on:click="submitForm"
      theme="primary"
      variant="animate in"
    />
  </div>
</template>
<script>
import OakText from '@/oakui/OakText.vue';
import OakButton from '@/oakui/OakButton.vue';
import { isEmptyOrSpaces } from '@/Utils';
import { preSignup, createSpace } from '@/components/Auth/AuthService';
import { sendMessage } from '@/events/MessageService';

export default {
  name: 'CreateSpaceForm',
  data: function() {
    return {
      space: {
        name: '',
        adminEmail: '',
        adminPassword: '',
        repeatAdminPassword: '',
      },
    };
  },
  components: {
    OakText,
    OakButton,
  },
  methods: {
    handleChange() {
      this.space[event.target.name] = event.target.value;
    },
    submitForm() {
      sendMessage('spinner');
      // clearError();

      if (!this.validate()) {
        return;
      }

      preSignup({ name: this.space.name }).then(response => {
        if (response.status === 200) {
          this.createSpaceAction(response.data);
        }
      });
    },
    createSpaceAction(preSignupData) {
      createSpace({
        spaceName: this.space.name,
        email: this.space.adminEmail,
        password: this.space.adminPassword,
        solution: preSignupData.solution,
        salt: preSignupData.salt,
      })
        .then(response => {
          if (response.status === 200) {
            sendMessage('notification', true, {
              type: 'success',
              message: 'Space has been created. You can proceed now',
              duration: 3000,
            });
            this.$emit('created', this.space.name);
          } else {
            sendMessage('notification', true, {
              message: 'We are facing some problem, please try after sometime',
              duration: 3000,
            });
          }
        })
        .catch(error => {
          sendMessage('notification', true, {
            type: 'failure',
            message: 'Unknown error. Please try again or at a later time',
            duration: 3000,
          });
        });
    },
    validate() {
      if (isEmptyOrSpaces(this.space.name)) {
        // setError('name');
        sendMessage('notification', true, {
          type: 'failure',
          message: 'Space name cannot be empty',
          duration: 3000,
        });
        return false;
      }
      if (
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          this.space.adminEmail
        )
      ) {
        // setError('email');
        sendMessage('notification', true, {
          type: 'failure',
          message: 'Email ID is invalid',
          duration: 3000,
        });
        return false;
      }

      if (isEmptyOrSpaces(this.space.adminPassword)) {
        // setError('password');
        sendMessage('notification', true, {
          type: 'failure',
          message: 'Password cannot be empty',
          duration: 3000,
        });
        return false;
      }

      if (this.space.adminPassword !== this.space.repeatAdminPassword) {
        // setError('repeatPassword');
        sendMessage('notification', true, {
          type: 'failure',
          message: 'Password and repeat password should be same',
          duration: 3000,
        });
        return false;
      }

      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.create-space-form {
}
</style>
