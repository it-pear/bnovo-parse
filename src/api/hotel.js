/* eslint-disable */
import httpClient from "./httpClient.js"

const url = 'hotel'

export const hotelApi = {

  async getHotels () {
    try {
      let resp = await httpClient.get(`${url}`)
      return resp.data
    } catch (err) {
      throw err
    }
  },


}
