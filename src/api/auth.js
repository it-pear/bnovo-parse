/* eslint-disable */
import httpClient from "./httpClient.js"

const url = 'account'

export const authApi = {

  async doLogin (data) {
    try {
      let resp = await httpClient.post(`${url}`, data)
      resp = resp.data.data
      return resp
    } catch (err) {
      throw err
    }
  },

}
