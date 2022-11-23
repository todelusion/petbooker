import React from "react";
import alertIcon from '../img/icons/Icon/Alert-triangle.svg'


interface Props {
  title: string;
  inputType: string;
  name: string;
  id: string;
  inputPlaceHolder: string | undefined;
  inputValueHandler: (e: React.FormEvent) => void;
  inputValue:{}
}

function Input(props: Props): JSX.Element {
  const { inputType, name, id, inputPlaceHolder, title, inputValueHandler,inputValue } =
    props;
  const InputRegex ={
    email:{
      regex:/^\w+((-\w+)|(.\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z]+$/,
      validatedStatus:false,
    },
    phoneNumber:{
      regex:/^09[0-9]{8}$/,
      validatedStatus:false,
      message:'手機請以09開頭，市話請在區域碼後加入 - ex:07-123456'
    },
    telNumber:{
      regex:/0\d{1,2}-\d{6,8}/,
      validatedStatus:false,
      message:'手機請以09開頭，市話請在區域碼後加入 - ex:07-123456'
    },
    password:{
      regex:/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
      validatedStatus:false,
      message:'請輸入 8 位以上英數字元，且包含各一個大小寫英文的密碼'
    }
  }
  
  function validInput(inputValue:{}):boolean{    
    // console.log(inputValue,InputRegex)
    return Object.keys(inputValue).length ===0
  }
  

  return (
    
    <div className=" relative ">
      {/* <div>{validInput(inputValue)?'true':'false'}</div> */}
      <img src={alertIcon} alt="alertIcon" className=" absolute right-[9.5px] bottom-[15px] z-20" />
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

    </div>
  );
}

export default Input;
