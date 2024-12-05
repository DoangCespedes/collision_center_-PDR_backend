const { response } = require('express');
const Usuario = require('../model/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {
    const { nombre, password } = req.body;

    try {
        // Validar que los campos estén presentes
        if (!nombre || !password) {
            return res.status(400).json({
                msg: 'El nombre y la contraseña son obligatorios'
            });
        }

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ nombre });
        if (!usuario || !usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }

        // Verificar la contraseña
        const validPassword = await bcryptjs.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        // Responder con el usuario y el token
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({
            msg: 'Ocurrió un error. Hable con el administrador.'
        });
    }
};

module.exports = {
    login
};
