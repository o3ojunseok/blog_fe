import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    id: null,
    user_email: null,
    user_name: null,
    access_token: null,
    refresh_token: null,
  }
});

export const authenticatedUserState = atom({
  key: 'authenticatedUserState',
  default: {
    id: 0,
    user_email: '',
    user_name: '',
  }, 
});

export const loginCheck = atom({
  key: 'loginCheck',
  default: {
    user: {
      id: null,
      user_email: null,
      user_name: null,
      access_token: null,
      refresh_token: null,
    },
    userList: 0,
    login: null,
  }
})
