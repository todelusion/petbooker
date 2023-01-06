import React, { useContext } from "react";
import HotelCard from "../../../components/HotelCard";
import LoadingScreen from "../../../components/LoadingModal";
import UserAuth from "../../../context/UserAuthContext";
import { useFavoriteList } from "../../../utils/api/user";

interface Props {}

function CustomerFavorite(): JSX.Element {
  const { authToken } = useContext(UserAuth);
  const { data } = useFavoriteList(authToken);
  console.log(data);

  if (data === undefined) return <LoadingScreen />;
  return (
    <div className="max-w-5xl">
      <HotelCard data={data} />
    </div>
  );
}

export default CustomerFavorite;
