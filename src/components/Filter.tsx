import React from "react";

interface Props {}

const petTypes = [
  {
    petType: "smallDog",
    descript: "小型犬 ( 體重 < 8 公斤 )",
  },
  {
    petType: "mediumDog",
    descript: "中型犬 ( 體重 8 - 20 公斤 )",
  },
  {
    petType: "largeDog",
    descript: "大型犬 ( 體重 > 20 公斤 )",
  },
  {
    petType: "cat",
    descript: "貓",
  },
];

function Filter({}: Props): JSX.Element {
  return (
    <ul className="w-60 rounded-md border-2 border-black">
      <li className="bg-black py-2 text-center text-xl text-white">
        透過以下分類搜尋
      </li>
      <li className="p-4">
        <p className="font-bold">寵物類型</p>
        <form name="PetType">
          {petTypes.map((pet) => (
            <div className="py-4">
              <label
                key={pet.petType}
                htmlFor={pet.petType}
                className="inline-flex w-full cursor-pointer items-center text-sm"
              >
                <input
                  name="PetType"
                  id={pet.petType}
                  value={pet.petType}
                  onClick={(e) =>
                    console.log((e.target as HTMLInputElement).value)
                  }
                  type="radio"
                  className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-75 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
                />
                <span className="ml-2">{pet.descript}</span>
              </label>
            </div>
          ))}
        </form>
      </li>
    </ul>
  );
}

export default Filter;
