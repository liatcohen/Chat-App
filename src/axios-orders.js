import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-chat-app-a778f.firebaseio.com/'
});

export default instance;
