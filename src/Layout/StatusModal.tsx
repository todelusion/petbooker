import { AnimatePresence, motion } from "framer-motion";
import MotionFade from "../containers/MotionFade";
import useModal from "../hooks/useModal";
import type { InitialPending } from "../hooks/usePending";
import { SuccessPath, ErrorPath, LoadingPath, Loading } from "../img/icons";

interface IPendingModalProps {
  children: JSX.Element;
}

export default function PendingModal({
  children,
}: IPendingModalProps): JSX.Element {
  const { dispatchPending, pending } = useModal();
  const { status, message } = pending;

  return (
    <>
      <div
        role="button"
        onClick={() => dispatchPending({ type: "DONE" })}
        onKeyUp={() => dispatchPending({ type: "DONE" })}
        tabIndex={0}
        className={`fixed z-20 min-h-screen w-full ${
          status === "DONE" ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <AnimatePresence>
          {status === "IS_LOADING" && (
            <MotionFade className="flex-center absolute min-h-full w-full bg-slate-900/50">
              <div key={status} className="relative -mt-4">
                <img src={LoadingPath} alt="" className="w-28 " />
                <Loading className=" absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </MotionFade>
          )}
          {status === "IS_SUCCESS" && (
            <MotionFade className="flex-center absolute min-h-full w-full bg-slate-900/50">
              <div
                key={status}
                className="relative flex min-h-[150px] min-w-[200px] grow-0 flex-col items-center justify-between"
              >
                <img src={SuccessPath} alt="" className="w-28" />
                <p className="text-white">{message}</p>
              </div>
            </MotionFade>
          )}
          {status === "IS_ERROR" && (
            <MotionFade className="flex-center absolute min-h-full w-full bg-slate-900/50">
              <div
                key={status}
                className="relative flex min-h-[150px] min-w-[200px] grow-0 flex-col items-center justify-between"
              >
                <img src={ErrorPath} alt="" className="mb-3 w-28" />
                <p className="text-white">{message}</p>
              </div>
            </MotionFade>
          )}
        </AnimatePresence>
      </div>
      {children}
    </>
  );
}
