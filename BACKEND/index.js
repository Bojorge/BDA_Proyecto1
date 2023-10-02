const express = require("express");
const cors = require("cors");

const graphRoute = require('./src/routes/graph_route');
const investigadoresRoute = require('./src/routes/investigadores_route');
const proyectosRoute = require('./src/routes/proyectos_route');
const publicacionesRoute = require('./src/routes/publicaciones_route');
const inv_proy_Route = require('./src/routes/inv_proy_route');
const proy_art_Route = require('./src/routes/proy_art_route');

const top_5_areas_cononimiento = require('./src/routes/top_5_areas_conocimiento_route');
const top_5_instituciones = require('./src/routes/top_5_instituciones_route');
const top_5_investigadores = require('./src/routes/top_5_investigadores_route');

const buscar_publicacion = require('./src/routes/buscar_publicacion_route');
const buscar_proyecto = require('./src/routes/buscar_proyecto_route');
const buscar_investigador = require('./src/routes/buscar_investigador_route');
const buscar_colegas = require('./src/routes/buscar_colegas_route');
const buscar_area_conocimiento = require('./src/routes/buscar_area_conocimiento_route');



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/api/consulta', graphRoute);
app.use('/api/investigadores', investigadoresRoute);
app.use('/api/proyectos', proyectosRoute);
app.use('/api/publicaciones', publicacionesRoute);
app.use('/api/asociar_inv_proy', inv_proy_Route);
app.use('/api/asociar_proy_art', proy_art_Route);


app.use('/api/top_5_areas_cononimiento', top_5_areas_cononimiento);
app.use('/api/top_5_instituciones', top_5_instituciones);
app.use('/api/top_5_investigadores', top_5_investigadores);

app.use('/api/buscar_publicacion', buscar_publicacion);
app.use('/api/buscar_proyecto', buscar_proyecto);
app.use('/api/buscar_investigador', buscar_investigador);
app.use('/api/buscar_colegas', buscar_colegas);
app.use('/api/buscar_area_conocimiento', buscar_area_conocimiento);



app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (consulta, respuesta) => {
    respuesta.send('API: BDA Proyecto 1');
});


