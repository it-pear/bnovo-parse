/* eslint-disable */
import httpClient from "./httpClient.js"

const url = 'account'

export const accountApi = {

  async getAll () {
    try {
      let resp = await httpClient.get(`${url}`)
      resp = resp.data.data
      return resp
    } catch (err) {
      throw err
    }
  },

  async getById (id) {
    try {
      let resp = await httpClient.get(`${url}/${id}`)
      resp = resp.data.data
      return resp
    } catch (err) {
      throw err
    }
  },

  async create (data) {
    try {
      let resp = await httpClient.post(`${url}`, data)
      resp = resp.data.data
      return resp
    } catch (err) {
      throw err
    }
  },

  async update (id, data) {
    try {
      let resp = await httpClient.patch(`${url}${id}`, data)
      resp = resp.data.data
      return resp
    } catch (err) {
      throw err
    }
  },

  async del (id) {
    try {
      let resp = await httpClient.delete(`${url}/${id}`)
      resp = resp.data.data
      return resp
    } catch (err) {
      throw err
    }
  },

}
