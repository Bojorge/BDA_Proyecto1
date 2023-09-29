const add = "MATCH (p:Proyecto {idPry: $proyectoId}) MATCH (pub:Publicacion) WHERE pub.idPub IN $articulosIds CREATE (p)-[:PUBLICADO_EN]->(pub) RETURN p, pub;";

const addcsv = "MATCH (p:Proyecto {idPry: $idProyecto}) MATCH (pub:Publicacion {idPub: $idArt}) CREATE (p)-[:PUBLICADO_EN]->(pub) RETURN p, pub;";



module.exports = {
    add,
    addcsv
}

