const express = require("express");
const cors = require('cors');
const neo4j = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin:'*'}));



app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD"
  );
  next();
});


//const cuentasRoute = require('./src/routes/route_cuenta');
//app.use('/api/cuentas', cuentasRoute);


/*
app.get('/', (consulta, respuesta) => {
  respuesta.send('BDA API');
});
*/
app.get('/consulta', async (req, res) => {
    const session = neo4j.session();

    try {
        const result = await session.run('MATCH (n) RETURN n LIMIT 25'); // Ejemplo de consulta
        res.json(result.records.map(record => record.get(0).properties));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta' });
    } finally {
        session.close();
    }
});



  app.listen(port, () => console.log(`listening on port ${port}`));
