const database = require("../../database");
const queries = require('../queries/publicaciones_query');


const get = async (request, response) => { 
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
  const { idPub,titulo_publicacion,anno_publicacion,nombre_revista } = request.body;
  
  const session = database.session();

  try {
    const result = await session.run(queries.add, {
        idPub,
        titulo_publicacion,
        anno_publicacion,
        nombre_revista
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
  const { idPub,titulo_publicacion,anno_publicacion,nombre_revista } = request.body;

  const session = database.session();

  try {
    await session.run(queries.update, {
        idPub,
        titulo_publicacion,
        anno_publicacion,
        nombre_revista
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



  