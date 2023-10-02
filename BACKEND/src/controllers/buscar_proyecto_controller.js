const database = require("../../database");
const queries = require('../queries/buscar_proyecto_query');


const get = async (request, response) => {
    const id = request.params.id;
    const session = database.session();
  
    try {
      const result = await session.run(queries.get, { proyectoId: id });
  
      // Verifica que haya registros en el resultado
      if (result.records.length === 0) {
        return response.json({ error: "No se encontraron proyectos" });
      }
  
      // Mapea los resultados correctamente
      const investigadores = result.records[0].get("investigadores").map((inv) => {
        return inv.properties; 
      });
  
      const publicaciones = result.records[0].get("publicaciones").map((pub) => {
        return pub.properties; 
      });
  
      // Crear un objeto con ambas propiedades
      const responseData = {
        investigadores: investigadores,
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


/*
const get_1 = async (request, response) => {
    const id = request.params.id;
    const session = database.session();
  
    try {
      const result = await session.run(queries.get_1, { proyectoId: id });
  
  
      const investigadores = result.records[0].get("investigadores").map((inv) => {
        return inv.properties; 
      });

      response.json(investigadores);
    
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error en la consulta" });
    } finally {
      session.close();
    }
};


const get_2 = async (request, response) => {
    const id = request.params.id;
    const session = database.session();
  
    try {
      const result = await session.run(queries.get_2, { proyectoId: id });
  
  
      const publicaciones = result.records[0].get("publicaciones").map((pub) => {
        return pub.properties; 
      });

      response.json(publicaciones);
    
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error en la consulta" });
    } finally {
      session.close();
    }
};
*/

  

module.exports = {
    //get_1,
    //get_2,
    get
};
