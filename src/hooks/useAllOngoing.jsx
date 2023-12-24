import { useContext } from "react";
import { ProviderContext } from "../Provider/Provider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAllOngoing = () => {
    const { user } = useContext(ProviderContext)
    const axiosSecure = useAxiosSecure()
    const { refetch: ongoingRefetch, data: allOngoing = []} = useQuery({
        queryKey: ['allOngoing', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ongoingList?email=${user?.email}`)
            return res.data
        },
        onSuccess: (data) => {
            console.log('Data fetched successfully:', data);
        },
        onError: (error) => {
            console.error('Error fetching data:', error);
        },
    })
    // console.log(allOngoing)
    return [allOngoing, ongoingRefetch]
};

export default useAllOngoing;