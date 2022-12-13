import React from "react";
import { useParams } from "react-router-dom";

function CustomerBook(): JSX.Element {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="flex-center pt-32">
      <div className="w-full max-w-5xl">
        <h2 className="mb-4 text-center text-4xl font-bold">預約資料確認</h2>
        <p className=" mb-4 text-2xl font-bold text-gray-400">寵物名片</p>
        <section className="mb-4 flex h-72 rounded-sm border-2 p-6">
          <div className=" basis-2/12 border-2" />
          <div className=" basis-4/12 border-2" />
          <div className=" basis-6/12 border-2" />
        </section>
        <p className=" text-2xl font-bold text-gray-400">預約資訊</p>
      </div>
    </div>
  );
}

export default CustomerBook;
