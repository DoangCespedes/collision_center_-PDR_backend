
const Role = require('../model/role')
const usuario = require('../model/usuario')

const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({ role })

    if (!existeRole) {
        throw new Error(`El role ${ role } no esta registrado en DB`)
    }
}

// correo existe
const emailExiste = async(correo = '') => {
    const existeEmail = await usuario.findOne({correo})
    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya existe`)
    }
}

// id no existe
const existeUsuarioPorId = async(id) => {
    const existeUsuario = await usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id : ${ id } no existe`)
    }
}


module.exports = {esRoleValido , emailExiste, existeUsuarioPorId}