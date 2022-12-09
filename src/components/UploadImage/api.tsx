import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import UserAuth from "../../context/UserAuthContext";


const {authToken}=useContext(UserAuth)
const fetchHotelInfo =async()=>{
  const res =await axios.get("https://petcity.rocket-coding.com/hotel?Authorization", {
      headers: {
        Authorization:
          `Bearer ${authToken}`,
      }})
      console.log(res);
      
    
    }

const api = (): JSX.Element => {
  const{isLoading,data} = useQuery(['Info'],fetchHotelInfo)
   if (isLoading) {
     return <h2>Loading</h2>;
   }

  return (
  <h1>123</h1>
  {data?.map((item,index)=>{
    return <div key={}></div>
  })})
};

export default api;
