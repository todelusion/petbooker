import React from "react";
import logoWhitePath from "../img/logo-white.svg";
import { Pets2Path } from "../img/icons";

function Footer(): JSX.Element {
  return (
    <footer className="flex-col-center relative bg-primary_A11y pb-20 pt-10 text-white">
      <div className="flex w-1/2 items-center">
        <img src={logoWhitePath} alt="logo" />
        <p className="ml-10">
          寵物坊城市提供您的毛小孩最適合的住宿照顧服務，以最安心的篩選服務，讓飼主放心為宗旨，讓忙於工作或外出的飼主不用擔心毛小孩到陌生環境而緊張。
        </p>
      </div>
      <ul className="absolute bottom-6 flex text-sm">
        <li>© 2022 Pet City, Inc.版權所有</li>
        <li className="px-6">|</li>
        <li>隱私</li>
        <li className="px-6">|</li>
        <li>相關條款</li>
      </ul>
      <img
        src={Pets2Path}
        alt="pets icon"
        className="absolute bottom-9 right-10"
      />
    </footer>
  );
}

export default Footer;
