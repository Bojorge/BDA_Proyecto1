const get = "MATCH (i:Investigador {id: $investigadorId}) OPTIONAL MATCH (i)-[:PARTICIPA_EN]->(p:Proyecto) RETURN COLLECT(p) AS proyectos;"


module.exports = {
    get
}



