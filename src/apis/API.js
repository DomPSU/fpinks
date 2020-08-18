import axios from 'axios';
import { isDevelopment } from '../util/util';

class API {
  constructor() {
    this.instance = axios.create({
      baseURL: isDevelopment() ? 'http://localhost:3001/api' : '/api',
    });
  }
}

export default new API();
