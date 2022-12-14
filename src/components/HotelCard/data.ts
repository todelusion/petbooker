import {
  serviceLists,
  facilitiesLists,
  specialsLists,
} from "../../containers/Filter/data";
// 透過 uuid 套件產生 id 值，並暫時寫死在本機data上

export const Hotels = [
  {
    Id: "2f782934-07a3-4620-8998-5c4c1764769f",
    HotelName: "小室照護",
    HotelPhone: "0950764810",
    HotelAddress: "高雄市前鎮區復興四路10號",
    HotelStartTime: "08:30",
    HotelEndTime: "21:30",
    HotelInfo:
      "寵 hostel，給毛寶貝們最棒的度假體驗，也給主人最放心的安親空間。如果不方便接送毛寶貝，我們有提供毛寶貝接駁服務，且旅館設有24 小時寵物監視器、24 小時駐店人員以便應付任何突發狀況，若您的毛寶貝有社交恐懼或是您擔心寵物與其他寵物的互動空間，我們會幫忙將您毛寶貝的生活空間與其他寵物分開 ，另外旅館配有廣大庭院讓您的毛寶貝自由地奔跑。最後為保障雙方權益我們需要簽署合約，詳細流程請見訂單頁面。",
    HotelPhoto: ["", "", "", "", ""],
    AreaId: "台北市",

    // price 應關聯至 RoomPrice
    price: 1000,

    // 資料表尚缺 HotelScore欄位
    HotelScore: 9.6,

    // FoodTypes 在 Filter資料夾
    // ServicesTypes 在 Filter資料夾
    serviceLists,
    facilitiesLists,
    specialsLists,
    // HotelAccount 前端不能知道
    // HotelPassword 前端不能知道
  },
  {
    Id: "220ce67e-086c-471f-be93-5c19c4447948",
    HotelName: "寵 hostel",
    HotelPhone: "0950764810",
    HotelAddress: "高雄市前鎮區復興四路10號",
    HotelStartTime: "08:30",
    HotelEndTime: "21:30",
    HotelInfo:
      "杜莉德寵物旅館，給毛寶貝們最棒的度假體驗，也給主人最放心的安親空間",
    HotelPhoto: ["", "", "", "", ""],
    AreaId: "台北市",
    price: 500,
    HotelScore: 9.1,
    serviceLists,
    facilitiesLists,
    specialsLists,
  },
];

export const favList = ["寵 hostel", "繽紛旅店"];

export const fakeText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quialias quisquam dolorem atque modi reprehenderit pariatur rem eius,consectetur, placeat nulla dolore ducimus, illo odit porro quaspossimus neque. Aspernatur cum ab quidem, deleniti consecteturvitae perferendis recusandae dolore nobis debitis accusamuscorporis maiores, cumque ducimus delectus nihil repudiandae undeex consequuntur maxime dolor itaque doloribus! Aspernatur errorfugit sequi maxime esse unde et, veritatis vitae enim. Quod, quisoptio! Beatae nulla eius temporibus pariatur impedit accusantiumab est aspernatur distinctio optio eveniet totam suscipit teneturrepudiandae dolorum nemo alias perferendis quaerat asperiores,laudantium officiis mollitia. Consequatur modi natus dolorem quofuga rem obcaecati beatae minima officiis expedita quam, seddolores adipisci quos suscipit tempora consectetur delectus?Architecto consectetur reiciendis, ipsum omnis, repellendus dictaex laboriosam sequi rerum perferendis facilis, quas voluptates!Velit, quos optio soluta iusto corporis aut rem molestias, itaque,temporibus consectetur quia nemo quod nihil nobis. Officia laboreab voluptate commodi repellendus a impedit. Accusamus assumendacorporis, aperiam cum architecto molestiae laudantium consequaturbeatae rerum dolores ipsam cupiditate hic recusandae natusdignissimos culpa deleniti amet nam minus repudiandae cumque! Quiased illum est magnam perspiciatis provident, possimus veritatisfacere, dolor eaque minus atque commodi eos saepe perferendis!";
