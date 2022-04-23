import { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import logoWhap from "../public/whatsapp.png";
import Image from "next/image";
import { useRouter } from 'next/router';
import Router from 'next/router';

function StatusCompra() {
  const router=useRouter();
  
  const handleButton = () => {
    Router.push({ pathname: '/'})
  }

  return (<>

    <Header />

        <div style={{height: '40vh'}}></div>

        <div className="status-compra-container">
            <div className="status-compra">
                {router.query.keyword === "success" ? <p className="title-status">Tu compra ha sido procesada con exito!</p> : <p className="title-status">Tu compra ha sido rechazada, por favor intenta nuevamente.</p>}
                <div className="button-accept-status">
                    <button onClick={handleButton}>ACEPTAR</button>
                </div>
            </div>
        </div>

        <div className="container-logoWhap">
          <a href="https://wa.me/543487513839?text=Hola Rosé! Quería hacer una consulta" target="_blank" rel="noopener">
              <Image src={logoWhap} alt="Whap" className='logoWhap' width={80} height={80}/>
          </a>
        </div>
    <Footer/>
    </>
  );
}


export default StatusCompra;