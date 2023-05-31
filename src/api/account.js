/* eslint-disable */
import httpClient from "./httpClient.js"

const url = 'account'

export const accountApi = {

  async getAll() {
    try {
      const resp = await httpClient.get(`${url}`)
      const data = resp.data.map(item => ({
        id: item.id.toString(),
        username: item.username.split('@')[0],
        password: item.password,
      }))
      return data
    } catch (err) {
      throw err
    }
  },

  async getById (id) {
    try {
      let resp = await httpClient.get(`${url}/${id}`)
      resp = resp.data
      return resp
    } catch (err) {
      throw err
    }
  },

  async create (data) {
    try {
      await httpClient.post(`${url}`, data)
      return
    } catch (err) {
      throw err
    }
  },

  async update (data) {
    const formData = {
      username: data.username
    }
    if (data.password) formData.password = data.password
    try {
      await httpClient.patch(`${url}/${data.id}`, formData)
      return
    } catch (err) {
      throw err
    }
  },

  async del (id) {
    try {
      let resp = await httpClient.delete(`${url}/${id}`)
      return resp
    } catch (err) {
      throw err
    }
  },

}
