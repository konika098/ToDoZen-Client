import { useContext } from "react";
import { ProviderContext } from "../Provider/Provider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllCompleted = () => {
    const { user } = useContext(ProviderContext)
    const axiosSecure = useAxiosSecure()
    const { refetch: completedRefetch, data: allCompleted = []} = useQuery({
        queryKey: ['allCompleted', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/completedList?email=${user?.email}`)
            return res.data
        },
        onSuccess: (data) => {
            console.log('Data fetched successfully:', data);
        },
        onError: (error) => {
            console.error('Error fetching data:', error);
        },
    })
    // console.log(allCompleted)
    return [allCompleted, completedRefetch]
};

export default useAllCompleted;