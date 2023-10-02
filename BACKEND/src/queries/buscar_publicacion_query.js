const get = "MATCH (pr:Proyecto)-[:PUBLICADO_EN]->(p:Publicacion) WHERE p.idPub IN $publicacionesIds WITH p, COLLECT(pr.titulo_proyecto) AS proyectos RETURN p.titulo_publicacion AS articulo, p.anno_publicacion AS año, p.nombre_revista AS revista, proyectos"


module.exports = {
    get
}

