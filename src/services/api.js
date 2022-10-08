import axios from 'axios';

const api = axios.create({
    baseURL: 'https://9zr4bxlqmf.execute-api.us-east-1.amazonaws.com/dev/essentialOne/'
});
    
    // Where you would set stuff like your 'Authorization' header, etc ...
api.defaults.headers.common['x-api-key'] = 'zq6pl6e36F7r05EkZQMuB7ExnHKI2BHl7pFlf5bn';
    

export default api;