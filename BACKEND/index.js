const express = require("express");
const cors = require("cors");

const graphRoute = require('./src/routes/graph_route');
const investigadoresRoute = require('./src/routes/investigadores_route');
const proyectosRoute = require('./src/routes/proyectos_route');
const publicacionesRoute = require('./src/routes/publicaciones_route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/api/consulta', graphRoute);
app.use('/api/investigadores', investigadoresRoute);
app.use('/api/proyectos', proyectosRoute);
app.use('/api/publicaciones', publicacionesRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (consulta, respuesta) => {
    respuesta.send('API: BDA Proyecto 1');
});


