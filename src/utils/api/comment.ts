/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "..";
import { CommentSchema } from "../../types/schema";
import Header from "./Header";




export const useComment = (id:number,token:string,status:string) => {
  
const header = new Header(token);
return useQuery(
    ["comment"],
    async () => {
     const response = await axios.get(`${baseURL}/user/comment?orderId=${id}`,header);
      return CommentSchema.parse(response.data.result);
    },
    {
      onError: (err) => console.log("useComment錯誤", err),
      enabled:status==='checkOutComment'
    }
  );

}