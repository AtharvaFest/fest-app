import axios from 'axios'

// axios basic setting
export default axios.create({
    baseURL: 'http://127.0.0.1:4000'
});