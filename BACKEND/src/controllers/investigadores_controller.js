const database = require("../../database");
const queries = require('../queries/investigadores_query');


const get = async (request, response) => { // Marca la función como async
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




const create = async (request, response) => {
  const { id, nombre_completo, titulo_academico, institucion, email } = request.body;
  
  const session = database.session();

  try {
    const result = await session.run(queries.add, {
      id,
      nombre_completo,
      titulo_academico,
      institucion,
      email
    });
    
    response.status(201).json({ message: 'Agregado con éxito' });
  } catch (error) {
    console.error('Error al agregar:', error);
    response.status(500).json({ error: "Error en la consulta" });
  } finally {
    session.close();
  }
};



const update = async (request, response) => {
  const { id, nombre_completo, titulo_academico, institucion, email } = request.body;

  const session = database.session();

  try {
    await session.run(queries.update, {
      id,
      nombre_completo,
      titulo_academico,
      institucion,
      email
    });

    response.status(200).json({ message: 'Actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar:', error);
    response.status(500).json({ error: "Error en la consulta" });
  } finally {
    session.close();
  }
};

  
module.exports = {
    get,
    create,
    update
};



  