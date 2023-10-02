const database = require("../../database");
const queries = require('../queries/buscar_investigador_query');




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
      const proyectos = result.records[0].get("proyectos").map((project) => {
        return project.properties; 
      });

      response.json(proyectos);
    
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
