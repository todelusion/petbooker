import React, { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/Button";
import MotionFade from "../../../containers/MotionFade";
import { RoomList, Room } from "../../../types/schema";
import { EditPath, TrashPath } from "../../../img/icons";
import { deleteRoom } from "../../../utils/api/hotel";

import UserAuth from "../../../context/UserAuthContext";
import { asser