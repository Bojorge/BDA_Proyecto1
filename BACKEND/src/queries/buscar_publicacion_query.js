const get = "MATCH (pr:Proyecto)-[:PUBLICADO_EN]->(p:Publicacion {idPub: $publicacionId}) RETURN COLLECT(pr) AS proyectos"


module.exports = {
    get
}

