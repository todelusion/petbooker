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
  HotelName:z.string(),
  HotelPhone:z.union([z.string(),z.null()]) ,
  HotelArea: z.union([z.number(),z.null()]),
  HotelAddress: z.union([z.string(),z.null()]),
  HotelStartTime: z.union([z.string(),z.null()]),
  HotelEndTime: z.union([z.string(),z.null()]),
  HotelInfo: z.union([z.string(),z.null()]),
  FoodTypes:  z.union([z.array(z.string()),z.null()]),
  ServiceTypes:z.union([z.array(z.string()),z.null()]),
  HotelPhotos: z.array(
    z.union( [z.object({
      ImageId: z.number(),
      Base64: z.string(),
      Extension: z.string()
    }),z.unknown()])
   
  ),
  HotelThumbnail:z.union([z.string(),z.null()])
 })

export type HotelInfo = z.infer<typeof HotelInfoSchema>;
