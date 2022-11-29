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
      value: "0, 500",
      descript: "NTD 0 - NTD 500",
    },

    {
      value: "500, 1000",
      descript: "NTD 500 - NTD 1,000",
    },
    {
      value: "1000, 1500",
      descript: "NTD 1,000 - NTD 1,500",
    },
    {
      value: "1500, 2000",
      descript: "NTD 1,500 - NTD 2,000",
    },
    {
      value: "2000",
      descript: "NTD 2,000 以上",
    },
  ],
};

export const serviceLists = [
  {
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
  },
  {
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
  },
  {
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
  },
];
