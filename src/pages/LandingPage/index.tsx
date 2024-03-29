import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import PetsImg from "../../img/Pets.png";
import Benner from "../../img/Benner.png";
import PetCardImg from "../../img/PetCardImg.png";
import SearchFiliterImg from "../../img/SearchFiliterImg.png";
import Evaluation from "../../img/Evaluation.png";
import PetcityIcon from "../../img/PetcityIcon.svg";
import Divider1 from "../../img/Divider1.svg";
import Divider2 from "../../img/Divider2.svg";
import painTitlepeople from "../../img/paintitlepeople.svg";
import ChatBubble2 from "../../img/ChatBubble2.svg";
import ChatBubble3 from "../../img/ChatBubble3.svg";
import ChatBubble1 from "../../img/ChatBubble1.svg";
import "aos/dist/aos.css";

const loadingPageInfoData = [
  {
    title: "依寵物需求，打造篩選條件",
    text: "我們蒐集各飼主的意見後，整理了幾項最常見的寵物需求作為篩選條件，讓您能為毛小孩更快速找到合適的寵物旅館。",
    img: SearchFiliterImg,
  },
  {
    title: "為您的寵物，建立第 一張名片",
    text: "飼主可依照每一隻寵物資訊及需求，製作專屬於牠的寵物名片，選擇寵物名片後，系統會自動帶入其資料協助找尋適合的寵物旅館。訂單完成時，店家同時也會取得這張寵物名片資訊，方便了解該寵物的需求，提早與飼主溝通。",
    img: PetCardImg,
  },
  {
    title: "使用者安心度評論機制",
    text: "當飼主完成退房步驟後，將收到一份寵物旅店安心度問卷，飼主評論的分數會成為我們安心度的排序依據。",
    img: Evaluation,
  },
];

function renderInfoData(index: number): JSX.Element {
  return (
    <section data-aos="fade-up" className="mt-20 flex w-4/5 flex-col ">
      <div className="flex w-full items-center">
        <p className="top-0 float-left mr-8  text-9xl text-primary ">
          {index + 1}
        </p>
        <h2 className="mt-1 text-2xl font-semibold">
          {loadingPageInfoData[index].title}
          <span className="mt-3 block text-base font-normal">
            {loadingPageInfoData[index].text}
          </span>
        </h2>
      </div>
      <img
        src={loadingPageInfoData[index].img}
        alt="infoimg"
        className="mt-16"
      />
    </section>
  );
}

function LandingPage(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <header className=" relative h-160 w-full">
        <img
          src={Benner}
          alt="BennerImg"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/4 flex-col items-center  ">
          <h1 className="text-5.5xl  font-bold text-white">
            一個專為寵物量身打造的訂房平台
          </h1>
          <button
            type="button"
            className="ml-8 mt-8 w-40 rounded-3xl bg-second px-2  py-1.5"
            onClick={() => navigate("/regist")}
          >
            <img src={PetsImg} alt="PetImg" className="y-6 inline-block w-6" />
            <h3 className="ml-4  inline-block text-white ">立即註冊試用</h3>
          </button>
        </div>
      </header>

      <main className="flex max-w-[1176px] flex-col  px-28 ">
        <section className="mt-28 flex  flex-col">
          <div data-aos="zoom-in" className="flex justify-center">
            <img
              src={ChatBubble1}
              alt="Titleimg"
              className=" h-[124px] max-w-[668px]"
            />
          </div>
          <div className="mt-8 flex ">
            <div data-aos="zoom-in" className=" inline-block max-w-[432px]">
              <img src={ChatBubble2} alt="Titleimg" className="h-[124px]" />
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay="100"
              className="mt-8 inline-block max-w-[560px] pl-4"
            >
              <img src={ChatBubble3} alt="Titleimg" />
            </div>
          </div>
          <img src={painTitlepeople} alt="Titleimg" className=" p-8 " />
        </section>

        <section className="mt-80 flex flex-col items-center">
          <img src={PetcityIcon} alt="PetcityIcon" />
          <p className="mt-14 text-4xl font-bold lg:text-5xl">
            我們為提供您能更安心選擇寵物旅館
          </p>
        </section>
        <div className="flex flex-col items-center">
          {renderInfoData(0)}
          <img src={Divider1} alt="brimg" className="mt-24" />
          {renderInfoData(1)}
          <img src={Divider2} alt="brimg" className="mt-24" />
          {renderInfoData(2)}
        </div>
      </main>

      <div className="my-36 flex flex-col items-center">
        <p className="text-4xl font-bold lg:text-5xl">
          寵物坊城市，只為您與毛小孩著想
        </p>

        <span className="mt-8">
          <button
            type="button"
            className="w-40 rounded-3xl border-2 border-solid border-primary py-1.5"
            onClick={() => navigate("/home")}
          >
            了解更多
          </button>
          <button
            type="button"
            className="ml-8 w-40 rounded-3xl bg-second px-2  py-1.5"
            onClick={() => navigate("/regist")}
          >
            <img src={PetsImg} alt="PetImg" className="y-6 inline-block  w-6" />
            <h3 className="ml-1 inline-block text-white ">立即註冊試用</h3>
          </button>
        </span>
      </div>
    </div>
  );
}
export default LandingPage;
