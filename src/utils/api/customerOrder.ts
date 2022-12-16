/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "..";
import { customerOrderListSchema } from "../../types/schema";
import Header from "./Header";




export const useCostomerOrder = (token:string) =>{ 
  
  const header = new Header(token);

  return useQueries({
    
    queries:[
      {
        queryKey:['completeList'],
        queryFn: async () => {
          const response = await axios.get(`${baseURL}/user/completeList`, header);
        return customerOrderListSchema.parse(response.data.result);
      }
      },
       {
        queryKey:['cancel'],
        queryFn: async () => {
          const response = await axios.get(`${baseURL}/user/cancelList`, header);
        return customerOrderListSchema.parse(response.data.result)
      },
    
      }
      ,
       {
        queryKey:['reserved'],
        queryFn: async () => {
          const response = await axios.get(`${baseURL}/user/reservedList`, header);
        return customerOrderListSchema.parse(response.data.result);
      }
      },
   
      
    ]})
  }
