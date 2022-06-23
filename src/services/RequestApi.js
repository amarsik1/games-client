import axios from 'axios';

const REACT_APP_MAIN_HOST = 'https://amarsik-games-node.herokuapp.com/';

const handleError = (error) => {
  throw error.response.data;
};

class RequestService {
  constructor(url) {
    this.url = REACT_APP_MAIN_HOST + url;
  }

  get() {
    return axios
      .get(this.url)
      .then((response) => (response.data.docs || response.data))
      .catch(handleError);
  }

  post(payload) {
    return axios
      .post(this.url, payload)
      .then((response) => (response.data.docs || response.data))
      .catch(handleError);
  }

  put(payload) {
    return axios.put(this.url, payload)
      .then((response) => (response.data.docs || response.data))
      .catch(handleError);
  }

  delete() {
    return axios
      .delete(this.url)
      .then((response) => (response.data.docs || response.data))
      .catch(handleError);
  }
}

export default RequestService;
