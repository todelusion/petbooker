import React, { useState } from "react";
// import { boolean } from "zod";
import alertIcon from '../../img/icons/Icon/Alert-triangle.svg'
import Regex from "./data";

interface Props {
  title: string;
  inputType: string;
  name: string;
  id: string;
  inputPlaceHolder: string | undefined;
  inputValueHandler: (e: React.FormEvent) => void;
  inputValue:{[index:string]:string}
}

function Input(props: Props): JSX.Element {
  const [isValid,setIsValid]=useState<boolean>();
  const { inputType, name, id, inputPlaceHolder, title, inputValueHandler,inputValue } =
    props;
 
  
  function validInput():void{ 
    if(inputValue[name]!==undefined &&name!=='userName'&&name!=='confirmPassword'){
    const result =Regex[name].regex.test(inputValue[name])
    
    setIsValid(result) 
    }
    
  }


  function handleBlur ():void{
    validInput()
  }
  

  return (
    
    <div className=" relative ">
      {/* 判斷是否inputValue為空物件 */}
    
    {Object.keys(inputValue).length===0
    ?''
    :<img src={alertIcon} alt="alertIcon" className=
    {`${isValid===true || isValid===undefined ?'hidden':'block'} absolute right-[9.5px] bottom-[15px] z-20`} />
    } 
    
    <label className="mb-2 mt-4 flex flex-col text-base " htmlFor={id}>
      {title}
      <input
        onBlur={handleBlur}
        onChange={inputValueHandler}
        type={inputType}
        name={name}
        id={id}
        autoComplete="on"
        placeholder={inputPlaceHolder}
        className="z-10  mt-2 h-10 relative rounded  border border-solid border-black p-2"

      />
    </label>
    {/* <div>{validInput(inputValue,name)==='true'?'':Regex[name].message}</div> */}
    </div>
  );
}

export default Input;
