import axios, { AxiosRequestConfig, Method } from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7247/api/',
})

interface Request<T extends Method | undefined> {
  endpoint: string
  method?: T
  data?: T extends 'get' ? undefined : Record<string, unknown>
}

export const request = async<T extends Method | undefined>({
  endpoint,
  method = 'get',
  data
}: Request<T>) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }
  
    if (method !== 'get') config.data = data
  
    const response = await axiosInstance(endpoint, config)
  
    return response.data
  } catch (error){
    return undefined
  }
}