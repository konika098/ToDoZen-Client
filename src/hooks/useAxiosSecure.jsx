import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/Provider";
import { useContext } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://todo-list-server-eight.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut, loading } = useContext(ProviderContext)
    // request interceptor to add authorization header for every secure call to the API 
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    // intercepts 401 and 403  status
    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            await logOut();
            navigate('/login')
          }
          return Promise.reject(error)
        }
      )

    return axiosSecure
};

export default useAxiosSecure;