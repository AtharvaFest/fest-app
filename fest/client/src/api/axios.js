import axios from 'axios'
import { baseURL } from './baseURL';

// axios basic setting
export default axios.create({
    baseURL
});