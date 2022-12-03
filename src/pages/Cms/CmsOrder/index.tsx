import React from "react";
import Button from "../../../components/Button";

function CmsOrder(): JSX.Element {
  return (
    <div className=" w-full">
      <nav className="flex">
        <Button type="Transparent" text="待入住" className="py-3 px-6" />
        <Button type="Transparent" text="已入住" className="ml-4 py-3 px-6" />
        <Button type="Transparent" text="完成訂單" className="ml-4 py-3 px-6" />
        <Button type="Transparent" text="取消訂單" className="ml-4 py-3 px-6" />
      </nav>
      <h2>CmsOrder</h2>
    </div>
  );
}

export default CmsOrder;
