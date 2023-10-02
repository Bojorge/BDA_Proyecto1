const database = require("../../database");
const queries = require('../queries/top_5_instituciones_query');


const get = async (request, response) => { 
    const session = database.session();
  
    try {
      const result = await session.run(queries.get);
      
      // Verificar que haya registros en el resultado
      if (result.records.length === 0) {
        return response.status(404).json({ error: "No se encontraron registros" });
      }
  
      // Mapear los resultados correctamente
      const instituciones = result.records.map((record) => {
        return {
            Institucion: record.get("Institucion"),
            CantidadProyectos: record.get("CantidadProyectos").toNumber(),  
        };
      });
  
      response.json(instituciones);
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
