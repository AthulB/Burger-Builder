import axios from 'axios';

const instance = axios.create({
    baseURL : "https://react-my-burger-dd80d.firebaseio.com/"
});

export default instance;