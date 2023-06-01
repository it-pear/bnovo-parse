/* eslint-disable */
import httpClient from "./httpClient.js"

const url = 'booking'

function buildQueryString(query) {
  let quartList = Object.entries(query).reduce((accumulator, [key, value]) => {
    if (value !== null) {
      return accumulator + `${key}=${value}&`
    }
    return accumulator
  }, '')

  // Удаляем последний символ "&", если он есть
  if (quartList.endsWith("&")) {
    quartList = quartList.slice(0, -1)
  }

  return quartList
}

function buildQueryStringForCount(query) {
  let quartList = Object.entries(query).reduce((accumulator, [key, value]) => {
    if (value !== null && key !== 'lim' && key !== 'off') {
      return accumulator + `${key}=${value}&`
    }
    return accumulator
  }, '')

  // Удаляем последний символ "&", если он есть
  if (quartList.endsWith("&")) {
    quartList = quartList.slice(0, -1)
  }

  return quartList
}

export const bookingApi = {

  async getList(query) {
    const quartList = await buildQueryString(query)
    
    try {
      let resp = await httpClient.get(`${url}?${quartList}`)
      
      let modifiedData = resp.data.map(el => {
        let newEl = { ...el } 
        if (newEl.telegram_status === 'send') {
          newEl.telegram_status = 'Отправлено'
        } else if (newEl.telegram_status === 'stage') {
          newEl.telegram_status = 'Ожидает'
        }
        return newEl
      })
 
      return modifiedData
    } catch (err) {
      throw err
    }
  },

  async getCount (query) {
    const quartList = await buildQueryStringForCount(query)

    try {
      let resp = await httpClient.get(`${url}/count?${quartList}`)
      return resp.data.count
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

}
