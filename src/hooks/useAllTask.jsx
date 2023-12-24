import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { ProviderContext } from "../Provider/Provider";
import { useContext } from "react";


const useAllTask = () => {
    const { user } = useContext(ProviderContext)
    const axiosSecure = useAxiosSecure()
    const { refetch, data: allTask = []} = useQuery({
        queryKey: ['allTask', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/todoList?email=${user?.email}`)
            return res.data
        },
        onSuccess: (data) => {
            console.log('Data fetched successfully:', data);
        },
        onError: (error) => {
            console.error('Error fetching data:', error);
        },
    })
    // console.log(allTask)
    return [allTask, refetch]
};

export default useAllTask;