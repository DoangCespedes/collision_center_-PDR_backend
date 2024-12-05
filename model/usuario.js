const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    // required: [true, 'El nombre es obligatorio'],
  },
  telefono: {
    type: String,
    // required: [true, 'El teléfono es obligatorio'],
  },
  correo: {
    type: String,
    // required: [true, 'El correo es obligatorio'],
  },
  yearCar: {
    type: Number,
    // required: [true, 'El año es obligatorio'],
  },
  makeCar: {
    type: String,
    // required: [true, 'La marca es obligatoria'],
  },
  modelCar: {
    type: String,
    // required: [true, 'El modelo es obligatorio'],
  },
  vin_number: {
    type: String,
    required: [true, 'El VIN es obligatorio'],
  },
  service: {
    type: String,
    // required: [true, 'El tipo de servicio es obligatorio'],
  },
  message: {
    type: String,
    // required: [true, 'La descripción del daño es obligatoria'],
  },
  consent: {
    type: Boolean,
    // required: [true, 'El consentimiento es obligatorio'],
  },
  seguro: {
    type: Boolean,
    // required: [true, 'El estado del seguro es obligatorio'], // Para saber si usa seguro o no
  },
  claim_number: {
    type: String,
    required: function () {
      return this.seguro; // Obligatorio solo si usa seguro
    },
    default: null, // En caso de que no se use seguro
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  // Campo adicional para más flexibilidad si hay pagos por cartera.
  payOutOfPocket: {
    type: Boolean,
    default: function () {
      return !this.seguro; // Verdadero si no usa seguro
    },
  },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
