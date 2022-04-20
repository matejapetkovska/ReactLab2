import axios from "axios";

const instance=axios.create({
    baseURL:'https://reactapp-lab2.herokuapp.com/',
    headers:{
        'Access-Control-Allow-Origin' : '*',
    }
})

export default instance;