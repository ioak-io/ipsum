<template>
  <div class="container">
    <form method="GET" v-on:submit="signin" noValidate>
      <h1>Sign In</h1>
      <div class="form">
        <OakText
          label="E-mail"
          id="email"
          :v-bind:email="email"
          v-on:change="handleChange"
        />
        <OakText
          label="Password"
          type="password"
          id="password"
          :v-bind:data="password"
          v-on:change="handleChange"
        />
      </div>
      <br />
      <OakButton
        variant="animate out"
        theme="primary"
        v-on:click="signin"
        label="Sign In"
      />
      <br />
      <br />
      Don&apos;t have an account?
      <OakButton
        theme="default"
        variant="animate in"
        small
        v-on:click="$emit('toggle')"
        label="Sign Up"
      />
    </form>
    <br />
    <!-- <OakButton
            theme="default"
            variant="animate in"
            small
            v-on:click="sentEmailWithCode"
            label="Forgot password ?"
        /> -->
  </div>
</template>
<script>
import OakButton from '@/oakui/OakButton.vue';
import OakText from '@/oakui/OakText.vue';
import { sendMessage, receiveMessage } from '@/events/MessageService';
import { mapGetters, mapActions } from 'vuex';
import { signinAction } from './LoginService';
export default {
  name: 'Signin',
  components: {
    OakText,
    OakButton,
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  data: function() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleChange() {
      this[event.target.name] = event.target.value;
    },
    signin() {
      event.preventDefault();
      signinAction({
        space: this.getProfile.space,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import './Login.scss';
</style>
