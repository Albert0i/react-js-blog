import axios from 'axios'

export default axios.create({
    // For development environment 
    //baseURL: 'http://localhost:3500'
    // For production environment 
    baseURL: 'https://my-json-server.onrender.com'
})