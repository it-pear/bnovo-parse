import axios from "axios"

function logOut () {
  localStorage.clear()
  window.location.href = '/login'
  location.reload()
}

const config = {
  baseURL: "http://45.12.237.254:4000/api"
}

const httpClient = axios.create(config)
const token = JSON.parse(localStorage.getItem('token'))

if (token) {
  httpClient.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`
      return config
    }
  )
  httpClient.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    const err = error.response.status
    const originalRequest = error.config
    if (originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      if (err === 401) {
        console.log('Неавторизован')
        logOut()
      }
      if (err === 403) {
        console.log('Нет доступа')
        logOut()
      }
      if (err === 404) {
        console.log('Не найдено')
      }
    }
    return Promise.reject(error)
  })
}

export default httpClient
