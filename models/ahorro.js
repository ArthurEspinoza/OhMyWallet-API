import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AhorroSchema = new Schema({
    titulo: { type: Schema.Types.String, require: true },
    monto: { type: Schema.Types.Number, require: true },
    saldo: { type: Schema.Types.Number, require: true, default: 0},
    abonos: [{
        cantidad: { type: Schema.Types.Number, require: true},
        fecha: { type: Schema.Types.String, require: true }
    }]
})
AhorroSchema.methods.agregarAbono = function (cantidad, fecha) {
    const nuevoAbono = { cantidad, fecha };
    const abonosActualizados = [...this.abonos];
    abonosActualizados.unshift(nuevoAbono);
    this.abonos = abonosActualizados
    this.saldo += cantidad;
    this.save();
}
AhorroSchema.methods.restarAbono = function(cantidad, fecha) {
    const nuevoAbono = {cantidad: cantidad * -1, fecha};
    const abonosActualizados = [...this.abonos];
    abonosActualizados.unshift(nuevoAbono);
    this.abonos = abonosActualizados;
    this.saldo -= cantidad;
    this.save();
}

const ahorro = mongoose.model('Ahorro', AhorroSchema);
export default ahorro;