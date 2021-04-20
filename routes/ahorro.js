import express from 'express';
import { crearAhorro, obtenerLosAhorros,
         obtenerUnAhorro, gestionAhorro } from '../controllers/ahorro';

const router = express.Router();

router.post('/', crearAhorro);
router.get('/', obtenerLosAhorros);
router.get('/:id', obtenerUnAhorro);
router.post('/:id/:op', gestionAhorro);

export default router;