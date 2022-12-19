import {
  creditCardPath,
  fileTextPath,
  heartPath,
  logOutPath,
  messageSquarePath,
  userPath,
  accountMenuPath,
} from "../../img/icons";

export { accountMenuPath };

export const customerMenu = [
  {
    logo: userPath,
    content: "帳戶資訊",
    navigatePath: "/customer/info",
  },
  {
    logo: creditCardPath,
    content: "我的寵物名片",
    navigatePath: "/customer/pet",
  },
  {
    logo: fileTextPath,
    content: "查看我的訂單",
    navigatePath:  "/customer/Order",
  },
  {
    logo: heartPath,
    content: "收藏店家",
    navigatePath: null,
  },
  {
    logo: messageSquarePath,
    content: "安心評價",
    navigatePath: '/customer/comment',
  },
  {
    logo: logOutPath,
    content: "登出",
    navigatePath: "/home",
  },
];

export const hotelMemberMenu = [
  {
    logo: userPath,
    content: "帳戶資訊",
    navigatePath: null,
  },
  {
    logo: fileTextPath,
    content: "我的房間管理",
    navigatePath: "/cms",
  },
  {
    logo: logOutPath,
    content: "登出",
    navigatePath: "/home",
  },
];
