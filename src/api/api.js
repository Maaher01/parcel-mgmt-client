import axios from 'axios'

export const baseUrl = axios.create({
  baseURL: 'https://parcel-mgmt-server-vercel.vercel.app/api',
})

baseUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)
