const add = "MATCH (i:Investigador {id: $investigadorId}) MATCH (p:Proyecto) WHERE p.idPry IN $proyectosIds CREATE (i)-[:PARTICIPA_EN]->(p) RETURN i, p";




module.exports = {
    add
}