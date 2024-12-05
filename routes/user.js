const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

//middlewares
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares/index');


const router = Router()

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom( esRoleValido ),
    validarCampos
] ,usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('vin_number', 'El VIN es obligatorio').not().isEmpty(),
    check('correo', 'El valor ingresado no es valido').isEmail(),
    check('role', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( esRoleValido ),
    validarCampos // Aqui ponemos el (MIDDLEWARE) para que valide los campos y si pasa la validacion del middleware lo dejamos pasar al controlador.
], usuariosPost);

router.delete('/:id',[
    //Nota: es importante saber que como declaramos la validacion del jwt ya establecemos la informacion que requerimos de el usuario y podemos encontrar en la req.usuario 
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'OTROMAS'), // De esta manera podemos recibir argumentos en nuestros middlewares
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] , usuariosDelete );


module.exports = router