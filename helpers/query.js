import axios from "axios";
import { API_URL } from "../constants/index";

export const fetchData = (url, param) =>(onSucess) =>(onError)=> {
  
     axios.get(`${API_URL}${url}/${param}`)
     .then((res)=>{

      onSucess(res.data.data) ;

     }).catch((err)=>{

      onError(err)

     })
     
    
};
export const fetchDataAll = (url) =>(onSucess) =>(onError)=> {
  
  axios.get(`${API_URL}${url}`)
  .then((res)=>{

   onSucess(res.data.data) ;

  }).catch((err)=>{

   onError(err)

  })
  
 
};


export const deleteData = (form) =>(onSucess) =>(onError)=> {
  
  axios.post(`${API_URL}delete/deleteRecord`, form)
   .then((res)=>{

   onSucess(res.data.data) ;

  }).catch((err)=>{

   onError(err)

  })
  
 
};
