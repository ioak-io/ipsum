import { receiveMessage, sendMessage } from '@/events/MessageService';
import { preSignin, preSignup, signin, signup } from './AuthService';

function success(data: any) {
  // props.addAuth({
  //   isAuth: true,
  //   token: token,
  //   secret: secret,
  //   name: name,
  // });
  sendMessage('loggedin', true, data);
  // console.log($cookie);
  // props.cookies.set('isAuth', true);
  // props.cookies.set('token', token);
  // props.cookies.set('secret', secret);
  // props.cookies.set('name', name);
  // props.cookies.set('email', email);
  // props.history.push('/');
  // console.log(data);
}

export function signinAction({ space, email, password }: any) {
  sendMessage('notification', false);
  sendMessage('spinner');
  if (email && password) {
    preSignin({
      name: space,
      email: email,
    }).then((response: any) => {
      if (response.status === 200) {
        signin(
          {
            name: space,
            email: email,
            password: password,
          },
          response.data
        )
          .then((response: any) => {
            if (response.status === 200) {
              success(response.data);
            } else if (response.status === 401) {
              sendMessage('notification', true, {
                message: 'Incorrect passphrase',
                type: 'failure',
                duration: 3000,
              });
            } else {
              sendMessage('notification', true, {
                message:
                  'Unknown response from server. Please try again or at a later time',
                type: 'failure',
                duration: 3000,
              });
            }
          })
          .catch((error: any) => {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Unknown error. Please try again or at a later time',
              duration: 3000,
            });
          });
      } else if (response.status === 404) {
        sendMessage('notification', true, {
          message: 'User name does not exist',
          type: 'failure',
          duration: 3000,
        });
      }
    });
  } else {
    sendMessage('notification', true, {
      type: 'failure',
      message: 'Username/password cannot be empty',
      duration: 3000,
    });
  }
}

export function signupAction({ space, name, email, password }: any) {
  sendMessage('notification', false);
  sendMessage('spinner');
  if (name && password && email) {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Email ID is invalid',
        duration: 3000,
      });
      return;
    }
    preSignup({ name: space }).then((response: any) => {
      if (response.status === 200) {
        signup({
          spaceName: space,
          email: email,
          password: password,
          solution: response.data.solution,
          salt: response.data.salt,
        })
          .then(function(status) {
            if (status === 200) {
              sendMessage('user account created');
            }
          })
          .catch(error => {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Unknown error. Please try again or at a later time',
              duration: 3000,
            });
          });
      }
    });
  } else if (!name) {
    sendMessage('notification', true, {
      type: 'failure',
      message: 'Name cannot be empty',
      duration: 3000,
    });
  } else if (!email) {
    sendMessage('notification', true, {
      type: 'failure',
      message: 'Email cannot be empty',
      duration: 3000,
    });
  } else if (!password) {
    sendMessage('notification', true, {
      type: 'failure',
      message: 'Password cannot be empty',
      duration: 3000,
    });
  }
}
