export const cmsList = [
  "飼主",
  "寵物名片",
  "房型",
  "入住日期",
  "退房日期",
  "狀態",
  "更動訂單狀態",
];

export const cmsOrder = [
  {
    UserName: "杰倫",
    PedCardId: "A",
    PetName: "Ruby",
    PetPhoto: "",
    RoomId: "經典小貓房 A",
    CheckInDate: "2022/11/07",
    CheckOutDate: "2022/11/09",
    Status: "待入住",
    ReservedListId: "1",
  },
  {
    UserName: "大傑比利",
    PedCardId: "B",
    PetName: "咖哩",
    PetPhoto: "",
    RoomId: "經典小貓房 B",
    CheckInDate: "2022/11/12",
    CheckOutDate: "2022/11/13",
    Status: "待入住",
    ReservedListId: "2",
  },
  {
    UserName: "大傑比利",
    PedCardId: "B",
    PetName: "咖哩",
    PetPhoto: "",
    RoomId: "經典小貓房 B",
    CheckInDate: "2022/11/12",
    CheckOutDate: "2022/11/13",
    Status: "已入住",
    ReservedListId: "3",
  },
  {
    UserName: "大傑比利",
    PedCardId: "B",
    PetName: "咖哩",
    PetPhoto: "",
    RoomId: "經典小貓房 B",
    CheckInDate: "2022/11/12",
    CheckOutDate: "2022/11/13",
    Status: "完成訂單",
    ReservedListId: "4",
  },
  {
    UserName: "大傑比利",
    PedCardId: "B",
    PetName: "咖哩",
    PetPhoto: "",
    RoomId: "經典小貓房 B",
    CheckInDate: "2022/11/12",
    CheckOutDate: "2022/11/13",
    Status: "取消訂單",
    ReservedListId: "5",
  },
];

export type CMSOrder = typeof cmsOrder;

export const user = {
  Petphoto: "",
};
