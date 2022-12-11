import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import UserAuth from "../../context/UserAuthContext";
import { HotelInfoSchema,HotelInfo } from"../../types/schema"



const fetchHotelInfo =async(url:string,token:string)=>{
 return useQuery(["Info"], async () => {
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return HotelInfoSchema.parse(response.data.result);
});}

export default fetchHotelInfo
