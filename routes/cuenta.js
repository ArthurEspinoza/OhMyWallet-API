import express from 'express';
import { agregarMovimiento, consultarSaldo, obtenerMovimientos } from '../controllers/cuenta';
const router = express.Router();

// Movimientos
router.get('/', obtenerMovimientos)
router.get('/saldo', consultarSaldo);
router.post('/', agregarMovimiento);

export default router;