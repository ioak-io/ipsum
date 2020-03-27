<template>
  <div class="container">
    <form method="GET" v-on:submit="signup" noValidate>
      <h1>Sign Up</h1>
      <div class="form">
        <OakText
          label="Name"
          id="name"
          v-bind:data="name"
          v-on:change="handleChange"
        />
        <OakText
          label="E-mail"
          id="email"
          v-bind:data="email"
          v-on:change="handleChange"
        />
        <OakText
          label="Password"
          type="password"
          id="password"
          v-bind:data="password"
          v-on:change="handleChange"
        />
        <OakText
          label="Repeat Password"
          type="password"
          id="repeatpassword"
          v-bind:data="repeatPassword"
          v-on:change="handleChange"
        />
      </div>
      <br />
      <OakButton
        theme="primary"
        variant="block"
        v-on:click="signup"
        label="Create Account"
      />
      <br />
      <br />
      Already have an account?
      <OakButton
        theme="secondary"
        variant="block"
        v-on:click="$emit('toggle')"
        label="Sign In"
      />
    </form>
  </div>
</template>
<script>
import OakButton from '@/oakui/OakButton.vue';
import OakText from '@/oakui/OakText.vue';
import { sendMessage, receiveMessage } from '@/events/MessageService';
import { mapGetters, mapActions } from 'vuex';
import { signinAction, signupAction } from './LoginService';
export default {
  name: 'Signup',
  components: {
    OakText,
    OakButton,
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  data: function() {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    };
  },
  methods: {
    handleChange() {
      this[event.target.name] = event.target.value;
    },
    signup() {
      event.preventDefault();
      signupAction({
        space: this.getProfile.space,
        name: this.name,
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
