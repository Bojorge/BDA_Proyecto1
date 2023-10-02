const get = "MATCH (p:Proyecto {idPry: $proyectoId})-[:PARTICIPA_EN]-(i:Investigador) OPTIONAL MATCH (p)-[:PUBLICADO_EN]->(pub:Publicacion) RETURN p.titulo_proyecto AS tituloProyecto, p.anno_inicio AS annoInicio, p.duracion_meses AS duracionMeses, p.area_conocimiento AS areaConocimiento, COLLECT({nombreCompleto: i.nombre_completo, tituloAcademico: i.titulo_academico, institucion: i.institucion, email: i.email}) AS investigadores, COLLECT({tituloPublicacion: pub.titulo_publicacion, annoPublicacion: pub.anno_publicacion, nombreRevista: pub.nombre_revista}) AS publicaciones;"


module.exports = {
    get
}

