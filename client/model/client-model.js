import axios from 'axios'
import {createError} from './utils'

const request = axios.create({
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch(err => {
      console.log(err)
    })
  })
}

export default {
  getAllTodos () {
    return handleRequest(request.get('/api/todos'))
  }
}
