export default function DashboardLogin ({setLogin,login}) {

    const loginExito=(usuario,contraseña)=>{
        if(usuario==="Carolinarose" & contraseña==="CaroRose2022"){
            setLogin(!login)
        }
    }

    return (
        <div className="logeo-block">
        <div className="logeo-container">
            <label form="usuario">USUARIO:</label>
            <input placeholder="Usuario" name="usuario" id="usuario"/>
            <label form="contraseña">CONTRASEÑA:</label>
            <input placeholder="Contraseña" type={"password"} name="contraseña" id="contraseña"/>
            <div className="container-logeo-button">
                <p onClick={()=>{loginExito(usuario.value,contraseña.value)}}>CONFIRMAR</p>
            </div>
        </div>
    </div>
    )
}