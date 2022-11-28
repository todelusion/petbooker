export interface IRoom {
  RoomPhoto: string;
  RoomName: string;
  RoomPrice: string;
  RoomInfo: string;
}

export interface IComment {
  UserName: string;
  UserPhoto: string;
  Score: string;
  descript: string;
}

export const Rooms = [
  {
    RoomPhoto: "",
    RoomName: "經典照顧小貓房",
    RoomPrice: "500",
    RoomInfo: "配有貓砂盆、飼料碗、飲水碗各一，簡易的貓跳台。",
  },
  {
    RoomPhoto: "",
    RoomName: "豪華照顧小貓房",
    RoomPrice: "1200",
    RoomInfo:
      "配有貓砂盆、飼料碗、飲水碗各一，以及碩大的貓咪公寓，讓貓咪自由穿梭之間並獲得充足的運動量",
  },
];

export const Comments = [
  {
    UserName: "Sansdy",
    UserPhoto: "",
    Score: "9.6",
    descript: "專業的服務，狗狗都來這邊住宿。",
  },
  {
    UserName: "阿山",
    UserPhoto: "",
    Score: "8.6",
    descript:
      "毛小孩像在自己家一樣舒適自在，闆娘都把客人的寶貝當作自己家的寶貝在照顧，大推！",
  },
  {
    UserName: "俊男",
    UserPhoto: "",
    Score: "8.2",
    descript: "非常貼心的寵物旅館~服務超級棒！空間也寬敞舒適，環境好！",
  },
  {
    UserName: "Sansdy",
    UserPhoto: "",
    Score: "9.6",
    descript: "專業的服務，狗狗都來這邊住宿。",
  },
  {
    UserName: "Sansdy",
    UserPhoto: "",
    Score: "9.6",
    descript: "專業的服務，狗狗都來這邊住宿。",
  },
  {
    UserName: "Sansdy",
    UserPhoto: "",
    Score: "9.6",
    descript: "專業的服務，狗狗都來這邊住宿。",
  },
];
