import { Outlet } from "react-router-dom";
import PetsImg from '../img/Pets.png'
import Benner from '../img/Benner.png'
import PetCardImg from '../img/PetCardImg.png'
import SearchFiliterImg from '../img/SearchFiliterImg.png'
import Evaluation from '../img/Evaluation.png'
function LandingPage(): JSX.Element {
  const loadingPageInfo = [
    {title:'依寵物需求，打造篩選條件',text:'我們蒐集各飼主的意見後，整理了幾項最常見的寵物需求作為篩選條件，讓您能為毛小孩更快速找到合適的寵物旅館。',img:SearchFiliterImg},
    {title:'為您的寵物，建立第 一張名片',text:'飼主可依照每一隻寵物資訊及需求，製作專屬於牠的寵物名片，選擇寵物名片後，系統會自動帶入其資料協助找尋適合的寵物旅館。訂單完成時，店家同時也會取得這張寵物名片資訊，方便了解該寵物的需求，提早與飼主溝通。',img:PetCardImg},
    {title:'使用者安心度評論機制',text:'當飼主完成退房步驟後，將收到一份寵物旅店安心度問卷，飼主評論的分數會成為我們安心度的排序依據。',img:Evaluation}
  ];
  
  

  return (
    <div className="flex flex-col">
     <header className="h-160 w-full relative ">
    <img src={Benner} alt="BennerImg" className="object-cover w-full h-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full flex flex-col items-center  ">
      <h1 className="text-5.5xl  text-white">一個專為寵物量身打造的訂房平台</h1>
      <button className="bg-second w-40 rounded-3xl ml-8" >
      <img src={PetsImg} alt="PetImg" className="w-10 inline-block"/>
      <h3 className="ml-2 inline-block text-white ">立即註冊試用</h3> 
    </button>
    </div>
     </header>
  <main className="flex flex-col">
    <section>1</section>
    <section>2</section>
    <section>3</section>
  </main>
  <div className="flex flex-col">
  <p className="text-5.5xl">寵物坊城市，只為您與毛小孩著想</p>
  <span>
    <button className= " border-2 border-solid border-primary w-40 rounded-3xl" >了解更多</button>
    <button className="bg-second w-40 rounded-3xl ml-8" >
      <img src={PetsImg} alt="PetImg" className="w-10 inline-block"/>
      <h3 className="ml-2 inline-block text-white ">立即註冊試用</h3> 
    </button>
  </span>
   
    
  </div>
   
  </div>
  );
}
export default LandingPage;
