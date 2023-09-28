const database = require("../../database"); 
const queries = require('../queries/inv_proy_query'); 



const create = async (request, response) => {
  const { investigadorId, proyectosIds } = request.body;
  
  const session = database.session();

  try {
    
    const result = await session.run(queries.add, {
      investigadorId,
      proyectosIds
    });
    
    response.status(201).json({ message: 'Agregado con éxito' });
  } catch (error) {
    console.error('Error al agregar:', error);
    response.status(500).json({ error: "Error en la consulta" });
  } finally {
    session.close();
  }
};


const create_csv = async (request, response) => {

  const { idInv, idProy } = request.body;
  
  const session = database.session();

  try {
    
    const result = await session.run(queries.addcsv, {
      idInv,
      idProy
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
    create,
    create_csv
};