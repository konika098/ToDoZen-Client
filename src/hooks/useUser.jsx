import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { ProviderContext } from "../Provider/Provider";


const useUser = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(ProviderContext)
    const { refetch, data: userData = [] } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data;
        }
    })
    return [userData, refetch]

};

export default useUser;