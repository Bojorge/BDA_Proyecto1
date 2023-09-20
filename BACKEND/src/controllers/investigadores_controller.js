const database = require("../../database");
const queries = require('../queries/investigadores_query');

const add = async (id, nombre_completo, titulo_academico, institucion, email, response) => {
  const session = database.session();
  
  try {
    await session.run(queries.add, {
      id,
      nombre_completo,
      titulo_academico,
      institucion,
      email
    });
    response.status(200).json({ message: 'Investigador agregado con éxito' });
  } catch (error) {
    response.status(500).json({ error: "Error en la consulta" });
  } finally {
    session.close();
  }
};
  

  
module.exports = {
    add
};



  