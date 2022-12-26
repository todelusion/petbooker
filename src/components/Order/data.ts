export const cmsList = [
  "飼主",
  "寵物名片",
  "房型",
  "入住日期",
  "退房日期",
  "狀態",
  "更動訂單狀態",
];
export const customerList = [
  "房型照片",
  "旅館名稱",
  "房型",
  "入住日期",
  "退房日期",
  "訂單價格",
  "寵物名片",
  "狀態",
  ];


  export const commentList = [
    "房型照片",
    "旅館名稱",
    "房型",
    "入住日期",
    "退房日期",
    "狀態",
    "評論內容",
   
    ];

interface ItranslateState{
  [key: string]:string
};
interface IbuttonText{
  [key: string]:string
};

export  const translateState:ItranslateState={
  cancel:"已取消",
  checkOut:"已完成",
  checkIn:"已入住",
  reserved:"已預約",
  checkOutComment:"完成評論"
  
}
export  const buttonText:IbuttonText={
  cancel:"已取消",
  checkOut:"已完成",
  checkIn:"確認退房",
  reserved:"確認入住"
}
export const user = {
  Petphoto: "",
};
