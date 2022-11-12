import heartPath from "./Heart.svg";
import logOutPath from "./Log-out.svg";
import messageSquarePath from "./Message-square.svg";
import userPath from "./User.svg";
import fileTextPath from "./File-text.svg";
import creditCardPath from "./Credit-card.svg";
import accountMenuPath from "./Account-Menu.svg";

export const memberMenu = [
  {
    logo: userPath,
    content: "帳戶資訊",
    navigate: null,
  },
  {
    logo: creditCardPath,
    content: "我的寵物名片",
    navigate: null,
  },
  {
    logo: fileTextPath,
    content: "查看我的訂單",
    navigate: null,
  },
  {
    logo: heartPath,
    content: "收藏店家",
    navigate: null,
  },
  {
    logo: messageSquarePath,
    content: "安心評價",
    navigate: null,
  },
  {
    logo: logOutPath,
    content: "登出",
    navigate: null,
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
};
