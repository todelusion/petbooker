  const InputRegex:{[index:string]:{regex:RegExp,message?:string}} ={
    email:{
      regex:/^\w+((-\w+)|(.\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z]+$/,
      
    },
    phoneNumber:{
      regex:/^09[0-9]{8}$/,
      message:'手機請以09開頭，市話請在區域碼後加入 - ex:07-123456'
    },
    telNumber:{
      regex:/0\d{1,2}-\d{6,8}/,
   
      message:'手機請以09開頭，市話請在區域碼後加入 - ex:07-123456'
    },
    password:{
      regex:/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
    
      message:'請輸入 8 位以上英數字元，且包含各一個大小寫英文的密碼'
    }
  }
  export default InputRegex