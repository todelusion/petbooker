import { z } from "zod";

export const countySchema = z.array(
  z.object({ Id: z.number(), Areas: z.string() })
);

export type CountyList = z.infer<typeof countySchema>;

export const PostRoomSchema = z.object({
  RoomName: z.string(),
  PetType: z.string(),
  RoomPrice: z.string(),
  RoomInfo: z.string(),
});
export type POSTRoom = z.infer<typeof PostRoomSchema>;

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
export type TGETRoomListSchema = z.infer<typeof GETRoomListSchema>;

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
export type RoomList = z.infer<typeof RoomListSchema>;
export type Room = RoomList[0];

export const HotelInfoSchema = z.object({
  result: z.object({
    HotelName: z.string(),
    HotelPhone: z.string(),
    HotelArea: z.string(),
    HotelAddress: z.string(),
    HotelStartTime: z.string(),
    HotelEndTime: z.string(),
    HotelInfo: z.string(),
    FoodTypes: z.array(z.string()),
    ServiceTypes: z.array(z.string()),
    HotelPhotos: z.array(z.string()),
    HotelThumbnail: z.string(),
  }),
});
export type HotelInfo = z.infer<typeof HotelInfoSchema>;
