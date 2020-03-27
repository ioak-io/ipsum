<template>
  <div class="login">
    <Signup v-if="!isSignin" v-on:toggle="toggle" />
    <Signin v-else v-on:toggle="toggle" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Signin from './Signin.vue';
import Signup from './Signup.vue';
import { sendMessage, receiveMessage } from '@/events/MessageService';
export default {
  name: 'Login',
  components: {
    Signin,
    Signup,
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  data: function() {
    return {
      isSignin: true,
    };
  },
  methods: {
    ...mapActions(['addAuth']),
    toggle() {
      event.preventDefault();
      this.isSignin = !this.isSignin;
    },
    persistSession(authInfo) {
      this.addAuth({
        auth: {
          isAuth: true,
          token: authInfo.token,
          secret: authInfo.secret,
          name: authInfo.name,
          email: authInfo.email,
        },
        cookies: this.$cookies,
      });
    },
  },
  created() {
    if (this.$route.query.signup) {
      this.isSignin = false;
    }
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'user account created') {
        sendMessage('notification', true, {
          type: 'success',
          message: 'Your account has been created. You can login now',
          duration: 3000,
        });
        // this.$router.push(`/${getProfile.space}/listpage`);
      } else if (message.name === 'loggedin') {
        sendMessage('notification', true, {
          message: 'Signed In successfully',
          type: 'success',
          duration: 3000,
        });
        this.persistSession(message.data);
        const path = `/${this.getProfile.space}/listpage`;
        if (this.$route.path !== path) {
          this.$router.push(`/${this.getProfile.space}/listpage`);
        }
      }
    });
  },
};
</script>
<style scoped lang="scss">
@import './Login.scss';
</style>
