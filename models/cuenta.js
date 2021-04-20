import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CuentaSchema = new Schema({
    cantidad: { type: Schema.Types.Number, required: true },
    fecha: { type: Schema.Types.String, required: true },
    tipo: { type: Schema.Types.String, required: true },
    categoria: { type: Schema.Types.String, default: 'Movimiento'},
    descrip: { type: Schema.Types.String, default: 'Ninguna'}
})

const cuenta = mongoose.model('Cuenta', CuentaSchema);
export default cuenta;