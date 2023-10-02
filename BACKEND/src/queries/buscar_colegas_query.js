const get = "MATCH (i:Investigador {id: $investigadorId})-[:PARTICIPA_EN]->(p:Proyecto)<-[:PARTICIPA_EN]-(colega:Investigador) WHERE colega <> i RETURN DISTINCT colega.nombre_completo AS nombre_colega;"


module.exports = {
    get
}
