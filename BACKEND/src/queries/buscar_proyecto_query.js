//const get = "MATCH (p:Proyecto {idPry: $proyectoId})-[:PARTICIPA_EN]-(i:Investigador) OPTIONAL MATCH (p)-[:PUBLICADO_EN]->(pub:Publicacion) RETURN COLLECT(DISTINCT {nombreCompleto: i.nombre_completo, tituloAcademico: i.titulo_academico, institucion: i.institucion, email: i.email}) AS investigadores, COLLECT(DISTINCT {tituloPublicacion: pub.titulo_publicacion, annoPublicacion: pub.anno_publicacion, nombreRevista: pub.nombre_revista}) AS publicaciones;"

//const get_1 = "MATCH (p:Proyecto {idPry: $proyectoId})-[:PARTICIPA_EN]-(i:Investigador) OPTIONAL MATCH (p)-[:PUBLICADO_EN]->(pub:Publicacion) RETURN COLLECT(DISTINCT {nombreCompleto: i.nombre_completo, tituloAcademico: i.titulo_academico, institucion: i.institucion, email: i.email}) AS investigadores;"

//const get_2 = "MATCH (p:Proyecto {idPry: $proyectoId})-[:PARTICIPA_EN]-(i:Investigador) OPTIONAL MATCH (p)-[:PUBLICADO_EN]->(pub:Publicacion) RETURN  COLLECT(DISTINCT {tituloPublicacion: pub.titulo_publicacion, annoPublicacion: pub.anno_publicacion, nombreRevista: pub.nombre_revista}) AS publicaciones;"

const get = "MATCH (p:Proyecto {idPry: $proyectoId})-[:PARTICIPA_EN]-(i:Investigador) OPTIONAL MATCH (p)-[:PUBLICADO_EN]->(pub:Publicacion) RETURN COLLECT(DISTINCT i) AS investigadores, COLLECT(DISTINCT pub) AS publicaciones;"


module.exports = {
    //get_1,
    //get_2,
    get
}

