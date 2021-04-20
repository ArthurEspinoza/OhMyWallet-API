import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';
import mongoose from 'mongoose';

//Importamos las rutas
import rutasCuenta from './routes/cuenta';
import rutasAhorro from './routes/ahorro';

// Creamos el app de express
const app = express();
//Middlewares de express
app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

//Rutas
app.use('/cuenta', rutasCuenta);
app.use('/ahorro', rutasAhorro);

app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//Conexión a MongoDB
const uri = process.env.DB_URI;
const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};
mongoose.connect(uri, options)
    .then(()=>{
        console.log("Conectado con MongoDB!");
    })
    .catch(err => { console.log(err) })

app.set('puerto', process.env.PORT || 5000);

app.listen(app.get('puerto'), () => {
    console.log("Server ready on port: ", app.get('puerto'))
})
