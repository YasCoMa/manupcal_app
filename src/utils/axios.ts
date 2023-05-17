import axios from 'axios'

/* Desenvolvimento */
//axios.defaults.baseURL = 'https://api-ci-sjb.portalgov.info/api/';
axios.defaults.baseURL = 'http://localhost:8000/api/';

axios.defaults.headers.common['Authorization'] = '' + sessionStorage.getItem("token");

export const axiosConfig = () => {
  axios.interceptors.response.use((config) => config, async (error) => {
    if (error.response.status === 401 ) {
      sessionStorage.removeItem('token');
      location.href='/autenticacao/login';
    }
    return Promise.reject(error);
  })
};
