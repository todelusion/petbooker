import { AnimatePresence, motion } from "framer-motion";
import MotionFade from "../containers/MotionFade";
import type { InitialStatus } from "../hooks/usePending";
import { SuccessPath, ErrorPath, LoadingPath, Loading } from "../img/icons";

interface IPendingModalProps {
  pending: InitialStatus;
}

export default function PendingModal({
  pending,
}: IPendingModalProps): JSX.Element {
  const { status, message } = pending;
  console.log(pending);

  return (
    <div className="pointer-events-none fixed z-20 min-h-screen w-full">
      <AnimatePresence>
        {status === "isLoading" && (
          <MotionFade>
            <div key={status} className="relative">
              <img src={LoadingPath} alt="" className="w-28 " />
              <Loading className=" absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </MotionFade>
        )}
        {status === "isSuccess" && (
          <MotionFade>
            <div key={status} className="relative">
              <img src={SuccessPath} alt="" className="w-28" />
            </div>
          </MotionFade>
        )}
        {status === "isError" && (
          <MotionFade>
            <div key={status} className="relative">
              <img src={ErrorPath} alt="" className="w-28" />
            </div>
          </MotionFade>
        )}
      </AnimatePresence>

      {/* <li
          className={`${
            isSuccess.status ? "show" : "close"
          } absolute left-0 right-0 flex flex-col items-center`}
        >
          <div className="mb-20 -mt-5 h-14 w-20 md:h-20 md:w-32">
            <img src={SuccessPath} alt="success" />
          </div>
          <p className="text-center font-serif text-2xl font-black text-primary">
            {isSuccess.message}
          </p>
        </li>

        <li
          className={`${
            isError.status ? "show" : "close"
          } absolute left-0 right-0 flex flex-col items-center`}
        >
          <div className="mb-20 -mt-5 h-14 w-20 md:h-20 md:w-32">
            <img src={ErrorPath} alt="error" />
          </div>
          <p className="text-center font-serif text-2xl font-black text-primary">
            {isError.message}
          </p>
        </li> */}
    </div>
  );
}
