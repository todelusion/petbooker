import {
  calendarPath,
  fileTextPath,
  HomePath,
  logOutPath,
  messageSquarePath,
  userPath,
} from "../img/icons";

import { memberMenu } from "../components/AccountMenu/data";

export const cmsMenu = [
  {
    logo: HomePath,
    content: "旅館資訊",
    navigatePath: "/cms/info",
  },
  {
    logo: fileTextPath,
    content: "房間列表",
    navigatePath: null,
  },
  {
    logo: calendarPath,
    content: "訂單管理",
    navigatePath: null,
  },
  {
    logo: messageSquarePath,
    content: "查看評價",
    navigatePath: null,
  },
  {
    logo: logOutPath,
    content: "登出",
    navigatePath: null,
  },
];

export { memberMenu };
