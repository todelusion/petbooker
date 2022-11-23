import React from "react";
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
  const { inputType, name, id, inputPlaceHolder, title, inputValueHandler,inputValue } =
    props;
 
  
  function validInput(InputValue:{[index:string]:string},InputName:string):boolean{ 
    console.log(Regex[InputName].regex.test(InputValue[InputName]));
    
   return !!Regex[InputName].regex.test(InputValue[InputName])
   
  }
  

  return (
    
    <div className=" relative ">
     
      <img src={alertIcon} alt="alertIcon" className={`${validInput(inputValue,name)==='true'?'hidden':'block'} absolute right-[9.5px] bottom-[15px] z-20`} />
    <label className="mb-2 mt-4 flex flex-col text-base " htmlFor={id}>
      {title}
      <input
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
