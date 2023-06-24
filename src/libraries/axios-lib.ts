import axios, { AxiosRequestConfig, Method } from "axios"

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44341/api/',
})

interface Request {
  url: string
  method?: Method
  data?: unknown
}

export const request = async ({
  url,
  method = 'get',
  data
}: Request) => {
  try {
    const config: AxiosRequestConfig = {
       method,
       headers: {
          'Content-type': 'application/json',
        },
    }
  
    if (method !== 'get') config.data = data
  
    const response = await axiosInstance(url, config)
  
    return response.data
  } catch (error){
    return undefined
  }
}