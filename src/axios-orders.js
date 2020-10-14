import axios from 'axios'

// myburger-react-app-d2016:
const instance = axios.create({
  baseURL: 'https://myburger-react-app-d2016.firebaseio.com'
})

export default instance