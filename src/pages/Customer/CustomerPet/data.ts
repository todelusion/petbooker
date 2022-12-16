export const input = {
  PetName: {
    required: true,
    title: "寵物名子",
    name: "PetName",
    labelWidth: "min-w-[5rem]",
    placeholder: "請填寫寵物名字",
    classNames: { p: "font-bold" },
  },
  PetPersonality: {
    name: "PetPersonality",
    title: "個性",
    labelWidth: "min-w-[5rem]",
    className: " mb-4",
    classNames: { p: "text-sm" },
  },
  PetMedicine: {
    title: "服用藥物",
    name: "PetMedicine",
    className: " mb-4",
    labelWidth: "min-w-[5rem]",
    classNames: { p: "text-sm" },
  },
  PetNote: {
    title: "備註",
    name: "PetNote",
    labelWidth: "min-w-[5rem]",
    classNames: { p: "text-sm" },
  },
};

export const filterInput = {
  noContext: true as true,
  required: true as true,
  horizontal: true as true,
  labelWidth: "min-w-[5rem]",
  className: "mb-5",
  classNames: { p: "font-normal text-sm" },
};
