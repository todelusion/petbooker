import { Outlet } from "react-router-dom";
import PesImg from '../img/Pets.svg'
function LandingPage(): JSX.Element {

  return (
    <div className="display:flex flex-direction:column">
     <header>
    1
     </header>
  <main className="display:flex flex-direction:column">
    <section>1</section>
    <section>2</section>
    <section>3</section>
  </main>
  <div className="display:flex flex-direction:column">
  <p className="text-5xl">寵物坊城市，只為您與毛小孩著想</p>
    <button>了解更多</button>
    <button><img src="{PesImg}" alt="" /> 立即註冊試用</button>
  </div>
   
  </div>
  );
}
export default LandingPage;
