const database = require("../../database");
const queries = require('../queries/buscar_publicacion_query');


const get = async (request, response) => { 
  const session = database.session();

  try {
      const result = await session.run(queries.get);
      response.json(result.records.map((record) => record.get(0).properties));
  } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error en la consulta" });
  } finally {
      session.close();
  }
}


module.exports = {
    get
};
