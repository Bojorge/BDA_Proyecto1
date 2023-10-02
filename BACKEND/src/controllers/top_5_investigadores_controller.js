const database = require("../../database");
const queries = require('../queries/top_5_investigadores_query');

const get = async (request, response) => { 
    const session = database.session();
  
    try {
      const result = await session.run(queries.get);
      
      // Verificar que haya registros en el resultado
      if (result.records.length === 0) {
        return response.status(404).json({ error: "No se encontraron registros" });
      }
  
      // Mapear los resultados correctamente
      const investigadores = result.records.map((record) => {
        return {
            nombre: record.get("nombre"),
            institucion: record.get("institucion"),
            cantidad_proyectos: record.get("cantidad_proyectos").toNumber(),  
        };
      });
  
      response.json(investigadores);
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
