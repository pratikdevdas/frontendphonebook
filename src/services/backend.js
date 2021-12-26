import axios from 'axios'
const baseUrl = '/api/persons'

let token = null

const setToken = newToken =>{
    token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject =>{
  const config = {
    headers: {Authorization: token},
  }

const response = await axios.post(baseUrl, newObject, config)
return response.data
}

const update = (id, updatedPerson) => {
  const req2 = axios.put(`${baseUrl}/${id}`, updatedPerson)
   return req2.then(response => response.data)
};


const remove = id => { 
  return axios.delete(`${baseUrl}/${id}`);
 }


export default { 
   getAll, 
  create,
  remove,
  update,
  setToken
}