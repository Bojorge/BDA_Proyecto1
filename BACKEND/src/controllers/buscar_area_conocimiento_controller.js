const database = require("../../database");
const queries = require('../queries/buscar_area_conocimiento_query');


const get = async (request, response) => {
    const area = request.params.id;
    const session = database.session();
  
    try {
      const result = await session.run(queries.get, { areaConocimiento: area });
  
      // Verifica que haya registros en el resultado
      if (result.records.length === 0) {
        return response.json({ error: "No se encontraron proyectos" });
      }
  
      // Mapea los resultados correctamente
      const proyectos = result.records[0].get("proyectos").map((inv) => {
        return inv.properties; 
      });
  
      const publicaciones = result.records[0].get("publicaciones").map((pub) => {
        return pub.properties; 
      });
  
      // Crear un objeto con ambas propiedades
      const responseData = {
        proyectos: proyectos,
        publicaciones: publicaciones
      };
  
      // Responde con el objeto creado
      response.json(responseData);
    
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
