import { useReducer } from "react";

export const initPet = {
  PetPhoto: "",
  PetPersonality: "",
  PetMedicine: "",
  PetNote: "",
  PetName: "",
  PetType: "",
  PetAge: "",
  PetSex: "",
  FoodTypes: [] as string[],
  ServiceTypes: [] as string[] | [],
};

export type InitPet = typeof initPet;

export type PetAction =
  | {
      type: "Init";
      payload: InitPet;
    }
  | {
      type: "PICK_PET_PHOTO";
      payload: string;
    }
  | {
      type: "PICK_PET_NAME";
      payload: string;
    }
  | {
      type: "PICK_PET_TYPE";
      payload: string;
    }
  | {
      type: "PICK_PET_AGE";
      payload: string;
    }
  | {
      type: "PICK_PET_SEX";
      payload: string;
    }
  | {
      type: "PICK_PET_PRSONALITY";
      payload: string;
    }
  | {
      type: "PICK_PET_MEDICINE";
      payload: string;
    }
  | {
      type: "PICK_PET_NOTE";
      payload: string;
    }
  | {
      type: "PICK_FOODTYPES";
      payload: string[];
    }
  | {
      type: "PICK_SERVICETYPES";
      payload: string[];
    };

export const petReducer = (state: InitPet, action: PetAction): InitPet => {
  switch (action.type) {
    case "PICK_SERVICETYPES":
      return { ...state, ServiceTypes: action.payload };
    case "PICK_FOODTYPES":
      return { ...state, FoodTypes: action.payload };
    case "PICK_PET_AGE":
      return { ...state, PetAge: action.payload };
    case "PICK_PET_MEDICINE":
      return { ...state, PetMedicine: action.payload };
    case "PICK_PET_NAME":
      return { ...state, PetName: action.payload };
    case "PICK_PET_NOTE":
      return { ...state, PetNote: action.payload };
    case "PICK_PET_PRSONALITY":
      return { ...state, PetPersonality: action.payload };
    case "PICK_PET_SEX":
      return { ...state, PetSex: action.payload };
    case "PICK_PET_TYPE":
      return { ...state, PetType: action.payload };
    case "PICK_PET_PHOTO":
      return { ...state, PetPhoto: action.payload };
    case "Init":
      return action.payload;
    default:
      return state;
  }
};
