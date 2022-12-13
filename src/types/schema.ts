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
    RoomPrice: z.string(),
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
        Base64: z.string(),
        Extension: z.string(),
      }),
      z.unknown(),
    ])
  ),
  HotelThumbnail: z.union([z.string(), z.null()]),
});

export type HotelInfo = z.infer<typeof HotelInfoSchema>;
