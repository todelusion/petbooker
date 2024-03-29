import { z } from "zod";

export const countySchema = z.array(
  z.object({ Id: z.number(), Areas: z.string() })
);

export const PostRoomSchema = z.object({
  RoomName: z.string(),
  PetType: z.string(),
  RoomPrice: z.string(),
  RoomInfo: z.string(),
});

export const GETRoomListSchema = z.object({
  Status: z.boolean(),
  roomList: z.array(
    z.object({
      Id: z.number(),
      RoomPhoto: z.string(),
      RoomName: z.string(),
      PetType: z.string(),
      RoomPrice: z.string(),
      RoomInfo: z.string(),
      HotelId: z.null(),
    })
  ),
});

export const RoomListSchema = z.array(
  z.object({
    Id: z.number(),
    IsOrders: z.string(),
    RoomPhoto: z.string(),
    RoomName: z.string(),
    PetType: z.string(),
    RoomPrice: z.number(),
    RoomInfo: z.string(),
    HotelId: z.undefined(),
  })
);
export const HotelListSchema = z.object({
  hotelInfo: z.array(
    z
      .object({
        RoomLowPrice: z.union([z.number(), z.null()]),
        HotelId: z.number(),
        HotelName: z.string(),
        HotelPhoto: z.string(),
        HotelScore: z.union([z.number(), z.string()]),
        HotelInfo: z.string(),
      })
      .optional()
  ),
  Totalpage: z.number(),
  Nowpage: z.number(),
});

export const HotelSchema = z.object({
  Hotel: z.array(
    z.object({
      HotelId: z.number(),
      HotelPhoto: z.array(z.string()),
      HotelScore: z.number(),
      HotelName: z.string(),
      HotelAddress: z.string(),
      HotelPhone: z.string(),
      HotelStartTime: z.string(),
      HotelEndTime: z.string(),
      HotelInfo: z.string(),
      HotelService: z.array(z.string()),
      HotelComment: z.array(
        z.object({
          UserName: z.union([z.null(), z.string()]),
          UserPhoto: z.union([z.null(), z.string()]),
          Score: z.union([z.number(), z.null()]),
          Comment: z.union([z.null(), z.string()]),
        })
      ),
      Room: z.array(
        z.object({
          Id: z.number(),
          RoomPhoto: z.string(),
          RoomName: z.string(),
          PetType: z.string(),
          RoomPrice: z.number(),
          RoomInfo: z.string(),
        })
      ),
    })
  ),
});

export const FilterSchema = z.object({
  AreaId: z.number(),
  PetType: z.string(),
  FoodTypes: z.array(z.union([z.null(), z.string()])),
  ServiceTypes: z.array(z.union([z.null(), z.string()])),
  CheckInDate: z.string(),
  CheckOutDate: z.string(),
  PriceRange: z.array(z.union([z.null(), z.string()])),
  Page: z.number(),
  PageSize: z.number(),
});

export const UserInfoSchema = z.object({
  UserAccount: z.string(),
  UserName: z.string(),
  UserPhone: z.union([z.null(), z.string()]),
});

export const BookingSchema = z.object({
  PetCardId: z.number(),
  RoomId: z.number(),
  CheckInDate: z.string(),
  CheckOutDate: z.string(),
  TotalNight: z.number(),
  TotalPrice: z.number(),
  UserName: z.string().min(1, { message: "必須輸入飼主名稱" }),
  UserPhone: z.string().min(1, { message: "必須輸入飼主電話" }),
  Status: z.string(),
});

export const PetCardSchema = z.object({
  Id: z.number().optional(),
  PetPhoto: z.union([z.null(), z.string()]).optional(),
  PetName: z.string().min(1, { message: "寵物姓名不得為空" }),
  PetType: z.string().min(1, { message: "寵物類型不得為空" }),
  PetAge: z.string().min(1, { message: "寵物年齡不得為空" }),
  PetSex: z.string().min(1, { message: "寵物性別不得為空" }),
  FoodTypes: z.array(z.string()).min(1, { message: "寵物飲食偏好不得為空" }),
  PetPersonality: z.string().optional(),
  PetMedicine: z.string().optional(),
  PetNote: z.string().optional(),

  /* 
  1. 需向後端反應同時具 ServiceTypes 與 ServiceType 兩種 key 卻相同value
  2. 否則前端schema 過不了

  */
  ServiceTypes: z.array(z.string()),
});

export const PetSchema = z.object({
  PetName: z.union([
    z.null(),
    z.string({ required_error: "寵物姓名不得為空" }),
  ]),
  PetType: z.union([
    z.null(),
    z.string({ required_error: "寵物姓名不得為空" }),
  ]),
  PetAge: z.union([z.null(), z.string({ required_error: "寵物姓名不得為空" })]),
  PetSex: z.union([z.null(), z.string({ required_error: "寵物姓名不得為空" })]),
  FoodTypes: z.array(
    z.union([z.null(), z.string({ required_error: "寵物姓名不得為空" })])
  ),
  PetPersonality: z.string().optional(),
  PetMedicine: z.union([z.null(), z.string()]),
  PetNote: z.union([z.null(), z.string()]),
  // ServiceTypes: z.union([z.array(z.union([z.null(), z.string()])), z.null()]),
  ServiceTypes: z.union([z.array(z.string()), z.null()]),
  PetPhoto: z.union([z.null(), z.string()]),
});

