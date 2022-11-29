import React, { useMemo, useState ,createContext, SetStateAction} from "react"

interface UserAuthProps{
  children: JSX.Element;
}
const UserAuth=createContext({
  authToken:'',
  identity:'',
  setAuthToken:(()=>{}) as React.Dispatch<SetStateAction<string>>,
  setIdentity:(()=>{}) as React.Dispatch<SetStateAction<string>>

})

export default UserAuth

export function UserAuthContetxt ({children}:UserAuthProps):JSX.Element{
  const [authToken,setAuthToken]=useState('321')
  const [identity,setIdentity]=useState('')
  const value =useMemo(()=>({
    authToken,
    setAuthToken,
    identity,
    setIdentity}),[authToken,identity])
    
   return (
    <UserAuth.Provider value={value}>
      {children}
    </UserAuth.Provider>
  );
};