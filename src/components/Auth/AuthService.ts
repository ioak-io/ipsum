import sjcl from 'ioak-sjcl';
import CryptoJS from 'crypto-js';
import { httpGet, httpPost, httpPut } from '../Lib/RestTemplate';
import constants from '../Constants';

function encrypt(password: string, message: string, salt: string) {
  const config = {
    cipher: 'aes',
    iter: '12000',
    ks: 256,
    salt: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(salt)),
  };
  return sjcl.encrypt(password, message, config);
}

function decrypt(password: string, ciphertext: string) {
  return sjcl.decrypt(password, ciphertext);
}

export function preSignup(data: any) {
  return httpGet(constants.API_URL + data.name + constants.API_KEYS, null).then(
    function(response) {
      return Promise.resolve(response);
    }
  );
}

export function signup(data: any) {
  console.log(data);
  return httpPost(
    constants.API_URL + data.spaceName + constants.API_SIGNUP,
    {
      email: data.email,
      problem: encrypt(data.password, data.solution, data.salt),
      solution: data.solution,
      roles: [],
    },
    null
  ).then(function(response) {
    return Promise.resolve(response.status);
  });
}

export function createSpace(data: any) {
  const formData = new FormData();
  formData.append('spaceName', data.spaceName);
  formData.append('email', data.email);
  formData.append('problem', encrypt(data.password, data.solution, data.salt));
  formData.append('solution', data.solution);
  return httpPost(constants.API_URL_SPACE_CREATE, formData, {
    'Content-Type': 'multipart/form-data',
  }).then(function(response) {
    return Promise.resolve(response);
  });
}

export function preSignin(data: any) {
  return httpGet(
    `${constants.API_URL + data.name + constants.API_KEYS}/${data.email}`,
    null
  )
    .then(response => Promise.resolve(response))
    .catch(error => Promise.resolve(error.response));
}

export function signin(data: any, problem: string) {
  try {
    const solution = decrypt(data.password, JSON.stringify(problem));
    return httpPost(
      constants.API_URL + data.name + constants.API_SIGNIN,
      {
        email: data.email,
        solution,
      },
      null
    ).then(function(response) {
      return Promise.resolve(response);
    });
  } catch (error) {
    if (error.message === "ccm: tag doesn't match") {
      return Promise.resolve({
        status: 401,
      });
    }
    return Promise.resolve(error);
  }
}

export function sentPasswordChangeEmail(data: any, type: string) {
  return httpPost(constants.API_URL_CODE, data, null).then(function(response) {
    return Promise.resolve(response.status);
  });
}

export function resetPassword(data: any, type: string) {
  return httpGet(constants.API_URL_PRESIGNUP, null).then(function(response) {
    if (response.status === 200) {
      let newData = {};
      if (type && type === 'password') {
        newData = {
          problem: encrypt(
            data.password,
            response.data.solution,
            response.data.salt
          ),
          solution: response.data.solution,
          resetCode: data.resetCode,
        };
      }

      return httpPost(constants.API_URL_RESET, newData, null).then(function(
        response
      ) {
        return Promise.resolve(response.status);
      });
    }
  });
}
