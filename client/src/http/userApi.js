import { $host } from './axios';

export const registration = async (email, password, name) => {
   const { data } = await $host.post('api/user/registration', {
      email,
      password,
      name,
   });
   localStorage.setItem('token', data.token);
   return data.token;
};

export const login = async (email, password) => {
   const { data } = await $host.post('api/user/login', { email, password });
   localStorage.setItem('token', data.token);
   return data.token;
};

export const check = async () => {
   const jwt = localStorage.getItem('token');
   return jwt;
};
