const express = require("express");
const cors = require("cors");

const graphRoute = require('./src/routes/graph_route');
const investigadoresRoute = require('./src/routes/investigadores_route');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());


app.use('/api/consulta', graphRoute);
app.use('/api/investigadores', investigadoresRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));




