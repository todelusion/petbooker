import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import UploadImage from "../../../components/UploadImage";
import CountryList from "../../../containers/SearchBar/CountryList";
import { countySchema } from "../../../types/schema";
import { xml2json, parseXml } from "../../../utils/xml2json";
import Filter from "./Filter";

function CmsInfo(): JSX.Element {
  return (
    <div className="w-full max-w-3xl">
      <Filter />
      <div className="flex ">
        <UploadImage />
      </div>
    </div>
  );
}

export default CmsInfo;
