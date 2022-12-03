import React from "react";
import Button from "../../../components/Button";
import Order from "../../../components/Order";
import { cmsOrder } from "../../../components/Order/data";

function CmsOrder(): JSX.Element {
  return (
    <>
      <nav className="flex">
        <Button type="Transparent" text="待入住" className="py-3 px-6" />
        <Button type="Transparent" text="已入住" className="ml-4 py-3 px-6" />
        <Button type="Transparent" text="完成訂單" className="ml-4 py-3 px-6" />
        <Button type="Transparent" text="取消訂單" className="ml-4 py-3 px-6" />
      </nav>
      <Order data={cmsOrder} />
    </>
  );
}

export default CmsOrder;
