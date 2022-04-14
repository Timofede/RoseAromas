import React,{useState, useContext,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {UseCartContext} from '../../../context/CartContext';
import MercadoPagoButton from '../MercadoPagoButton/MercadoPagoButton';
import Link from 'next/link';




export default function Form () {
    const [payerInfo, setPayerInfo] = useState({});
    const [phone,setPhone] = useState({});
    const [address,setAddress] = useState({});

    useEffect(() => {
        console.log(payerInfo)
    }, [payerInfo]);

    // NOMBRE
    const handleNameData = (e) => {
        setPayerInfo({...payerInfo,name: e.target.value})
    }

    // APELLIDO
    const handleSurnameData = (e) => {
        setPayerInfo({...payerInfo,surname: e.target.value});
    }

    // EMAIL
    const handleEmailData = (e) => {
        setPayerInfo({...payerInfo,email: e.target.value});
    }

    // CODIGO DE AREA
    const handleAreaNumberPhoneData = (e) => {
        setPhone({...phone,area_code: e.target.value});
    }

    // NUMERO DE TELEFONO
    const handleNumberPhoneData = (e) => {
        setPhone({...phone,number: Number(e.target.value)});
        setPayerInfo({...payerInfo,phone:phone});
    }

    // DIRECCION
    const handleStreetNameData = (e) => {
        setAddress({...address, street_name: toString(e.target.value)});
    }

    // NUMERO DE CASA
    const handleStreetNumberData = (e) => {
        setAddress({...address, street_number: Number(e.target.value)});

    }

    // CODIGO POSTAL
    const handleZipCoderData = (e) => {
        setAddress({...address, zip_code: e.target.value})
        setPayerInfo({...payerInfo, address:address});
    }




    return (
    <form className="form">
        <div className='form-input-title'>
            <h2>DATOS PERSONALES</h2>
        </div>
           
            <TextField className="form-input" size="medium" autoComplete="off"   color="secondary"  id="nameId"  placeholder="Nombre" type="input" onChange={handleNameData}/>
            <TextField className="form-input" size="medium" autoComplete="off"   color="secondary"  id="surnameId"  placeholder="Apellido" type="input" onChange={handleSurnameData}/>
            <TextField className="form-input" size="medium" autoComplete="off"   color="secondary"  id="emailId" pattern="[^ @]*@[^ @]*" placeholder="Email" type="input" onChange={handleEmailData}/>
            <div>
                <TextField className="form-input" size="medium" autoComplete="off"   color="secondary"  id="numberAreaId"  placeholder="Numero de area" type="input" onChange={handleAreaNumberPhoneData}/>
                <TextField className="form-input" size="medium" autoComplete="off"   color="secondary"  id="numberId"  placeholder="Numero de telefono" type="input" onChange={handleNumberPhoneData}/>
            </div>
            
        <div className='form-input-title formtitle2'>
            <h2>DATOS DE ENVIO</h2>
        </div>
            <TextField className="form-input" size="medium" autoComplete="off"   color="secondary"  id="streetId"  placeholder="Calle" type="input" onChange={handleStreetNameData}/>
            <TextField className="form-input" size="medium" autoComplete="off"   color="secondary"  id="streetNumberId"  placeholder="Numero de calle" type="input" onChange={handleStreetNumberData}/>
            <TextField className="form-input" size="medium" autoComplete="off"   color="secondary"  id="zipCodeId"  placeholder="Codigo Postal" type="input" onChange={handleZipCoderData}/>



        {/* MERCADO PAGO COMPRAR */}
        <MercadoPagoButton payerInfo={payerInfo} />
        <Link href="/Cart" className="linkStyle"><button>Cancelar</button></Link>

        </form>


)
        
}
    