export const postPetResSchema = z.object({
  status: z.string(),
  message: z.string(),
  petid: z.number(),
});

export const PetListSchema = z.array(
  z.object({
    IsOrders: z.enum(["沒訂單", "有訂單"]),
    PetCardId: z.number(),
    PetPhoto: z.string(),
    PetName: z.string().min(1, { message: "寵物姓名不得為空" }),
    PetType: z.string().min(1, { message: "寵物類型不得為空" }),
    PetAge: z.string().min(1, { message: "寵物年齡不得為空" }),
    PetSex: z.string().min(1, { message: "寵物性別不得為空" }),
    FoodTypes: z.array(z.string()).min(1, { message: "寵物飲食偏好不得為空" }),
    PetPersonality: z.union([z.string(), z.null()]),
    PetMedicine: z.union([z.string(), z.null()]),
    PetNote: z.union([z.string(), z.null()]),
    ServiceTypes: z.union([z.array(z.string()), z.null()]),
  })
);

export type Pet = z.infer<typeof PetSchema>;

export type PetList = z.infer<typeof PetListSchema>;

export type PetCard = z.infer<typeof PetCardSchema>;

export type Booking = z.infer<typeof BookingSchema>;

export type UserInfo = z.infer<typeof UserInfoSchema>;

export type Hotel = z.infer<typeof HotelSchema>;

export type CountyList = z.infer<typeof countySchema>;

export type POSTRoom = z.infer<typeof PostRoomSchema>;

export type TGETRoomListSchema = z.infer<typeof GETRoomListSchema>;

export type RoomList = z.infer<typeof RoomListSchema>;
export type Room = RoomList[0];

export type HorelList = z.infer<typeof HotelListSchema>;
export type Filter = z.infer<typeof FilterSchema>;

export const HotelInfoSchema = z.object({
  HotelName: z.string(),
  HotelPhone: z.union([z.string(), z.null()]),
  HotelArea: z.union([z.number(), z.null()]),
  HotelAddress: z.union([z.string(), z.null()]),
  HotelStartTime: z.union([z.string(), z.null()]),
  HotelEndTime: z.union([z.string(), z.null()]),
  HotelInfo: z.union([z.string(), z.null()]),
  FoodTypes: z.union([z.array(z.string()), z.null()]),
  ServiceTypes: z.union([z.array(z.string()), z.null()]),
  HotelPhotos: z.array(
    z.union([
      z.object({
        ImageId: z.number(),
        ImageUrl: z.string(),
        Base64: z.string(),
        Extension: z.string(),
      }),
      z.null(),
    ])
  ),
  HotelThumbnail: z.union([z.string(), z.null()]),
});

export type HotelInfo = z.infer<typeof HotelInfoSchema>;
// export type HotelPhotos = z.infer<typeof HotelInfoSchema["HotelPhotos"]>

export const OrderListSchema = z.array(
  z.object({
    Id: z.number(),
    UserName: z.string(),
    PetCardId: z.number(),
    PetPhoto: z.string(),
    PetName: z.string(),
    RoomName: z.string(),
    checkInDateOnly: z.string(),
    checkOutDateOnly: z.string(),
    Status: z.string(),
  })
);
export type ReservedList = z.infer<typeof OrderListSchema>;
export const CommentSchema = z.object({
  Score: z.number(),
  Comment: z.string(),
});
export type Comment = z.infer<typeof CommentSchema>;
export const customerOrderListSchema = z.array(
  z.object({
    OrderId: z.number(),
    RoomPhoto: z.string(),
    HotelName: z.string(),
    RoomName: z.string(),
    CheckInDate: z.string(),
    CheckOutDate: z.string(),
    Status: z.string(),
    TotalPrice: z.number(),
    PetCardId: z.number(),
    PetPhoto: z.union([z.null(), z.string()]),
    PetName: z.string(),
  })
);
export type customerOrder = z.infer<typeof customerOrderListSchema>;

export const customerInfoSchema = z.object({
  UserPhoto: z.union([z.null(), z.string()]),
  UserAccount: z.string(),
  UserName: z.string(),
  UserPhone: z.union([z.null(), z.string()]),
  UserAddress: z.union([z.null(), z.string()]),
});
export type customerInfo = z.infer<typeof customerInfoSchema>;

export const CmsCommentListSchema = z.array(
  z.object({
    Id: z.number(),
    RoomName: z.string(),
    checkInDateOnly: z.string(),
    checkOutDateOnly: z.string(),
    UserName: z.string(),
    UserThumbnail: z.string(),
    Comment: z.string(),
    Score: z.number(),
  })
);
export type CmsCommentList = z.infer<typeof CmsCommentListSchema>;
