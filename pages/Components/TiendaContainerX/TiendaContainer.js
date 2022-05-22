import { useEffect, useState } from 'react';
import CardProducto from '../CardProductoX/CardProducto'
import Image from "next/image";
import { getProductos } from '../../../firebaseX/Firebase';
import loading from "../../A-imgs/loading_apple_wordpress.webp"


export default function TiendaContainer ({itemType, setItemType, setShowNotification,setShowNotification2}) {

    const [productos, setProductos] = useState([]);
    const [totalProductos, setTotalProductos] = useState(0);
    const [cargando,setCargando]=useState(false)
    const [mostrarMas,setMostrarMas]=useState(12)

    useEffect(() => {
        setItemType(itemType)
        setMostrarMas(12)
        getProductos(itemType,mostrarMas).then(res => {
            setProductos(res);
            
        }).catch(err => console.log(err))
        
        getProductos(itemType,10000).then(res => {
            setTotalProductos(res.length);
            
        }).catch(err => console.log(err))
    }, [itemType]);// eslint-disable-line react-hooks/exhaustive-deps


    const cargarMasProductos=()=>{
        setCargando(true)
        getProductos(itemType,mostrarMas+4).then(res => {
          setTimeout(()=>{
            setMostrarMas(mostrarMas+5)
            setProductos(res);
            setCargando(false)
          },1000)
        }).catch(err => console.log(err))
      }

    return (
        <div className="tienda-container">
            <div className="title-container">
                {itemType===undefined?<p>Todo</p>:<h1>{itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h1>}
            </div>

            <div className="tienda">

                {itemType === "Todo" 
                ? productos.map(producto => <CardProducto producto={producto} setShowNotification={setShowNotification} setShowNotification2={setShowNotification2} key={producto.id}></CardProducto>) 
                :  productos.filter(prod => prod.Categoria === itemType).map(producto => <CardProducto producto={producto} setShowNotification={setShowNotification} setShowNotification2={setShowNotification2} key={producto.id}></CardProducto>)}
            
            </div>
            
            {totalProductos>mostrarMas?
                <>
                {cargando?
                    <div className="cargarMas loading">
                        <Image src={loading} alt="loading" width={50} height={50}/>
                    </div>
                    :
                    <div className="cargarMas">
                        <p onClick={()=>{cargarMasProductos()}}>CARGAR MÁS</p>
                    </div> 
                } 
                </>:<></>
            }
        </div>
    )
}