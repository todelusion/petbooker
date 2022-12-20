import React from "react";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";

interface AskedModalProps {
  onClick: () => void;
}

function AskedModal({ onClick }: AskedModalProps): JSX.Element {
  return (
    <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
      <MotionPopup className="scrollbar-thumb-h-1/2 relative h-[calc(100%-24px)] w-full max-w-4xl overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
        <>
          <p>TEST</p>
          <p>TEST2</p>
        </>
      </MotionPopup>
    </MotionFade>
  );
}

export default AskedModal;
