import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "..";
import { OrderListSchema } from "../../types/schema";
import Header from "./Header";



 const useOrderList = (token: string) => {
  const header = new Header(token);

  return useQueries({
    
    queries:[
      {
        queryKey:['reserved'],
        queryFn: async () => {
          const response = await axios.get(`${baseURL}/hotel/reservedList`, header);
        return OrderListSchema.parse(response.data.result);
      }
      },
       {
        queryKey:['checkIn'],
        queryFn: async () => {
          const response = await axios.get(`${baseURL}/hotel/checkInList`, header);
        return OrderListSchema.parse(response.data.result)
      },
    
      }
      ,
       {
        queryKey:['checkOut'],
        queryFn: async () => {
          const response = await axios.get(`${baseURL}/hotel/checkOutList`, header);
        return OrderListSchema.parse(response.data.result);
      }
      },
       {
        queryKey:['cancel'],
        queryFn: async () => {
          const response = await axios.get(`${baseURL}/hotel/cancelList`, header);
        return OrderListSchema.parse(response.data.result);
      }
      },
      
    ]}
  
  );
};
export default useOrderList