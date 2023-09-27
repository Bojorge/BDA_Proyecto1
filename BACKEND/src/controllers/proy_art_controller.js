const database = require("../../database");
const queries = require('../queries/proy_art_query'); 

const get = async (request, response) => { 
  response.status(201).json({ message: 'GET proyectos-articulos' });
}


const create = async (request, response) => {

  const { proyectoId, articulosIds } = request.body;
  
  const session = database.session();

  try {
    

    const result = await session.run(queries.add, {
        proyectoId,
        articulosIds
    });
    
    response.status(201).json({ message: 'Agregado con éxito' });
  } catch (error) {
    console.error('Error al agregar:', error);
    response.status(500).json({ error: "Error en la consulta" });
  } finally {
    session.close();
  }
};




  module.exports = {
    get,
    create
};

