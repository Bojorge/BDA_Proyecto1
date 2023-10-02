const database = require("../../database");
const queries = require('../queries/buscar_colegas_query');


const get = async (request, response) => {
    const id = request.params.id;
    const session = database.session();
  
    try {
      const result = await session.run(queries.get, { investigadorId: id });
  
      /*
      // Verifica que haya registros en el resultado
      if (result.records.length === 0) {
        return response.json({ error: "No se encontraron proyectos" });
      }
      */
  
      // Mapea los resultados correctamente
      const colegas = result.records[0].get("colegas").map((col) => {
        return col.properties; 
      });

      response.json(colegas);
    
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error en la consulta" });
    } finally {
      session.close();
    }
};

module.exports = {
    get
};
