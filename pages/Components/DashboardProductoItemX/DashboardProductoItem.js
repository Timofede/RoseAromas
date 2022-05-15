import { useState } from 'react';
import { addStorage, removeProduct } from '../../../firebaseX/Firebase';
import Image from "next/image";
import loading from "../../A-imgs/loading_apple_wordpress.webp"
import DashboardProductoInput from '../DashboardProductoInputX/DashboardProductoInput';



export default function DashboardProductoItem ({producto,setReload, reload}) {
    const [disp,setDisp]=useState("none");
    const [cargando,setCargando] = useState(true);



    const changeImagen = (e)=>{
        if(e.target.files[0].type==="image/png"){
            setCargando(true);
            addStorage(producto.Nombre,"productos",e.target.files[0]).then(res => {
                editPropProduct(producto.id,"imagen",res).then(res=>{
                    setReload(!reload);
                    setCargando(false);
                })
            })
        }
    }


    const handleRemoveProduct = () => {
        setCargando(true)
        removeProduct(producto.id).then(res => {
            setReload(!reload);
        })
    }

    return (
        <>
            {producto === undefined ? <></> :
            <div className="dash-prod-item-container">
                <div className="dash-prod-item">
                    <div className='img-dash-prod-item dash-prod-item-box'>
                        {
                            cargando?
                                <div style={{backgroundColor:"#dee6e6",width:"100%"}}>
                                  <Image src={loading} alt="loading" width={50} height={50} style={{backgroundColor:"transparent"}}/>
                                </div>
                            :
                            <>
                                <Image src={producto.Img} alt={"imagen-del-producto"} width={200} height={200}/>
                                <p>(245x320)</p>
                                <input
                                    type="file"
                                    name="img"
                                    id="img"
                                    accept="image/png"
                                    onChangeCapture={(e) => {changeImagen(e)}}
                                />
                            </>
                        }
                        
                    </div>

                    <div className='dash-prod-item-box'>
                        
                        <DashboardProductoInput tipo={"nombre"} title={"Nombre"} producto={producto} />
                        <DashboardProductoInput tipo={"descripcion"} title={"Descripcion"} producto={producto} />

                    </div>

                    <div className='dash-prod-item-box'>
                    <DashboardProductoInput tipo={"categoria"} title={"Categoria"} producto={producto} />
                    <DashboardProductoInput tipo={"precio"} title={"Precio"} producto={producto} />
                    <DashboardProductoInput tipo={"stock"} title={"Stock"} producto={producto} />

                    </div>
                    
                    <div className='dash-prod-item-box delete-item-box'>
                        <button onClick={()=> setDisp("block")}>ELIMINAR PRODUCTO</button>
                    </div>
                </div>
            </div>
            
            }

            <div className='fondo-block' style={{display:disp, zIndex:'5'}}>
                <div className='confirm-cancel-info'>
                    <p className='button-borrar-order' onClick={()=>{handleRemoveProduct(),setDisp("none")}}>Confirmar</p>
                    <p className='button-borrar-order' onClick={()=>{setDisp("none")}}>Cancelar</p>
                </div>
            </div>

        </>
        
)
}