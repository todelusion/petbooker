import { z } from "zod";

export const countySchema = z.array(
  z.object({ Id: z.number(), Areas: z.string() })
);

export type CountyList = z.infer<typeof countySchema>;

export const POSTRoomSchema = z.object({
  RoomName: z.string(),
  PetType: z.string(),
  RoomPrice: z.string(),
  RoomInfo: z.string(),
});
export type TPostRoomSchema = z.infer<typeof POSTRoomSchema>;

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
