/*
  Developer : Gauri
*/


export const getRequest1 = (url,type) =>{ 
    return axios.get(url)  
       .then(response => {
                           
             return {
               type:type,
               payload:response.data
             }
         })
       .catch((error) => {
         console.log("error");    
       })
  };