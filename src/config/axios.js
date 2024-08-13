const md5 = require('md5');
import axios from 'axios';

const publicKey = '7c33953d201504a4020411ae724db775';
const privateKey = '666c85f0f7e5badc92bacf5995cde1db3a269b66';
const ts = new Date().getTime();

const hash = md5(ts + privateKey + publicKey);

const axiosRequestConfig = {
  baseURL: `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
};

export const axiosInstance = axios.create(axiosRequestConfig);
