// Importa el controlador de Neo4j
const neo4j = require('neo4j-driver');

// Configura la conexión a la base de datos Neo4j en Neo4j Desktop
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("tu_usuario", "tu_contraseña"));

// Abre una sesión
const session = driver.session();

// Ejecuta una consulta Cypher
session
  .run("MATCH (n) RETURN n LIMIT 10")
  .then(result => {
    result.records.forEach(record => {
      console.log(record.get("n").properties);
    });
  })
  .catch(error => {
    console.error("Error:", error);
  })
  .finally(() => {
    // Cierra la sesión y el controlador al finalizar
    session.close();
    driver.close();
  });
