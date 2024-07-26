import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../Api";
import { useNavigate } from "react-router-dom";

export const useCaching = ({ queryKey, URL, enabled , staleTime , cacheTime}) => {
  const nav = useNavigate()
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const res = await axios.get(`${baseUrl}/${URL}`);
        return {
          data: res.data,
        };
      } catch (error) {
        console.log(`axios error ${error}`);
        nav('*', {replace: true})
      }
  
    },
    enabled,
    staleTime,
    cacheTime,
  });
};
