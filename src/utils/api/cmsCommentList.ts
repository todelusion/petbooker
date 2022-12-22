/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "..";
import { CmsCommentListSchema } from "../../types/schema";
import Header from "./Header";




export const useCmsCommentList = (token:string) => {
  
const header = new Header(token);
return useQuery(
    ["cmsCommentList"],
    async () => {
     const response = await axios.get(`${baseURL}/hotel/commentList`,header);
      return CmsCommentListSchema.parse(response.data.result);
    },
 
  );

}