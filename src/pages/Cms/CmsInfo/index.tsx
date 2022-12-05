import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../../../components/Button";
import UploadImage from "../../../components/UploadImage";
import CountryList from "../../../containers/SearchBar/CountryList";
import { countySchema } from "../../../types/schema";
import { xml2json, parseXml } from "../../../utils/xml2json";
import Filter from "../../../containers/Filter";

const schema = z.object({
  name: z.string(),
  telphone: z.string().min(8),
  address: z.string(),
  businessHours: z.date(),
  introduction: z.string(),
});
type Schema = z.infer<typeof schema>;

function CmsInfo(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  // const { data: countryData } = useQuery(["country"], async () =>
  //   axios
  //     .get("https://api.nlsc.gov.tw/other/ListCounty")
  //     .then((res) => xml2json(parseXml(res.data), " "))
  //     .catch((err) => err)
  // );
  // let countryList;
  // if (countryData !== undefined) {
  //   countryList = countySchema.parse(JSON.parse(countryData));
  // }
  const formSubmitHandler = handleSubmit((data: Schema) => {
    console.log(data);
    reset();
  });
  // function postImageFile(): void {
  //   console.log("post!");
  // }

  return (
    <div className="w-full">
      <form onSubmit={formSubmitHandler}>
        <input
          className=" border-solid border-black  "
          {...register("name", { required: true })}
        />
        <br />
        {errors.name != null && <span>必填</span>}
        <br />
        <input {...register("telphone", { required: true })} />
        <br />
        {errors.telphone != null && <span>必填</span>}
        <br />
        <input {...register("address", { required: true })} />
        <br />
        {errors.address != null && <span>必填</span>}
        <br />
        <input {...register("businessHours", { required: true })} />
        <br />
        {errors.businessHours != null && <span>必填</span>}
        <br />
        <input {...register("introduction", { required: true })} />
        <br />
        {errors.introduction != null && <span>必填</span>}
        <input type="submit" />
      </form>
      <div className="mt-10 flex ">
        <UploadImage />
      </div>
      <Filter
        horizontal
        closeFood
        closeRoomPrices
        closeService
        className="my-5"
        onChange={(filter) => console.log(filter.PetType)}
      />
      {/* <Button
        className="mt-8"
        text="送出"
        type="Secondary"
        onClick={() => {
          postImageFile;
        }}
      /> */}
    </div>
  );
}

export default CmsInfo;
