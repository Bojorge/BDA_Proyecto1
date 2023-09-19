const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'neo4j://localhost:7687', // Cambia esta URL por la de tu base de datos Neo4j
  neo4j.auth.basic('neo4j', '12345678') // Cambia estos valores por tus credenciales
);

module.exports = driver;

//http://localhost:7687/