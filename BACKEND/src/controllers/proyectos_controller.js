const database = require("../../database");
const queries = require('../queries/proyectos_query');


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
  const { idPry,titulo_proyecto,anno_inicio,duracion_meses,area_conocimiento } = request.body;
  
  const session = database.session();

  try {
    const result = await session.run(queries.add, {
        idPry,
        titulo_proyecto,
        anno_inicio,
        duracion_meses,
        area_conocimiento
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
  const { idPry,titulo_proyecto,anno_inicio,duracion_meses,area_conocimiento } = request.body;

  const session = database.session();

  try {
    await session.run(queries.update, {
        idPry,
        titulo_proyecto,
        anno_inicio,
        duracion_meses,
        area_conocimiento
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



  