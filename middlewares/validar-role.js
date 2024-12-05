const { response } = require("express")


const esAdminRole = ( req, res = response, next ) => {

    //Nota: es importante saber que como declaramos la validacion del jwt ya establecemos la informacion que requerimos de el usuario y podemos encontrar en la req.usuario  
    
    if (!req.usuario) {
        return res.status(500).json({
            msg: ' Se quiere verificar el rol sin validar el token primero'
        })
    }
    const { role, nombre } = req.usuario

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${nombre} no es administrador - No puede realizar esta funcion`
        })
    }
    next()
}

const tieneRole = ( ...roles ) =>{
    return (req, res = response, next) =>{
        console.log(roles)
        
        if (!req.usuario) {
            return res.status(500).json({
                msg: ' Se quiere verificar el rol sin validar el token primero'
            })
        }

        if (!roles.includes( req.usuario.role )) {
            return res.status(401).json({
                msg: `El servicio requiero alguno de estos roles ${roles}`
            })
        }
        next()
    }

}

module.exports = { 
    esAdminRole,
    tieneRole
}