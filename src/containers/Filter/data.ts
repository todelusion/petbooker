import {
  fileTextPath,
  ShowerPath,
  PetsPath,
  EyePath,
  userPath,
  CameraPath,
  ClinicPath,
  GrassPath,
  boxPath,
  HomePath,
} from "../../img/icons";

// filter資料有順序關係，因此需要使用陣列定義資料結構

export const petLists = {
  keyname: "PetType",
  title: "寵物類型",
  type: "radio",
  contents: [
    {
      value: "smallDog",
      descript: "小型犬 ( 體重 < 8 公斤 )",
    },
    {
      value: "mediumDog",
      descript: "中型犬 ( 體重 8 - 20 公斤 )",
    },
    {
      value: "largeDog",
      descript: "大型犬 ( 體重 > 20 公斤 )",
    },
    {
      value: "cat",
      descript: "貓",
    },
  ],
};

export const foodLists = {
  keyname: "FoodTypes",
  title: "飲食偏好",
  type: "checkbox",
  contents: [
    {
      value: "wetFood",
      descript: "濕食",
    },
    {
      value: "freshFood",
      descript: "鮮食",
    },
    {
      value: "dryFood",
      descript: "乾食",
    },
    {
      value: "myOwnFood",
      descript: "自行攜帶",
    },
  ],
};

export const pricesLists = {
  keyname: "RoomPrices",
  title: "房型價位",
  type: "checkbox",
  contents: [
    {
      value: "0",
      descript: "NTD 0 - NTD 499",
    },

    {
      value: "1",
      descript: "NTD 500 - NTD 999",
    },
    {
      value: "2",
      descript: "NTD 1,000 - NTD 1,499",
    },
    {
      value: "3",
      descript: "NTD 1,500 - NTD 1,999",
    },
    {
      value: "4",
      descript: "NTD 2,000 以上",
    },
  ],
};

export const serviceLists = {
  keyname: "services",
  title: "服務內容",
  type: "checkbox",
  contents: [
    {
      value: "contract",
      descript: "簽署合約",
      logo: fileTextPath,
    },
    {
      value: "shower",
      descript: "洗澡服務",
      logo: ShowerPath,
    },
    {
      value: "walkdog",
      descript: "遛狗服務",
      logo: PetsPath,
    },
    {
      value: "pickup",
      descript: "接送服務",
      logo: HomePath,
    },
  ],
};

export const facilitiesLists = {
  keyname: "facilities",
  title: "設施條件",
  type: "checkbox",
  contents: [
    {
      value: "24hrMonitor",
      descript: "24小時寵物監視器",
      logo: EyePath,
    },
    {
      value: "24hrClerk",
      descript: "24小時人員駐店",
      logo: userPath,
    },
    {
      value: "hospital",
      descript: "與醫療院所配合",
      logo: ClinicPath,
    },
  ],
};

export const specialsLists = {
  keyname: "specials",
  title: "特殊需求",
  type: "checkbox",
  contents: [
    {
      value: "lifeRecord",
      descript: "提供寵物生活紀錄",
      logo: CameraPath,
    },
    {
      value: "independentZone",
      descript: "生活空間與其他寵物分開",
      logo: boxPath,
    },
    {
      value: "yard",
      descript: "廣大庭院",
      logo: GrassPath,
    },
  ],
};

export const commentRadio = {
  keyname: "Score",
  title: "評價分數",
  type: "radio",
  contents: [
  { value: "1", descript: "1" },
  { value: "2", descript: "2" },
  { value: "3", descript: "3" },
  { value: "4", descript: "4" },
  { value: "5", descript: "5" },
  { value: "6", descript: "6" },
  { value: "7", descript: "7" },
  { value: "8", descript: "8" },
  { value: "9", descript: "9" },
  { value: "10", descript: "10" },
    
    
  ],
};