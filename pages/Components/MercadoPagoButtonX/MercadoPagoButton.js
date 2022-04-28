import {useContext, useState} from 'react';
import {UseCartContext} from '../../../Context/CartContext';
import Router,{ useRouter } from 'next/router';
import Loader from '../LoaderX/Loader';
import { addNewOrder } from '../../../firebaseX/Firebase';
import { sendEmail } from '../../../helpersX/helpers';

export default function MercadoPagoButton ({payerInfo, formValidado,payerInfoEspecial}) {
    const {items,clear} = useContext(UseCartContext);
    const router = useRouter();

    const [mensaje,setMensaje]=useState(false)


    const payMP = (newOrder,payerInfoEspecial) => fetch('http://localhost:3000/api/create_preference', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(newOrder) // body data type must match "Content-Type" header
      }).then(function(response) {
        console.log(response)
        return response.json();
      })
      .then(function(preference) {
        //ENVIO DE EMAIL CONFIRMANDO COMPRA
        sendEmail("template_30x548n",payerInfoEspecial);
        //REDIRECCION A CHECKOUTPRO
        router.replace(preference.redirect);

      }).catch(err => {
        console.log("ERR",err);
      });    


    const handleAccept = (payerInfo,payerInfoEspecial) => {
        const order = {
          items:items,
          payerInfoEspecial:payerInfoEspecial,
        }

        if(payerInfoEspecial.metodo_pago === "mercadopago"){
          // COMPRA MERCADO PAGO
          // AGREGO ORDEN A FIREBASE, SI SE COMPLETA LA COMPRA LA DEJO SINO LA ELIMINO

        
          const id = addNewOrder(order);
          const orderMp = {
            items:items,
            payer:payerInfo,
            id: id,
          }
          payMP(orderMp,payerInfoEspecial);
          
        }else{
          // COMPRA EN EFECTIVO
          // AGREGO ORDEN A FIREBASE y REDIRECCIONO A STATUS COMPRA => Compra Terminada "Success"
          
          addNewOrder(order).then(res => {
            clear();
            sendEmail("template_30x548n",payerInfoEspecial);
            router.replace(`http://localhost:3000/StatusCompra?keyword=success`);
          });
        }
    }


    return(
        <>
          {formValidado ? <button onClick={() => {handleAccept(payerInfo,payerInfoEspecial), setMensaje(true)}} className="boton-validar">FINALIZAR COMPRA</button> 
          : <button onClick={() => handleAccept(payerInfo,payerInfoEspecial)} disabled className='boton-validar-sinHover'>Finalizar Compra</button>}
          {mensaje?<><Loader></Loader></>:<></>}
        </>
    )
}