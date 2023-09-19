const express = require("express");
const cors = require("cors");
const neo4j = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/consulta", async (req, res) => {
  const session = neo4j.session();

  try {
    const result = await session.run("MATCH (n) RETURN n LIMIT 25");
    res.json(result.records.map((record) => record.get(0).properties));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la consulta" });
  } finally {
    session.close();
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));