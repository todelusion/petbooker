import React, { useState } from "react";
// import { boolean } from "zod";
import Alerttriangle from '../../img/icons/Icon/Alert-triangle.svg'
import Alertvector from '../../img/icons/Icon/Alert-vector.svg'
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
  const [alertMessage,setAlertMessage]=useState<string>();
  const { inputType, name, id, inputPlaceHolder, title, inputValueHandler,inputValue } =
    props;
 
  function validInput():void{ 
    if(inputValue[name]!==undefined &&name!=='userName'&&name!=='confirmPassword'){
    const result =Regex[name].regex.test(inputValue[name])
    setIsValid(result) 
    if(!result){
      setAlertMessage(Regex[name].message)
    }
    }
  }
  function handleBlur ():void{
    validInput()
  }
  
  return (
    <div>
    <label className="mb-2 mt-4 relative flex flex-col text-base " htmlFor={id}>
      {title}
      <input
        onBlur={handleBlur}
        onChange={inputValueHandler}
        type={inputType}
        name={name}
        id={id}
        autoComplete="on"
        placeholder={inputPlaceHolder}
        className="z-10 mt-2 h-10  rounded  border border-solid border-black py-2.5 pr-10 pl-2"
      />
    {/* 判斷是否inputValue為空物件 */}
    {Object.keys(inputValue).length===0
    ?null
    :
    <img src={(isValid ?? false)?Alertvector:Alerttriangle} alt="alertIcon" className=
    {`${ isValid===undefined ?'hidden':'block'} w-6 h-6 absolute right-[9.5px] bottom-[10px] z-20`} />
    } 
    </label>
    <span className="text-red-500">
      {isValid===undefined||isValid?null:alertMessage}
    </span>
    </div>
  );
}

export default Input;
