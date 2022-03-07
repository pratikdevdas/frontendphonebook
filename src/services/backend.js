import axios from 'axios'
const baseUrl = '/api/persons'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(`${baseUrl}`)
  console.log(request)
  return request.then(response => response.data).catch(error => console.log(error))
}

const getSingle = () => {

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(`${baseUrl}/check`, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, updatedPerson) => {
  const config = {
    headers: { Authorization: token },
  }
  const req2 = axios.put(`${baseUrl}/${id}`, updatedPerson, config)
  return req2.then(response => response.data)
}

const remove = id => {
  const config = {
    headers: { Authorization: token },
  }

  const deleted = axios.delete(`${baseUrl}/${id}`,config)
  return deleted.then(() => console.log('sucess')).catch(() => console.log('different user'))
}

export default {
  getAll,
  getSingle,
  create,
  remove,
  update,
  setToken
}