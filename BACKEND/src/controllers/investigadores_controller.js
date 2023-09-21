const database = require("../../database");
const queries = require('../queries/investigadores_query');


const get = async (request, response) => { 
  
  response.send("get investigadores");
  
}


const post = async (request, response) => {
  const investigador = request.body;
  
  const session = database.session();

  try {
    const result = await session.run(queries.add, {
      1: investigador.id,
      2: investigador.nombre_completo,
      3: investigador.titulo_academico,
      4: investigador.institucion,
      5: investigador.email
    });
    
    // Respondemos con un mensaje de éxito (puedes personalizarlo según tus necesidades)
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
    post
};



  