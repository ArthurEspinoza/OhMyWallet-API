import Ahorro from '../models/ahorro';

export const crearAhorro = async(req, res) => {
    const body = req.body;
    try {
        const nuevoAhorro = await Ahorro.create(body);
        res.json(nuevoAhorro);
    } catch (error) {
        console.log(error);
        res.status(404).json({ mensaje: 'No se pudo registrar el nuevo ahorro.', error})
    }
}
export const obtenerLosAhorros = async(req, res) => {
    try {
        const ahorros = await Ahorro.find().sort({saldo: -1});
        res.json(ahorros);
    } catch (error) {
        console.log(error);
        res.status(404).json({mensaje: 'No se pudo obtener la lista de ahorros.', error})
    }
}
export const obtenerUnAhorro = async(req, res) => {
    const _id = req.params.id;
    try {
        const ahorro = await Ahorro.findById(_id);
        res.json(ahorro);
    } catch (error) {
        console.log(error);
        res.status(404).json({mensaje: 'No se pudo obtener la información de ese ahorro.', error});
    }
}
export const gestionAhorro = (req, res) => {
    const {cantidad, fecha} = req.body;
    const { id, op} = req.params;
    if(op === 'abonar'){
        try {
            Ahorro.findById(id)
                .then(ahorro => {
                    ahorro.agregarAbono(cantidad, fecha);
                    res.json(ahorro);
                })
                .catch(err => {
                    res.status(404).json({mensaje: 'No se pudo encontrar el ahorro indicado.', error: err})
                })
        } catch (error) {
            console.log(error);
            res.status(401).json({mensaje: 'No se pudo abonar al ahorro.', error})
        }
    }else{
        try {
            Ahorro.findById(id)
                .then(ahorro => {
                    ahorro.restarAbono(cantidad, fecha);
                    res.json(ahorro);
                })
                .catch(err => {
                    res.status(401).json({mensaje: 'No se pudo encontrar el ahorro indicado', error: err})
                })
        } catch (error) {
            console.log(error);
            res.status(401).json({mensaje: 'No se pudo restar al ahorro.', error})
        }
    }
}