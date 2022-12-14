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
    RoomPhoto: z.string(),
    RoomName: z.string(),
    PetType: z.string(),
    RoomPrice: z.number(),
    RoomInfo: z.string(),
    HotelId: z.null(),
  })
);
export const HotelListSchema = z.object({
  Data: z.array(
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
      HotelInfo: z.string(),
      HotelService: z.array(z.string()),
      HotelComment: z.array(
        z.object({
          UserName: z.union([z.null(), z.string()]),
          UserPhoto: z.union([z.null(), z.string()]),
          Score: z.number(),
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

export const PostBookSchema = z.object({
  PetCardId: z.number(),
  RoomId: z.number(),
  OrderedDate: z.string(),
  CheckInDate: z.string(),
  CheckOutDate: z.string(),
  TotalNight: z.number(),
  TotalPrice: z.number(),
  UserName: z.string(),
  UserPhone: z.string(),
  Status: z.string(),
});

export type PostBook = z.infer<typeof PostBookSchema>;

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
      RoomName: z.string(),
      CheckInDate: z.string(),
      CheckOutDate: z.string(),
      Status: z.string()
    })
  )
  export type ReservedList = z.infer<typeof OrderListSchema>;