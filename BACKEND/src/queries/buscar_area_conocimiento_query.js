const get = "MATCH (p:Proyecto)-[:PUBLICADO_EN]->(pub:Publicacion) WHERE p.area_conocimiento = $areaConocimiento RETURN DISTINCT $areaConocimiento AS area_de_conocimiento, COLLECT(DISTINCT p.titulo_proyecto) AS proyectos, COLLECT(DISTINCT pub.titulo_publicacion) AS publicaciones"


module.exports = {
    get
}

