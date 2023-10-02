const get = "MATCH (p:Proyecto)-[:PUBLICADO_EN]->(pub:Publicacion) WHERE p.area_conocimiento = $areaConocimiento RETURN DISTINCT COLLECT(DISTINCT p) AS proyectos, COLLECT(DISTINCT pub) AS publicaciones"


module.exports = {
    get
}

