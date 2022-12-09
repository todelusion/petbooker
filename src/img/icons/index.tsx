import heartPath from "./Heart.svg";
import logOutPath from "./Log-out.svg";
import messageSquarePath from "./Message-square.svg";
import userPath from "./User.svg";
import fileTextPath from "./File-text.svg";
import creditCardPath from "./Credit-card.svg";
import accountMenuPath from "./Account-Menu.svg";
import PetsPath from "./Pets.svg";
import searchPath from "./Search.svg";
import mapPinPath from "./Map-pin.svg";
import calendarPath from "./Calendar.svg";
import boxPath from "./Box.svg";
import ClinicPath from "./Clinic.svg";
import EyePath from "./Eye.svg";
import GrassPath from "./Grass.svg";
import HomePath from "./Home.svg";
import ShowerPath from "./Shower.svg";
import CameraPath from "./Camera.svg";
import Pets2Path from "./Pets2.svg";
import SuccessPath from "./Success.svg";
import ErrorPath from "./Error.svg";
import LoadingPath from "./Loading.svg";
import PlusPath from "./Plus.svg";
import UploadRoomPath from "./UploadRoom.svg";
import xPath from "./X.svg";
import MotionFade from "../../containers/MotionFade";
import EditPath from "./Edit.svg";
import TrashPath from "./Trash.svg";

interface ILoadingProps {
  className?: string;
}
interface ILoadingCustomProps {
  className?: string;
  color?: string;
}

export function Loading({ className }: ILoadingProps): JSX.Element {
  return (
    <div className={className}>
      <div className="grid gap-2">
        <div className="flex animate-pulse items-center justify-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-white" />
          <div className="h-3 w-3 rounded-full bg-white" />
          <div className="h-3 w-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

export function LoadingCustom({
  className,
  color,
}: ILoadingCustomProps): JSX.Element {
  return (
    <MotionFade className={className}>
      <div className="grid gap-2">
        <div className="flex an