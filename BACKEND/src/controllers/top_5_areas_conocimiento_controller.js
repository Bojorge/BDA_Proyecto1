const database = require("../../database");
const queries = require('../queries/top_5_areas_conocimiento_query');


const get = async (request, response) => { 
    const session = database.session();
  
    try {
      const result = await session.run(queries.get);
      
      // Verificar que haya registros en el resultado
      if (result.records.length === 0) {
        return response.status(404).json({ error: "No se encontraron registros" });
      }
  
      // Mapear los resultados correctamente
      const areasConocimiento = result.records.map((record) => {
        return {
          area: record.get("area"),
          cantidad: record.get("cantidad").toNumber(), 
        };
      });
  
      response.json(areasConocimiento);
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
