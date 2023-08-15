import axios from 'axios' // for fetch or access api

export const base_url = "http://localhost:8080/api/"

export const request = (method,url,body) => { 
    return axios({
        method : method,
        url : base_url + url,
        data : body
    }).then(res=>{
        return res
    }).catch(error=>{
        return error
    })
}