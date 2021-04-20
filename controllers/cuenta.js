import Cuenta from '../models/cuenta';

export const agregarMovimiento = async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const movDb = await Cuenta.create(body);
        res.json(movDb);
    } catch (error) {
        // console.log(error);
        res.status(401).json({mensaje: 'No se puedo realizar la operación', error});
    }
}
export const obtenerMovimientos = async(req, res) => {
    try {
        const ingresos = await Cuenta.find({tipo: 'Ingreso'}).sort({fecha: -1});
        const gastos = await Cuenta.find({tipo: 'Gasto'}).sort({fecha: -1});
        res.json({
            ingresos,
            gastos
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({mensaje: 'No se logro obtener los movimientos', error});
    }
}
export const consultarSaldo = async (req, res) => {
    let saldoFavor = 0;
    let saldoContra = 0;
    try {
        const ingresos = await Cuenta.find({tipo: 'Ingreso'});
        const gastos = await Cuenta.find({tipo: 'Gasto'});
        ingresos.forEach(i => {
            saldoFavor += i.cantidad;
        })
        gastos.forEach(i => {
            saldoContra += i.cantidad;
        })
        res.json({
            favor: saldoFavor - saldoContra,
            contra: saldoContra
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({mensaje: 'No se logro obtener el saldo', error});
    }
}