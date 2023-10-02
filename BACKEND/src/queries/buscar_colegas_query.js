const get = "MATCH (i:Investigador {id: $investigadorId})-[:PARTICIPA_EN]->(p:Proyecto)<-[:PARTICIPA_EN]-(colega:Investigador) WHERE colega <> i WITH COLLECT(DISTINCT colega) AS colegas RETURN colegas;"





module.exports = {
    get
}
