import ReactDOM from "react-dom";

const Backdrop = (): JSX.Element => {
  return (
    <div className=" fixed  z-40 box-border flex  h-full w-full items-center justify-center gap-3 bg-gray-700/30">
      <div className="animation-delay-75 h-5 w-5 animate-loader rounded-full bg-primary shadow-[0px_5px_10px_rgba(0,0,0,0.2)] delay-75"></div>
      <div className="animation-delay-100 h-5 w-5 animate-loader rounded-full bg-second shadow-[0px_5px_10px_rgba(0,0,0,0.2)] delay-75"></div>
      <div className="animation-delay-150 h-5 w-5 animate-loader rounded-full bg-primary shadow-[0px_5px_10px_rgba(0,0,0,0.2)] delay-75"></div>
      <div className="animation-delay-200 h-5 w-5 animate-loader rounded-full bg-second_dark shadow-[0px_5px_10px_rgba(0,0,0,0.2)] delay-75"></div>
    </div>
  );
};

export function LoadingScreen() {
  const backdropRoot = document.getElementById("backdrop-root") as HTMLElement;

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Backdrop />
        </>,
        backdropRoot
      )}
    </>
  );
}
