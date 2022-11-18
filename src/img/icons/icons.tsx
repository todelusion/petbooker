import heartPath from "./Heart.svg";
import logOutPath from "./Log-out.svg";
import messageSquarePath from "./Message-square.svg";
import userPath from "./User.svg";
import fileTextPath from "./File-text.svg";
import creditCardPath from "./Credit-card.svg";
import accountMenuPath from "./Account-Menu.svg";
import PetsPath from "./Pets.svg";
import searchPath from "./Search.svg";
import mapPinPath from "./Map-pin.svg";
import calendarPath from "./Calendar.svg";

export const memberMenu = [
  {
    logo: userPath,
    content: "帳戶資訊",
    navigatePath: null,
  },
  {
    logo: creditCardPath,
    content: "我的寵物名片",
    navigatePath: null,
  },
  {
    logo: fileTextPath,
    content: "查看我的訂單",
    navigatePath: null,
  },
  {
    logo: heartPath,
    content: "收藏店家",
    navigatePath: null,
  },
  {
    logo: messageSquarePath,
    content: "安心評價",
    navigatePath: null,
  },
  {
    logo: logOutPath,
    content: "登出",
    navigatePath: null,
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
    navigatePath: null,
  },
  {
    logo: logOutPath,
    content: "登出",
    navigatePath: null,
  },
];

export {
  heartPath,
  logOutPath,
  messageSquarePath,
  userPath,
  fileTextPath,
  creditCardPath,
  accountMenuPath,
  PetsPath,
  searchPath,
  mapPinPath,
  calendarPath,
};
