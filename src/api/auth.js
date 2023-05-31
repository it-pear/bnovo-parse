/* eslint-disable */
import httpClient from "./httpClient.js"

// const url = 'account'

export const authApi = {

  async doLogin (data) {
    try {
      const resp = await httpClient.post(`login`, data)
      localStorage.setItem('token', JSON.stringify(resp.data.token))
      // return resp.data.data
    } catch (err) {
      throw err
    }
  },

  async doLogout () {
    try {
      localStorage.removeItem('token')
    } catch (err) {
      throw err
    }
  }

}
